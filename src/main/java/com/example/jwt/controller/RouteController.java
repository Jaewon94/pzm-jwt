package com.example.jwt.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class RouteController {


    @GetMapping("/")
    public String index() {
        return "index";
    }
}
