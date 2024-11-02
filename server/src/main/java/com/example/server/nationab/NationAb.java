package com.example.server.nationab;

import org.springframework.data.mongodb.core.mapping.Field;

import com.example.server.Nation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class NationAb extends Nation {

    @Field("ab_lower_br")
    private Float lowerBr;
    @Field("ab_win_rate")
    private Float winRate;
    @Field("ab_battles_sum")
    private Float battleSum;
    @Field("ab_battles_mean")
    private Float battleMean;

    @Field("ab_ground_frags_per_battle")
    private Float groundFragPerBattle;
    @Field("ab_ground_frags_per_death")
    private Float groundFragPerDeath;

    @Field("ab_air_frags_per_battle")
    private Float airFragPerBattle;
    @Field("ab_air_frags_per_death")
    private Float airFragPerDeath;
}


