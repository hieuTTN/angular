
// Lấy token từ localStorage
var token = localStorage.getItem("token");

// Khai báo biến size
var size = 20;

// Hàm bất đồng bộ để tải toàn bộ người dùng
async function loadAllUser() {
    // Hủy DataTable hiện tại nếu đã được khởi tạo
    $('#example').DataTable().destroy();
    
    // Khởi tạo URL để lấy dữ liệu người dùng
    var url = 'http://localhost:8080/api/admin/get-user-by-role';
    
    // Lấy giá trị của role từ ô input
    var role = document.getElementById("role").value;
    
    // Nếu role không rỗng, thêm nó vào URL
    if (role != "") {
        url += '?role=' + role;
    }
    
    // Gửi yêu cầu GET đến server với URL và headers chứa token
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    
    // Chuyển đổi dữ liệu phản hồi từ server sang JSON
    var listUser = await response.json();
    
    // Khởi tạo biến main để chứa nội dung HTML của bảng
    var main = '';
    
    // Lặp qua danh sách người dùng
    for (i = 0; i < listUser.length; i++) {
        // Khởi tạo biến btn để chứa nút khóa/mở khóa
        var btn = '';
        
        // Kiểm tra trạng thái kích hoạt của người dùng và tạo nút tương ứng
        if (listUser[i].actived == 0) {
            btn = `<td class="sticky-col"><button onclick="lockOrUnlock(${listUser[i].id},0)" class="btn btn-danger"><i class="fa fa-unlock"></i> mở khóa</button></td>`;
        } else {
            btn = `<td class="sticky-col"><button onclick="lockOrUnlock(${listUser[i].id},1)" class="btn btn-primary"><i class="fa fa-lock"></i> Khóa</button></td>`;
        }
        
        // Nếu người dùng có vai trò là ADMIN, không hiển thị nút
        if (listUser[i].authorities.name == "ROLE_ADMIN") {
            btn = '<td class="sticky-col"></td>';
        }

        // Xác định tên hiển thị của vai trò
        var roleDisplayName = '';
        if (listUser[i].authorities.name == "ROLE_ADMIN") {
            roleDisplayName = 'ADMIN';
        }if (listUser[i].authorities.name == "ROLE_EMPLOYEE") {
            roleDisplayName = 'Nhân Viên';
        }if (listUser[i].authorities.name == "ROLE_USER" ){
            roleDisplayName = 'Khách Hàng';
        }

        // Thêm dòng mới vào nội dung bảng
        main += `<tr>
                    <td>${listUser[i].id}</td>
                    <td>${listUser[i].email}</td>
                    <td>${listUser[i].fullname}</td>
                    <td>${listUser[i].phone}</td>
                    <td>${listUser[i].createdDate}</td>
                    <td>${roleDisplayName}</td>
                    ${btn}
                </tr>`;
    }
    
    // Cập nhật nội dung bảng với các dòng đã tạo
    document.getElementById("listuser").innerHTML = main;
    
    // Khởi tạo lại DataTable
    $('#example').DataTable();
}


function filteruser() {
    loadAllUser(0, "");
}

function searchTable() {
    var val = document.getElementById("searchtable").value;
    loadAllUser(0, val);
}


async function lockOrUnlock(id, type) {
    var con = confirm("Xác nhận hành động?");
    if (con == false) {
        return;
    }
    var url = 'http://localhost:8080/api/admin/lockOrUnlockUser?id=' + id;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        var mess = '';
        if (type == 1) {
            mess = 'Khóa thành công'
        } else {
            mess = 'Mở khóa thành công'
        }
        swal({
                title: "Thông báo",
                text: mess,
                type: "success"
            },
            function() {
                window.location.reload();
            });
    } else {
        swal({
                title: "Thông báo",
                text: "hành động thất bại",
                type: "error"
            },
            function() {
                window.location.reload();
            });
    }
}


async function addAdmin() {
    var url = 'http://localhost:8080/api/admin/addaccount'
    var fullname = document.getElementById("fullname").value
    var phone = document.getElementById("phone").value
    var email = document.getElementById("email").value
    var password = document.getElementById("pass").value
    var repassword = document.getElementById("repass").value
    var user = {
        "fullname": fullname,
        "phone": phone,
        "email": email,
        "password": password,
        "authorities":{
            "name":document.getElementById("roleadd").value
        }
    }
    if (password != repassword) {
        alert("Mật khẩu không trùng khớp")
        return;
    }
    const res = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await res.json();
    if (res.status < 300) {
        swal({
                title: "Thông báo",
                text: "Tạo tài khoản thành công!",
                type: "success"
            },
            function() {
                window.location.reload();
            });
    }
    if (res.status == exceptionCode) {
        toastr.warning(result.defaultMessage);
    }
}