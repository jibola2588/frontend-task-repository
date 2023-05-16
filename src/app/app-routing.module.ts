import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component'
import { LoginComponent } from './login/login.component'
import { DetailComponent } from './detail/detail.component'



const routes: Routes = [
  { path: 'product', component : HomeComponent },
  { path: '', component : RegisterComponent },
  { path: 'login', component : LoginComponent },
  { path: 'product/:id', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
