function checkout() {
    var con = window.confirm("Xác nhận đặt hàng!");
    if (con == false) {
        return;
    }
    if(document.getElementById("fullname").value == ""){
        toastr.warning("Hãy nhập họ tên người nhận");
        return;
    }
    if(document.getElementById("phone").value == ""){
        toastr.warning("Hãy nhập số điện thoại người nhận");
        return;
    }
    if(document.getElementById("diachinhan").value == ""){
        toastr.warning("Hãy nhập địa chỉ người nhận");
        return;
    }
    var paytype = $('input[name=paytype]:checked').val()
    if (paytype == "momo") {
        requestPayMentMomo();
    }
    if (paytype == "cod") {
        paymentCod();
    }
}


async function requestPayMentMomo() {
    var orderDto = {
        "payType": "MOMO",
        "fullname": document.getElementById("fullname").value,
        "phone": document.getElementById("phone").value,
        "address": document.getElementById("diachinhan").value,
        "note": document.getElementById("ghichudonhang").value,
    }
    window.localStorage.setItem('orderinfor', JSON.stringify(orderDto));
    var returnurl = 'http://localhost:8080/thanhcong';
    var paymentDto = {
        "content": "Đặt sản phẩm bách hóa",
        "returnUrl": returnurl,
        "notifyUrl": returnurl,
    }
    const res = await fetch('http://localhost:8080/api/urlpayment', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(paymentDto)
    });
    if (res.status < 300) {
        var result = await res.json();
        window.open(result.url, '_blank');
    }
    else{
        if(res.status == 417){
            var result = await res.json();
            toast.error(result.defaultMessage);
        }
        else{
            toast.error("Momo đang gặp lỗi, không thể thanh toán");
        }
    }
}

async function paymentCod() {
    var orderDto = {
        "payType": "COD",
        "fullname": document.getElementById("fullname").value,
        "phone": document.getElementById("phone").value,
        "address": document.getElementById("diachinhan").value,
        "note": document.getElementById("ghichudonhang").value,
    }
    var res =  await fetch('http://localhost:8080/api/invoice/user/create', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(orderDto)
    });
    if (res.status < 300) {
        swal({
            title: "Thông báo",
            text: "Đặt hàng thành công!",
            type: "success"
        },
        function() {
            window.location.href = 'taikhoan'
        });
    }
    else{
        if(res.status == 417){
            var result = await res.json();
            toast.error(result.defaultMessage);
        }
        else{
            toast.error("Đặt hàng thất bại");
        }
    }
}


async function createInvoice() {
    var uls = new URL(document.URL)
    var orderId = uls.searchParams.get("orderId");
    var requestId = uls.searchParams.get("requestId");

    var obj = JSON.parse(window.localStorage.getItem("orderinfor"));
    obj.requestIdMomo = requestId
    obj.orderIdMomo = orderId

    var res = await fetch('http://localhost:8080/api/invoice/user/create', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(obj)
    });
    if (res.status < 300) {
        document.getElementById("thanhcong").style.display = 'block'
    }
    if (res.status == 417) {
        var result = await res.json();
        document.getElementById("thatbai").style.display = 'block'
        document.getElementById("thanhcong").style.display = 'none'
        document.getElementById("errormess").innerHTML = result.defaultMessage
    }

}