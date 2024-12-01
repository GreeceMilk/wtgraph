package com.example.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import java.util.List;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepo vehicleRepo;

    private int bubbleSize = 5;

    List<VehicleName> getVehicleList(String nation, String cls, String mode, Double lowerBr, Double upperBr) {
        return vehicleRepo.vehicleList(nation, cls, mode+"_br", lowerBr, upperBr);    
    }

    List<Double> getBrList(String mode) {
        return vehicleRepo.findBrList(mode+"_br");
    }

    List<VehicleData> getVehicleData(String name, String outputX, String outputY) {
        return vehicleRepo.findByNameAndOutput(name, outputX, outputY);
    }

    List<VehicleDataWithCount> getVehicleDataWithCount(String name, String outputX, String outputY) {
        List<VehicleDataWithCount> returnValue = vehicleRepo.findByNameAndOutputNonUnique(name, outputX, outputY);
        returnValue.forEach(data -> data.setR(data.getR() * bubbleSize));
        return returnValue;
    }

    List<String> getOutputNames() {
        List<String> outputNames = new ArrayList<String>();
        for (Field field: Vehicle.class.getDeclaredFields()) {
            field.setAccessible(true);
            if (field.getType().equals(Double.class) || field.getType().equals(Date.class)) {
                outputNames.add(field.getName());
            }
        }
        return outputNames;
    }
}
