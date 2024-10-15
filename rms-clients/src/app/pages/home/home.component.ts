import { Component } from '@angular/core';
import { products } from 'src/data/product'
import {Router} from '@angular/router'
import { PostServices } from 'src/app/services/posts.services';
import { CategoryServices } from 'src/app/services/category.services';
import { SharedServices } from 'src/app/services/shared-services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  constructor(private router:Router,private postService:PostServices,private sharedServices:SharedServices,private categoryService:CategoryServices){}

  posts:any[]=[]
  categories:any[] =[]

  ngOnInit()
  {
    this.getAllCategories()
  }

  getAllCategories(){
    this.categoryService.getAllCategory().subscribe((data)=>{
      this.categories = data
    })
  }

  
  onSelectProduct(index:number)
  {
    this.router.navigate(['product-detail',index])
  }

  onCategorySelect(category:string)
  {
    this.postService.findPostByCategory({category:category}).subscribe((data)=>{
      this.posts = data
    })
  }

  clearPosts()
  {
    this.posts =[]
  }

  getBase64Image(buffer:any)
  {
    return "data:image/jpeg;base64," + this.sharedServices.convertBinaryToBase64(buffer)
  }

}
