import { Component } from '@angular/core';
import { UserServices } from 'src/app/services/user-services';
import { PostServices } from 'src/app/services/posts.services';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

users:any[] =[]
posts:any[] =[]

constructor(private userService:UserServices,private postService:PostServices){}

ngOnInit()
{
  this.getAllUsers()
  this.getAllPosts()
}
getAllUsers()
{
  this.userService.getAllUsers().subscribe((data)=>{
    this.users = data
  })
}
getAllPosts()
{
  this.postService.getAllPost().subscribe((data)=>{
    this.posts = data
  })
}

}
