package com.example.server.scrape;

import org.springframework.stereotype.Service;
import java.util.Map;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.util.HashMap;

import java.io.IOException;

@Service
public class Scraper {
    public WikiData scrapeWTWiki(String vehicleName) {
        String url = "https://wiki.warthunder.com/unit/" + vehicleName;
        try {
            Document doc = Jsoup.connect(url).get();
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
                getHullArmor(doc),
                getTurretArmor(doc),
                getPowerToWeight(doc),
                getMaxForwardSpeed(doc),
                getMaxReverseSpeed(doc),
                getWeight(doc),
                getEnginePower(doc), 
                url
            );
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
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

    private Map<String, Double> getBr(Document doc) {
            Elements brWrapper = doc.getElementsByClass("game-unit_br");
            Elements ranks = brWrapper.first().child(0).children();
            Map<String, Double> brs = new HashMap<>();
            for (Element rank : ranks) {
                String mode = rank.getElementsByClass("mode").first().text();
                double br = customParseDouble(rank.getElementsByClass("value").first().text());
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

    private Integer getResearchCost(Document doc) {
        Elements researchWrapper = doc.getElementsMatchingOwnText("^Research$");
        if (researchWrapper.isEmpty()) {
            return 0;
        }
        return customParseInt(researchWrapper.first().
                    parent().getElementsByClass("game-unit_card-info_value").
                    first().child(0).text().replaceAll(",", ""));
    }

    private Integer getPurchaseCost(Document doc) {
        Elements purchaseWrapper = doc.getElementsMatchingOwnText("^Purchase$");
        if (purchaseWrapper.isEmpty()) {
            return 0;
        }
        return customParseInt(purchaseWrapper.first().
                    parent().getElementsByClass("game-unit_card-info_value").
                    first().child(0).text().replace(",", ""));
    }

    private String getGeneralInfo(Document doc) {
        return doc.getElementsByClass("content-markdown").first().html();
    }

    private String getVehicleByUpdate(Document doc) {
        return doc.getElementsMatchingOwnText("^Vehicles by updates$").first().
                    parent().getElementsByClass("name").first().text();
    }

    private String getHullArmor(Document doc) {
        return doc.getElementsMatchingOwnText("^Hull$").first().
                    parent().getElementsByClass("game-unit_chars-value").first().text();
    }

    private String getTurretArmor(Document doc) {
        return doc.getElementsMatchingOwnText("^Turret$").first().
                    parent().getElementsByClass("game-unit_chars-value").first().text();
    }

    private double getPowerToWeight(Document doc) {
        return customParseDouble(doc.getElementsMatchingOwnText("^Power-to-weight ratio$").first().
                    parent().getElementsByClass("show-char-rb-mod-ref").first().text());
    }

    private double getMaxForwardSpeed(Document doc) {
        return customParseDouble(doc.getElementsMatchingOwnText("^Forward$").first().
                    parent().getElementsByClass("show-char-rb").first().text());
    }

    private double getMaxReverseSpeed(Document doc) {
        return customParseDouble(doc.getElementsMatchingOwnText("^Backward$").first().
                    parent().getElementsByClass("show-char-rb").first().text());
    }

    private double getWeight(Document doc) {
        return customParseDouble(doc.getElementsMatchingOwnText("^Weight$").first().
                    parent().getElementsByClass("game-unit_chars-value").first().text().replaceAll("t", ""));
    }

    private double getEnginePower(Document doc) {
        return customParseDouble(doc.getElementsMatchingOwnText("^Engine power$").first().
                    parent().getElementsByClass("show-char-rb-mod-ref").first().text());
    }
    
    private double customParseDouble(String str) {
        return Double.parseDouble(str.replaceAll("[^0-9.]", ""));
    }

    private int customParseInt(String str) {
        return Integer.parseInt(str.replaceAll("[^0-9]", ""));
    }
}
