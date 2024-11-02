package com.example.server;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;


@NoRepositoryBean
public interface NationRepo<T, ID> extends MongoRepository<T, ID> {
    Optional<T> findById(ObjectId id);

    // @Query(value = "{'nation': ?0, 'cls': ?1, 'ab_lower_br': ?3}", fields = "{'date' : 1, ?2: 1, '_id': 0}")
    @Aggregation(pipeline = {"{$match: {'nation': ?0, 'cls': ?1}}", "{$project: {'date': 1, 'yData': '$?2', '_id': 0}}"})
    List<NationData> findByNationAndCls(String nation, String cls, String output, Integer lowerBr);

    // @Aggregation(pipeline = {"{$group: {_id: '$nation'}}", "{$project: {'_id': 0, 'nation': '$_id'}}"})
    // List<String> listNation();
}


