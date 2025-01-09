package com.example.server;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Repository
public interface VehicleRepo extends MongoRepository<Vehicle, ObjectId> {
    List<Vehicle> findByName(String name);
    Optional<Vehicle> findByNameAndDate(String name, Date date);
    @Query(value = "{'wk_name': ?0}")
    Optional<Vehicle> findByWkName(String WkName);

    @Aggregation(pipeline = {"{$match: {'name': ?0, ?2: {$ne: null}}}", "{$sort: {'?1': 1}}", "{$project: {'xData': '$?1', 'yData': '$?2'}}}"})
    List<GraphData> findByNameAndOutput(String name, String outputX, String outputY);

    @Aggregation(pipeline = {"{$match: {'name': ?0, ?2: {$ne: null}}}", "{$sort: {'?1': 1}}", "{$project: {'xData': '$?1', 'yData': '$?2'}}}", "{$group: {'_id': {xData: '$xData', yData: '$yData'}, 'r': {$count: {}}}}", "{$project: {'xData': '$_id.xData', 'yData': '$_id.yData', 'r': 1}}"})
    List<VehicleDataWithCount> findByNameAndOutputNonUnique(String name, String outputX, String outputY);

    @Aggregation(pipeline = {"{$match: {'nation': ?0, 'cls': ?1}}", "{$project: {'wk_name': 1}}"})
    List<String> vehicleList(String nation, String cls);

    @Aggregation(pipeline = {"{$match: {'nation': ?0, 'cls': ?1, ?2: {$gte: ?3, $lte: ?4}}}", "{$group: {'_id': '$name', label: {$first: '$wk_name'}}}", "{$project: {'name': '$_id', 'label': {$concat: ['$label', '(', '$_id', ')']}}}", "{$sort: {'label': 1}}"})
    List<VehicleName> vehicleList(String nation, String cls, String brMode, Double lowerBr, Double upperBr);

    @Aggregation(pipeline = {"{$match: {'nation': ?0}}", "{$group: {'_id': '$wk_name'}}"})
    List<String> vehicleListByNation(String nation);

    @Aggregation(pipeline = {"{$match: {'cls': ?0}}", "{$group: {'_id': '$wk_name'}}"})
    List<String> vehicleListByCls(String cls);

    @Aggregation(pipeline = {"{$group: {'_id': '$wk_name'}}"})
    List<String> vehicleList();

    @Aggregation(pipeline = {"{$group: {'_id': '$?0'}}", "{$match: {'_id': {$ne: null}}}", "{$sort: {'_id': 1}}"})
    List<Double> findBrList(String brMode);

    @Aggregation(pipeline = {"{$group: {'_id': '$name', label: {$first: '$wk_name'}}}", "{$sample: {size: 1}}", "{$project: {'name': '$_id', '_id': 0, 'label': 1}}"})
    VehicleName randomVehicle();

    @Aggregation(pipeline = {"{$match: {'name': ?0}}", "{$sort: {'date': -1}}", "{$limit: 1}"})
    Vehicle mostRecentData(String name);

    @Aggregation(pipeline = {"{$sort: {'date': -1}}", "{$group: {'_id': null, latestDate: {$first: '$date'}}}", "{$lookup: {from: 'joined', localField: 'latestDate', foreignField: 'date', as: 'latestDocs'}}", "{$unwind: {path: '$latestDocs'}}", "{$replaceRoot: {newRoot: '$latestDocs'}}","{$match: {'nation': ?0, cls: ?1}}", "{$project: {name: 1, wk_name: 1, matchSum: {$add: ['$ab_battles', '$rb_battles', '$sb_battles']}}}", "{$sort: {matchSum: -1}}", "{$limit: 10}", "{$project: {name: 1, label: '$wk_name'}}"})
    List<VehicleName> mostPlayedVehicleList(String nation, String cls);
}
