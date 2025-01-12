package com.wtgraphtests.system_tests.pages;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public abstract class BaseControl {
    
    protected WebDriver driver;

    @FindBy(css="a[href='/']")
    WebElement homeLink;

    @FindBy(css="a[href='/nation']")
    WebElement nationLink;

    @FindBy(css="a[href='/vehicle']")
    WebElement vehicleLink;

    @FindBy(id="footer")
    WebElement footer;

    public BaseControl(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public void clickHomeLink() {
        scrollUp();
        homeLink.click();
    }

    public void clickNationLink() {
        scrollUp();
        nationLink.click();
    }

    public void clickVehicleLink() {
        scrollUp();
        vehicleLink.click();
    }

    public void scrollToBottom() {
        new Actions(driver).scrollToElement(footer).perform();
    }

    public void scrollUp() {
        new Actions(driver).scrollByAmount(0, -500).perform();
    }

}
