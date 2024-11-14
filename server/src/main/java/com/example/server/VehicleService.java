package com.example.server;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepo vehicleRepo;

    List<String> getVehicleList(String nation, String cls, String mode, Double lowerBr, Double upperBr) {
        return vehicleRepo.vehicleList(nation, cls, mode+"_br", lowerBr, upperBr);    
    }

    List<Double> getBrList(String mode) {
        return vehicleRepo.findBrList(mode+"_br");
    }

    List<VehicleData> getVehicleData(String name, String outputX, String outputY) {
        return vehicleRepo.findByNameAndOutput(name, outputX, outputY);
    }
}
