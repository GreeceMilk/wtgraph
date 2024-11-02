package com.example.server.nationsb;

import org.springframework.data.mongodb.core.mapping.Field;

import com.example.server.Nation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class NationSb extends Nation {

    @Field("sb_lower_br")
    private Float lowerBr;
    @Field("sb_win_rate")
    private Float winRate;
    @Field("sb_battles_sum")
    private Float battleSum;
    @Field("sb_battles_mean")
    private Float battleMean;

    @Field("sb_ground_frags_per_battle")
    private Float groundFragPerBattle;
    @Field("sb_ground_frags_per_death")
    private Float groundFragPerDeath;

    @Field("sb_air_frags_per_battle")
    private Float airFragPerBattle;
    @Field("sb_air_frags_per_death")
    private Float airFragPerDeath;
}


