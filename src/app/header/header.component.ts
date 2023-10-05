import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {}
  menuType: string = 'default';
  sellerName: string = '';
  ngOnInit() {
    this.router.events.subscribe((val: any) => {
     if(val.url) {
      if(localStorage.getItem('seller') && val.url.includes('seller')) {
        this.menuType = 'seller';
        if(localStorage.getItem('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          console.log(this.sellerName);
              
        }
      }
      else {
        this.menuType = 'default'
      }
     }
    });
  }

    logout() {
      localStorage.removeItem('seller');
      this.router.navigate(['/'])
    }
}
