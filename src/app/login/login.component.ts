import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  baseUrl:any = 'https://infinite-earth-74563.herokuapp.com/api/';
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient,  private _snackBar: MatSnackBar) { }

  
  ngOnInit(): void {
    // if(localStorage.getItem('token')){
    //   this.router.navigate(['/main'])
    // }
    let token = localStorage.getItem('token')
    if(token){
      this.router.navigate(['/main']);
    }
  }

  onSubmit(){
    this.login();
  }

  login(){
    this.http.post<any>(this.baseUrl + 'login', this.loginForm.value).subscribe(res => {
      localStorage.setItem('token', res.token)
      this.router.navigate(['/main'])
    }, error => {
      this._snackBar.open(error.error.error, 'X', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      setTimeout(() => {
        this._snackBar.dismiss();
      }, 5000);
    })
  }

}
