import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

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
  }

}
