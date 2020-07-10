import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, of, throwError } from 'rxjs';
import { delay, map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private URL = 'http://127.0.0.1/market-api/shopping-cart.php';

  constructor(private http: HttpClient) { }
}
