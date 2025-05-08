var token = localStorage.getItem("token");
const exceptionCode = 417;
async function loadMenu() {
    var dn = `<span class="nav-item dropdown pointermenu gvs navlight">
     <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="far fa-user-circle"></i> Tài khoản
        </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li><a class="dropdown-item" href="taikhoan">Trang Cá Nhân</a></li>
        <li onclick="logout()"><a class="dropdown-item" href="#">Đăng xuất</a></li>
    </ul>
</span>`
    if (token == null) {
       dn = `
           <a href="login" class="pointermenu gvs">
               <i class="fa fa-sign-in-alt"></i> Đăng nhập
           </a>
           <a href="regis" class="pointermenu gvs">
               <i class="fa fa-user-plus"></i> Đăng ký
           </a>
           <style>
           .pointermenu {
               text-decoration: none; /* Loại bỏ dấu gạch chân */
               color: white; /* Màu chữ mặc định là trắng */
               font-size: 1em;
               margin: 0 10px;
               padding: 5px 10px;
               border-radius: 5px;
               position: relative;
               transition: color 0.3s; /* Hiệu ứng chuyển màu chữ khi hover */
           }
   
           .pointermenu::after {
               content: '';
               position: absolute;
               bottom: 0;
               left: 0;
               width: 100%;
               height: 2px;
               background: linear-gradient(90deg, #2196f3, #ff5722, #ffeb3b, #4caf50);
               background-size: 200% 200%;
               transform: scaleX(0);
               transform-origin: right;
               transition: transform 0.3s;
           }
   
           .pointermenu:hover::after {
               transform: scaleX(1);
               transform-origin: left;
           }
   
           .pointermenu:hover {
               color: #ffeb3b; /* Màu chữ khi hover, ví dụ là màu vàng */
           }
   
           .pointermenu i {
               margin-right: 5px; /* Khoảng cách giữa icon và text */
           }
   
           .gvs {
               display: inline-block; /* Hiển thị inline-block */
           }
       </style>
       `;
    }
    var menu =
        `<nav class="navbar navbar-expand-lg navmain">
        <div class="container">
          <a class="navbar-brand" href="index">
            <img src="image/logo3.jpg" style="width: 50px; height: 50px; border-radius: 50%;" class="logoheader" />
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
             <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                 <li class="nav-item">
                     <a class="nav-link navlight" href="index">
                     <i class="fas fa-home"></i> Trang chủ</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link navlight" href="blog">
                     <i class="far fa-newspaper"></i> Bài viết</a>
                 </li>
                 <li class="nav-item">
                     <a class="nav-link navlight" href="product">
                     <i class="fas fa-coffee"></i> Sản Phẩm</a>
                 </li>
             </ul>
          </div>
          <div class="d-flex">
            <form action='product' class="searchheader">
                <input name='search' placeholder="Tìm kiếm?" class="inputsearchheader" />
                <button class="btnsearchheader"><i class="fa fa-search"></i></button>
            </form>
          </div>
          <div class="d-flex">
            ${dn}
          </div>
          <div class="d-flex">
          <a href="cart" class="pointermenu gvs"><i class="fa fa-shopping-bag"><span id='totalcartheader' class="cart-total">0</span></i></a>
          </div>
        </div>
      </nav>`
    document.getElementById("menu").innerHTML = menu
    // loadCategoryMenu();
    countCart();
    try { loadFooter(); } catch (error) {}
}


async function loadCategoryMenu() {
    var url = 'http://localhost:8080/api/category/public/findPrimaryCategory';
    const response = await fetch(url, {});
    var list = await response.json();
    var main = ''
    for (i = 0; i < list.length; i++) {
        main += `<li class="nav-item dropdown ddtog">
        <a class="nav-link menulink ddtog" href="#" id="cate1" role="button" data-bs-toggle="dropdown" aria-expanded="false">${list[i].name}</a>
        <ul class="dropdown-menu" aria-labelledby="cate1">`
        var listChild = list[i].categories;
        var mainChild = ''
        for (j = 0; j < listChild.length; j++) {
            mainChild += `<li><a class="dropdown-item" href="product?category=${listChild[j].id}">${listChild[j].name}</a></li>`
        }
        main += mainChild
        main += ` </ul></li>`
    }
    document.getElementById("mainmenut").innerHTML += main;
}

