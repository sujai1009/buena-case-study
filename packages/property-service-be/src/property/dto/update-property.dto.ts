import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
    @ApiProperty({ example: 1 })
    id: number;
}
