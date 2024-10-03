import { Component } from '@angular/core';
import { UserServices } from 'src/app/services/user-services';
import { PostServices } from 'src/app/services/posts.services';
import { CategoryServices } from 'src/app/services/category.services';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

users:any[] =[]
posts:any[] =[]
categories:any=[]

categoryName:string=""
tag:string=""
tags:string[] =[]



constructor(private userService:UserServices,private postService:PostServices,private categorySerices:CategoryServices){}

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

getAllCategories()
{
  this.categorySerices.getAllCategory().subscribe((data)=>{
    this.categories = data
  })
}

 
addTagList()
{
  this.tags.push(this.tag)
  this.tag = ""
}

createCategory() {
  let formObj ={
    cid:Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000,
    label:this.categoryName,
    sublabel:this.tags.join(',')
  }
  this.categorySerices.createCategory(formObj).subscribe((data)=>{
    this.getAllCategories();
  })
}

}
