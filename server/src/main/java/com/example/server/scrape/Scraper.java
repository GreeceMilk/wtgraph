package com.example.server.scrape;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.NoSuchElementException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.HashMap;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Duration;

import org.jsoup.nodes.Node;
import org.jsoup.nodes.TextNode;
import java.util.LinkedHashMap;

import org.openqa.selenium.By;
@Service
public class Scraper {
    private final String vehicleUrl = "https://wiki.warthunder.com/unit/";
    private final String eventUrl = "https://wiki.warthunder.com/history_timelapse";

    public WikiData scrapeWTWiki(String vehicleName) {
        String url = vehicleUrl + vehicleName;
        try {
            Document doc = Jsoup.connect(url).get();
            String cls = getCls(doc);
            Map<String, Map<String, String>> otherInfo = new HashMap<>();
            switch (cls) {
                case "Ground Vehicles":
                    otherInfo = getGroundVehicleOtherInfo(doc);
                    break;

                case "Bluewater Fleet":
                    otherInfo = getNavalOtherInfo(doc);
                    break;
                case "Coastal Fleet":
                    otherInfo = getNavalOtherInfo(doc);
                    break;

                case "Aviation":
                    otherInfo = getAviationOtherInfo(doc);
                    break;
            
                default:
                    break;
            }
            return new WikiData(
                getWkName(doc),
                getMedia(doc),
                getCls(doc),
                getNation(doc),
                getRank(doc),
                getBr(doc).get("AB"),
                getBr(doc).get("RB"),
                getBr(doc).get("SB"),
                getRole(doc),
                getResearchCost(doc),
                getPurchaseCost(doc),
                getGeneralInfo(doc),
                getVehicleByUpdate(doc),
                url,
                otherInfo
            );
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private Map<String, Map<String, String>> getOtherInfo(Document doc, List<String> titles) {
        Map<String, Map<String, String>> info = new LinkedHashMap<>();
        for (String title: titles) {
            Element wrapper = doc.getElementsMatchingOwnText("^" + title + "$").first().parent();
            Elements blocks = wrapper.getElementsByClass("game-unit_chars-block");
            List<Map<String, String>> blocksContent = new ArrayList<>();
            for (Element block : blocks) {
                blocksContent.add(getBlockContent(block));
            }
            info.put(title, mergeMaps(blocksContent));
        }
        info.putAll(getArmaments(doc));
        return info;
    }

    private Map<String, Map<String, String>> getGroundVehicleOtherInfo(Document doc) {
        List<String> titles = List.of(
            "Survivability and armour",
            "Mobility"
        );
        return getOtherInfo(doc, titles);
    }


    private Map<String, Map<String, String>> getAviationOtherInfo(Document doc) {
        List<String> titles = List.of(
            "Flight performance",
            "General characteristics"
        );
        return getOtherInfo(doc, titles);
    }

    private Map<String, Map<String, String>> getNavalOtherInfo(Document doc) {
        List<String> titles = List.of(
            "Specification"
        );
        return getOtherInfo(doc, titles);
    }

    private String getWkName(Document doc) {
        return doc.getElementsByClass("game-unit_name").first().text();
    }
    
    private String getMedia(Document doc) {
        return doc.getElementsByClass("game-unit_template-image").first().attr("src");
    }

    private String getCls(Document doc) {
        return doc.getElementsByClass("game-unit_nation").first().text();
    }

    private String getRank(Document doc) {
            Elements rankWrapper = doc.getElementsByClass("game-unit_rank");
            String rank = rankWrapper.first().child(0).text();
            return rank;
    }

    private Map<String, String> getBr(Document doc) {
        Elements brBlocks = doc.getElementsByClass("game-unit_br-item");
        Map<String, String> brs = new HashMap<>();
        for (Element brBlock: brBlocks) {
            String mode = brBlock.getElementsByClass("mode").first().text();
            String br = brBlock.getElementsByClass("value").first().text();
            switch (mode) {
                case "AB":
                    brs.put(mode, br);
                    break;
            
                case "RB":
                    brs.put(mode, br);
                    break;
                
                case "SB":
                    brs.put(mode, br);
                    break;

                default:
                    break;
            }
            if (brs.size() == 3) {
                break;
            }
        }
        return brs;
    }

    private String getNation(Document doc) {
        return doc.getElementsMatchingOwnText("^Game nation$").first().
                    parent().getElementsByClass("game-unit_card-info_value").
                    first().getElementsByClass("text-truncate").text();
    }
     
    private String getRole(Document doc) {
        return doc.getElementsMatchingOwnText("^Main role$").first().
                    parent().getElementsByClass("text-truncate").text();
    }

    private String getResearchCost(Document doc) {
        Elements researchWrapper = doc.getElementsMatchingOwnText("^Research$");
        if (researchWrapper.isEmpty()) {
            return "N/A";
        }
        return researchWrapper.first().
                    parent().getElementsByClass("game-unit_card-info_value").
                    first().child(0).text();
    }

    private String getPurchaseCost(Document doc) {
        Elements purchaseWrapper = doc.getElementsMatchingOwnText("^Purchase$");
        if (purchaseWrapper.isEmpty()) {
            return "N/A";
        }
        return purchaseWrapper.first().
                    parent().getElementsByClass("game-unit_card-info_value").
                    first().child(0).text();
    }

    private String getGeneralInfo(Document doc) {
        Element generalInfoElement = doc.getElementsByClass("content-markdown").first();
        if (generalInfoElement == null) {
            return "No description available";
        }   
        return generalInfoElement.text();
    }

    private String getVehicleByUpdate(Document doc) {
        return doc.getElementsMatchingOwnText("^Vehicles by updates$").first().
                    parent().getElementsByClass("name").first().text();
    }

    private Map<String, Map<String, String>> getArmaments(Document doc) {
        Map<String, Map<String, String>> armamentsInfo = new LinkedHashMap<>();
        // Element defaultPreset = doc.getElementById("weapon-preset-0");
        Elements defaultPresets = doc.getElementById("weapon").getElementsByClass("active");
        if (defaultPresets.isEmpty()) {
            return armamentsInfo;
        }
        for (Element defaultPreset: defaultPresets) {
            Elements armamentWrappers = defaultPreset.getElementsByClass("game-unit_weapon");
            for (Element armament: armamentWrappers) {
                String weaponTitle = armament.getElementsByClass("game-unit_weapon-title").first().text();
                Map<String, String> weaponInfo = new LinkedHashMap<>();
                Elements weaponBlocks = armament.getElementsByClass("game-unit_chars-block");
                for (Element weaponBlock: weaponBlocks) {
                    weaponInfo.putAll(getBlockContent(weaponBlock));
                }
                armamentsInfo.put(weaponTitle, weaponInfo);
            }

        }
        return armamentsInfo;
    }
    
    private Map<String, String> mergeMaps(List<Map<String, String>> maps) {
        Map<String, String> mergedMap = new LinkedHashMap<>();
        for (Map<String, String> map : maps) {
            mergedMap.putAll(map);
        }
        return mergedMap;
    }
    
    private Map<String, String> getBlockContent(Element element) {
        Map<String, String> blockContent = new LinkedHashMap<>();
        Element header = element.getElementsByClass("game-unit_chars-header").first();
        Elements valueElements = element.getElementsByClass("game-unit_chars-value");
        Elements siblings = header.siblingElements();
        Boolean hasValue = siblings.hasClass("game-unit_chars-value");
        for (Element valueElement : valueElements) {
            String headerText = header.ownText();
            Element parent = valueElement.parent();
            String name = parent.child(0).text();
            if (name.equals("")) {
                name = headerText;
            } else if (parent.hasClass("game-unit_chars-subline") && !hasValue) {
                name = headerText + "(" + name +  ")";
            }
            String value = "";
            List<Node> nodes = valueElement.childNodes();
            for (Node node: nodes) {
                if (node instanceof TextNode) {
                    value += ((TextNode) node).text();
                } else if (node instanceof Element) {
                    Element child = (Element) node;
                    if (child.hasClass("show-char-rb-mod-ref") || child.hasClass("show-char-rb")) {
                        value += child.text();
                    }
                }
            }
            blockContent.put(name, value);
        }
        return blockContent;
    }

    public Map<Date, String> scrapeEvent() {
        Map<Date, String> events = new LinkedHashMap<>();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--window-size=1920,1080");

        // options.setBinary("C:\\Program Files\\Mozilla Firefox\\firefox.exe");
        try {
            System.setProperty("webdriver.chrome.driver", "drivers/chromedriver-win64/chromedriver.exe");
            WebDriver driver = new ChromeDriver(options);
            driver.get(eventUrl);
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
            List<WebElement> updates = driver.findElements(By.cssSelector("div[data-section=updates]"));
            for (WebElement update: updates) {
                events.putAll(singleEvent(driver, update));
            }
            driver.quit();
            return events;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    private Map<Date, String> singleEvent(WebDriver driver, WebElement event) {
        try {
            String eventTitle = event.findElement(By.cssSelector("div.cstm_event_item_title")).getText();
            WebElement dateElement = event.findElement(By.xpath(".//div[div[contains(text(), 'Release date:')]]"));
            String eventDateText = dateElement.findElement(By.cssSelector(".cstm_event_feature_breadcrumb")).getText();
            SimpleDateFormat formatter = new SimpleDateFormat("dd MMMM yyyy");
            Date eventDate = formatter.parse(eventDateText);
            return Map.of(eventDate, eventTitle);
        } catch (org.openqa.selenium.NoSuchElementException e) {
            return Map.of();
        } catch (ParseException e) {
            return Map.of();
        }

    }
}