async function searchMenu() {
    var texts = document.getElementById("inputsearchmenu").value
    document.getElementById("listproductsearch").style.display = 'block'
    if (texts.length == 0) {
        document.getElementById("listproductsearch").style.display = 'none'
        return;
    }
    var url = 'http://localhost:8080/api/product/public/findByParam?page=0&size=50&q=' + texts;
    const response = await fetch(url, {});
    var result = await response.json();
    var list = result.content;
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<a href="detail?id=${list[i].id}&name=${list[i].alias}" class="tenspsearch"><div class="singlesearch col-md-12">
                    <div class="row">
                        <div class="col-2"><img class="imgprosearch" src="${list[i].imageBanner}"></div>
                        <div class="col-10">
                            <span class="tenspsearch">${list[i].name}</span><br>
                            <span class="tenspsearch">${formatmoney(list[i].price)}</span>
                        </div>
                    </div>
                </div></a>`
    }
    document.getElementById("listproductmn").innerHTML = main;
}
async function searchMenuMobile() {
    var texts = document.getElementById("inputsearchmobile").value
    if (texts.length == 0) {
        document.getElementById("listproductsearchmobile").innerHTML = '';
        return;
    }
    var url = 'http://localhost:8080/api/product/public/findByParam?page=0&size=50&q=' + texts;
    const response = await fetch(url, {});
    var result = await response.json();
    var list = result.content;
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="singlesearch col-md-12">
                    <div class="p40"><a href="detail?id=${list[i].id}&name=${list[i].alias}"><img class="imgprosearchp" src="${list[i].imageBanner}"></a></div>
                    <div class="p60">
                        <a href="detail?id=${list[i].id}&name=${list[i].alias}"><span class="tenspsearch">${list[i].name}</span><br>
                        <span class="tenspsearch">${formatmoney(list[i].price)}</span></a>
                    </div>
                </div>`
    }
    document.getElementById("listproductsearchmobile").innerHTML = main;
}

async function countCart() {
    if(token == null){
        return;
    }
    var url = 'http://localhost:8080/api/cart/user/count-cart' ;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status > 300){
        return;
    }
    var count = await response.text();
    document.getElementById("totalcartheader").innerHTML = count
}

