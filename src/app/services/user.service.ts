import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { LogIn, SignUp } from '../data-type';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }
  isLoginError = new EventEmitter<boolean>(false);

  ngOnInit(): void {
  }
  userSignUp(user: SignUp) {
    console.warn(user);
    this.http.post("http://localhost:3000/users", user, {observe: 'response'}).subscribe((result) => {
      console.log(result);
      if(result) {
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/'])
      }
      
    })
    
  }
  userLogin(data: LogIn) {
    this.http.get<LogIn[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe: 'response'}).subscribe((result) => {
      if(result && result.body && result.body.length) { // here remember, the result mighht have a body with 0 length, so make sure u put the third condition as well so that only registered user may login
        localStorage.setItem('user', JSON.stringify(result.body[0])); // here body could be null so we add to the if condition for body
        this.router.navigate(['/']);
        this.isLoginError.emit(false)
      }
      else {
        console.log("invalid-User");
        this.isLoginError.emit(true);
      }
    })
  }
  userAuthReload() {
    if(localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }
}
