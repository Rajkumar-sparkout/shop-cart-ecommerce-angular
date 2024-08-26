import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public apiUrl = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) { }

  /**
   * create product
   * @param product 
   */
  createProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}/products` , product);
  }

  /**
   * get all products
   * @returns product
   */
  getAllProducts(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/products`);
  }

  /**
   * get product by id
   * @param id 
   * @returns product
   */
  getProductById(id: string): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/products?id=${id}`);
  }

  /**
   * update product
   * @param id 
   * @param params 
   */
  updateProductById(id: string, params: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/products/${id}`,params);
  }

  /**
  * delete the product
  * @param id
  */
  deleteProductById(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

    /**
   * get product by id
   * @param id 
   * @returns product
   */
    getProductByCategory(category: string): Observable<Product[]>{
      return this.http.get<Product[]>(`${this.apiUrl}/products?category=${category}`);
    }


    updateProductRating(id: string, params: any): Observable<any> {
      return this.http.patch(`${this.apiUrl}/products?id=${id}`,params);
    }
}
