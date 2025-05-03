import { Injectable } from '@nestjs/common';
import { PropertyListing, PropertyListingDocument } from './schema/listing.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query, QueryOptions, UpdateQuery } from 'mongoose';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';
import { UtilService } from 'src/shared/services/utils.service';

@Injectable()
export class PropertyListingService {
  constructor(
    @InjectModel(PropertyListing.name)
    private readonly _propertyListingModel: Model<PropertyListingDocument>,
    private readonly utilService: UtilService,
  ) { }

  async populate(model: Query<any, PropertyListingDocument>) {
    return await model.populate([
      { path: 'developer' },
    ]);
  }

  async createPropertyListing<T>(data: T) {
    const propertyListing = await this._propertyListingModel.create(data);

    return propertyListing;
  }

  async getPropertyListing(filter: FilterQuery<PropertyListingDocument>) {
    const propertyListing = await this.populate(this._propertyListingModel.findOne(filter));

    return propertyListing;
  }

  async getPropertyListings(filter: FilterQuery<PropertyListingDocument>, paginationQuery: PaginationQuery) {
    const count = await this._propertyListingModel.find(filter).countDocuments();

    const { skip, page, totalPages, limit } = this.utilService.resolvePaginationQuery({
      ...paginationQuery,
      count,
    });

    const data = await this.populate(this._propertyListingModel.find(filter).limit(limit).skip(skip));

    return {
      data,
      page,
      totalPages,
      count,
    };
  }

  async getPropertyListingsFilters(): Promise<{
    propertyType: string[];
    location: string[];
    bedrooms: number[];
    priceRange: {
      label: string;
      min: number;
      max: number;
      count: number;
    }[];
  }> {
    const propertyType = await this._propertyListingModel.distinct('propertyType');
    const location = await this._propertyListingModel.distinct('location');
    const bedrooms = await this._propertyListingModel.distinct('bedrooms');
    const priceRange = await this.getPropertyListingsPriceRanges();

    return { propertyType, location, bedrooms, priceRange };
  }

  async getPropertyListingsPriceRanges(): Promise<{
    label: string;
    min: number;
    max: number;
    count: number;
  }[]> {
    const result = await this._propertyListingModel.aggregate([
      {
        $addFields: {
          price: { $toDouble: "$price" }
        }
      },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 10_000_000, 25_000_000, 50_000_000, 100_000_000, Infinity],
          default: "Other",
          output: {
            count: { $sum: 1 }
          }
        }
      }
    ]);

    const ranges = [
      { label: 'Under 10M', range: [0, 10000000] },
      { label: '10M - 25M', range: [10000000, 25000000] },
      { label: '25M - 50M', range: [25000000, 50000000] },
      { label: '50M - 100M', range: [50000000, 100000000] },
      { label: 'Above 100M', range: [100000000, Infinity] }
    ];

    return ranges.map((r, i) => ({
      label: r.label,
      min: r.range[0],
      max: r.range[1] === Infinity ? null : r.range[1],
      count: result.find((_r) => _r._id === r.range[0])?.count || 0
    }));
  }


  async updatePropertyListing(
    filter: FilterQuery<PropertyListingDocument>,
    update: UpdateQuery<PropertyListingDocument>,
    options?: QueryOptions<PropertyListingDocument>,
  ) {
    const propertyListing = await this.populate(
      this._propertyListingModel.findOneAndUpdate(filter, update, {
        new: true,
        runValidators: true,
        ...options,
      }),
    );

    return propertyListing;
  }

  async deletePropertyListing(filter: FilterQuery<PropertyListingDocument>) {
    const propertyListing = await this._propertyListingModel.findOneAndDelete(filter);

    return propertyListing;
  }
}
