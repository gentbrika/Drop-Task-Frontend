import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-board-detilas',
  templateUrl: './board-detilas.component.html',
  styleUrls: ['./board-detilas.component.scss']
})
export class BoardDetilasComponent implements OnInit {
  baseUrl:any = 'https://infinite-earth-74563.herokuapp.com/api/';
  id:any = '';
  todo:any = [];
  done:any = [];
  inProgress:any = [];
  // data:any = [];

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(par => {
      this.id = par['id'];
    });
    this.getBoardById();
  }

  getBoardById(){
    const headers = { 'Authorization': 'Bearer 5|H8r523xWLTOgM6Cd0bOGaa12ciY1xAOUM9aS3PHC'}
    this.http.get<any>(this.baseUrl + `listings?board_id=${this.id}`, {headers}).subscribe(res => {
      this.todo = res[0].cards;
      this.done = res[1].cards;
      this.inProgress = res[2].cards;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event);
      
    } else {
      console.log(event);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


}
