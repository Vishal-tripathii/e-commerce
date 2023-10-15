import { Injectable, OnInit } from '@angular/core';
import { SignUp } from '../data-type';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
  }
  userSignUp(user: SignUp) {
    console.warn(user, "servic file called");
     this.http.post("http://localhost:3000/users", user, {observe:'response'}).subscribe((result) => {
      console.log(result, "result from servic");
      if(result) {
        localStorage.setItem('user', JSON.stringify(result));
        this.router.navigate(['/']);
      }
    })
  }
  userAuthReload() {
    if(localStorage.getItem('user')) {
      this.router.navigate(['/'])
    }
  }
}
