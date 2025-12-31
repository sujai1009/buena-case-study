"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationResponse = void 0;
class PaginationResponse {
    data;
    total;
    limit;
    offset;
    nextPage;
    static getPageable(data, total, limit, offset) {
        const pageData = new PaginationResponse();
        pageData.data = data;
        pageData.limit = limit;
        pageData.offset = offset;
        pageData.total = total;
        pageData.nextPage = total > offset + limit ? offset + limit : null;
        return pageData;
    }
}
exports.PaginationResponse = PaginationResponse;
//# sourceMappingURL=pagination-response-dto.js.map