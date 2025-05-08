package com.web.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AllViewUser {

    @RequestMapping(value = {"/blog"}, method = RequestMethod.GET)
    public String account() {
        return "user/blog";
    }

    @RequestMapping(value = {"/blogdetail"}, method = RequestMethod.GET)
    public String blogdetail() {
        return "user/blogdetail";
    }

    @RequestMapping(value = {"/cart"}, method = RequestMethod.GET)
    public String cart() {
        return "user/cart";
    }

    @RequestMapping(value = {"/confirm"}, method = RequestMethod.GET)
    public String comfirm() {
        return "user/confirm";
    }

    @RequestMapping(value = {"/datlaimatkhau"}, method = RequestMethod.GET)
    public String datlaimatkhau() {
        return "user/datlaimatkhau";
    }

    @RequestMapping(value = {"/detail"}, method = RequestMethod.GET)
    public String detail() {
        return "user/detail";
    }

    @RequestMapping(value = {"/forgot"}, method = RequestMethod.GET)
    public String forgot() {
        return "user/forgot";
    }

    @RequestMapping(value = {"/index","/"}, method = RequestMethod.GET)
    public String index() {
        return "user/index.html";
    }

    @RequestMapping(value = {"/login"}, method = RequestMethod.GET)
    public String login() {
        return "user/login.html";
    }

    @RequestMapping(value = {"/product"}, method = RequestMethod.GET)
    public String product() {
        return "user/product.html";
    }

    @RequestMapping(value = {"/regis"}, method = RequestMethod.GET)
    public String regis() {
        return "user/regis.html";
    }

    @RequestMapping(value = {"/taikhoan"}, method = RequestMethod.GET)
    public String taikhoan() {
        return "user/taikhoan.html";
    }

    @RequestMapping(value = {"/thanhcong"}, method = RequestMethod.GET)
    public String thanhcong() {
        return "user/thanhcong.html";
    }

}
