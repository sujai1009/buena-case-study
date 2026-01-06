import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginationRequest } from 'src/common/pagination-request-dto';
import { PropertyPageReq } from './dto/property-page-request-dto';

@Controller('p')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  @ApiOperation({ summary: 'Create new property' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'The property has been successfully created.'})
  @ApiBody({ type: CreatePropertyDto })
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertyService.create(createPropertyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all properties' })
  @ApiResponse({ status: 201, description: 'Return pageable property data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(@Query() paginationRequest: PropertyPageReq) {
    return this.propertyService.findAll(paginationRequest);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find property with given Id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'List property by id'})
  findOne(@Param('id') id: number) {
    return this.propertyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update the property' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'Update the property with new details'})
  @ApiBody({ type: UpdatePropertyDto })
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertyService.update(+id, updatePropertyDto);
  }

  @Put()
  @ApiOperation({ summary: 'Update multiple properties' })
  @ApiResponse({ status: 201, description: 'Return updated properties data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: [UpdatePropertyDto] })
  updateMany(@Body() updatePropertyDtos: UpdatePropertyDto[]) {
    return this.propertyService.updateMany(updatePropertyDtos);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete the property' })
  @ApiResponse({ status: 201, description: 'Delete the property'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    return this.propertyService.remove(+id);
  }
}
