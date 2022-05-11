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

  // todo:any = [];
  // done:any = [];
  // review:any = [];
  addNewTodo:any = false;
  newTask:any = '';

  weeks:any = [];
  connectedTo:any = [];

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
      this.data =[{"id":1,"type":"Todo","index":0,"board_id":1,"created_at":null,"updated_at":null,"cards":[{"id":5,"title":"This is a cool card","description":"This is an amazing description","index":0,"listing_id":1,"created_at":null,"updated_at":"2022-05-11T11:18:26.000000Z"},{"id":10,"title":"just a trest","description":null,"index":1,"listing_id":1,"created_at":"2022-05-10T14:38:01.000000Z","updated_at":"2022-05-11T11:18:26.000000Z"},{"id":12,"title":"testtesttesttest","description":null,"index":2,"listing_id":1,"created_at":"2022-05-11T07:25:50.000000Z","updated_at":"2022-05-11T11:18:26.000000Z"},{"id":11,"title":"aaeaeffefe","description":null,"index":3,"listing_id":1,"created_at":"2022-05-10T14:38:29.000000Z","updated_at":"2022-05-11T11:18:26.000000Z"}]},{"id":2,"type":"In progress","index":1,"board_id":1,"created_at":null,"updated_at":null,"cards":[{"id":6,"title":"This is an even cooler card","description":"This is an amazing description","index":0,"listing_id":2,"created_at":null,"updated_at":"2022-05-11T11:18:26.000000Z"},{"id":4,"title":"This is another card","description":"This is an amazing description","index":1,"listing_id":2,"created_at":null,"updated_at":"2022-05-11T11:18:26.000000Z"},{"id":3,"title":"This is my third card","description":"This is an amazing description","index":2,"listing_id":2,"created_at":null,"updated_at":"2022-05-11T11:18:26.000000Z"},{"id":9,"title":"This is sparta!","description":"This is madness","index":3,"listing_id":2,"created_at":null,"updated_at":"2022-05-11T11:18:26.000000Z"}]},{"id":3,"type":"Done","index":2,"board_id":1,"created_at":null,"updated_at":null,"cards":[{"id":7,"title":"This is the latest card","description":"This is an amazing description","index":0,"listing_id":3,"created_at":null,"updated_at":null},{"id":8,"title":"This is madness","description":"This is madness","index":1,"listing_id":3,"created_at":null,"updated_at":null},{"id":1,"title":"This is my first card","description":"This is an amazing description","index":2,"listing_id":3,"created_at":null,"updated_at":"2022-05-11T11:28:44.000000Z"},{"id":2,"title":"This is my second card","description":"This is anoyhrt amazing description","index":3,"listing_id":3,"created_at":null,"updated_at":"2022-05-11T11:28:44.000000Z"}]}];
      for (let item of this.data) {
        this.connectedTo.push(item.id);
        console.log(this.connectedTo);
        
      };
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(par => {
      this.id = par['id'];
    });
    
    // this.getBoardById();
  }

  // getBoardById(){
  //   this.http.get<any>(this.baseUrl + `listings?board_id=${this.id}`).subscribe(res => {
  //     // console.log(res[0].cards);
      
  //     this.todo = res[0].cards;
  //     this.done = res[1].cards;
  //     this.review = res[2].cards;
  //     this.data = res;
  //     console.log(this.data);
      
  //   })
  // }
 
  // drop(event: CdkDragDrop<any[]>) {
  // drop(event: any, status:any) {
    
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }


  //   let cardId = event.container.data[event.currentIndex].id;
    

  //   let id = event.container.id;
  //   id = id.split('-').slice(-1)[0];
  //   let previousId = event.previousContainer.id;
  //   previousId = previousId.split('-').slice(-1)[0];

  //   const formData = new FormData();
  //   formData.append('current_index', event.currentIndex);
  //   formData.append('current_listing_index', id);
  //   formData.append('previous_listing_index', previousId);



  //   this.http.post<any>(this.baseUrl + `cards/${cardId}/move`, formData).subscribe(res => {
  //     this.getBoardById();
  //   })
  // }

  // addNew(){
  //   this.addNewTodo = true;
  // }

  // submitTask(listId:any){
  //   const formData = new FormData();
  //   formData.append('title', this.newTask);
  //   formData.append('listing_id', listId);

  //   this.http.post<any>(this.baseUrl + 'cards', formData).subscribe(res => {
  //     console.log(res);
  //     this.getBoardById();
  //   })
  // }

  
 

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


  


}
