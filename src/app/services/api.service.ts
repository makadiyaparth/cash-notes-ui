import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly API_BASE_PATH = environment.API_BASE_PATH;

  constructor(private _http: HttpClient) {}

  post(path: string, data?: any): Observable<any> {
    return this._http.post(this.API_BASE_PATH + path, data);
  }

  get(path: string, params?: any): Observable<any> {
    return this._http.get(this.API_BASE_PATH + path, { params });
  }

  put(path: string, data?: any): Observable<any> {
    return this._http.put(this.API_BASE_PATH + path, data);
  }

  patch(path: string, data?: any): Observable<any> {
    return this._http.patch(this.API_BASE_PATH + path, data);
  }

  delete(path: string): Observable<any> {
    return this._http.delete(this.API_BASE_PATH + path);
  }
}
