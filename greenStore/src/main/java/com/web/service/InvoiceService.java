package com.web.service;
import com.mservice.config.Environment;
import com.mservice.models.QueryStatusTransactionResponse;
import com.mservice.processor.QueryTransactionStatus;
import com.web.dto.request.InvoiceRequest;
import com.web.entity.*;
import com.web.enums.PayType;
import com.web.enums.StatusInvoice;
import com.web.exception.MessageException;
import com.web.repository.*;
import com.web.utils.MailService;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Component
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private InvoiceDetailRepository invoiceDetailRepository;

    @Autowired
    private UserUtils userUtils;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private HistoryPayRepository historyPayRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MailService mailService;


    public void create(InvoiceRequest invoiceRequest) throws Exception {
        Double totalAmount = 0D;
        User user = userUtils.getUserWithAuthority();
        for(Cart p : cartRepository.findByUser(user.getId())){
            totalAmount += p.getProduct().getPrice() * p.getQuantity();
            if(p.getQuantity() > p.getProduct().getQuantity()){
                throw new MessageException("Sản phẩm "+p.getProduct().getName()+" chỉ còn "+p.getProduct().getQuantity()+" sản phẩm");
            }
        }
        if(invoiceRequest.getPayType().equals(PayType.MOMO)){
            if(historyPayRepository.findByOrderIdAndRequestId(invoiceRequest.getOrderIdMomo(), invoiceRequest.getRequestIdMomo()).isPresent()){
                // đơn hàng đã được đặt trước đó
                throw new MessageException("Đơn hàng đã được đặt");
            }
            Environment environment = Environment.selectEnv("dev");
            QueryStatusTransactionResponse queryStatusTransactionResponse = QueryTransactionStatus.process(environment, invoiceRequest.getOrderIdMomo(), invoiceRequest.getRequestIdMomo());
            System.out.println("qqqq-----------------------------------------------------------"+queryStatusTransactionResponse.getMessage());
            if(queryStatusTransactionResponse.getResultCode() != 0){
                // chưa thanh toán
                throw new MessageException("Đơn hàng chưa được thanh toán");
            }
        }
        Invoice invoice = new Invoice();
        invoice.setNote(invoiceRequest.getNote());
        invoice.setReceiverName(invoiceRequest.getFullname());
        invoice.setPhone(invoiceRequest.getPhone());
        invoice.setAddress(invoiceRequest.getAddress());
        invoice.setCreatedDate(new Date(System.currentTimeMillis()));
        invoice.setCreatedTime(new Time(System.currentTimeMillis()));
        invoice.setUser(userUtils.getUserWithAuthority());
        invoice.setPayType(invoiceRequest.getPayType());
        invoice.setStatusInvoice(StatusInvoice.DANG_CHO_XAC_NHAN);

        invoice.setTotalAmount(totalAmount);
        Invoice result = invoiceRepository.save(invoice);

        for(Cart p : cartRepository.findByUser(user.getId())){
            InvoiceDetail invoiceDetail = new InvoiceDetail();
            invoiceDetail.setInvoice(result);
            invoiceDetail.setProduct(p.getProduct());
            invoiceDetail.setPrice(p.getProduct().getPrice());
            invoiceDetail.setQuantity(p.getQuantity());
            invoiceDetailRepository.save(invoiceDetail);
            if(p.getProduct().getQuantitySold() == null){
                p.getProduct().setQuantitySold(0);
            }
            p.getProduct().setQuantitySold(p.getProduct().getQuantitySold() + p.getQuantity());
            productRepository.save(p.getProduct());
        }

        for(Cart c : cartRepository.findByUser(user.getId())){
            c.getProduct().setQuantity(c.getProduct().getQuantity() - c.getQuantity());
            productRepository.save(c.getProduct());
        }

        if(invoiceRequest.getPayType().equals(PayType.MOMO)){
            HistoryPay historyPay = new HistoryPay();
            historyPay.setInvoice(result);
            historyPay.setCreatedDate(new Date(System.currentTimeMillis()));
            historyPay.setOrderId(invoiceRequest.getOrderIdMomo());
            historyPay.setRequestId(invoiceRequest.getRequestIdMomo());
            historyPay.setTotalAmount(totalAmount);
            historyPayRepository.save(historyPay);
        }

        cartRepository.deleteByUser(user.getId());
    }


    public List<Invoice> myInvoice(){
        List<Invoice> list = invoiceRepository.findByUser(userUtils.getUserWithAuthority().getId());
        return list;
    }

    public List<Invoice> allInvoice(){
        List<Invoice> list = invoiceRepository.findAll();
        return list;
    }


    public void cancelInvoice(Long invoiceId) {
        Optional<Invoice> invoice = invoiceRepository.findById(invoiceId);
        if(invoice.isEmpty()){
            throw new MessageException("invoice id not found");
        }
        if(invoice.get().getUser().getId() != userUtils.getUserWithAuthority().getId()){
            throw new MessageException("access denied");
        }
        if(invoice.get().getPayType().equals(PayType.MOMO)){
            throw new MessageException("Đơn hàng đã được thanh toán, không thể hủy");
        }
        if(invoice.get().getStatusInvoice() != StatusInvoice.DANG_CHO_XAC_NHAN){
            throw new MessageException("Không thể hủy đơn hàng");
        }
        invoice.get().setStatusInvoice(StatusInvoice.DA_HUY);
        invoiceRepository.save(invoice.get());
    }

    public List<Invoice> findAllFull(Date from, Date to, PayType payType, StatusInvoice statusInvoice) {
        List<Invoice> list = null;
        if(from == null || to == null){
            from = Date.valueOf("2000-01-01");
            to = Date.valueOf("2200-01-01");
        }
        if(payType == null && statusInvoice == null){
            list = invoiceRepository.findByDate(from, to);
        }
        if(payType == null && statusInvoice != null){
            list = invoiceRepository.findByDateAndStatus(from, to, statusInvoice);
        }
        if(payType != null && statusInvoice == null){
            list = invoiceRepository.findByDateAndPaytype(from, to,payType);
        }
        if(payType != null && statusInvoice != null){
            list = invoiceRepository.findByDateAndPaytypeAndStatus(from, to,payType,statusInvoice);
        }

        return list;
    }

    public void updateStatus(Long idInvoice, StatusInvoice statusInvoice) {
        Optional<Invoice> invoice = invoiceRepository.findById(idInvoice);
        if(statusInvoice.equals(StatusInvoice.DA_NHAN)){
            throw new MessageException("Trạng thái này chỉ dành cho người mua hàng");
        }
        if(invoice.isEmpty()){
            throw new MessageException("invoice id not found");
        }
        invoice.get().setStatusInvoice(statusInvoice);
        Date d = new Date(System.currentTimeMillis());
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            java.util.Date parsedDate = dateFormat.parse(d.toString()+" 00:00:00");
            Timestamp timestamp = new Timestamp(parsedDate.getTime());
            invoice.get().setStatusUpdateDate(timestamp);
        } catch(Exception e) { //this generic but you can control another types of exception
            // look the origin of excption
        }
        invoiceRepository.save(invoice.get());
        String noti = "";
        if(statusInvoice.equals(StatusInvoice.DA_GUI)){
            noti = "Đơn hàng: "+invoice.get().getId()+" của bạn đã được gửi đi";
        }
        if(statusInvoice.equals(StatusInvoice.DA_XAC_NHAN)){
            noti = "Đơn hàng: "+invoice.get().getId()+" của bạn đã được xác nhận";
        }
        if(statusInvoice.equals(StatusInvoice.KHONG_NHAN_HANG)){
            noti = "Đơn hàng: "+invoice.get().getId()+" của bạn đã được xác nhận là không nhận hàng";
        }
        if(statusInvoice.equals(StatusInvoice.DA_XAC_NHAN) || statusInvoice.equals(StatusInvoice.DA_GUI) || statusInvoice.equals(StatusInvoice.KHONG_NHAN_HANG)){
            mailService.sendEmail(invoice.get().getUser().getEmail(),"Thông báo đơn hàng của bạn",
                    noti
                    ,false, true);
        }
    }


    public void confirm(Long idInvoice) {
        Optional<Invoice> invoice = invoiceRepository.findById(idInvoice);
        if(invoice.get().getUser().getId() != userUtils.getUserWithAuthority().getId()){
            throw new MessageException("Access denied");
        }
        if(invoice.isEmpty()){
            throw new MessageException("invoice id not found");
        }
        invoice.get().setStatusInvoice(StatusInvoice.DA_NHAN);
        Date d = new Date(System.currentTimeMillis());
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
            java.util.Date parsedDate = dateFormat.parse(d.toString()+" 00:00:00");
            Timestamp timestamp = new Timestamp(parsedDate.getTime());
            invoice.get().setStatusUpdateDate(timestamp);
        } catch(Exception e) { //this generic but you can control another types of exception
            // look the origin of excption
        }
        invoiceRepository.save(invoice.get());
    }

    public Invoice timKiemDonHang(Long id, String phone) {
        Optional<Invoice> invoice = invoiceRepository.findById(id);
        if(invoice.isEmpty()){
            throw new MessageException("Không tìm thấy đơn hàng");
        }
        if(!invoice.get().getUser().getPhone().equals(phone) && !invoice.get().getPhone().equals(phone)){
            throw new MessageException("Số điện thoại hoặc mã đơn hàng không chính xác");
        }
        return invoice.get();
    }

    public Invoice findByID(Long id) {
        Optional<Invoice> invoice = invoiceRepository.findById(id);
        return invoice.get();
    }
}
