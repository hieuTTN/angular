package com.web.api;
import com.mservice.config.Environment;
import com.mservice.models.PaymentResponse;
import com.mservice.models.QueryStatusTransactionResponse;
import com.mservice.processor.CreateOrderMoMo;
import com.mservice.processor.QueryTransactionStatus;
import com.mservice.shared.constants.LogUtils;
import com.mservice.shared.constants.RequestType;
import com.web.dto.request.PaymentDto;
import com.web.dto.response.ResponsePayment;
import com.web.entity.Cart;
import com.web.exception.MessageException;
import com.web.repository.CartRepository;
import com.web.service.CartService;
import com.web.utils.UserUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class MomoApi {

    @Autowired
    private CartService cartService;


    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserUtils userUtils;

    @PostMapping("/urlpayment")
    public ResponsePayment getUrlPayment(@RequestBody PaymentDto paymentDto){
        LogUtils.init();
        Double totalAmount = cartService.totalAmountCart();
        List<Cart> carts = cartRepository.findByUser(userUtils.getUserWithAuthority().getId());
        for(Cart c : carts){
            if(c.getQuantity() > c.getProduct().getQuantity()){
                throw new MessageException("Sản phẩm "+c.getProduct().getName()+" chỉ còn "+c.getProduct().getQuantity()+" sản phẩm");
            }
        }

        Long td = Math.round(totalAmount);
        String orderId = String.valueOf(System.currentTimeMillis());
        String requestId = String.valueOf(System.currentTimeMillis());
        Environment environment = Environment.selectEnv("dev");
        PaymentResponse captureATMMoMoResponse = null;
        try {
            captureATMMoMoResponse = CreateOrderMoMo.process(environment, orderId, requestId, Long.toString(td), paymentDto.getContent(), paymentDto.getReturnUrl(), paymentDto.getNotifyUrl(), "", RequestType.PAY_WITH_ATM, null);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("url ====: "+captureATMMoMoResponse.getPayUrl());
        ResponsePayment responsePayment = new ResponsePayment(captureATMMoMoResponse.getPayUrl(),orderId,requestId);
        return responsePayment;
    }




    @GetMapping("/checkPayment")
    public Integer checkPayment(@RequestParam("orderId") String orderId, @RequestParam("requestId") String requestId) throws Exception {
        Environment environment = Environment.selectEnv("dev");
        QueryStatusTransactionResponse queryStatusTransactionResponse = QueryTransactionStatus.process(environment, orderId, requestId);
        System.out.println("qqqq-----------------------------------------------------------"+queryStatusTransactionResponse.getMessage());
        if(queryStatusTransactionResponse.getResultCode() == 0){
            return 0;
        }
        return 1;
    }
}
