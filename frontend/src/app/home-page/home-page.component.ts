import { Component } from '@angular/core';
import { QuoteApiService, quoteModel } from '../services/quote-api.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dq-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public allQuotes: quoteModel[] = [];
  public currentQuote: quoteModel | undefined;

  constructor(private quoteApiService: QuoteApiService) {}

  ngOnInit() {
    this.quoteApiService.getAllQuotes().subscribe((quotes: quoteModel[]) => {
      this.allQuotes = quotes;
      this.currentQuote = this.quoteApiService.getQuoteWithTodaysDate(quotes);
      console.log(this.currentQuote);
    });
  }

  public handleButtonClick(): void {
    this.quoteApiService.getRandomQuote().subscribe((quote: quoteModel) => {
      this.currentQuote = quote;
      console.log(this.currentQuote);
    });
  }
}
