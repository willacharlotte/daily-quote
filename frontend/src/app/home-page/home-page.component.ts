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

  public currentQuote: quoteModel = {
    id: 1,
    author: '[19:55] Willa Lyle',
    date: new Date().toString(),
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam maximus, est et fringilla tempor, nibh lacus eleifend ipsum, et semper ante enim eget purus. Ut metus ante, venenatis eget leo sed, mattis hendrerit augue. Sed eu posuere neque. Etiam sed massa dolor. Pellentesque quis ante quis quam scelerisque condimentum. Nullam lobortis molestie sagittis. Nam mattis tristique massa, vitae varius purus commodo quis. Pellentesque nec placerat eros. Integer lacinia egestas lacus, ac laoreet elit efficitur id. Proin elit ipsum, vehicula vitae malesuada quis, pretium eget sapien. Aenean accumsan ligula a massa scelerisque viverra.',
  };

  constructor(private quoteApiService: QuoteApiService) {}

  public handleButtonClick(): void {
    this.quoteApiService.getAllQuotes().subscribe((quotes: quoteModel[]) => {
      this.allQuotes = quotes;
    });
  }
}
