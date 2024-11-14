package com.example.server;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "joined")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    private ObjectId id;
    private Date date;
    private String name;
    private Double ab_battles;
    private Double ab_win_rate;
    private Double ab_air_frags_per_battle;
    private Double ab_air_frags_per_death;
    private Double ab_ground_frags_per_battle;
    private Double ab_ground_frags_per_death;
    private Double rb_battles;
    private Double rb_win_rate;
    private Double rb_air_frags_per_battle;
    private Double rb_air_frags_per_death;
    private Double rb_ground_frags_per_battle;
    private Double rb_ground_frags_per_death;
    private Double sb_battles;
    private Double sb_win_rate;
    private Double sb_air_frags_per_battle;
    private Double sb_air_frags_per_death;
    private Double sb_ground_frags_per_battle;
    private Double sb_ground_frags_per_death;
    private String wk_name;
    private String nation;
    private String cls;
    private Double ab_br;
    private Double rb_br;
    private Double sb_br;
    private Double ab_repair;
    private Double rb_repair;
    private Double sb_repair;
    private Boolean is_premium;
    private Double ab_rp_rate;
    private Double ab_sl_rate;
    private Double rb_rp_rate;
    private Double rb_sl_rate;
    private Double sb_rp_rate;
    private Double sb_sl_rate;
};
