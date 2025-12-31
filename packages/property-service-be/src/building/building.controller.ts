import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaginationRequest } from 'src/common/pagination-request-dto';

@Controller('b')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  @ApiOperation({ summary: 'Create new building' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateBuildingDto })
  create(@Body() createBuildingDto: CreateBuildingDto) {
    return this.buildingService.create(createBuildingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all buildings with pagination' })
  @ApiResponse({ status: 201, description: 'Return pageable builing data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(@Query() paginationRequest: PaginationRequest) {
    return this.buildingService.findAll(paginationRequest);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find building bby id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateBuildingDto })
  findOne(@Param('id') id: string) {
    return this.buildingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update building details' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateBuildingDto })
  update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    return this.buildingService.update(+id, updateBuildingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete building by id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateBuildingDto })
  remove(@Param('id') id: string) {
    return this.buildingService.remove(+id);
  }
}
