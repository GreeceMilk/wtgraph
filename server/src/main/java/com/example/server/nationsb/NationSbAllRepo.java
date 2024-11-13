package com.example.server.nationsb;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import com.example.server.NationRepo;

@Repository
public interface NationSbAllRepo extends NationRepo<NationSbAll, ObjectId> {

}
