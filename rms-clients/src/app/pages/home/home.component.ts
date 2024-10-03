import { Component } from '@angular/core';
import { products } from 'src/data/product'
import {Router} from '@angular/router'
import { PostServices } from 'src/app/services/posts.services';
import { CategoryServices } from 'src/app/services/category.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  constructor(private router:Router,private postService:PostServices,private categoryService:CategoryServices){}

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

}
