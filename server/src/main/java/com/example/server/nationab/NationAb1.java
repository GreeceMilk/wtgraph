package com.example.server.nationab;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;


@Component
@Document(collection = "ab_ranks_1")
public class NationAb1 extends NationAb{
    
}
