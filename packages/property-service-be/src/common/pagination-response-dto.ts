export class PaginationResponse {
  data:[];
  total: number;
  limit : number;
  offset : number;
  nextPage : number;

  public static getPageable(data, total, limit, offset) {
    const pageData = new PaginationResponse();
    pageData.data = data;
    pageData.limit = limit;
    pageData.offset = offset;
    pageData.total = total;
    pageData.nextPage = total > offset + limit ? offset + limit : null;

    return pageData;
  }
}