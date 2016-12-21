package com.example;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;



@Controller
public class QuandlApi {
    @CrossOrigin
    @RequestMapping(value = "/data", method = RequestMethod.POST)
    public String getQuandlData(@RequestParam Map<String,String> requestParams) throws Exception {
        quandlData data = new quandlData();
        return data.getQuandlData(requestParams);
    }

    @CrossOrigin
    @RequestMapping(value = "/testing", method = RequestMethod.POST)
    public String testMethod(@RequestParam Map<String,String> requestParams) throws Exception {
        return "Hi there, this is a test";
    }

    
}

