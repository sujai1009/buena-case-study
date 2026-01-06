import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BuildingPageReq } from './dto/building-page-request-dto';

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
  findAll(@Query() buildingPage: BuildingPageReq) {
    return this.buildingService.findAll(buildingPage);
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
  @ApiBody({ type: UpdateBuildingDto })
  update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    return this.buildingService.update(+id, updateBuildingDto);
  }

  @Put()
  @ApiOperation({ summary: 'update all building details' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: UpdateBuildingDto })
  updateMany(@Body() updateBuildingDtos: UpdateBuildingDto[]) {
    return this.buildingService.updateMany(updateBuildingDtos);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete building by id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    console.log("Deleted sucessfully")
    return this.buildingService.remove(+id);
  }
}
