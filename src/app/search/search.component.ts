import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private route: ActivatedRoute, private product_srvc: ProductService) {}

  searchResult: product[] = []; // Initialize as an empty array
  searchProductNotFound: undefined | string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const query = paramMap.get('query');
      if (query) {
        this.product_srvc.searchProducts(query).subscribe((result) => {
          this.searchResult = result;
        });
      } else {
        this.searchProductNotFound = 'Not found'
        this.searchResult = []; // Clear the results when the query is empty or undefined
      }
    });
  }
}
