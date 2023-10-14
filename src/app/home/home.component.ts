import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private product_srvc: ProductService) { }
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];
  ngOnInit(): void {
    this.product_srvc.popularProducts().subscribe((PopularResult) => {
      console.log(PopularResult, "popular");
      this.popularProducts = PopularResult;
    });

    this.product_srvc.trendyProducts().subscribe((trendyResult) => {
      this.trendyProducts = trendyResult;
    });
  }
}
