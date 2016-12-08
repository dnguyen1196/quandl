package com.example;

import java.io.InputStream;
import java.net.URL;
import java.util.Map;
import java.util.Scanner;


public class quandlData {
    private final String quandl_api_key = "wvMUzzkjBgybjKKuPZVK";
    private final String quandl_api_time_series = "https://www.quandl.com/api/v3/datasets/WIKI/";

    public String getQuandlData(Map<String,String> requestParams) throws Exception {
        String stockName = requestParams.get("stock");
        String startDate = requestParams.get("start");
        String endDate = requestParams.get("end");

        String url = quandl_api_time_series + stockName + ".json?";
        url += "start_date=" + startDate + "&end_date=" + endDate + "&collapse=daily";
        url += "&api_key=" + quandl_api_key;

        URL quandl = new URL(url);
        InputStream data = null;
        try{
            data = quandl.openStream();
            Scanner sc = new Scanner(data);
            String responseBody = sc.useDelimiter("\\A").next();
            return responseBody;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            data.close();
        }
        return "";
    }
}
