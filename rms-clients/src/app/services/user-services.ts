import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn:"root",
})

export class UserServices{

    constructor(private http:HttpClient){}

    apiUrl = "http://localhost:3000/users"


    getAllUsers():Observable<any[]>{
      return this.http.get<any[]>(this.apiUrl)
    }
    
    loginUser(data:any): Observable<any> {
        return this.http.get<any[]>(this.apiUrl).pipe(
          map((users: any[]) => users.find(user => user.email === data.email && user.password === data.password) || null)
        );
      }

      createUser(data: any): Observable<any> {
        return this.http.get<any[]>(this.apiUrl).pipe(
          map(users => users.find(user => user.email === data.email) || null),
          switchMap(user => {
            if (user) {
              return of({ error: 'User already exists' });
            } else {
              return this.http.post<any>(this.apiUrl, data).pipe(
                catchError(error => {
                  console.error('Error creating user:', error);
                  return of({ error: 'Failed to create user' });
                })
              );
            }
          }),
          catchError(error => {
            console.error('Error fetching users:', error);
            return of({ error: 'Failed to fetch users' });
          })
        );
      }

}