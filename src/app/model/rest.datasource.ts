import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Product } from './product.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export const REST_URL = new InjectionToken('rest_url');

@Injectable()
export class RestDataSource {

  constructor(private http: HttpClient, @Inject(REST_URL) private url: string) { }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
    .pipe(retry(2), catchError(this.handleError));
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product)
    .pipe(catchError(this.handleError));
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${product.id}`, product)
    .pipe(catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete(`${this.url}/${id}`)
    .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`
        Backend returned code ${error.status}, body was: ${error.error}
      `);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
