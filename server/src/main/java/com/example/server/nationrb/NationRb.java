package com.example.server.nationrb;

import org.springframework.data.mongodb.core.mapping.Field;

import com.example.server.Nation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class NationRb extends Nation {

    @Field("rb_lower_br")
    private Float lowerBr;
    @Field("rb_win_rate")
    private Float winRate;
    @Field("rb_battles_sum")
    private Float battleSum;
    @Field("rb_battles_mean")
    private Float battleMean;

    @Field("rb_ground_frags_per_battle")
    private Float groundFragPerBattle;
    @Field("rb_ground_frags_per_death")
    private Float groundFragPerDeath;

    @Field("rb_air_frags_per_battle")
    private Float airFragPerBattle;
    @Field("rb_air_frags_per_death")
    private Float airFragPerDeath;
}


