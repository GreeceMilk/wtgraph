package com.example.server.nationrb;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import com.example.server.NationRepo;

@Repository
public interface NationRb1Repo extends NationRepo<NationRb1, ObjectId> {
    // Optional<NationRb1> 

}
