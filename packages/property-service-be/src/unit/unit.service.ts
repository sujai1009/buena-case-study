import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { Building } from 'src/building/entities/building.entity';
import { BuildingService } from 'src/building/building.service';
import { PaginationRequest } from 'src/common/pagination-request-dto';
import { PaginationResponse } from 'src/common/pagination-response-dto';
import { UnitType } from './entities/unit.type';
import { UnitStatus } from './entities/unit.status';
import { UnitPageReq } from './dto/unit-page-request-dto';

@Injectable()
export class UnitService {

  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
    @Inject(forwardRef(() => BuildingService)) private readonly buildingService: BuildingService,
  ) {}

  async create(createUnitDto: CreateUnitDto) {
    if (!createUnitDto.buildingId) {
      return "Unit cannot be saved as Building info is null";
    }

    const building = await this.buildingService.findOne(createUnitDto.buildingId);
    if (!building) {
      return "Building cannot be saved as Property info is null";
    }
    
    //const unit = new Unit();
    const unit = this.unitRepository.create(createUnitDto);
    unit.status = UnitStatus.CREATED;
    unit.building = building;

    await this.unitRepository.save(unit);

    return await this.findOne(unit.id);
  }

  async createMany(totalUnits: number, building: Building): Promise<Unit[]> {
    let units = [] as Unit[];
    for(var i=0; i< totalUnits; i++) {
      const type = UnitType.TEMP_TYPE;
      const status = UnitStatus.CREATED;
      units.push(await this.unitRepository.create({ status, type, building }));
    }

    await this.unitRepository.save(units);
    return units;
  }

  async findAll(paginationRequest: UnitPageReq) : Promise<PaginationResponse> {
    const { limit = 10, offset = 0 } = paginationRequest;

    // const [units, total] = await this.unitRepository.findAndCount({
    //   take: limit,
    //   skip: offset,
    // });

    console.log("In Unit Service", paginationRequest);

    const [units, total] = await this.unitRepository.findAndCount({
      relations: {
          building: true,
      },
      where: {
          building: {
              id: paginationRequest.buildingId,
          },
      },
      take: limit,
      skip: offset,
    });

    return PaginationResponse.getPageable(units, total, limit, offset);
  }

  findOne(id: number) {
    return this.unitRepository.findOneBy({id});
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOne(id);
    if ( !unit) {
      return "No unit with id found"; // Throw exception later
    }
    Object.assign(unit, updateUnitDto);
    await this.unitRepository.save(unit);
    return await this.findOne(id);
  }

  async updateMany(updateUnitDtos: UpdateUnitDto[]) {
    console.log("in updateMany")
    const ids = updateUnitDtos.map(d => d.id);
    const units = await this.unitRepository.findBy({ id: In(ids) });
    const map = new Map(updateUnitDtos.map(d => [d.id, d]));

    for (let u of units) {
      Object.assign(u, map.get(u.id));
    }

    await this.unitRepository.save(units);
    return await this.unitRepository.findBy({
      id : In(ids)
    });
  }

  async remove(id: number): Promise<void> {
    await this.unitRepository.delete(id);
  }
}
