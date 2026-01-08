
package com.smartwaste.service;

public class WasteClassificationService {
    public String classifyWaste(String wasteType) {
        switch (wasteType.toLowerCase()) {
            case "plastic":
            case "metal":
            case "glass":
                return "Dry Waste Bin";
            case "food":
            case "vegetable":
                return "Wet Waste Bin";
            case "battery":
            case "chemical":
                return "Hazardous Waste Bin";
            case "mobile":
            case "laptop":
                return "E-Waste Bin";
            case "sanitary":
                return "Sanitary Waste Bin";
            default:
                return "Reject Waste Bin";
        }
    }
}
