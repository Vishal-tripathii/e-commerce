import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';
import { NumberSymbol } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    console.warn("add-product-service Called");// now we will call service
     return this.http.post("http://localhost:3000/products", data); 
  }

  productList() {
   return this.http.get<product[]>('http://localhost:3000/products'); // well call this servic in seller home
   // here get api is of product type array so we have to mention it
  }
   deleteList(id: Number) {
    return this.http.delete<product[]>(`http://localhost:3000/products/${id}`) // this is to delelre the product dynamically
   }

   getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`) // we are getting single product so avoid using [] in get type
   }

   updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product)
   }

   popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=4'); 
   }

   trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=18'); 

   }

   searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
   }
}
