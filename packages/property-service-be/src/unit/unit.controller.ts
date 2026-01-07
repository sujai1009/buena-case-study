import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UnitService } from './unit.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { ApiBody, ApiExtraModels, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UnitPageReq } from './dto/unit-page-request-dto';

@Controller('u')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @ApiOperation({ summary: 'Create new unit' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: CreateUnitDto })
  create(@Body() createUnitDto: CreateUnitDto) {
    return this.unitService.create(createUnitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all units' })
  @ApiResponse({ status: 201, description: 'Return pageable units data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(@Query() paginationRequest: UnitPageReq) {
    return this.unitService.findAll(paginationRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update unit by id' })
  @ApiResponse({ status: 201, description: 'Return updated unit data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateUnitDto) {
    return this.unitService.update(+id, updateUnitDto);
  }

  @Put()
  @ApiOperation({ summary: 'Update multiple units' })
  @ApiResponse({ status: 201, description: 'Return updated units data' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({ type: [UpdateUnitDto] })
  updateMany(@Body() updateUnitDtos: UpdateUnitDto[]) {
    return this.unitService.updateMany(updateUnitDtos);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
        console.log("In unit delete::", id)
    return this.unitService.remove(+id);
  }
}