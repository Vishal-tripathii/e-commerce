import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SellerService } from './services/seller.service';
import { Observable } from 'rxjs';

@Injectable()
export class authGuard implements CanActivate {
  constructor(private seller_srvc: SellerService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Retrieve the SellerService from the injector
    // const seller_srvc = this.injector.get(SellerService);
    if(localStorage.getItem('seller')) {
      return true;
    }
    // Now you can use the seller_srvc to check if the seller is logged in
    return this.seller_srvc.isSellerLoggedIn;
  }
  
}