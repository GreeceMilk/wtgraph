package com.example.server.scrape;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WikiData {
    private String wkName;
    private String media;
    private String cls;
    private String nation;
    private String rank;
    private String abBr;
    private String rbBr;
    private String sbBr;   
    private String role;
    private String researchCost;
    private String purchaseCost;

    private String generalInfo;
    private String vehicleByUpdate;
    private String source;
    
    private Map<String, Map<String, String>> otherInfo;
}
