import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://api.nmc-dev.de/api/contact'; // your Render backend

  constructor(private http: HttpClient) {}

  send(contactData: any): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, contactData, {
      withCredentials: false // not needed for Brevo
    });
  }
}
