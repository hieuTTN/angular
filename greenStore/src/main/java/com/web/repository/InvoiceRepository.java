package com.web.repository;

import com.web.entity.Category;
import com.web.entity.Invoice;
import com.web.enums.PayType;
import com.web.enums.StatusInvoice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice,Long> {


    @Query("select i from Invoice i where i.user.id = ?1")
    public List<Invoice> findByUser(Long userId);

    @Query("select i from Invoice i where i.createdDate >= ?1 and i.createdDate <= ?2 order by i.id desc")
    public List<Invoice> findByDate(Date from, Date to);

    @Query("select i from Invoice i where i.createdDate >= ?1 and i.createdDate <= ?2 and i.payType = ?3 order by i.id desc ")
    public List<Invoice> findByDateAndPaytype(Date from, Date to, PayType payType);


    @Query(value = "select sum(i.total_amount) from invoice i where Month(i.created_date) = ?1 and Year(i.created_date) = ?2 and (i.pay_type = 0 or i.status_invoice = ?3)", nativeQuery = true)
    public Double calDt(Integer thang, Integer month, Integer index);

    @Query(value = "select sum(i.total_amount) from invoice i \n" +
            "WHERE (i.status_invoice = ?2 or i.pay_type = 0 ) and i.created_date = ?1", nativeQuery = true)
    public Double revenueByDate(Date ngay, Integer index);

    @Query(value = "select count(i.id) from invoice i\n" +
            "where i.status_invoice = ?2 and i.status_update_date = ?1",nativeQuery = true)
    public Double numInvoiceToDay(Date ngay, Integer index);

    @Query("select i from Invoice i where i.createdDate >= ?1 and i.createdDate <= ?2 and i.statusInvoice = ?3 order by i.id desc")
    List<Invoice> findByDateAndStatus(Date from, Date to, StatusInvoice statusInvoice);

    @Query("select i from Invoice i where i.createdDate >= ?1 and i.createdDate <= ?2 and i.statusInvoice = ?4 and i.payType = ?3 order by i.id desc ")
    List<Invoice> findByDateAndPaytypeAndStatus(Date from, Date to, PayType payType, StatusInvoice statusInvoice);
}
