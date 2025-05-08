var token = localStorage.getItem("token");
var size = 10;
async function loadCategory() {
    $('#example').DataTable().destroy();
    var url = 'http://localhost:8080/api/category/public/findAll';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td><img src="${list[i].image}" class="imgtable"></td>
                    <td>${list[i].name}</td>
                    <td class="sticky-col">
                        <i onclick="deleteCategory(${list[i].id})" class="fa fa-trash-alt iconaction"></i>
                        <a onclick="loadACategory(${list[i].id})" data-bs-toggle="modal" data-bs-target="#themdanhmuc"><i class="fa fa-edit iconaction"></i></a>
                    </td>
                </tr>`
    }
    document.getElementById("listcategory").innerHTML = main;
    $('#example').DataTable();
}

function clearInput(){
    document.getElementById("idcate").value = ''
    document.getElementById("catename").value = ''
    document.getElementById("imgpreview").src = '';
    linkImage = ""
}

async function loadACategory(id) {
    var url = 'http://localhost:8080/api/category/public/findById?id='+id;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
        })
    });
    var obj = await response.json();
    document.getElementById("idcate").value = obj.id
    document.getElementById("catename").value = obj.name
    document.getElementById("imgpreview").src = obj.image
    linkImage = obj.image
}

//var linkImage = "";
//async function saveCategory() {
//    document.getElementById("loading").style.display = 'block'
//    var idcate = document.getElementById("idcate").value
//    var catename = document.getElementById("catename").value
//    var imgtam = await uploadFile(document.getElementById("anhdm"));
//    if(imgtam != null){
//        linkImage = imgtam;
//    }
//    var url = 'http://localhost:8080/api/category/admin/create-update';
//    var category = {
//        "id": idcate,
//        "name": catename,
//        "image": linkImage,
//    }
//    const response = await fetch(url, {
//        method: 'POST',
//        headers: new Headers({
//            'Authorization': 'Bearer ' + token,
//            'Content-Type': 'application/json'
//        }),
//        body: JSON.stringify(category)
//    });
//    if (response.status < 300) {
//        toastr.success("Thành công!");
//        loadCategory();
//        $("#themdanhmuc").modal('hide');
//    }
//    if (response.status == exceptionCode) {
//        var result = await response.json()
//        toastr.warning(result.defaultMessage);
//    }
//    document.getElementById("loading").style.display = 'none'
//}
var linkImage = "";
async function saveCategory() {
    try {
        document.getElementById("loading").style.display = 'block';

        var idcate = document.getElementById("idcate").value;
        var catename = document.getElementById("catename").value;

        if (!catename) {
            throw new Error("Bạn phải nhập tên danh mục");
        }

        var imgtam = await uploadFile(document.getElementById("anhdm"));
        if (imgtam != null) {
            linkImage = imgtam;
        }

        var url = 'http://localhost:8080/api/category/admin/create-update';
        var category = {
            "id": idcate,
            "name": catename,
            "image": linkImage,
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(category)
        });

        if (response.ok) {
            toastr.success("Thành công!");
            loadCategory();
            $("#themdanhmuc").modal('hide');
        } else if (response.status === exceptionCode) {
            var result = await response.json();
            toastr.warning(result.defaultMessage);
        } else {
            throw new Error("Server responded with status " + response.status);
        }
    } catch (error) {
        console.error('Error:', error);
        toastr.error("Đã có lỗi xảy ra: " + error.message);
    } finally {
        document.getElementById("loading").style.display = 'none';
    }
}



async function deleteCategory(id) {
    var con = confirm("Bạn chắc chắn muốn xóa danh mục này?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/category/admin/delete?id=' + id;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("xóa danh mục thành công!");
        loadCategory();
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

