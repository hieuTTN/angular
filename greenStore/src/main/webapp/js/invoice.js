async function loadMyInvoice() {
    var url = 'http://localhost:8080/api/invoice/user/find-by-user';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
        <td onclick="loadInvoiceDetail(${list[i].id})"><a data-bs-toggle="modal" data-bs-target="#modaldeail" class="yls pointer-event">#${list[i].id}</a></td>
        <td class="floatr">${list[i].createdTime} ${list[i].createdDate}</td>
        <td>${list[i].address}</td>
        <td class="floatr"><span class="yls">${formatmoney(list[i].totalAmount)}</span></td>
        <td><span class="span_pending">${list[i].payType == "MOMO" ? "<span class='Paid'>Đã thanh toán</span>" : "<span class='UnPaid'>Thanh toán khi nhận hàng (COD)</span>"}</span></td>
        <td class="floatr"><span class="span_">${list[i].statusInvoice != 'DA_GUI'?list[i].statusInvoice:
            `<label class="checkbox-custom">Đã nhận 
                <input onchange="confirmInvoice(${list[i].id})" type="checkbox">
                <span class="checkmark-checkbox"></span>
            </label>`}</span></td>
        <td>
        ${(list[i].statusInvoice == "DANG_CHO_XAC_NHAN" || list[i].statusInvoice == "DA_XAC_NHAN") && list[i].payType == "COD" ?
                `<i onclick="cancelInvoice(${list[i].id})" class="fa fa-trash huydon"></i>` : ''}
        </td>
    </tr>`
    }
    document.getElementById("listinvoice").innerHTML = main;
    document.getElementById("sldonhang").innerHTML = list.length + " đơn hàng";
}


async function confirmInvoice(idinvoice) {
    var url = 'http://localhost:8080/api/invoice/user/confirm?idInvoice=' + idinvoice;
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (res.status < 300) {
        toastr.success("Cảm ơn bạn đã tin tưởng sử dụng sản phẩm của chúng tôi!");
        loadMyInvoice();
    }
    if (res.status == exceptionCode) {
        var result = await res.json()
        toastr.warning(result.defaultMessage);
    }
}

async function loadInvoiceDetail(id) {
    // URL để lấy chi tiết hóa đơn theo id
    var url = 'http://localhost:8080/api/invoice-detail/user/find-by-invoice?idInvoice=' + id;

    // Gửi yêu cầu fetch để lấy dữ liệu chi tiết hóa đơn
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token // Thêm header Authorization với token
        })
    });

    // Chuyển đổi phản hồi JSON thành đối tượng JavaScript
    var list = await res.json();
    var main = ''

    // Duyệt qua danh sách chi tiết hóa đơn và tạo nội dung HTML để hiển thị
    for (i = 0; i < list.length; i++) {
        main += `<tr>
        <td><img src="${list[i].product.imageBanner}" class="imgdetailacc"></td>
        <td>
            <a href="../detail?id=${list[i].product.id}" class="text-decoration-none">${list[i].product.name}</a><br>
            <span class="slmobile">SL: ${list[i].quantity}</span>
        </td>
        <td>${formatmoney(list[i].price)}</td>
        <td class="sldetailacc">${list[i].quantity}</td>
        <td class="pricedetailacc yls">${formatmoney(list[i].price * list[i].quantity)}</td>
    </tr>`
    }

    // Chèn nội dung HTML đã tạo vào phần tử có id="listDetailinvoice"
    document.getElementById("listDetailinvoice").innerHTML = main

    // URL để lấy thông tin hóa đơn theo id
    var url = 'http://localhost:8080/api/invoice/all/findById?id=' + id;

    // Gửi yêu cầu fetch để lấy dữ liệu hóa đơn
    const resp = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token // Thêm header Authorization với token
        })
    });

    // Chuyển đổi phản hồi JSON thành đối tượng JavaScript
    var result = await resp.json();

    // Hiển thị thông tin hóa đơn vào các phần tử tương ứng
    document.getElementById("ngaytaoinvoice").innerHTML = result.createdTime + " " + result.createdDate
    document.getElementById("trangthaitt").innerHTML = result.payType == "MOMO" ? "<span class='Paid'>Đã thanh toán</span>" : "<span class='UnPaid'>Thanh toán khi nhận hàng (COD)</span>"
    document.getElementById("ttvanchuyen").innerHTML = result.statusInvoice
    document.getElementById("addnhan").innerHTML = result.address
    document.getElementById("phonenhan").innerHTML = result.phone
    document.getElementById("ghichunh").innerHTML = result.note
    document.getElementById("loaithanhtoan").innerHTML = result.payType == "MOMO" ? 'Thanh toán bằng momo' : 'Thanh toán khi nhận hàng (COD)'

    // Hiển thị tên người nhận vào phần tử có id="tennguoinhan"
    document.getElementById("tennguoinhan").innerHTML = result.receiverName
}

async function cancelInvoice(id) {
    var con = confirm("xác nhận hủy đơn hàng này");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/invoice/user/cancel-invoice?id=' + id;
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (res.status < 300) {
        toastr.success("Hủy đơn hàng thành công!");
        loadMyInvoice();
    }
    if (res.status == exceptionCode) {
        var result = await res.json()
        toastr.warning(result.defaultMessage);
    }
}