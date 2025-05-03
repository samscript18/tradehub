import { PartialType } from '@nestjs/swagger';
import { CreatePropertyListingDto } from './create-listing.dto';

export class UpdatePropertyListingDto extends PartialType(CreatePropertyListingDto) {}
