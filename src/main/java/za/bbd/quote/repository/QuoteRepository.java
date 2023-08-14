package za.bbd.quote.repository;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import za.bbd.quote.models.QuoteModel;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Optional;

@EnableScan
public interface QuoteRepository extends CrudRepository<QuoteModel, String> {
    ArrayList<QuoteModel> findAll();

    Optional<QuoteModel> findByDate(Timestamp date);
}
