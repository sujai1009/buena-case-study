import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Logger } from '@nestjs/common';
import { BuildingService } from './building.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BuildingPageReq } from './dto/building-page-request-dto';

@Controller('b')
export class BuildingController {
  private readonly logger = new Logger(BuildingController.name);

  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  @ApiOperation({ summary: 'Create new building' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateBuildingDto })
  create(@Body() createBuildingDto: CreateBuildingDto) {
    this.logger.log("create=", createBuildingDto);
    return this.buildingService.create(createBuildingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all buildings with pagination' })
  @ApiResponse({ status: 201, description: 'Return pageable builing data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(@Query() buildingPage: BuildingPageReq) {
    this.logger.log("findAll=", buildingPage);
    return this.buildingService.findAll(buildingPage);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find building bby id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateBuildingDto })
  findOne(@Param('id') id: string) {
    this.logger.log("findOne=", id);
    return this.buildingService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'update building details' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: UpdateBuildingDto })
  update(@Param('id') id: string, @Body() updateBuildingDto: UpdateBuildingDto) {
    this.logger.log("update=", updateBuildingDto);
    return this.buildingService.update(+id, updateBuildingDto);
  }

  @Put()
  @ApiOperation({ summary: 'update all building details' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: UpdateBuildingDto })
  updateMany(@Body() updateBuildingDtos: UpdateBuildingDto[]) {
    this.logger.log("updateMany=", updateBuildingDtos);
    return this.buildingService.updateMany(updateBuildingDtos);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete building by id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  remove(@Param('id') id: string) {
    this.logger.log("remove=", id);
    return this.buildingService.remove(+id);
  }
}
