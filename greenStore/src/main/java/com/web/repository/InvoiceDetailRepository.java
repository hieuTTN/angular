package com.web.repository;

import com.web.dto.response.ProductSell;
import com.web.entity.Category;
import com.web.entity.InvoiceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

public interface InvoiceDetailRepository extends JpaRepository<InvoiceDetail,Long> {

    @Query("select i from InvoiceDetail i where i.invoice.id = ?1")
    public List<InvoiceDetail> findByInvoiceId(Long invoiceId);

    @Query("select count(i.id) from InvoiceDetail i where i.product.id = ?1")
    public Long countByProduct(Long idProduct);

    @Query(value = "select i.product_id as id, p.name, p.price, p.old_price as oldPrice, p.image_banner as imageBanner, p.quantity, \n" +
            "(SELECT sum(ivd.quantity) from invoice_detail ivd where ivd.product_id = i.product_id) as soLuongBan from invoice_detail i INNER JOIN invoice iv on iv.id = i.invoice_id inner join product p on p.id = i.product_id WHERE iv.created_date = ?1 GROUP by i.product_id;",nativeQuery = true)
    public List<ProductSell> sanPhamBanTheoNgay(Date date);

    @Query(value = "select i.product_id as id, p.name, p.price, p.old_price as oldPrice, p.image_banner as imageBanner, p.quantity, \n" +
            "(SELECT sum(ivd.quantity) from invoice_detail ivd where ivd.product_id = i.product_id) as soLuongBan from invoice_detail i INNER JOIN invoice iv on iv.id = i.invoice_id inner join product p on p.id = i.product_id WHERE MONTH(iv.created_date) = ?1 and YEAR(iv.created_date) = ?2 GROUP by i.product_id;",nativeQuery = true)
    public List<ProductSell> sanPhamBanTheoThang(Integer month, Integer year);
}
