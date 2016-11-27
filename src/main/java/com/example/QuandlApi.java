package com.example;

import org.springframework.web.bind.annotation.*;

import java.util.Map;



@RestController
public class QuandlApi {

    @CrossOrigin
    @RequestMapping(value = "/data", method = RequestMethod.POST)
    public String someMethod(@RequestParam Map<String,String> requestParams) throws Exception {
        quandlData data = new quandlData();
        return data.getQuandlData(requestParams);
    }

}
