package com.example.server;

import java.util.List;
import lombok.Data;

@Data
public class VehicleDataWithInfo {
    VehicleName vehicleName;
    String outputX;
    String outputY;
    List<VehicleData> vehicleData;
}
