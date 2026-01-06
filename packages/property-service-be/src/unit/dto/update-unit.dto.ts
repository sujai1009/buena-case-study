import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUnitDto } from './create-unit.dto';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {
    @ApiProperty({ example: 1 })
    id: number;
}
