import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = window.localStorage.getItem('token') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getMethod<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getAuthHeaders()
    });
  }

  getMethodText<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json' 
    });
  }


  postMethod<T>(endpoint: string): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, null, {
      headers: this.getAuthHeaders()
    });
  }

  postMethodPayload<T>(endpoint: string, payload: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, payload, {
      headers: this.getAuthHeaders()
    });
  }

  deleteMethod<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
      headers: this.getAuthHeaders()
    });
  }
}