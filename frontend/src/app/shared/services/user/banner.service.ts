import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Banner } from '../../models/banner.model';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  private baseUrl = 'http://localhost:8080/api/banner';

  constructor(private http: HttpClient) {}

  getBanner(): Observable<Banner[]> {
    var path = window.location.pathname;
    var page = path.split("/").pop();

    let url = `${this.baseUrl}/public/find-by-page?page=${page}`;
    return this.http.get<Banner[]>(url);
  }
}
