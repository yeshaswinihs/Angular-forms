import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistartionService {
  _url = "http://localhost:8080/submitUser"
  constructor(private _http: HttpClient) { }

  register(userData) {
    return this._http.post<any>(this._url, userData).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
