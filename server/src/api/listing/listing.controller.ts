import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreatePropertyListingDto } from './dto/create-listing.dto';
import { UpdatePropertyListingDto } from './dto/update-listing.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleNames } from '../user/enums';
import { Auth, IsPublic, Roles } from 'src/shared/decorators/auth.decorators';
import { PropertyListingProvider } from './listing.provider';
import { GetPropertyListingsDto } from './dto/get-listings-dto';
import { PropertyListingStatus } from './enums/listing.enums';

@Controller('listing')
@ApiTags('Listing')
export class PropertyListingController {
  constructor(private readonly propertyListingProvider: PropertyListingProvider) { }

  @Post()
  @Roles([RoleNames.DEVELOPER])
  @ApiOperation({ summary: 'Create/Upload property listing' })
  @ApiBearerAuth()
  createPropertyListing(@Auth('_id') developerId: string, @Body() createPropertyListingDto: CreatePropertyListingDto) {
    return this.propertyListingProvider.createPropertyListing(createPropertyListingDto, developerId);
  }

  @Get()
  @IsPublic()
  @ApiOperation({ summary: 'Get property listings' })
  getPropertyListings(@Query() query: GetPropertyListingsDto) {
    const newQuery = { ...query, status: PropertyListingStatus.APPROVED }
    return this.propertyListingProvider.getPropertyListings(newQuery);
  }

  @Get('filters')
  @IsPublic()
  @ApiOperation({ summary: 'Get property listings filters' })
  getPropertyListingsFilters() {
    return this.propertyListingProvider.getPropertyListingsFilters();
  }

  @Get('/user')
  @ApiOperation({ summary: 'Get property listings for authenticated users' })
  @ApiBearerAuth()
  getUserPropertyListings(@Query() query: GetPropertyListingsDto) {
    const newQuery = { ...query, status: PropertyListingStatus.APPROVED }
    return this.propertyListingProvider.getPropertyListings(newQuery);
  }

  @Get('developer')
  @Roles([RoleNames.DEVELOPER])
  @ApiOperation({ summary: 'Get developer property listings' })
  @ApiBearerAuth()
  getDeveloperPropertyListings(@Auth('_id') developerId: string, @Query() query: GetPropertyListingsDto) {
    return this.propertyListingProvider.getDeveloperPropertyListings(developerId, query);
  }

  @Get(':listingId')
  @ApiOperation({ summary: 'Get property listing' })
  @ApiBearerAuth()
  getPropertyListing(@Param('listingId') listingId: string) {
    return this.propertyListingProvider.getPropertyListing(listingId);
  }

  @Get('/:listingId/developer')
  @Roles([RoleNames.DEVELOPER])
  @ApiOperation({ summary: 'Get developer property listing' })
  @ApiBearerAuth()
  getDeveloperPropertyListing(@Auth('_id') developerId: string, @Param('listingId') listingId: string) {
    return this.propertyListingProvider.getDeveloperPropertyListing(developerId, listingId);
  }

  @Patch(':listingId')
  @Roles([RoleNames.DEVELOPER])
  @ApiOperation({ summary: 'Update property listing' })
  @ApiBearerAuth()
  updatePropertyListing(@Param('listingId') listingId: string, @Body() updateListingDto: UpdatePropertyListingDto) {
    return this.propertyListingProvider.updatePropertyListing(listingId, updateListingDto);
  }

  @Delete(':listingId')
  @Roles([RoleNames.DEVELOPER])
  @ApiOperation({ summary: 'Delete property listing' })
  @ApiBearerAuth()
  deletePropertyListing(@Param('listingId') listingId: string) {
    return this.propertyListingProvider.deletePropertyListing(listingId);
  }
}
