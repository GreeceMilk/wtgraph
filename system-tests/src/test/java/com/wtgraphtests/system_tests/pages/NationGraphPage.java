package com.wtgraphtests.system_tests.pages;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import com.wtgraphtests.system_tests.utils.GraphControl;

public class NationGraphPage extends BaseControl {

    GraphControl graphControl;

    @FindBy(id="mode")
    WebElement modeInput;

    @FindBy(id="brRange")
    WebElement brRangeInput;

    @FindBy(id="nation")
    WebElement nationInput;

    @FindBy(id="cls")
    WebElement clsInput;

    @FindBy(id="lowerBr")
    WebElement lowerBrInput;

    @FindBy(id="output")
    WebElement outputInput;

    public NationGraphPage(WebDriver driver) {
        super(driver);
        PageFactory.initElements(driver, this);
        graphControl = new GraphControl(driver);
    }

    private void confirmSelection(WebElement element) {
        new Actions(driver).moveToElement(element, 0, 38).click().perform();
    }

    public void setModeInput(String mode) {
        modeInput.sendKeys(mode);
        confirmSelection(modeInput);
    }

    public String getModeInput() {
        return modeInput.getAttribute("value");
    }

    private List<String> getOptions() {
        // String baseId = "mode-option-";
        List<String> options = new ArrayList<>();
        List<WebElement> optionElements = driver.findElements(By.cssSelector("li[role='option']"));
        for (WebElement optionElement : optionElements) {
            options.add(optionElement.getText());
        }
        return options;
    }

    public List<String> getModeInputOptions() {
        // driver.findElement(By.cssSelector("div.MuiGrid-grid-md-auto > div > div > div > div:nth-of-type(1) [data-testid='ArrowDropDownIcon']")).click();
        driver.findElement(By.xpath("button//div//div[input[@id='mode']]")).click();
        return getOptions();
    }

    public void setBrRangeInput(String brRange) {
        brRangeInput.sendKeys(brRange);
    }
    
}
