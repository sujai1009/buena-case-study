import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Logger } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PropertyPageReq } from './dto/property-page-request-dto';

@Controller('p')
export class PropertyController {
  private readonly logger = new Logger(PropertyController.name);

  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @ApiOperation({ summary: 'Create new property' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'The property has been successfully created.'})
  @ApiBody({ type: CreatePropertyDto })
  create(@Body() createPropertyDto: CreatePropertyDto) {
    this.logger.log("create", createPropertyDto);
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all properties' })
  @ApiResponse({ status: 201, description: 'Return pageable property data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(@Query() paginationRequest: PropertyPageReq) {
    this.logger.log("findAll", paginationRequest);
    return this.propertyService.findAll(paginationRequest);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find property with given Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'List property by id'})
  findOne(@Param('id') id: number) {
    this.logger.log("findOne ", id);
    return this.propertyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update the property' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'Update the property with new details'})
  @ApiBody({ type: UpdatePropertyDto })
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    this.logger.log("update ", updatePropertyDto);
    return this.propertyService.update(+id, updatePropertyDto);
  }

  @Put()
  @ApiOperation({ summary: 'Update multiple properties' })
  @ApiResponse({ status: 201, description: 'Return updated properties data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: [UpdatePropertyDto] })
  updateMany(@Body() updatePropertyDtos: UpdatePropertyDto[]) {
    this.logger.log("updateMany ", updatePropertyDtos);
    return this.propertyService.updateMany(updatePropertyDtos);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the property' })
  @ApiResponse({ status: 201, description: 'Delete the property'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    this.logger.log("remove ", id);
    return this.propertyService.remove(+id);
  }
}
