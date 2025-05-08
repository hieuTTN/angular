function handleCredentialResponse(response) {
    console.log(response);
    console.log(response.credential);
    sendLoginRequestToBackend(response.credential);
}

async function sendLoginRequestToBackend(accessToken) {
    var response = await fetch('http://localhost:8080/api/login/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: accessToken
    })
    var result = await response.json();

    if (response.status < 300) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        if (result.user.authorities.name === "ROLE_ADMIN") {
            window.location.href = 'admin/index';
        }
        if (result.user.authorities.name === "ROLE_EMPLOYEE") {
            window.location.href = 'employee/invoice';
        }
        if (result.user.authorities.name === "ROLE_USER") {
            window.location.href = 'index';
        }
    }
    if (response.status == exceptionCode) {
        toastr.warning(result.defaultMessage);
    }
}

async function login() {
    var url = 'http://localhost:8080/api/login'
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var user = {
        "username": username,
        "password": password
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await response.json();
    if (response.status < 300) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        if (result.user.authorities.name === "ROLE_ADMIN") {
            window.location.href = 'admin/index';
        }
        if (result.user.authorities.name === "ROLE_USER") {
            window.location.href = 'index';
        }
        if (result.user.authorities.name === "ROLE_EMPLOYEE") {
            window.location.href = 'employee/taikhoan';
        }
    }
    if (response.status == exceptionCode) {
        if (result.errorCode == 300) {
            swal({
                title: "Thông báo",
                text: "Tài khoản chưa được kích hoạt, đi tới kích hoạt tài khoản!",
                type: "warning"
            }, function() {
                window.location.href = 'confirm?email=' + username
            });
        } else {
            toastr.warning(result.defaultMessage);
        }
    }
}

async function regis() {
    var url = 'http://localhost:8080/api/regis'
    var email = document.getElementById("email").value
    var fullname = document.getElementById("fullname").value
    var phone = document.getElementById("phone").value
    var password = document.getElementById("password").value
    var address = document.getElementById("address").value
    if(validatePhoneNumber(phone) == false){
        toastr.error("Số điện thoại không đúng");
    }
    var user = {
        "fullname": fullname,
        "email": email,
        "phone": phone,
        "password": password,
        "address" :address,
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(user)
    });
    var result = await response.json();
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "đăng ký thành công! hãy check email của bạn!",
                type: "success"
            },
            function() {
                window.location.href = 'confirm?email=' + email
            });
    }
    if (response.status == exceptionCode) {
        toastr.warning(result.defaultMessage);
    }
}

function validatePhoneNumber(phoneNumber) {
    phoneNumber = phoneNumber.replace(/\D/g, '');
    if (phoneNumber.length !== 10) {
        return false;
    }
    const regex = /^[0-9]{10}$/;
    return regex.test(phoneNumber);
}


// async function confirmAccount() {
//     var uls = new URL(document.URL)
//     var email = uls.searchParams.get("email");
//     var key = document.getElementById("maxacthuc").value;
//     var url = 'http://localhost:8080/api/active-account?email=' + email + '&key=' + key
//     const res = await fetch(url, {
//         method: 'POST'
//     });
//     if (res.status < 300) {
//         swal({
//                 title: "Thông báo",
//                 text: "Xác nhận tài khoản thành công!",
//                 type: "success"
//             },
//             function() {
//                 window.location.href = 'login'
//             });
//     }
//     if (res.status == exceptionCode) {
//         var result = await res.json()
//         toastr.warning(result.defaultMessage);
//     }
// }
async function confirmAccount() {
    // Lấy tham số email từ URL
    var uls = new URL(document.URL);
    var email = uls.searchParams.get("email");

    // Lấy giá trị từ các trường OTP
    var otpFields = document.querySelectorAll('.otp-input');
    var otpCode = Array.from(otpFields).map(input => input.value).join('');

    // Chuẩn bị URL cho API
    var url = `http://localhost:8080/api/active-account?email=${email}&key=${otpCode}`;

    // Gọi API
    try {
        const res = await fetch(url, { method: 'POST' });

        if (res.ok) {
            // Nếu thành công
            Swal.fire({
                title: "Thông báo",
                text: "Xác nhận tài khoản thành công!",
                icon: "success"
            }).then(() => {
                // Chuyển hướng đến trang đăng nhập sau khi thông báo
                window.location.href = 'login';
            });
        } else if (res.status === 400) { // Giả sử mã lỗi 400 cho phản hồi lỗi, thay đổi nếu cần
            var result = await res.json();
            toastr.warning(result.defaultMessage);
        } else {
            // Xử lý các mã trạng thái khác nếu cần
            toastr.error("Có lỗi xảy ra, vui lòng thử lại.");
        }
    } catch (error) {
        // Xử lý lỗi mạng hoặc lỗi khác
        toastr.error("Có lỗi xảy ra, vui lòng thử lại.");
    }
}


