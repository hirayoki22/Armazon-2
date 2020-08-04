import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL1  = 'http://127.0.0.1/market-api/user-login.php';
  private URL2 = 'http://127.0.0.1/market-api/user-signup.php';
  private URL3 = 'http://127.0.0.1/market-api/user-logout.php';
  private URL4 = 'http://127.0.0.1/market-api/user-auth.php';

  constructor(private http: HttpClient) { }

  loginRequest(form: FormData): Observable<any> {
    return this.http.post<any>(this.URL1, form).pipe(
      tap(res => console.log(res)),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(err: HttpErrorResponse) {
    let error = '';

    if (err.error instanceof ErrorEvent) {
      error = err.error.message;
    } else {
      error = err.error;
    }
    return throwError(error);
  }

}
