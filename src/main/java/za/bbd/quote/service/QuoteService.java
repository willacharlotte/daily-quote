package za.bbd.quote.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import za.bbd.quote.models.QuoteModel;
import za.bbd.quote.repository.QuoteRepository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class QuoteService {

    private final QuoteRepository quoteRepository;

    @Autowired
    QuoteService(QuoteRepository quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    public ResponseEntity<ArrayList<QuoteModel>> getAll() {
        return ResponseEntity.ok(quoteRepository.findAll());
    }

    public ResponseEntity<QuoteModel> getByDate(Timestamp date) {
        Optional<QuoteModel> quoteOptional = quoteRepository.findByDate(date);
        return quoteOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
