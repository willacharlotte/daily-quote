package za.bbd.quote.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import za.bbd.quote.models.QuoteModel;
import za.bbd.quote.service.QuoteService;

import java.sql.Timestamp;
import java.util.ArrayList;

@RestController
public class QuoteController {

    private final QuoteService quoteService;

    @Autowired
    QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    @GetMapping(value = "quote/all")
    public ResponseEntity<ArrayList<QuoteModel>> getAllQuotes() {
        return quoteService.getAll();
    }

    @GetMapping(value = "quote")
    public ResponseEntity<QuoteModel> getQuoteByDate(@RequestParam() Timestamp date) {
        return quoteService.getByDate(date);
    }
}
