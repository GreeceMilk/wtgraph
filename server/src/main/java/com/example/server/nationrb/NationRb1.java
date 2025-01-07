package com.example.server.nationrb;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;


@Component
@Document(collection = "rb_ranks_1")
public class NationRb1 extends NationRb{
    
}
