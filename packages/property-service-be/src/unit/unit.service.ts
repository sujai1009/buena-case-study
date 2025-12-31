import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unit } from './entities/unit.entity';
import { Building } from 'src/building/entities/building.entity';
import { BuildingService } from 'src/building/building.service';
import { PaginationRequest } from 'src/common/pagination-request-dto';
import { PaginationResponse } from 'src/common/pagination-response-dto';

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
    await this.unitRepository.save(unit);

    return unit;
  }

  async createMany(totalUnits: number, building: Building): Promise<Unit[]> {
    let units = [] as Unit[];
    for(var i=0; i< totalUnits; i++) {
      units.push(await this.unitRepository.create({ building }));
    }

    await this.unitRepository.save(units);
    return units;
  }

  async findAll(paginationRequest: PaginationRequest) : Promise<PaginationResponse> {
    const { limit = 10, offset = 0 } = paginationRequest;

    const [units, total] = await this.unitRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return PaginationResponse.getPageable(units, total, limit, offset);
  }

  findOne(id: number) {
    return this.unitRepository.findOneBy({id});
  }

  update(id: number, updateUnitDto: UpdateUnitDto) {
    return `This action updates a #${id} unit`;
  }

  async remove(id: number): Promise<void> {
    await this.unitRepository.delete(id);
  }
}
