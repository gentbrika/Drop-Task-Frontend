import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  baseUrl:any = 'https://infinite-earth-74563.herokuapp.com/api/';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient) { }
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })
  
  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   let token = params['token'];
    //   console.log(token);

    //   if(token){
    //     localStorage.setItem('token', token)
    //     console.log('redirect');
    //     this.router.navigate(['main'])
    //   }
    //   else{
    //     this.router.navigate(['login'])
    //   }
    // });
    if(localStorage.getItem('token')){
      this.router.navigate(['/main'])
    }
  }

  onSubmit(){
    this.login();
  }

  login(){
    this.http.post<any>(this.baseUrl + 'login', this.loginForm.value).subscribe(res => {
      console.log(res);
      localStorage.setItem('token', res.token)
      this.router.navigate(['/main'])
    })
  }

}
