import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  currentSeller: any;
  productList: undefined | product[];
  deleteProductMessage: string | undefined;
  constructor(private product_srvc: ProductService) {}
  ngOnInit(): void {
    this.updateList();
  }

  deleteProduct(id: number) {
    console.log(id);
    this.product_srvc.deleteList(id).subscribe((result) => {
      if(result) {
        this.deleteProductMessage = 'product deleted sucessfully';
        this.updateList(); // put directly after deleting the product
      }
      setTimeout(() => (this.deleteProductMessage = undefined), 2000)
    })
    
  }
  updateList() {
    this.product_srvc.productList().subscribe((result) => {
      if(result) {
        this.productList = result;  
      }
    })
  }

  


}
