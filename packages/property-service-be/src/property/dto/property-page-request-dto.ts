import { IsEnum, IsOptional, IsPositive, Min } from "class-validator";
import { Transform } from "class-transformer";
import { PaginationRequest } from "src/common/pagination-request-dto";
import { PropertyType } from "../entities/property.type";

export class PropertyPageReq extends PaginationRequest {
  @IsOptional()
  type?: string;
}