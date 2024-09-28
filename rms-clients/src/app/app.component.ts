import { Component } from '@angular/core';
import { AuthServices } from './services/auth.services';
import { category } from 'src/data/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authServices:AuthServices){}

  title = 'rms-client';
  collapsed = true;
  isAdmin:boolean=false
  isLoggedIn:boolean =false

  categories:any[]=[]

  ngOnInit()
  {
    this.categories = category
    this.isAdmin = this.authServices.IsUserAdmin()
    this.isLoggedIn = this.authServices.isLoggedIn()
  }
  logOut()
  {
    this.authServices.logout(true)
  }

}
