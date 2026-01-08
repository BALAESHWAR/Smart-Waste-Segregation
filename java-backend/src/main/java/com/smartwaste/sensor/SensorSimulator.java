
package com.smartwaste.sensor;

public class SensorSimulator {
    public String detectWaste() {
        String[] waste = {"plastic", "food", "battery", "mobile", "sanitary"};
        return waste[(int)(Math.random() * waste.length)];
    }
}
