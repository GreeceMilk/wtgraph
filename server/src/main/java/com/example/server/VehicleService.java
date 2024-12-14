package com.example.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;
import java.util.List;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
import java.util.stream.Collectors;

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

    List<VehicleData> getVehicleRandomOutput(String name) {
        List<String> outputNames = getOutputNames();
        String outputX = "date";
        String outputY = outputNames.get((int)(Math.random() * outputNames.size()));
        return getVehicleData(name, outputX, outputY);
    }

    VehicleName getRandomVehicle() {
        return vehicleRepo.randomVehicle();
    }
    
    VehicleDataWithInfo getRandomVehicleData() {
        VehicleName vehicleName = getRandomVehicle();
        List<String> outputNames = getOutputNames();
        String outputX = "date";
        String outputY = outputNames.stream().filter(name -> !name.equals("date")).collect(Collectors.toList()).get((int)(Math.random() * outputNames.size()));
        List<VehicleData> vehicleData = getVehicleData(vehicleName.getName(), outputX, outputY);
        VehicleDataWithInfo vehicleDataWithInfo = new VehicleDataWithInfo();
        vehicleDataWithInfo.setVehicleName(vehicleName);
        vehicleDataWithInfo.setOutputX(outputX);
        vehicleDataWithInfo.setOutputY(outputY);
        vehicleDataWithInfo.setVehicleData(vehicleData);
        return vehicleDataWithInfo;
    }
}
