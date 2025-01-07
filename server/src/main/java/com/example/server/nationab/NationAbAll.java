package com.example.server.nationab;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;


@Component
@Document(collection = "ab_ranks_all")
public class NationAbAll extends NationAb{
    
}
