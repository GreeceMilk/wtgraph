package com.wtgraphtests.system_tests.tests;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.WebDriver;

import com.wtgraphtests.system_tests.pages.NationGraphPage;
import com.wtgraphtests.system_tests.utils.TestConfig;
import com.wtgraphtests.system_tests.utils.Utils;

public class NationGraph {

    WebDriver driver;

    NationGraphPage nationGraphPage;


    @BeforeEach
    void setup() {
        driver = Utils.chromeSetup(false);
        driver.get(TestConfig.getBaseUrl()+"nation");
    }

    @Test
    void testParameters() {
        nationGraphPage = new NationGraphPage(driver);
        assertEquals(List.of("ab", "rb", "sb"), nationGraphPage.getModeInputOptions());
        nationGraphPage.setModeInput("ab");
        assertEquals("ab", nationGraphPage.getModeInput());

    }

    
}
