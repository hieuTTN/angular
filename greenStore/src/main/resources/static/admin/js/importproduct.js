var token = localStorage.getItem("token");
async function loadImportProduct() {
    $('#example').DataTable().destroy();
    var from = document.getElementById("start").value
    var to = document.getElementById("end").value
    var idproduct = document.getElementById("listproduct").value
    var url = 'http://localhost:8080/api/import-product/admin/findAll?s=1';
    if (from != null && to != null && from != "" && to != "") {
        url += '&from=' + from + '&to=' + to;
    }
    if (idproduct > 0) {
        url += '&idproduct='+idproduct;
    }
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
                    <td>${list[i].id}</td>
                    <td>${list[i].product.name}</td>
                    <td>${list[i].quantity}</td>
                    <td>${formatmoney(list[i].importPrice)}</td>
                    <td>${list[i].importDate}</td>
                    <td>${list[i].description}</td>
                    <td class="sticky-col">
                        <i onclick="deleteImportProduct(${list[i].id})" class="fa fa-trash-alt iconaction"></i>
                        <a href="addimportproduct?id=${list[i].id}"><i class="fa fa-edit iconaction"></i></a>
                    </td>
                </tr>`
    }
    document.getElementById("listImport").innerHTML = main
    $('#example').DataTable();
}

async function loadAImportProduct() {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    if (id != null) {
        var url = 'http://localhost:8080/api/import-product/admin/findById?id=' + id;
        const response = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token
            })
        });
        var result = await response.json();
        document.getElementById("gianhap").value = result.importPrice
        document.getElementById("soluong").value = result.quantity
        tinyMCE.get('editor').setContent(result.description)
        await loadAllProduct();
        $("#listproduct").val(result.product.id).change();;
    }
}

function filterImportProduct() {
    var idproduct = document.getElementById("sanpham").value;
    var from = document.getElementById("start").value;
    var to = document.getElementById("end").value;
    if (idproduct == -1) {
        idproduct = null
    }
    if (from == "" || to == "") {
        from = null;
        to = null;
    }
    loadImportP(0, idproduct, from, to);
}

async function saveImportPro() {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var soluong = document.getElementById("soluong").value
    var gianhap = document.getElementById("gianhap").value
    var productId = document.getElementById("listproduct").value
    var description = tinyMCE.get('editor').getContent()
    if(soluong == "" || soluong < 1){
        toastr.warning("Số lượng phải > 0");
        return;
    }
    if(gianhap == "" || gianhap < 1){
        toastr.warning("Giá nhập phải > 0");
        return;
    }
    var url = 'http://localhost:8080/api/import-product/admin/create';
    importPro = {
        "id": id,
        "quantity": soluong,
        "importPrice": gianhap,
        "description": description,
        "product": {
            "id": productId
        }
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(importPro)
    });
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "thêm/sửa đơn nhập thành công!",
                type: "success"
            },
            function() {
                window.location.href = 'importproduct'
            });
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}


async function loadAllProduct() {
    var url = 'http://localhost:8080/api/product/public/findAll-list';
    const response = await fetch(url, {
        method: 'GET'
    });
    list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("listproduct").innerHTML = main
    const ser = $("#listproduct");
    ser.select2({
        placeholder: "Chọn sản phẩm",
    });
}

async function loadAllProductSelect() {
    var url = 'http://localhost:8080/api/product/public/findAll-list';
    const response = await fetch(url, {
        method: 'GET'
    });
    list = await response.json();
    var main = '<option value="-1">Tất cả sản phẩm</option>';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("listproduct").innerHTML = main
    const ser = $("#listproduct");
    ser.select2({
        placeholder: "Chọn sản phẩm",
    });
}


async function deleteImportProduct(id) {
    var con = confirm("Bạn chắc chắn muốn xóa đơn nhập này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/admin/deleteImportProduct?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("xóa thành công!");
        loadImportProduct();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}