async function forgorPassword() {
    var email = document.getElementById("email").value
    var url = 'http://localhost:8080/api/public/quen-mat-khau?email=' + email
    const res = await fetch(url, {
        method: 'POST'
    });
    if (res.status < 300) {
        swal({
                title: "",
                text: "Kiểm tra email của bạn",
                type: "success"
            },
            function() {
                window.location.replace("login")
            });
    }
    if (res.status == exceptionCode) {
        var result = await res.json()
        toastr.warning(result.defaultMessage);
    }
}

async function datLaiMatKhau() {
    var password = document.getElementById("password").value
    var repassword = document.getElementById("repassword").value
    if(password != repassword){
        toastr.warning("Mật khẩu không trùng khớp");
        return;
    }
    var uls = new URL(document.URL)
    var email = uls.searchParams.get("email");
    var key = uls.searchParams.get("key");
    var url = 'http://localhost:8080/api/public/dat-lai-mat-khau?email=' + email+'&key='+key+'&password='+password
    const res = await fetch(url, {
        method: 'POST'
    });
    if (res.status < 300) {
        swal({
                title: "",
                text: "Đặt lại mật khẩu thành công",
                type: "success"
            },
            function() {
                window.location.replace("login")
            });
    }
    if (res.status == exceptionCode) {
        var result = await res.json()
        toastr.warning(result.defaultMessage);
    }
}


async function changePassword() {
    var token = localStorage.getItem("token");
    var oldpass = document.getElementById("oldpass").value
    var newpass = document.getElementById("newpass").value
    var renewpass = document.getElementById("renewpass").value
    var url = 'http://localhost:8080/api/user/change-password';
    if (newpass != renewpass) {
        alert("mật khẩu mới không trùng khớp");
        return;
    }
    var passw = {
        "oldPass": oldpass,
        "newPass": newpass
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(passw)
    });
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "cập nhật mật khẩu thành công, hãy đăng nhập lại",
                type: "success"
            },
            function() {
                window.location.reload();
            });
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}


async function updateAccount() {
    var token = localStorage.getItem("token");
    var fullname= document.getElementById("fullName").value
    var phone= document.getElementById("phone").value
    var address= document.getElementById("address").value
    var url = 'http://localhost:8080/api/user/change-infor?fullName=' + fullname+'&phone='+phone+'&address='+address
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        swal({
                title: "Thông báo",
                text: "cập nhật thông tin thành công",
                type: "success"
            },
            function() {
                window.location.reload();
            });
    }
    if (response.status == exceptionCode) {
        var result = await response.json()
        toastr.warning(result.defaultMessage);
    }
}

async function loadUserInforUpdate() {
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/user/user-logged';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        var user = await response.json();
        document.getElementById("fullName").value = user.fullname;
        document.getElementById("phone").value = user.phone;
        document.getElementById("address").value = user.address;
    }
}


async function loadUserInforTaiKhoan() {
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/user/user-logged';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    });
    if (response.status < 300) {
        var user = await response.json();
        console.log(user)
        document.getElementById("fullnamacc").innerHTML = user.fullname != null ? "Xin chào: "+user.fullname: "Xin chào: "+user.email;
        if(user.avatar != null && user.avatar != ""){
            document.getElementById("avataracc").src = user.avatar;
        }
    }
}


async function loadMyInfor() {
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/user/user-logged';
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    });
    if (response.status < 300) {
        var user = await response.json();
        document.getElementById("fullnamacc").innerHTML = user.username;
        document.getElementById("fullname").value = user.fullname;
        document.getElementById("phone").value = user.phone;
        document.getElementById("address").value = user.address;
    }
}

async function changeInfor() {
    var token = localStorage.getItem("token");
    var fullname = document.getElementById("fullname").value ;
    var phone = document.getElementById("phone").value;
    var address =document.getElementById("address").value;
    var url = `http://localhost:8080/api/user/change-infor-user?fullname=${fullname}&phone=${phone}&address=${address}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if (response.status < 300) {
        toastr.success("Thay đổi thông tin thành công");
        window.location.reload();
    }
    else {
        toastr.error("Thất bại");
        
    }
}

async function changeAvt(){
    const filePath = document.getElementById('chooseImage')
    const formData = new FormData()
    formData.append("file", filePath.files[0])
    var urlUpload = 'http://localhost:8080/api/user/change-avatar';
    const res = await fetch(urlUpload, {
        method: 'POST',
        body: formData
    });
    if (res.status < 300) {
        var linkImage = await res.text();
        document.getElementById("avataracc").src = linkImage;
    }
}


async function loadInforUserCart() {
    var token = localStorage.getItem("token");
    var url = 'http://localhost:8080/api/user/user-logged';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
    });
    if (response.status < 300) {
        var user = await response.json();
        document.getElementById("fullname").value = user.fullname;
        document.getElementById("phone").value = user.phone;
        document.getElementById("diachinhan").value = user.address;
    }
    
}
