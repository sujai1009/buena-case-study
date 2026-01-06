import { IsOptional, IsPositive, Min } from "class-validator";
import { PaginationRequest } from "src/common/pagination-request-dto";

export class UnitPageReq extends PaginationRequest {
  @IsOptional()
  buildingId?: number;
}