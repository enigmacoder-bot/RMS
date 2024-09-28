import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class ReviewService {
    apiUrl = "http://localhost:3000/reviews";

    constructor(private http: HttpClient) {}

    getReviewsByProductId(productId: string): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map(reviews => reviews.filter(review => review.productId === productId))
        );
    }

    createReviews(data:any):Observable<any>{
        return this.http.post<any>(this.apiUrl,data)
    }
}
