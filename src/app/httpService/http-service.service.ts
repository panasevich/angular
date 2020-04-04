import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiUrl} from '../config/config';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  get(endpoint) {
    return this.http.get(`${apiUrl}${endpoint}`);
  }
  post(endpoint, template) {
    return this.http.post(`${apiUrl}${endpoint}`, template);
  }
}
