package com.example.server;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;


@NoRepositoryBean
public interface NationRepo<T, ID> extends MongoRepository<T, ID> {
    Optional<T> findById(ObjectId id);

    // @Query(value = "{'nation': ?0, 'cls': ?1, 'ab_lower_br': ?3}", fields = "{'date' : 1, ?2: 1, '_id': 0}")
    @Aggregation(pipeline = {"{$match: {'nation': ?0, 'cls': ?1, ?3: ?4}}", "{$project: {'date': 1, 'yData': '$?2', '_id': 0}}", "{$sort: {'date': 1}}"})
    List<NationData> findByNationAndCls(String nation, String cls, String output, String mode, Double lowerBr);

    // @Aggregation(pipeline = {"{$group: {_id: '$nation'}}", "{$project: {'_id': 0, 'nation': '$_id'}}"})
    // List<String> listNation();
}


