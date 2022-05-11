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
  data:any = [];

  todo:any = [];
  done:any = [];
  review:any = [];
  addNewTodo:any = false;
  newTask:any = '';

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(par => {
      this.id = par['id'];
    });
    this.getBoardById();
  }

  getBoardById(){
    // const headers = { 'Authorization': 'Bearer 6|PjhbgHkVuOigzlQOnZCPpQcIMqEyGRpqqFDGLkW5'}
    this.http.get<any>(this.baseUrl + `listings?board_id=${this.id}`).subscribe(res => {
      console.log(res[0].cards);
      
      this.todo = res[0].cards;
      this.done = res[1].cards;
      this.review = res[2].cards;
      this.data = res;
    })
  }
 
  // drop(event: CdkDragDrop<any[]>) {
  drop(event: any, status:any) {
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }


    let cardId = event.container.data[event.currentIndex].id;
    

    let id = event.container.id;
    id = id.split('-').slice(-1)[0];
    let previousId = event.previousContainer.id;
    previousId = previousId.split('-').slice(-1)[0];

    const formData = new FormData();
    formData.append('current_index', event.currentIndex);
    formData.append('current_listing_index', id);
    formData.append('previous_listing_index', previousId);



    // const headers = { 'Authorization': 'Bearer 6|PjhbgHkVuOigzlQOnZCPpQcIMqEyGRpqqFDGLkW5'}
    this.http.post<any>(this.baseUrl + `cards/${cardId}/move`, formData).subscribe(res => {
      console.log(res);
      this.getBoardById();
    })
  }

  addNew(){
    this.addNewTodo = true;
  }

  submitTask(listId:any){
    const formData = new FormData();
    formData.append('title', this.newTask);
    formData.append('listing_id', listId);

    // const headers = { 'Authorization': 'Bearer 6|PjhbgHkVuOigzlQOnZCPpQcIMqEyGRpqqFDGLkW5'}
    this.http.post<any>(this.baseUrl + 'cards', formData).subscribe(res => {
      console.log(res);
      this.getBoardById();
    })
  }

  


}
