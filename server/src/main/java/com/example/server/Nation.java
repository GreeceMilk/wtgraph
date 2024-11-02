package com.example.server;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class Nation {
    private String brRange;
    @Id
    private ObjectId id;
    private String cls;
    private String nation;
    private Date date;
}


