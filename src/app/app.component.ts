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
    let token = localStorage.getItem('token')
    if(token){
      this.router.navigate(['/main']);
    }
    else{
      this.router.navigate(['/login'])
    }
  }
}
