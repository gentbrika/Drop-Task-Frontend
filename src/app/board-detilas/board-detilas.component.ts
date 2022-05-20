import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
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
  showAddNewListForm:any = false;
  displayStyle = "none";
  cardId:any = '';
  cardData:any = [];
  checkLists:any = [];

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(par => {
      this.id = par['id'];
    });    
    this.getBoardById();
  }

  addNewListForm = new FormGroup({
    type: new FormControl('',[
      Validators.required,
    ]),
  });

  addNewChecklistForm = new FormGroup({
    text: new FormControl('',[
    ]),
  });

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
    
    id = id.split('-').slice(-1)[0];
    let previousId = event.previousContainer.id;
    previousId = previousId.split('-').slice(-1)[0];

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
    }, error => {
      this._snackBar.open(error.error.errors.board_id[0], 'X', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      setTimeout(() => {
        this._snackBar.dismiss();
      }, 5000);
    })
  }

  addNew(li:any){
    this.addNewTodo = true;
  }

  submitTask(listId:any){
    const formData = new FormData();
    formData.append('title', this.newTask);
    formData.append('listing_id', listId);

    this.http.post<any>(this.baseUrl + 'cards', formData).subscribe(res => {
      this.getBoardById();
      this.addNewTodo = false;
      this.newTask = '';
    }, error => {      
      this._snackBar.open(error.error.errors.title[0], 'X', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      setTimeout(() => {
        this._snackBar.dismiss();
      }, 5000);
    })
  }

  deleteListing(id:any){
    this.http.delete<any>(this.baseUrl + 'cards/' + id).subscribe(res => {
      this.getBoardById();
    })
  }

  openAddNewList(){
    this.showAddNewListForm = true;
  }

  closeAddNewList(){
    this.showAddNewListForm = false;
  }

  addNewList(val:any){
    const formData = new FormData();
    formData.append('board_id', this.id);
    formData.append('type', val.type);

    this.http.post<any>(this.baseUrl + 'listings', formData).subscribe(res => {
      this.getBoardById();
      this.showAddNewListForm = false;
      this.addNewListForm.reset();
    }, error => {      
      this._snackBar.open(error.error.errors.type[0], 'X', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      setTimeout(() => {
        this._snackBar.dismiss();
      }, 5000);
    })
  }

  deleteListingCard(id:any){
    this.http.delete<any>(this.baseUrl + 'listings/' + id).subscribe(res => {
      this.getBoardById();
    })
  }

  openPopup(id:any) {
    console.log(id);
    
    this.http.get<any>(this.baseUrl + 'cards/' + id).subscribe(res => {
      this.cardData = res;
    })
    this.displayStyle = "block";
    this.cardId = id;
  }
  closePopup() {
    this.displayStyle = "none";
    this.addNewChecklistForm.reset();
  }

  addChecklist(val:any){
    const formData = new FormData();
    formData.append('card_id', this.cardId);
    formData.append('text', val.text);
    
    this.http.post<any>(this.baseUrl + 'checklist-items', formData).subscribe(res => {
      console.log(res);
      this.addNewChecklistForm.reset();
    })
  }

  toggleChecklist(event:any, id:any){
    console.log(event.checked);
    
    this.http.put<any>(this.baseUrl + 'checklist-items/' + id + '/toggle-completed', { completed: event.checked }).subscribe(res => {
      this.getBoardById();
    })
  }
}
