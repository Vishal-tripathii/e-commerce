  import { EventEmitter, Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http'
  import { SignUp, LogIn } from '../data-type';
  import { BehaviorSubject } from 'rxjs';
  import { Router } from '@angular/router';

  @Injectable({
    providedIn: 'root'
  })
  export class SellerService {

    isSellerLoggedIn = new BehaviorSubject<boolean>(false);
    isLoginError = new EventEmitter<boolean>(false);
    constructor(private http: HttpClient,
      private router: Router) { }
    userSignUp(data: SignUp) {
      //  return this.http.post("http://localhost:3000/seller", data)

      // this is auth guard part
      this.http.post("http://localhost:3000/seller",
        data,
        { observe: 'response' }).subscribe((result) => {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home'])
        });


    }
    userLogin(data: LogIn) {
      console.log(data, "api call for login seller");
      this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, 
      {observe: 'response'}).subscribe((result: any) => {
        console.log(result);
        if(result && result.body && result.body.length) {
          console.log("user-logged-in");
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home']);
          this.isLoginError.emit(false)
        }
        else {
          console.log("invalid-User");
          this.isLoginError.emit(true);
          
        }
      })
      
    }
    reloadSeller() {
      if(localStorage.getItem('seller')) {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home'])
      }
    }
    // getCurrentSeller(): any {
    //   const sellerData = localStorage.getItem('seller');
    //   return sellerData ? JSON.parse(sellerData) : null;
    // }

    

  }
