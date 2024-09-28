import { Component } from '@angular/core';
import { products } from 'src/data/product'
import {Router} from '@angular/router'
import { PostServices } from 'src/app/services/posts.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  constructor(private router:Router,private postService:PostServices){}

  data:any[]=[]

  ngOnInit()
  {
    this.postService.getAllPost().subscribe((val)=>{
      this.data = val
    })
  }

  onSelectProduct(index:number)
  {
    this.router.navigate(['product-detail',index])
  }

}
