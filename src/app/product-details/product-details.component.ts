import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private product_srvc: ProductService) {}
  getProductId: undefined | product;
  productQuantity: number = 1; // one should be starting
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId'); // put here same which u defined in routing
    console.log(productId);
   productId && this.product_srvc.getProduct(productId).subscribe((result) => {
    this.getProductId = result;
   });
    
  }

  handleQuantity(value: any) {
    if(this.productQuantity < 20 && value == 'plus') {
      this.productQuantity += 1;
    }
    else if(this.productQuantity > 1 && value == 'minus') {
      this.productQuantity -= 1;
    }
  }

}
