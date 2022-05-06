import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drag-drop';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params['token'];
      console.log(token);

      if(token){
        localStorage.setItem('token', token)
        console.log('redirect');
        this.router.navigate(['main'])
      }
      else{
        // this.router.navigate(['login'])
      }
  });
  }
}
