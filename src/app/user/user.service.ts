import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError, delay } from 'rxjs/operators';

export interface LoginState { success: boolean; message?: string }

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: '2454789645'
  }),
  withCredentials: true,
  // observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL1 = 'http://127.0.0.1/market-api/user-login.php';
  private URL2 = 'http://127.0.0.1/market-api/user-signup.php';
  private URL3 = 'http://127.0.0.1/market-api/user-logout.php';
  private URL4 = 'http://127.0.0.1/market-api/user-auth.php';

  constructor(private http: HttpClient) { }

  loginRequest(form: FormData): Observable<LoginState> {
    return this.http.post<LoginState>(
      this.URL1, 
      form,
      httpOptions
    ).pipe(
      delay(400),
      tap(res => console.log(res)),
      catchError(this.errorHandler)
    );
  }

  verifyLoginState(): Observable<boolean> {
    return new Observable<boolean>(subscriber => {
      this.http.get<{ active: boolean }>(this.URL4).pipe(
        delay(300),
        catchError(this.errorHandler)
      ).subscribe(res => {
        if (res.active) { subscriber.next(false); }
        else { subscriber.next(true); }
      })
    });
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
