import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { SignUp, LogIn } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  showLogin: boolean = false;
  authError: string = '';
  constructor(private seller_srvc: SellerService, private router: Router) {}
  ngOnInit(): void {
    this.seller_srvc.reloadSeller();
  }
  togglePage() {
    this.showLogin = !this.showLogin;

  }
  signup(data: SignUp) {
    this.seller_srvc.userSignUp(data);
  }
  login(data: SignUp) {
    // console.log(data);
    this.seller_srvc.userLogin(data);
    this.seller_srvc.isLoginError.subscribe((isError)=> {
      if(isError) {
        this.authError = 'Incorrect Email or Password';
      }
    })
   
  }

}
