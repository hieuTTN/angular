package com.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AllViewEmployee {

    @RequestMapping(value = {"/employee/addblog"}, method = RequestMethod.GET)
    public String addblog() {
        return "employee/addblog";
    }

    @RequestMapping(value = {"/employee/banner"}, method = RequestMethod.GET)
    public String banner() {
        return "employee/banner";
    }

    @RequestMapping(value = {"/employee/blog"}, method = RequestMethod.GET)
    public String blog() {
        return "employee/blog";
    }

    @RequestMapping(value = {"/employee/invoice"}, method = RequestMethod.GET)
    public String invoice() {
        return "employee/invoice";
    }

    @RequestMapping(value = {"/employee/product"}, method = RequestMethod.GET)
    public String product() {
        return "employee/product";
    }

    @RequestMapping(value = {"/employee/taikhoan"}, method = RequestMethod.GET)
    public String taikhoan() {
        return "employee/taikhoan";
    }
    @RequestMapping(value = {"/employee/addproduct"}, method = RequestMethod.GET)
    public String addproduct() {
        return "employee/addproduct";
    }
}
