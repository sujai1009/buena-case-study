import { IsOptional, IsPositive, Min } from "class-validator";
import { PaginationRequest } from "src/common/pagination-request-dto";

export class BuildingPageReq extends PaginationRequest {
  @IsOptional()
  propertyId?: number;
}