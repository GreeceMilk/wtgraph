package com.example.server.nationab;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import com.example.server.NationRepo;

@Repository
public interface NationAbAllRepo extends NationRepo<NationAbAll, ObjectId> {

}
