import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Logger } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnitPageReq } from './dto/unit-page-request-dto';

@Controller('u')
export class UnitController {
  private readonly logger = new Logger(UnitController.name);

  constructor(private readonly unitService: UnitService) {}

  @Post()
  @ApiOperation({ summary: 'Create new unit' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateUnitDto })
  create(@Body() createUnitDto: CreateUnitDto) {
    this.logger.log("create", )
    return this.unitService.create(createUnitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all units' })
  @ApiResponse({ status: 201, description: 'Return pageable units data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(@Query() paginationRequest: UnitPageReq) {
    this.logger.log("findAll", paginationRequest);
    return this.unitService.findAll(paginationRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log("findOne", id)
    return this.unitService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update unit by id' })
  @ApiResponse({ status: 201, description: 'Return updated unit data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    this.logger.log("update", id, updateUnitDto)
    return this.unitService.update(+id, updateUnitDto);
  }

  @Put()
  @ApiOperation({ summary: 'Update multiple units' })
  @ApiResponse({ status: 201, description: 'Return updated units data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: [UpdateUnitDto] })
  updateMany(@Body() updateUnitDtos: UpdateUnitDto[]) {
    this.logger.log("updateMany", updateUnitDtos)
    return this.unitService.updateMany(updateUnitDtos);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log("remove", id)
    return this.unitService.remove(+id);
  }
}