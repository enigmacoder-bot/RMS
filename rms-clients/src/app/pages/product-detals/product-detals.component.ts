import { Component } from '@angular/core';
// import { products } from 'src/data/product'
import { PostServices } from 'src/app/services/posts.services';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/reviews.services';
import { AuthServices } from 'src/app/services/auth.services';
import * as moment from 'moment';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-product-detals',
  templateUrl: './product-detals.component.html',
  styles: [
  ]
})
export class ProductDetalsComponent {

   expressions =[
    {
      sentence:"Exceptional!",
      code:5
    },
    {
      sentence:"Great experience",
      code:4
    },
    {
      sentence:"Good",
      code:3
    },
    {
      sentence:"Disappointing",
      code:2
    },
    {
      sentence:"Very Poor",
      code:1
    },
   ]
  id:any
  currentProduct:any
  reviews:any[] =[]
  Images:any[]=[]
  ratings:number=0
  comments:string=""
  isLoggedIn:boolean = false

  

  constructor(private router:ActivatedRoute,private postService:PostServices,private reviewService:ReviewService,
    private authServices:AuthServices){}

  ngOnInit()
  {
    this.id = this.router.snapshot.paramMap.get('id')
    this.getProductByIndex()
    this.getReviews()

    this.isLoggedIn = this.authServices.isLoggedIn()

  }

  getReviews()
  {
    this.reviewService.getReviewsByProductId(this.id).subscribe((data)=>{
      this.reviews = data
    })
  }

  getProductByIndex()
  {
    this.postService.getPostById(this.id).subscribe((data)=>{
      this.currentProduct = data
      this.currentProduct.images.map((val:any)=>{
        this.Images.push(val.preview)
      }) 
    })
  }

  createRatings()
  {
    if(this.comments === "")
    {
      return false
    }
    else{
      const reviewForm = {} as any
      reviewForm["id"]=crypto.randomUUID()
      reviewForm["userid"] =""
      reviewForm["productId"] = this.currentProduct.id
      reviewForm["ratings"] = this.ratings
      reviewForm["comments"]= this.comments
      reviewForm["createdOn"] = moment().format('L');
  
      this.reviewService.createReviews(reviewForm).subscribe((data)=>{
        Swal.fire({ toast: true, position: 'bottom-end', showConfirmButton: false, timer: 3000, title: 'Success!', text: 'Review Submitted', icon: 'success', });
        this.getReviews()
      })
      this.comments =""
    }
   return true
  }


  get getReviewSentence()
  {
    const exp = this.expressions.find((exp)=>{ return exp.code === this.ratings })
    console.log(exp)
    return exp?.sentence
  }

}
