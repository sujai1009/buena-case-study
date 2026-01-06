import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBuildingDto } from './create-building.dto';

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {
    @ApiProperty({example : 1})
    id: number;
}