
package com.smartwaste;

import com.smartwaste.sensor.SensorSimulator;
import com.smartwaste.service.WasteClassificationService;

public class MainApplication {
    public static void main(String[] args) {
        SensorSimulator sensor = new SensorSimulator();
        WasteClassificationService service = new WasteClassificationService();

        String waste = sensor.detectWaste();
        String bin = service.classifyWaste(waste);

        System.out.println("Detected Waste: " + waste);
        System.out.println("Recommended Bin: " + bin);
    }
}
