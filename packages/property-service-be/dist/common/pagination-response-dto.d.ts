export declare class PaginationResponse {
    data: [];
    total: number;
    limit: number;
    offset: number;
    nextPage: number;
    static getPageable(data: any, total: any, limit: any, offset: any): PaginationResponse;
}
