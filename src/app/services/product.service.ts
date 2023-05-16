import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000'; // Your API endpoint here

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.baseUrl}/products`, { headers, withCredentials: true });
  }

  getSingleProduct(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.baseUrl}/products/${id}`, { headers, withCredentials: true });
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product, { withCredentials: true});
  }

  editProduct(product:any,id:any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product, { withCredentials: true});
  }

}