function loadFooter() {
    var foo = `<footer class="text-center text-lg-start text-muted">
    <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div class="me-5 d-none d-lg-block"><span>Theo Dõi Chúng Tôi Tại:</span></div>
        <div>
        <a href="" class="me-4 text-reset"><i class="fab fa-facebook-f" style="color: #3b5998;"></i></a>
        <a href="" class="me-4 text-reset"><i class="fab fa-twitter" style="color: #00acee;"></i></a>
        <a href="" class="me-4 text-reset"><i class="fab fa-google" style="color: #db4437;"></i></a>
        <a href="" class="me-4 text-reset"><i class="fab fa-instagram" style="color: #e4405f;"></i></a>
        <a href="" class="me-4 text-reset"><i class="fab fa-linkedin" style="color: #0e76a8;"></i></a>
        <a href="" class="me-4 text-reset"><i class="fab fa-github" style="color: #171515;"></i></a>
        </div>
    </section>
    <section class="">
        <div class="text-center text-md-start mt-5">
        <div class="row mt-3">
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4"><i class="fas fa-gem me-3"></i>Male Fashion</h6>
            <p>
                Chúng Tôi Cung Cấp Dịch Vụ Thời Trang Giá Rẻ Cho Nam, Nữ Giới Trẻ Với Phong Cách Bắt Kịp Trend Hiện Nay
            </p>
            </div>
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Sản Phẩm</h6>
            <p><a href="#!" class="text-reset hover-underline">Uy Tín</a></p>
            <p><a href="#!" class="text-reset hover-underline">Chất Lượng</a></p>
            <p><a href="#!" class="text-reset hover-underline">Nguồn Gốc Rõ Ràng</a></p>
            <p><a href="#!" class="text-reset hover-underline">Giá Rẻ</a></p>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Dịch Vụ</h6>
            <p><a href="#!" class="text-reset hover-underline">24/7</a></p>
            <p><a href="#!" class="text-reset hover-underline">Bảo Hành 6 Tháng</a></p>
            <p><a href="#!" class="text-reset hover-underline">Free Ship</a></p>
            <p><a href="#!" class="text-reset hover-underline">Lỗi 1 Đổi 1</a></p>
            </div>
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6 class="text-uppercase fw-bold mb-4">Liên Hệ</h6>
            <p><i class="fas fa-home me-3"></i> Hà Nội, Việt Nam</p>
            <p><i class="fas fa-envelope me-3"></i> shop@gmail.com</p>
            <p><i class="fas fa-phone me-3"></i> +01 234 567 88</p>
            <p><i class="fas fa-print me-3"></i> +01 234 567 89</p>
            </div>
        </div>
        </div>
    </section>
    </footer>
    <div class="modal fade" id="modalsearch" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-xxl-down">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Tìm Kiếm Sản Phẩm</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="searchmenu">
                    <input id="inputsearchmobile" onkeyup="searchMenuMobile()" class="imputsearchmenu" placeholder="Tìm Kiếm">
                    <button class="btnsearchmenu"><i class="fa fa-search"></i></button>
                </div>
                <div id="listproductsearchmobile" class="row">
                    <!-- Các sản phẩm tìm kiếm sẽ được thêm vào đây -->
                </div>
            </div>
        </div>
        </div>
    </div>`;

    document.getElementById("footer").innerHTML = foo;

    var style = document.createElement('style');
    style.innerHTML = `
    /* CSS cho Footer */
    footer {
        background-color: #f8f9fa; /* Màu nền xám nhạt */
        color: #6c757d; /* Màu chữ nhạt */
        padding: 20px 0; /* Đệm dọc */
    }

    footer h6 {
        color: #343a40; /* Màu xám đậm cho tiêu đề */
        font-weight: bold; /* Chữ đậm cho tiêu đề */
    }

    footer p, footer a {
        color: #6c757d; /* Màu chữ nhạt */
        text-transform: capitalize; /* Viết hoa chữ đầu mỗi từ */
    }

    footer a {
        text-decoration: none; /* Bỏ gạch chân */
        position: relative; /* Tạo vị trí tương đối */
        overflow: hidden; /* Ẩn các phần tràn */
    }

    footer a:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: 0;
        left: 0;
        background-color: red; /* Màu đỏ */
        visibility: hidden;
        transform: scaleX(0);
        transition: all 0.3s ease-in-out;
    }

    footer a:hover:before {
        visibility: visible;
        transform: scaleX(1);
    }

    footer .border-bottom {
        border-color: #dee2e6 !important; /* Viền xám nhạt */
    }

    footer .fab {
        font-size: 1.5rem; /* Tăng kích thước icon */
        transition: transform 0.3s; /* Chuyển đổi mượt mà */
        border-radius: 50%; /* Bo tròn icon */
        padding: 10px; /* Đệm cho icon */
        background-color: #ffffff; /* Nền trắng cho icon */
    }

    footer .fab:hover {
        transform: scale(1.2); /* Phóng to khi hover */
        background-color: #f1f1f1; /* Nền sáng hơn khi hover */
    }

    /* CSS cho Modal */
    .modal-header {
        background-color: #007bff; /* Màu nền xanh cho tiêu đề */
        color: white; /* Màu chữ trắng */
    }

    .modal-header .btn-close {
        background-color: white; /* Nền trắng cho nút đóng */
        color: #007bff; /* Màu xanh cho nút đóng */
    }

    .modal-header .btn-close:hover {
        background-color: #0056b3; /* Xanh đậm hơn khi hover */
    }

    .modal-title {
        font-weight: bold; /* Tiêu đề đậm */
    }

    .searchmenu {
        display: flex; /* Bố cục flexbox */
        align-items: center; /* Căn giữa các item theo chiều dọc */
        justify-content: center; /* Căn giữa các item theo chiều ngang */
        margin-bottom: 20px; /* Đệm dưới */
    }

    .imputsearchmenu {
        flex: 1; /* Chiếm không gian còn lại */
        padding: 10px; /* Đệm */
        border: 1px solid #ced4da; /* Viền xám nhạt */
        border-radius: 4px; /* Bo tròn góc */
        margin-right: 10px; /* Đệm phải */
        font-size: 1rem; /* Kích thước chữ */
    }

    .btnsearchmenu {
        background-color: #007bff; /* Nền xanh */
        color: white; /* Chữ trắng */
        border: none; /* Bỏ viền */
        padding: 10px 20px; /* Đệm */
        border-radius: 4px; /* Bo tròn góc */
        cursor: pointer; /* Con trỏ pointer */
        transition: background-color 0.3s; /* Chuyển đổi màu m */
    }

    .btnsearchmenu i {
        font-size: 1rem; /* Kích thước icon */
    }

    .btnsearchmenu:hover {
        background-color: #0056b3; /* Xanh đậm hơn khi hover */
    }

    /* CSS cho các icon trong modal */
    .searchmenu i {
        color: white; /* Màu icon trắng */
    }
    `;

    document.head.appendChild(style);
}

async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace('login')
}


function formatmoney(money) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return VND.format(money);
}