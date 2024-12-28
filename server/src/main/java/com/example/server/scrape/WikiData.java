package com.example.server.scrape;

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
    private double abBr;
    private double rbBr;
    private double sbBr;   
    private String role;
    private int researchCost;
    private int purchaseCost;

    private String generalInfo;
    private String vehicleByUpdate;
    private String hullArmor;
    private String turretArmor;
    private double powerToWeight;
    private double maxForwardSpeed;
    private double maxReverseSpeed;
    private double weight;
    private double enginePower;
    private String source;
}
