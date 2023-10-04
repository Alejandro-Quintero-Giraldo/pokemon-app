import { HttpErrorResponse, HttpEventType, HttpHeaders } from "@angular/common/http";

export const errorMock: HttpErrorResponse = {
  name: "HttpErrorResponse",
  message: "notFound",
  error: undefined,
  ok: false,
  status: 0,
  statusText: "",
  url: null,
  headers: new HttpHeaders,
  type: HttpEventType.ResponseHeader
}
