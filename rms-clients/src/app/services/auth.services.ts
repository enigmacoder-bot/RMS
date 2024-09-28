import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class AuthServices{
    private authDetails = new BehaviorSubject<any>({})
    AuthObDetails = this.authDetails.asObservable()
  
    private auth = new BehaviorSubject<boolean>(false);
    authObj = this.auth.asObservable()
  
    private role = new BehaviorSubject<string>("");
    roleObj = this.role.asObservable();


    constructor() { 
        const Isuser =  sessionStorage.getItem("user")
        this.auth.next(!!Isuser)
        if(Isuser !== null)
        {
          this.setloggedUser(JSON.parse(Isuser))
        }
      }

      setloggedUser(data:any){
        if(sessionStorage.getItem("user")){
          sessionStorage.removeItem("user")
          sessionStorage.setItem("user",JSON.stringify(data))
        }
        sessionStorage.setItem("user",JSON.stringify(data))
        this.authDetails.next(data)
      }

      login(data:boolean){
        this.auth.next(data)
      }
      logout(data:boolean){
        this.auth.next(data)
        sessionStorage.removeItem("user")
        location.reload()
      }

      getloggedUser(){
        return this.authDetails.value
      }
      getUserRole(){
        return this.authDetails.value.role
      }


      isLoggedIn()
      {
        return !!this.authDetails.value.role
      }

      IsUserAdmin()
      {
        return this.authDetails.value.role ==="ADMIN"
      }
    
}