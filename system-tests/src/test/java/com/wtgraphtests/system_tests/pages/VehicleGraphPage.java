package com.wtgraphtests.system_tests.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

public class VehicleGraphPage extends BaseControl {

    public VehicleGraphPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
    }

    
}
