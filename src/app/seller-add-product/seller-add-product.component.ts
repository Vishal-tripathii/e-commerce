import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private product_srvc: ProductService) {}
  ngOnInit(): void {

  }
  submit(data: product) {
    this.product_srvc.addProduct(data).subscribe((result: any) => {
      console.warn(result, "result");
      if(result) {
        this.addProductMessage = 'Product Added Sucessfully'
      }
      setTimeout(() => (this.addProductMessage = undefined), 2000)
    });
  }
  clearInputs() {
    
  }

}
