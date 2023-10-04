import { HttpErrorResponse } from "@angular/common/http";

export interface FieldsState<T> {
  loading: boolean,
  error: HttpErrorResponse | null,
  data: T
}
