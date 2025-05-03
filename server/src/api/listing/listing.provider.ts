import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, Types } from 'mongoose';
import { PropertyListingService } from './listing.service';
import { CreatePropertyListingDto } from './dto/create-listing.dto';
import { FileService } from 'src/shared/file/file.service';
import { UpdatePropertyListingDto } from './dto/update-listing.dto';
import { PaginationQuery } from 'src/shared/interfaces/pagination.interface';
import { PropertyListingDocument } from './schema/listing.schema';
import { GetPropertyListingsDto, PropertyListingsDto } from './dto/get-listings-dto';
import DEFAULT_MATCHERS from 'src/shared/constants/regex.const';

@Injectable()
export class PropertyListingProvider {
  constructor(
    private readonly fileService: FileService,
    private readonly propertyListingService: PropertyListingService,
  ) { }

  async createPropertyListing(createPropertyListingDto: CreatePropertyListingDto, developerId: string) {
    if (createPropertyListingDto.images) {
      const imagesUrl = await this.fileService.uploadMultipleResources(createPropertyListingDto.images, { resource_type: 'image' })
      createPropertyListingDto.images = imagesUrl.map((image) => image.url);
    }

    if (createPropertyListingDto.videos) {
      const videosUrl = await this.fileService.uploadMultipleResources(createPropertyListingDto.videos, { resource_type: 'video' })
      createPropertyListingDto.videos = videosUrl.map((video) => video.url);
    }

    const newPropertyListingDto = { ...createPropertyListingDto, developer: developerId };

    const data = await this.propertyListingService.createPropertyListing(newPropertyListingDto);

    return {
      success: true,
      message: 'Property listing created successfully',
      data,
    };
  }

  async getPropertyListing(propertyListingId: string) {
    const data = await this.propertyListingService.getPropertyListing({ _id: propertyListingId });

    if (!data) {
      throw new NotFoundException('Property Listing not found');
    }

    return {
      success: true,
      message: 'Property Listing fetched successfully',
      data,
    };
  }

  async getDeveloperPropertyListing(developerId: string, propertyListingId: string) {
    const data = await this.propertyListingService.getPropertyListing({ _id: propertyListingId, developer: developerId });

    if (!data) {
      throw new NotFoundException('Property Listing not found');
    }

    return {
      success: true,
      message: 'Property Listing fetched successfully',
      data,
    };
  }

  async getPropertyListings(query: PropertyListingsDto) {
    const _query: FilterQuery<PropertyListingDocument> = {};
    const paginationQuery: Partial<PaginationQuery> = {};

    if (query.search) {
      const search = query.search.trim();
      const match = search.match(DEFAULT_MATCHERS.price);

      if (match) {
        const min = Number(match[1]) * 1_000_000;
        const max = Number(match[3]) * 1_000_000;

        _query.price = { $gte: min, $lte: max };

      } else {
        _query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { status: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { propertyType: { $regex: search, $options: 'i' } }
        ];

        if (!isNaN(Number(search))) {
          _query.$or.push(
            { price: Number(search) },
            { rating: Number(search) }
          );
        }
      }

      delete query.search;
    }

    if (query.priceRange) {
      const match = query.priceRange.match(DEFAULT_MATCHERS.price);

      if (match) {
        const min = Number(match[1]) * 1_000_000;
        const max = Number(match[3]) * 1_000_000;

        _query.price = { $gte: min, $lte: max };
      }

      delete query.priceRange;
    }

    if (query.propertyType) {
      _query.propertyType = query.propertyType;
      delete query.propertyType;
    }

    if (query.location) {
      _query.location = query.location;
      delete query.location;
    }

    if (query.bedrooms) {
      _query.bedrooms = query.bedrooms;
      delete query.bedrooms;
    }

    if (query.status) {
      _query.status = query.status;
    }

    if (query.limit) {
      paginationQuery.limit = query.limit;
      delete query.limit;
    }

    if (query.page) {
      paginationQuery.page = query.page;
      delete query.page;
    }

    const { data, page, count, totalPages } = await this.propertyListingService.getPropertyListings(
      _query,
      paginationQuery as PaginationQuery,
    );

    return {
      success: true,
      message: 'Property listings fetched successfully',
      data,
      meta: {
        page,
        count,
        totalPages,
      },
    };
  }

  async getPropertyListingsFilters() {
    const data = await this.propertyListingService.getPropertyListingsFilters();

    return {
      success: true,
      message: 'filters fetched successfully',
      data,
    };
  }

  async getDeveloperPropertyListings(developerId: string, query: GetPropertyListingsDto) {
    const _query: FilterQuery<PropertyListingDocument> = { developer: developerId };
    const paginationQuery: Partial<PaginationQuery> = {};

    if (query.search) {
      const search = query.search.trim();
      const match = search.match(DEFAULT_MATCHERS.price)

      if (match) {
        const min = Number(match[1]) * 1_000_000;
        const max = Number(match[3]) * 1_000_000;

        _query.price = { $gte: min, $lte: max };

      } else {
        _query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { status: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { propertyType: { $regex: search, $options: 'i' } }
        ];

        if (!isNaN(Number(search))) {
          _query.$or.push(
            { price: Number(search) },
            { rating: Number(search) }
          );
        }
      }

      delete query.search;
    }

    if (query.priceRange) {
      const match = query.priceRange.match(DEFAULT_MATCHERS.price);

      if (match) {
        const min = Number(match[1]) * 1_000_000;
        const max = Number(match[3]) * 1_000_000;

        _query.price = { $gte: min, $lte: max };
      }

      delete query.priceRange;
    }

    if (query.propertyType) {
      _query.propertyType = query.propertyType;
      delete query.propertyType;
    }

    if (query.location) {
      _query.location = query.location;
      delete query.location;
    }

    if (query.bedrooms) {
      _query.bedrooms = query.bedrooms;
      delete query.bedrooms;
    }

    if (query.limit) {
      paginationQuery.limit = query.limit;
      delete query.limit;
    }

    if (query.page) {
      paginationQuery.page = query.page;
      delete query.page;
    }

    const { data, page, count, totalPages } = await this.propertyListingService.getPropertyListings(
      _query,
      paginationQuery as PaginationQuery,
    );

    return {
      success: true,
      message: 'Property listings fetched successfully',
      data,
      meta: {
        page,
        count,
        totalPages,
      },
    };
  }

  async updatePropertyListing(propertyListingId: string, updatePropertyListingDto: UpdatePropertyListingDto) {
    if (updatePropertyListingDto.images) {
      const imagesUrl = await this.fileService.uploadMultipleResources(updatePropertyListingDto.images, { resource_type: 'image' })
      updatePropertyListingDto.images = imagesUrl.map((image) => image.url);
    }

    if (updatePropertyListingDto.videos) {
      const videosUrl = await this.fileService.uploadMultipleResources(updatePropertyListingDto.videos, { resource_type: 'video' })
      updatePropertyListingDto.videos = videosUrl.map((video) => video.url);
    }

    const data = await this.propertyListingService.updatePropertyListing(
      { _id: propertyListingId },
      updatePropertyListingDto,
    );

    if (!data) {
      throw new NotFoundException('Property listing not found');
    }

    return {
      success: true,
      message: 'Property listing updated successfully',
      data,
    };
  }

  async deletePropertyListing(propertyListingId: string) {
    const data = await this.propertyListingService.deletePropertyListing({ _id: propertyListingId });

    if (!data) {
      throw new NotFoundException('Property listing not found');
    }

    return {
      success: true,
      message: 'Property listing deleted',
    }
  }
}
