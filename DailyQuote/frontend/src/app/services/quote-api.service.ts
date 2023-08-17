import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteApiService {
  private API_BASE = 'aws url here';

  constructor(private httpClient: HttpClient) {}

  public getAllQuotes(): Observable<quoteModel[]> {
    const url = '${this.API_BASE}/quotes';
    return this.httpClient.get<quoteModel[]>(url);
  }
}

export interface quoteModel {
  id: number;
  date: string;
  author: string;
  content: string;
}
