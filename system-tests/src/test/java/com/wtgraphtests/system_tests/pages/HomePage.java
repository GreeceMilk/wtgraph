package com.wtgraphtests.system_tests.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import com.wtgraphtests.system_tests.utils.GraphControl;

public class HomePage extends BaseControl {

    private GraphControl graphControl;

    // @FindBy(xpath = "//div[a[@id='imageToNation']]")
    @FindBy(id="imageToNation")
    WebElement nationImageLink;

    @FindBy(id="imageToVehicle")
    WebElement vehicleImageLink;
    
    public HomePage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
        graphControl = new GraphControl(driver);
    }

    public void clickNationImageLink() {
        // new Actions(driver).scrollToElement(nationImageLink).perform();
        scrollToBottom();
        nationImageLink.click();
    }

    public void clickVehicleImageLink() {
        // new Actions(driver).scrollToElement(vehicleImageLink).perform();
        scrollToBottom();
        vehicleImageLink.click();
    }

    public GraphControl getGraphControl() {
        return graphControl;
    }
}
