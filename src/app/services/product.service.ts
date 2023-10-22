import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-type';
import { NumberSymbol } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductService {   
  cartData = new EventEmitter<product[] | []>(); //creting this for dynamic update

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

   localAddToCart(data: product) {
    let cartData = []; // this is array containing list of items
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      // this.cartData.emit([data]);  
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData); //this data is emitted

  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
}
