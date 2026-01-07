import { IsOptional } from "class-validator";
import { PaginationRequest } from "src/common/pagination-request-dto";

export class PropertyPageReq extends PaginationRequest {
  @IsOptional()
  type?: string;
}