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
  addNewTodo:any = false;
  newTask:any = '';
  projectLists: any = [];


  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(par => {
      this.id = par['id'];
    });    
    this.getBoardById();
  }


  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    let cardId = event.container.data[event.currentIndex].id;
    

    let id = event.container.id;
    console.log(id);
    
    id = id.split('-').slice(-1)[0];
    let previousId = event.previousContainer.id;
    previousId = previousId.split('-').slice(-1)[0];
    console.log(event);
    

    const formData = new FormData();
    formData.append('current_index', event.currentIndex);
    formData.append('current_listing_index', id);
    formData.append('previous_listing_index', previousId);



    this.http.post<any>(this.baseUrl + `cards/${cardId}/move`, formData).subscribe(res => {
      this.getBoardById();
    })
  }

  getBoardById(){
    this.http.get<any>(this.baseUrl + `listings?board_id=${this.id}`).subscribe(res => {
      this.data = res;
      console.log(this.data);
    })
  }


  addNew(li:any){
    this.addNewTodo = true;
  }

  submitTask(listId:any){
    console.log(listId);
    const formData = new FormData();
    formData.append('title', this.newTask);
    formData.append('listing_id', listId);

    this.http.post<any>(this.baseUrl + 'cards', formData).subscribe(res => {
      this.getBoardById();
    })
  }

  deleteListing(id:any){
    console.log(id);
    this.http.delete<any>(this.baseUrl + 'cards/' + id).subscribe(res => {
      this.getBoardById();
    })
  }

}
