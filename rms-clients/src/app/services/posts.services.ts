import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http"

@Injectable({
    providedIn:"root"
})

export class PostServices {

    constructor(private http:HttpClient){}

    apiUrl = "http://localhost:3000/post"

    apiUrl_new = "http://localhost:9883/api/posts"

    getAllPost():Observable<any[]>{
        return this.http.get<any[]>(this.apiUrl);
    }

    getPostById(id:string):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}/${id}`)
    }

    createPost(data:any):Observable<any>{
        return this.http.post<any>(this.apiUrl,data);
    }

    createOGPost(data:any):Observable<any>{
        return this.http.post<any>(this.apiUrl_new,data)
    }


    updatePostById(id:string,data:any):Observable<any>{
        return this.http.put(`${this.apiUrl}/${id}`,data)
    }

    deletePostById(id:string):Observable<any>{
        return this.http.delete(`${this.apiUrl}/${id}`)
    }


}