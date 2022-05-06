import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardDetilasComponent } from './board-detilas/board-detilas.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '',   redirectTo: 'main', pathMatch: 'full' },
  { path:'main', component: MainComponent },
  { path:'login', component: LoginComponent },
  { path:'board/:id', component: BoardDetilasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
