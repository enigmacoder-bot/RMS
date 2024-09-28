import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServices } from 'src/app/services/user-services';
import { AuthServices } from 'src/app/services/auth.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements AfterViewInit {

  constructor(private authService:AuthServices,private userService:UserServices,private router:Router){}

  @ViewChild('loginform') loginform: NgForm | undefined;

  email: string = '';
  password: string = '';
  authenticateString:string ="Dont have an account? Create one !"
  isSignIn:boolean=true

  ngAfterViewInit() {
   
  }

  loginUser()
  {
    const loginObj = this.loginform?.value
    this.userService.loginUser(loginObj).subscribe((data)=>{
      this.authService.setloggedUser(data)
      this.router.navigateByUrl('/')
      setTimeout(()=>{
        location.reload()
      },1000)
    })
  }

  toggleMethods()
  {
    this.isSignIn = !this.isSignIn
    this.authenticateString = this.isSignIn?"Dont have an account? Create one !":"Have an account? Login !"
    this.loginform?.reset()
  }

  onSubmit() {
    if (this.loginform?.valid) {
      console.log('Form Submitted!', this.loginform.value);
    }
  }
}
