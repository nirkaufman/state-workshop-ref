import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "./post.model";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: "root" })
export class PostApiService {

  constructor(private httpClient: HttpClient) {}

  fetchAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>('http://localhost:3000/posts');
  }
}
