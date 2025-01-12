package com.wtgraphtests.system_tests.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

    
public class GraphControl {

    private WebDriver driver;

    @FindBy(id="XGridSwitch")
    WebElement xGridSwitch;

    @FindBy(id="YGridSwitch")
    WebElement yGridSwitch;

    @FindBy(id="PanZoomSwitch")
    WebElement panZoomSwitch;

    @FindBy(id="AnnotationSwitch")
    WebElement annotationSwitch;

    @FindBy(css="ShowAnnotationSwitch")
    WebElement showAnnotationSwitch;

    @FindBy(css="canvas")
    WebElement canvas;

    public GraphControl(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
    }

    public void clickXGridSwitch() {
        xGridSwitch.click();
    }

    public void clickYGridSwitch() {
        yGridSwitch.click();
    }

    public void clickPanZoomSwitch() {
        panZoomSwitch.click();
    }

    public void clickAnnotationSwitch() {
        annotationSwitch.click();
    }

    public void clickShowAnnotationSwitch() {
        showAnnotationSwitch.click();
    }

    public Boolean isLoaded() {
        return canvas.isDisplayed();
    }
    
}
