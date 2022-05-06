import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  baseUrl:any = 'https://infinite-earth-74563.herokuapp.com/api/';
  user:any = [];
  boards:any = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
      this.getUser(); 
      this.getBoards();
  }

  getUser(){
    const headers = { 'Authorization': 'Bearer 5|H8r523xWLTOgM6Cd0bOGaa12ciY1xAOUM9aS3PHC'}
    this.http.get<any>(this.baseUrl + 'user', {headers}).subscribe(res => {
      this.user = res;
    })  
  }

  getBoards(){
    const headers = { 'Authorization': 'Bearer 5|H8r523xWLTOgM6Cd0bOGaa12ciY1xAOUM9aS3PHC'}
    this.http.get<any>(this.baseUrl + 'boards', {headers}).subscribe(res => {
      this.boards = res.data;
    })
  }

  goToBoard(bd:any){
   console.log(bd);  
   this.router.navigate(['board/' + bd])
  }

}
