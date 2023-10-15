import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { ResourceLoader } from '@angular/compiler';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private product_srvc: ProductService) {}
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];
  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
         let sellerStore=localStorage.getItem('seller');
         let sellerData =sellerStore && JSON.parse(sellerStore)[0];
         this.sellerName=sellerData.name;
          this.menuType = 'seller';
        }
        else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';
        }
         else {
          this.menuType = 'default';
        }
      }
    });
  }

  sellerLogout() {
      localStorage.removeItem('seller');
      this.router.navigate(['/'])
    }
    userLogout() {
      localStorage.removeItem('user');
      this.router.navigate(['/user-auth'])
    }

    searchProduct(query: KeyboardEvent) {
      if(query) {
        const element = query.target as HTMLTextAreaElement; // this things gives us the entire html element
        this.product_srvc.searchProducts(element.value).subscribe((result) => { //element.value will give whaterver we type
          this.searchResult = result;
          
        });
      }
    }

    hideSearch() {
      this.searchResult = undefined;
    }

    searchSubmit(queryData: any) {       
      this.router.navigate([`search/${queryData}`]);
      
    }
    redirectToDetail(id: number) {
      console.log("touched");
      
      this.router.navigate(['/product-details/'+id])
    }
}
