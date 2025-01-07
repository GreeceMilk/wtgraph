package com.example.server;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import com.example.server.nationrb.*;
import com.example.server.nationab.*;
import com.example.server.nationsb.*;

import java.util.ArrayList;

@Service
public class NationService {

    private final Map<String, NationRepo<? extends Nation, ObjectId>> repoMap;
    private final Map<String, Nation> dataMap;

    @Autowired
    private final MongoTemplate mongoTemplate;

    @Autowired
    public NationService(NationRb1Repo nationRb1Repo, NationRb0Repo nationRb0Repo, NationRbAllRepo nationRbAllRepo,
                         NationAb0Repo nationAb0Repo, NationAb1Repo nationAb1Repo, NationAbAllRepo nationAbAllRepo,
                         NationSb0Repo nationSb0Repo, NationSb1Repo nationSb1Repo, NationSbAllRepo nationSbAllRepo,
                         NationRb1 nationRb1, NationRb0 nationRb0, NationRbAll nationRbAll,
                        NationAb0 nationAb0, NationAb1 nationAb1, NationAbAll nationAbAll,
                        NationSb0 nationSb0, NationSb1 nationSb1, NationSbAll nationSbAll,
                         MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
        this.repoMap = Map.of(
            "rb1", nationRb1Repo,
            "rb0", nationRb0Repo,
            "rball", nationRbAllRepo,
            "ab1", nationAb1Repo,
            "ab0", nationAb0Repo,
            "aball", nationAbAllRepo,
            "sb0", nationSb0Repo, 
            "sb1", nationSb1Repo,
            "sball", nationSbAllRepo
        );
        this.dataMap = Map.of(
            "rb1", nationRb1,
            "rb0", nationRb0,
            "rball", nationRbAll,
            "ab1", nationAb1,
            "ab0", nationAb0,
            "aball", nationAbAll,
            "sb0", nationSb0,
            "sb1", nationSb1,
            "sball", nationSbAll
        );
    }


    public NationRepo<? extends Nation, ObjectId> chooseDb(String mode, String brRange) {
        return repoMap.get(mode + brRange);
    }

    public Optional<Nation> getNation(String mode, String brRange, ObjectId id) {
        NationRepo<? extends Nation, ObjectId> repo = chooseDb(mode, brRange);
        if (repo == null) {
            return Optional.empty();
        } else {
            return copyOf(repo.findById(id));
        }
    }

    // utility function
    @SuppressWarnings("unchecked")  
    static <T> Optional<T> copyOf(Optional<? extends T> opt) {
        return (Optional<T>) opt;
    }

    // get list of nation
    List<String> getNationList(String mode, String brRange) {
        Aggregation nationAggregation = Aggregation.newAggregation(Aggregation.group("nation"));
        AggregationResults<Map<String, String>> result = mongoTemplate.aggregate(nationAggregation, mode + "_ranks_" + brRange, (Class<Map<String, String>>)(Class<?>)Map.class);
        return result.getMappedResults().stream()
                .flatMap(item -> item.values().stream())
                .collect(Collectors.toList());
    }

    // get list of cls according to nation
    List<String> getClsList(String mode, String brRange, String nation) {
        Aggregation clsAggregation = Aggregation.newAggregation(Aggregation.match(new Criteria("nation").is(nation)), Aggregation.group("cls"));
        AggregationResults<Map<String, String>> result = mongoTemplate.aggregate(clsAggregation, mode + "_ranks_" + brRange, (Class<Map<String,String>>) (Class<?>) Map.class);
        return result.getMappedResults().stream()
                .flatMap(item -> item.values().stream())
                .collect(Collectors.toList());
    }

    // get list of br according to cls and nation
    List<Double> getBrList(String mode, String brRange, String nation, String cls) {
        if (brRange.equals("all")) {
            return List.of(1.0);
        } else {
            Aggregation brList = Aggregation.newAggregation(Aggregation.match(new Criteria("nation").is(nation).and("cls").is(cls)), Aggregation.group( mode + "_lower_br"), Aggregation.sort(Sort.by("_id")));
            AggregationResults<Map<String, Double>> result = mongoTemplate.aggregate(brList, mode + "_ranks_" + brRange, (Class<Map<String, Double>>)(Class<?>)Map.class);
            return result.getMappedResults().stream()
                    .flatMap(item -> item.values().stream())
                    .collect(Collectors.toList());
        }
    }

    // get a nation's data according to cls, nation, and output field
    List<GraphData> getNationData(String mode, String brRange, String cls, String nation, String output, Double lowerBr) {
        NationRepo<? extends Nation, ObjectId> repo = chooseDb(mode, brRange);
        if (repo == null) {
            return List.of();
        } else {
            List<GraphData> nationData = repo.findByNationAndCls(nation, cls, output, mode+"_lower_br", lowerBr);
            // TODO: add sort after getting data Sort sort = Sort.by("date").ascending();
            if (nationData.isEmpty()) {
                return List.of();
            } else {
                return nationData;
            }
        }
    }

    Map<String, Nation> mostRecentData(String nation) {
        List<String> modes = List.of("rb", "ab", "sb");
        String brRange = "all";
        Map<String, Nation> results = new HashMap<>();
        Aggregation mostRecentData = Aggregation.newAggregation(Aggregation.match(new Criteria("nation").is(nation)), Aggregation.sort(Sort.by("date").descending()), Aggregation.limit(1));
        for (String mode : modes) {
            // NationRepo<? extends Nation, ObjectId> repo = chooseDb(m, brRange);
            AggregationResults<? extends Nation> result = mongoTemplate.aggregate(mostRecentData, mode + "_ranks_" + brRange, dataMap.get(mode+brRange).getClass());
            results.put(mode, result.getUniqueMappedResult());
        }
        return results;
    }

}
