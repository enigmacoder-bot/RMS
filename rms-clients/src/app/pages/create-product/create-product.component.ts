import { Component } from '@angular/core';
import Stepper from 'bs-stepper';
import { post } from 'src/app/interfaces/post.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostServices } from 'src/app/services/posts.services';
import { FormControl, FormGroup,FormArray,Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styles: [
  ]
})
export class CreateProductComponent {
  userid :string="9842948234823nkjwnrf"
  private stepper!: Stepper;
  newSubCategory :string=''

  constructor(private formBuilder:FormBuilder,private postService:PostServices,private router:Router){}

  form = new FormGroup({
    postName: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
    ratings :new FormControl("",Validators.required),
    date: new FormControl("",),
    tag:new FormControl(""),
    tags: new FormArray([]),
    subCategory:new FormControl(""),
    subCategories: new FormArray([]),
    image:new FormControl(""),
    images: new FormArray([])
  });
  

  next() {
    this.stepper.next();
  }
  prev() {
    this.stepper.previous();
  }

  onSubmit() {

    // if(this.form.invalid)
    // {
    //   alert("Enter all the values")
    //   return false
    // }
    const imagesArray = this.form.get("images") as FormArray;
    const imageBlobs = imagesArray.controls.map(control => {
      const imageFile = control.get('image')?.value;
      return imageFile; // only pass the image blob (file), not preview
    });
  
      const formObj = this.form.value as any
      formObj["id"] = crypto.randomUUID()
      delete formObj.image
      delete formObj.tag
      delete formObj.subCategory
      formObj["userid"] = this.userid
      formObj["images"] = imageBlobs;
      formObj["tags"] = this.convertArrayToString(this.form.get("tags") as FormArray)
      formObj["subcategory"] = this.convertArrayToString(this.form.get("subCategories") as FormArray)
      console.log(formObj) 
      this.postService.createOGPost(formObj).subscribe((val)=>{
        Swal.fire({
          text:'Success !',
          icon:'success'})
          setTimeout(()=>{7
            this.router.navigateByUrl('/')
          })
      })
      return true
  }


  addSubCategory()
  {
   if(this.form.value.subCategory !=='')
   {
    const subcategory = new FormControl(this.form.value.subCategory)
    const subcategories = this.form.get("subCategories") as FormArray;
    subcategories.push(subcategory)
    this.form.controls.subCategory.reset()
   }
  }

  getSubCategories()
  {
    return this.form.get("subCategories") as FormArray
  }

  removeSubCategory(index:number)
  {
    this.form.controls.subCategories.removeAt(index)
  }

  getTags()
  {
    return this.form.get("tags") as FormArray
  }
  addTags()
  {
      const tag = new FormControl(this.form.value.tag)
      const tags = this.form.get("tags") as FormArray
      tags.push(tag)
      this.form.controls.tag.reset()
  }
  removeTag(index:number)
  {
    this.form.controls.tags.removeAt(index)
  }

  getImages()
  {
    return this.form.get("images") as FormArray;
  }

  

  addImage() {
    const imageGroup = this.formBuilder.group({
      image: [''],
      preview: [''],
    });
    (this.form.get('images') as FormArray).push(imageGroup);
  }

  onFileChange(event: any, index: number) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const imagesArray = this.form.get('images') as FormArray;
      imagesArray.at(index).patchValue({
        image: file
      });
  
      // Create a preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        imagesArray.at(index).patchValue({
          preview: e.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    (this.form.get('images') as FormArray).removeAt(index);
  }

  ngOnInit() {
    const stepperElement = document.querySelector('#stepper1');
    if (stepperElement) {  // Check if stepperElement is not null
      this.stepper = new Stepper(stepperElement, {
        linear: false,
        animation: true,
      });
    } else {
      console.error('Stepper element not found');
    }
  }

  convertArrayToString(formArray: FormArray): string {
    let result = "";
    const data = formArray.value; // Assuming `formArray.value` gives an array of values
    for (let value of data) {
      if (result !== "") {
        result += ";" + value;
      } else {
        result = value;
      }
    }
    return result;
  }  
  
}
