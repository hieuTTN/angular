package com.web.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AllViewAdmin {

    @RequestMapping(value = {"/admin/addblog"}, method = RequestMethod.GET)
    public String addblog() {
        return "admin/addblog";
    }

    @RequestMapping(value = {"/admin/addimportproduct"}, method = RequestMethod.GET)
    public String addimportproduct() {
        return "admin/addimportproduct";
    }

    @RequestMapping(value = {"/admin/addproduct"}, method = RequestMethod.GET)
    public String addproduct() {
        return "admin/addproduct";
    }

    @RequestMapping(value = {"/admin/banner"}, method = RequestMethod.GET)
    public String banner() {
        return "admin/banner";
    }

    @RequestMapping(value = {"/admin/blog"}, method = RequestMethod.GET)
    public String blog() {
        return "admin/blog";
    }

    @RequestMapping(value = {"/admin/danhmuc"}, method = RequestMethod.GET)
    public String danhmuc() {
        return "admin/danhmuc";
    }

    @RequestMapping(value = {"/admin/doanhthu"}, method = RequestMethod.GET)
    public String doanhthu() {
        return "admin/doanhthu";
    }

    @RequestMapping(value = {"/admin/importproduct"}, method = RequestMethod.GET)
    public String importproduct() {
        return "admin/importproduct";
    }

    @RequestMapping(value = {"/admin/index"}, method = RequestMethod.GET)
    public String index() {
        return "admin/index";
    }


    @RequestMapping(value = {"/admin/invoice"}, method = RequestMethod.GET)
    public String invoice() {
        return "admin/invoice";
    }

    @RequestMapping(value = {"/admin/product"}, method = RequestMethod.GET)
    public String product() {
        return "admin/product";
    }

    @RequestMapping(value = {"/admin/taikhoan"}, method = RequestMethod.GET)
    public String taikhoan() {
        return "admin/taikhoan";
    }

}
