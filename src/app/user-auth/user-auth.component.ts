import { Component, OnInit } from '@angular/core';
import { LogIn, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError: string = '';
  constructor(private user_srvc: UserService) {}
  ngOnInit(): void {
    this.user_srvc.userAuthReload();
  }
  signUp(data: SignUp) {
    this.user_srvc.userSignUp(data);     
  }
  login(data: LogIn) {
    console.warn(data, "data");
    this.user_srvc.userLogin(data); // calling the API 
    this.user_srvc.isLoginError.subscribe((isError) => {
      if(isError) {
        this.authError = 'Incorrect email or password'
      }
    })
    
  }
  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

}
