const listFile = [];

async function loadProduct() {
    $('#example').DataTable().destroy();
    var url = 'http://localhost:8080/api/product/public/findAll-list';
    var idcate = document.getElementById("listdpar").value;
    if(idcate > 0){
        url += '?idCategory='+idcate;
    }
    const response = await fetch(url, {
        method: 'GET'
    });
    list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td><img src="${list[i].imageBanner}" style="width: 100px;"></td>
                    <td>${list[i].category.name}</td>
                    <td>${list[i].name}</td>
                    <td>${formatmoney(list[i].price)} / ${formatmoney(list[i].oldPrice)}</td>
                    <td>${list[i].quantity}</td>
                    <td>${list[i].quantitySold}</td>
                    <td class="sticky-col">
                        <i onclick="deleteProduct(${list[i].id})" class="fa fa-trash-alt iconaction"></i>
                        <a href="addproduct?id=${list[i].id}"><i class="fa fa-edit iconaction"></i><br></a>
                    </td>
                </tr>`
    }
    document.getElementById("listproduct").innerHTML = main
    $('#example').DataTable();
}


async function loadAProduct() {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    if (id != null) {
        var url = 'http://localhost:8080/api/product/public/findById?id=' + id;
        const response = await fetch(url, {
            method: 'GET'
        });
        var result = await response.json();
        console.log(result)
        document.getElementById("namesp").value = result.name
        document.getElementById("price").value = result.price
        document.getElementById("quantity").value = result.quantity
        document.getElementById("giacu").value = result.oldPrice
        document.getElementById("hansudung").value = result.expiry
        document.getElementById("donvitinh").value = result.unit
        document.getElementById("anhdathem").style.display = 'block'
        linkbanner = result.imageBanner
        document.getElementById("imgpreproduct").src = result.imageBanner
        tinyMCE.get('editor').setContent(result.description)
        var main = ''
        for (i = 0; i < result.productImages.length; i++) {
            main += `<div id="imgdathem${result.productImages[i].id}" class="col-md-3 col-sm-4 col-4">
                        <img style="width: 90%;" src="${result.productImages[i].linkImage}" class="image-upload">
                        <button onclick="deleteProductImage(${result.productImages[i].id})" class="btn btn-danger form-control">Xóa ảnh</button>
                    </div>`
        }
        document.getElementById("listanhdathem").innerHTML = main
        await loadAllCategorySelect();
        $("#listdpar").val(result.category.id).change();;
    }
}

async function saveProduct() {
    try {
        document.getElementById("loading").style.display = 'block'; // Hiển thị loading spinner

        var uls = new URL(document.URL); // Lấy URL hiện tại
        var id = uls.searchParams.get("id"); // Lấy giá trị của tham số "id" từ URL
        var url = 'http://localhost:8080/api/product/admin/create-update'; // Địa chỉ API để tạo hoặc cập nhật sản phẩm

        // Tải lên banner và lưu link
        var linhtam = await uploadFile(document.getElementById("imgbanner"));
        if (linhtam != null) {
            linkbanner = linhtam;
        }

        // Lấy giá trị từ các trường nhập liệu
        var name = document.getElementById("namesp").value;
        var price = document.getElementById("price-hidden").value; // Lấy giá trị từ input ẩn
        var oldPrice = document.getElementById("giacu-hidden").value; // Lấy giá trị từ input ẩn
        var unit = document.getElementById("donvitinh").value;
        var expiry = document.getElementById("hansudung").value;
        var quantity = document.getElementById("quantity").value;

        // Xóa thông báo lỗi trước đó
        document.querySelectorAll('.error-message').forEach(e => e.textContent = "");
        document.querySelectorAll('.form-control').forEach(e => e.classList.remove('error-input'));

        // Biến để kiểm tra xem có lỗi nào xảy ra hay không
        var hasError = false;
        var firstErrorElement = null;

        // Kiểm tra đầu vào và cập nhật thông báo lỗi
        if (!name) {
            document.getElementById("error-namesp").textContent = "Bạn chưa nhập tên sản phẩm";
            document.getElementById("namesp").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("namesp");
            hasError = true;
        }

        if (!price) {
            document.getElementById("error-price").textContent = "Bạn chưa nhập giá sản phẩm";
            document.getElementById("price").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("price");
            hasError = true;
        } else if (isNaN(price)) {
            document.getElementById("error-price").textContent = "Giá sản phẩm phải là số";
            document.getElementById("price").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("price");
            hasError = true;
        } else if (price <= 0) {
            document.getElementById("error-price").textContent = "Giá sản phẩm phải lớn hơn 0";
            document.getElementById("price").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("price");
            hasError = true;
        }

        if (!oldPrice) {
            document.getElementById("error-giacu").textContent = "Bạn chưa nhập giá cũ";
            document.getElementById("giacu").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("giacu");
            hasError = true;
        } else if (isNaN(oldPrice)) {
            document.getElementById("error-giacu").textContent = "Giá cũ phải là số";
            document.getElementById("giacu").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("giacu");
            hasError = true;
        } else if (oldPrice <= 0) {
            document.getElementById("error-giacu").textContent = "Giá cũ phải lớn hơn 0";
            document.getElementById("giacu").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("giacu");
            hasError = true;
        } else if (parseFloat(price) > parseFloat(oldPrice)) {
            document.getElementById("error-price").textContent = "Giá sản phẩm phải nhỏ hơn hoặc bằng giá cũ";
            document.getElementById("price").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("price");
            hasError = true;
        }

        if (!quantity) {
            document.getElementById("error-quantity").textContent = "Bạn chưa nhập số lượng";
            document.getElementById("quantity").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("quantity");
            hasError = true;
        } else if (isNaN(quantity)) {
            document.getElementById("error-quantity").textContent = "Số lượng phải là số";
            document.getElementById("quantity").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("quantity");
            hasError = true;
        } else if (quantity <= 0) {
            document.getElementById("error-quantity").textContent = "Số lượng phải lớn hơn 0";
            document.getElementById("quantity").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("quantity");
            hasError = true;
        }

        if (!expiry) {
            document.getElementById("error-hansudung").textContent = "Bạn chưa chọn hạn sử dụng";
            document.getElementById("hansudung").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("hansudung");
            hasError = true;
        }

        if (!unit) {
            document.getElementById("error-donvitinh").textContent = "Bạn chưa chọn đơn vị tính";
            document.getElementById("donvitinh").classList.add('error-input');
            if (!hasError) firstErrorElement = document.getElementById("donvitinh");
            hasError = true;
        }

        // Nếu có lỗi, ngăn chặn việc gửi form và ẩn loading spinner
        if (hasError) {
            document.getElementById("loading").style.display = 'none';
            if (firstErrorElement) firstErrorElement.focus();
            return;
        }

        // Tải lên các hình ảnh khác (nếu có)
        var listLinkImg = await uploadMultipleFileNotResp();

        // Tạo đối tượng sản phẩm để gửi lên API
        var product = {
            "product": {
                "id": id,
                "name": name,
                "imageBanner": linkbanner,
                "price": parseFloat(price), // Lấy giá trị từ input ẩn
                "oldPrice": parseFloat(oldPrice), // Lấy giá trị từ input ẩn
                "unit": unit,
                "expiry": expiry,
                "description": tinyMCE.get('editor').getContent(), // Lấy nội dung từ trình soạn thảo TinyMCE
                "quantity": parseFloat(quantity),
                "category": {
                    "id": document.getElementById("listdpar").value // Lấy ID danh mục từ trường chọn
                },
            },
            "linkLinkImages": listLinkImg // Danh sách link hình ảnh sản phẩm
        };

        console.log('Product Data:', product); // Log dữ liệu sản phẩm để kiểm tra

        // Gửi yêu cầu tạo/cập nhật sản phẩm đến API
        const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token, // Token xác thực
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(product) // Chuyển đổi đối tượng sản phẩm thành chuỗi JSON
        });

        console.log('Response Status:', response.status); // Log trạng thái phản hồi từ API
        var result = await response.json(); // Chuyển đổi phản hồi thành đối tượng JSON
        console.log('Response Result:', result); // Log kết quả phản hồi từ API

        // Hiển thị thông báo thành công hoặc thất bại
        if (response.status < 300) {
            swal({
                title: "Thông báo",
                text: "Thêm/sửa sản phẩm thành công",
                type: "success"
            }, function() {
                document.getElementById("loading").style.display = 'none'; // Ẩn loading spinner
                window.location.href = 'product'; // Chuyển hướng đến trang sản phẩm
            });
        } else {
            swal({
                title: "Thông báo",
                text: "Thêm/sửa sản phẩm thất bại",
                type: "error"
            }, function() {
                document.getElementById("loading").style.display = 'none'; // Ẩn loading spinner
            });
        }
    } catch (error) {
        console.error('Error:', error); // Log lỗi
        swal({
            title: "Lỗi",
            text: error.message,
            type: "error"
        }, function() {
            document.getElementById("loading").style.display = 'none'; // Ẩn loading spinner khi có lỗi
        });
    }
}


async function deleteProduct(id) {
    var con = confirm("Bạn chắc chắn muốn xóa sản phẩm này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/product/admin/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("xóa sản phẩm thành công!");
        await new Promise(r => setTimeout(r, 1000));
        window.location.reload();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}


async function deleteProductImage(id) {
    var con = confirm("Bạn muốn xóa ảnh này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/product-image/admin/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("xóa ảnh thành công!");
        document.getElementById("imgdathem" + id).style.display = 'none';
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

async function uploadMultipleFileNotResp() {
    const formData = new FormData()
    for (i = 0; i < listFile.length; i++) {
        formData.append("file", listFile[i])
    }
    var urlUpload = 'http://localhost:8080/api/public/upload-multiple-file';
    const res = await fetch(urlUpload, {
        method: 'POST',
        body: formData
    });
    if (res.status < 300) {
        return await res.json();
    } else {
        return [];
    }
}



function priviewImg(e) {
    var dv = e.parentNode.parentNode;
    var img = dv.getElementsByClassName("divimgpre")[0].getElementsByClassName("imgpreview")[0]
    const [file] = e.files
    if (file) {
        img.src = URL.createObjectURL(file)
    }
}

async function loadAllCategorySelect() {
    var url = 'http://localhost:8080/api/category/public/findAll';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("listdpar").innerHTML = main
    const ser = $("#listdpar");
    ser.select2({
        placeholder: "Chọn danh mục sản phẩm",
    });
}

async function loadAllCategoryProduct() {
    var url = 'http://localhost:8080/api/category/public/findAll';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = `<option value="-1">Tất cả sản phẩm</option>`;
    for (i = 0; i < list.length; i++) {
        main += `<option value="${list[i].id}">${list[i].name}</option>`;
    }
    document.getElementById("listdpar").innerHTML = main
    const ser = $("#listdpar");
    ser.select2({
        placeholder: "Chọn danh mục sản phẩm",
    });
}

function loadInit() {
    $('input#choosefile').change(function() {
        var files = $(this)[0].files;
    });
    document.querySelector('#choosefile').addEventListener("change", previewImages);

    function previewImages() {
        var files = $(this)[0].files;
        for (i = 0; i < files.length; i++) {
            listFile.push(files[i]);
        }

        var preview = document.querySelector('#preview');

        // if (this.files) {
        //     [].forEach.call(this.files, readAndPreview);
        // }
        for (i = 0; i < files.length; i++) {
            readAndPreview(files[i]);
        }

        function readAndPreview(file) {


            var reader = new FileReader(file);

            reader.addEventListener("load", function() {
                document.getElementById("chon-anhs").className = 'col-sm-3';
                document.getElementById("chon-anhs").style.height = '100px';
                document.getElementById("chon-anhs").style.marginTop = '5px';
                document.getElementById("choose-image").style.height = '120px';
                document.getElementById("numimage").innerHTML = '';
                document.getElementById("camera").style.fontSize = '20px';
                document.getElementById("camera").style.marginTop = '40px';
                document.getElementById("camera").className = 'fas fa-plus';
                document.getElementById("choose-image").style.width = '90%';

                var div = document.createElement('div');
                div.className = 'col-md-3 col-sm-6 col-6';
                div.style.height = '120px';
                div.style.paddingTop = '5px';
                div.marginTop = '100px';
                preview.appendChild(div);

                var img = document.createElement('img');
                img.src = this.result;
                img.style.height = '85px';
                img.style.width = '90%';
                img.className = 'image-upload';
                img.style.marginTop = '5px';
                div.appendChild(img);

                var button = document.createElement('button');
                button.style.height = '30px';
                button.style.width = '90%';
                button.innerHTML = 'xóa'
                button.className = 'btn btn-warning';
                div.appendChild(button);

                button.addEventListener("click", function() {
                    div.remove();
                    console.log(listFile.length)
                    for (i = 0; i < listFile.length; i++) {
                        if (listFile[i] === file) {
                            listFile.splice(i, 1);
                        }
                    }
                    console.log(listFile.length)
                });
            });

            reader.readAsDataURL(file);

        }

    }

}
