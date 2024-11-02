package com.example.server.nationab;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import com.example.server.NationRepo;

@Repository
public interface NationAb1Repo extends NationRepo<NationAb1, ObjectId> {
    // Optional<NationRb1> 

}
