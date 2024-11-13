package com.example.server.nationrb;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Repository;

import com.example.server.NationRepo;

@Repository
public interface NationRbAllRepo extends NationRepo<NationRbAll, ObjectId> {

}
