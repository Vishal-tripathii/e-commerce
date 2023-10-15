import { Component, OnInit } from '@angular/core';
import { SignUp } from '../data-type';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  constructor(private user_srvc: UserService) {}
  ngOnInit(): void {
    this.user_srvc.userAuthReload(); 
  }
  signUp(data: SignUp) {
    this.user_srvc.userSignUp(data);
      // console.log(data, "resultData");
  }

}
