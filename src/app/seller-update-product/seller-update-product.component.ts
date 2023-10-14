import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: product | undefined;
  productUpdateMessage: string | undefined;
  constructor(private route: ActivatedRoute, private router: Router, private product_srvc: ProductService) {}
  ngOnInit(): void {
    let productId: any = this.route.snapshot.paramMap.get('id');
    console.log(productId, "selected Id");
    this.product_srvc.getProduct(productId)
    productId && this.product_srvc.getProduct(productId).subscribe((result) => { // this is just checking the null is there or not
      console.log(result, "result");
      this.productData = result;
      console.log(this.productData, "product-Data"); // storing the current data in this
    })
  }

  submit(data: any) { 
    data.id = this.productData?.id;
    console.log(data);
    this.product_srvc.updateProduct(data).subscribe((result) => {
      
      this.productUpdateMessage = "product Updated Sucessfully"
    });
    setTimeout(() => (this.productUpdateMessage = undefined, this.router.navigate(['seller-home'])), 2000)

  }

}
