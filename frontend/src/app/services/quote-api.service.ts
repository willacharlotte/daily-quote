import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuoteApiService {
  private API_BASE = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public getAllQuotes(): Observable<quoteModel[]> {
    const url = this.API_BASE + '/quotes';
    return this.httpClient.get<quoteModel[]>(url);
  }

  getQuoteWithTodaysDate(quotes: quoteModel[]): quoteModel | undefined {
    const today = new Date().toISOString().split('T')[0];
    return quotes.find(quote => quote.date === today);
  }

  getRandomQuote(): Observable<quoteModel> {
    const url = this.API_BASE + '/quotes/random';
    return this.httpClient.get<quoteModel>(url);
  }
}

export interface quoteModel {
  id: number;
  date: string;
  author: string;
  content: string;
}
