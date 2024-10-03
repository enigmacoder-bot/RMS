import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:"root"
})

export class CategoryServices {

    constructor(private http:HttpClient){}

    apiUrl = "http://localhost:9883/api/categories"

    getAllCategory():Observable<any[]>{
        return this.http.get<any[]>(this.apiUrl);
    }

    createCategory(data:any):Observable<any>{
        return this.http.post<any>(this.apiUrl,data);
    }
}