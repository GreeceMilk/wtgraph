package com.wtgraphtests.system_tests.tests;

import org.openqa.selenium.WebDriver;
import com.wtgraphtests.system_tests.pages.*;
import org.junit.jupiter.api.Test;
import com.wtgraphtests.system_tests.utils.TestConfig;
import com.wtgraphtests.system_tests.utils.Utils;

import static org.junit.Assert.assertEquals;

import java.time.Duration;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;


public class SampleTest {

    WebDriver driver;

    HomePage homePage;

    NationGraphPage nationGraphPage;

    VehicleGraphPage vehicleGraphPage;

    @BeforeEach
    void setup() {
        driver = Utils.chromeSetup(false);
        driver.get(TestConfig.getBaseUrl());
    }

    // @AfterAll
    // public void tearDown() {
    //     driver.quit();
    // }

    @Test
    void navigation() {
        homePage = new HomePage(driver);
        // WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
        // try {
        //     wait.until((d) -> false);
        // } catch (Exception e) {
        //     System.out.println("Exception: " + e);
        // }
        homePage.clickNationImageLink();
        assertEquals(TestConfig.getBaseUrl() + "nation", driver.getCurrentUrl());
        nationGraphPage = new NationGraphPage(driver);
        nationGraphPage.clickHomeLink();
        assertEquals(TestConfig.getBaseUrl(), driver.getCurrentUrl());
        homePage.clickVehicleImageLink();
        assertEquals(TestConfig.getBaseUrl() + "vehicle", driver.getCurrentUrl());
        vehicleGraphPage = new VehicleGraphPage(driver);
        vehicleGraphPage.clickHomeLink();
        assertEquals(TestConfig.getBaseUrl(), driver.getCurrentUrl());
        homePage.clickHomeLink();
        assertEquals(TestConfig.getBaseUrl(), driver.getCurrentUrl());

        homePage.clickNationLink();
        assertEquals(TestConfig.getBaseUrl() + "nation", driver.getCurrentUrl());
        nationGraphPage.clickNationLink();
        assertEquals(TestConfig.getBaseUrl() + "nation", driver.getCurrentUrl());
        nationGraphPage.clickVehicleLink();
        assertEquals(TestConfig.getBaseUrl() + "vehicle", driver.getCurrentUrl());
        vehicleGraphPage.clickVehicleLink();
        assertEquals(TestConfig.getBaseUrl() + "vehicle", driver.getCurrentUrl());
        vehicleGraphPage.clickNationLink();
        assertEquals(TestConfig.getBaseUrl() + "nation", driver.getCurrentUrl());
        nationGraphPage.clickHomeLink();
        assertEquals(TestConfig.getBaseUrl(), driver.getCurrentUrl());

        homePage.clickVehicleLink();
        assertEquals(TestConfig.getBaseUrl() + "vehicle", driver.getCurrentUrl());
    }
    
}
