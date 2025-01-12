package com.wtgraphtests.system_tests.utils;

import lombok.Getter;

public class TestConfig {
    @Getter
    static String geckoDriverPath = "C:\\wtgraph\\geckodriver.exe";
    @Getter
    static String chromeDriverPath = "C:\\wtgraph\\chromedriver-win64\\chromedriver.exe";
    @Getter
    static String geckoBinaryPath = "C:\\Program Files\\Mozilla Firefox\\firefox.exe";
    @Getter
    static String baseUrl = "http://localhost:3000/";
}
