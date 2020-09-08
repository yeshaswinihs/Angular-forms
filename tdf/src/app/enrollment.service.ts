import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  _url = 'http://localhost:8080/submitUser';
  constructor(private _http: HttpClient) { }

  enroll(user: User) {
    return this._http.post<any>(this._url, user).pipe(catchError(this.errorHandler));
  }
  // catch the error in the service and throw the error to the component that has subscribed to the Service
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
