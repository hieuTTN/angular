package com.web.service;

import com.web.dto.request.ColorRequest;
import com.web.dto.request.ProductRequest;
import com.web.dto.request.SearchDto;
import com.web.dto.request.StorageRequest;
import com.web.dto.response.ProductSell;
import com.web.entity.*;
import com.web.exception.MessageException;
import com.web.mapper.ProductMapper;
import com.web.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Optional;

@Component
@Repository
public class ProductService {


    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private InvoiceDetailRepository invoiceDetailRepository;

    public Product save(ProductRequest productRequest) {
        Product product = productRequest.getProduct();
        product.setQuantitySold(0);
        product.setDeleted(false);
        if(product.getId() != null){
            Product p = productRepository.findById(product.getId()).get();
            product.setQuantitySold(p.getQuantitySold());
        }
        Product result = productRepository.save(product);
        for (String link : productRequest.getLinkLinkImages()) {
            ProductImage productImage = new ProductImage();
            productImage.setProduct(result);
            productImage.setLinkImage(link);
            productImageRepository.save(productImage);
        }
        return product;
    }


    public void delete(Long idProduct) {
        Product p = productRepository.findById(idProduct).get();
        try {
            productRepository.deleteById(idProduct);
        } catch (Exception e) {
            p.setDeleted(true);
            productRepository.save(p);
        }
    }

    public Page<Product> searchByAdmin(String param, Long categoryId, Pageable pageable) {
        if (param == null) {
            param = "";
        }
        Page<Product> page = null;
        if (categoryId != null) {
            page = productRepository.findByParamAndCate("%" + param + "%", categoryId, pageable);
        }
        else{
            page = productRepository.findAllByParam("%" + param + "%", pageable);
        }
        return page;
    }


    public Product findByIdForAdmin(Long id) {
        Optional<Product> exist = productRepository.findById(id);
        if (exist.isEmpty()) {
            throw new MessageException("product not found");
        }
        return exist.get();
    }


    public List<Product> findAll(Long idCategory) {
        List<Product> list = null;
        if(idCategory == null){
            list = productRepository.findAll();
        }
        else{
            list = productRepository.findByCategory(idCategory);
        }
        return list;
    }

    public List<Product> sanPhamBanChay() {
        return productRepository.sanPhamBanChay();
    }

    public Page<Product> sanPhamBanChay(Pageable pageable) {
        return productRepository.sanPhamBanChay(pageable);
    }

    public Page<Product> sanPhamMoi(Pageable pageable) {
        return productRepository.sanPhamMoi(pageable);
    }

    public List<Product> sanPhamLienQuan(Long id) {
        Product p = productRepository.findById(id).get();
        return productRepository.findByCategoryAndId(p.getCategory().getId(), id);
    }

    public Page<Product> timKiemSanPham(Long categoryId, String search, Pageable pageable) {
        Page<Product> list = null;
        if(search == null){
            search = "";
        }
        if(categoryId != null){
            list = productRepository.findByCategory(categoryId,pageable);
        }
        else{
            list = productRepository.findByParam("%"+search + "%",pageable);
        }
        return list;
    }

    public Page<Product> searchFull(SearchDto search, Pageable pageable) {
        Page<Product> list = null;
        if(search.getSearch() == null){
            search.setSearch("");
        }
        if(search.getSmall() == null){
            search.setSmall(0D);
        }
        if(search.getLarge() == null){
            search.setLarge(100000000D);
        }
        search.setSearch("%"+search.getSearch()+"%");
        if(search.getCategory() == null){
            list = productRepository.searchFull(search.getSearch(), search.getSmall(), search.getLarge(), pageable);
        }
        else{
            list = productRepository.searchFull(search.getSearch(), search.getSmall(), search.getLarge(), search.getCategory(), pageable);
        }
        return list;
    }

    public Page<Product> sanPhamKhuyenMai(Pageable pageable) {
        Page<Product> page = productRepository.sanPhamKhuyenMai(pageable);
        return page;
    }

    public List<ProductSell> sanPhamBanTheoNgay(Date date){
        if (date == null){
            date = new Date(System.currentTimeMillis());
        }
        List<ProductSell> list = invoiceDetailRepository.sanPhamBanTheoNgay(date);
        return list;
    }

    public List<ProductSell> sanPhamBanTheoThang(Integer month, Integer year){
        List<ProductSell> list = invoiceDetailRepository.sanPhamBanTheoThang(month,year);
        return list;
    }
}
