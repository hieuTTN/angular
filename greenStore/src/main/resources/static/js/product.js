async function sanPhamGiamGia() {
    var url = 'http://localhost:8080/api/product/public/sanPhamKhuyenMai?page=0&size=5';
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    var list = result.content;
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-20p col-md-4 col-sm-6 col-6">
        <div class="singlesp">
            <div class="topspindex">
                <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgproindex"></a>
                <a href="detail?id=${list[i].id}" class="tenspindex">${list[i].name}</a>
            </div>
            <div class="divgiaspindex">
                <div class="row">
                    <div class="col-sm-6">
                        <span class="curprice">${formatmoney(list[i].price)}</span>
                        <span class="oldpricesp">${formatmoney(list[i].oldPrice)}</span>
                    </div>
                    <div class="col-sm-6">
                        <button onclick="addCart(${list[i].id})" class="btngiohangsp"><i class="fa fa-shopping-cart"></i></button>
                    </div>
                </div>
            </div>
            <span class="phantramgiam">-${tinhGiamGia(list[i].price, list[i].oldPrice)} %</span>
        </div>
    </div>`
    }
    document.getElementById("spkhuyenmaiindex").innerHTML = main;
}


var size = 5;
async function loadSpBanChay(page) {
    var url = 'http://localhost:8080/api/product/public/san-pham-ban-chay-page?page='+page+'&size='+size;
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result)
    var list = result.content;
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-20p col-md-4 col-sm-6 col-6">
        <div class="singlesp">
            <div class="topspindex">
                <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgproindex"></a>
                <a href="detail?id=${list[i].id}" class="tenspindex">${list[i].name}</a>
            </div>
            <div class="divgiaspindex">
                <div class="row">
                    <div class="col-sm-6">
                        <span class="curprice">${formatmoney(list[i].price)}</span>
                        <span class="oldpricesp">${list[i].oldPrice > 0 ? formatmoney(list[i].oldPrice) : ''}</span>
                    </div>
                    <div class="col-sm-6">
                        <button onclick="addCart(${list[i].id})" class="btngiohangsp"><i class="fa fa-shopping-cart"></i></button>
                    </div>
                </div>
            </div>
            <span class="dabanslindex">Đã bán: ${list[i].quantitySold}</span>
        </div>
    </div>`
    }
    document.getElementById("listspbanchay").innerHTML += main;
    if(result.last == false){
        document.getElementById("btnsanphambanchay").onclick=function(){
            loadSpBanChay(Number(page) + Number(1));
        }
    }
    else{
        document.getElementById("btnsanphambanchay").onclick=function(){
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }
}


async function loadSpMoi(page) {
    var url = 'http://localhost:8080/api/product/public/san-pham-moi?page='+page+'&size='+size;
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result)
    var list = result.content;
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-20p col-md-4 col-sm-6 col-6">
        <div class="singlesp">
            <div class="topspindex">
                <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgproindex"></a>
                <a href="detail?id=${list[i].id}" class="tenspindex">${list[i].name}</a>
            </div>
            <div class="divgiaspindex">
                <div class="row">
                    <div class="col-sm-6">
                        <span class="curprice">${formatmoney(list[i].price)}</span>
                        <span class="oldpricesp">${formatmoney(list[i].oldPrice)}</span>
                    </div>
                    <div class="col-sm-6">
                        <button onclick="addCart(${list[i].id})" class="btngiohangsp"><i class="fa fa-shopping-cart"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }
    document.getElementById("listspmoi").innerHTML += main;
    if(result.last == false){
        document.getElementById("btnsanphammoi").onclick=function(){
            loadSpMoi(Number(page) + Number(1));
        }
    }
    else{
        document.getElementById("btnsanphammoi").onclick=function(){
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }
}

async function loadAproduct(){
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var url = 'http://localhost:8080/api/product/public/findById?id='+id;
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    document.getElementById("detailnamepro").innerHTML = result.name
    document.getElementById("pricedetail").innerHTML = formatmoney(result.price) +"/ "+result.unit
    document.getElementById("hansudung").innerHTML = result.expiry
    document.getElementById("quansale").innerHTML = "Đã bán: "+result.quantitySold;
    document.getElementById("imgdetailpro").src = result.imageBanner
    document.getElementById("descriptiondetail").innerHTML = result.description
    var main = `<div class="col-sm-2">
    <div onclick="clickImgdetail(this,'${result.imageBanner}')" class="divimagedetail imgactive"><img src="${result.imageBanner}" class="imgdetailpro"></div>
</div>`
    for(i=0; i<result.productImages.length; i++){
        main += `<div class="col-sm-2">
                    <div onclick="clickImgdetail(this,'${result.productImages[i].linkImage}')" class="divimagedetail"><img src="${result.productImages[i].linkImage}" class="imgdetailpro"></div>
                </div>`
    }
    document.getElementById("listimgdetail").innerHTML = main


    document.getElementById("btnaddcart").onclick = function(){
        addCart(result.id);
    }
    
}

async function clickImgdetail(e, src) {
    var img = document.getElementsByClassName("divimagedetail");
    for (i = 0; i < img.length; i++) {
        document.getElementsByClassName("divimagedetail")[i].classList.remove('imgactive');
    }
    e.classList.add('imgactive')
    document.getElementById("imgdetailpro").src = src
}

function tinhGiamGia(price, oldPrice){
    var giamoi = (oldPrice - price)/oldPrice * 100;
    return giamoi.toFixed(0)
}

async function loadSanPhamLienQuan() {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var url = 'http://localhost:8080/api/product/public/san-pham-lien-quan?id='+id
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-3 col-md-6 col-sm-12 col-12">
        <div class="singleproductlq">
           <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgproductlq"></a>
           <a href="detail?id=${list[i].id}" class="nameproductlq">${list[i].name}</a>
           <span class="priceproductlq">${formatmoney(list[i].price)}</span>
           <button onclick="addCart(${list[i].id})" class="btncartsplq">Giỏ hàng</button>
        </div>
   </div>`
    }
    document.getElementById("listsplienquan").innerHTML += main;
}

var sizefilter = 12
async function locSanPham(page) {
    var search = document.getElementById("search").value
    var danhmuc = document.getElementById("danhmuc").value
    var mucgia = document.getElementById("mucgia").value
    var sort = document.getElementById("sort").value
    
    var url = 'http://localhost:8080/api/product/public/search-full-san-pham?page=' + page + '&size=' + sizefilter+'&sort='+sort;
    var dto = {
        "search":search,
        "category":danhmuc == ""?null:danhmuc,
        "small":mucgia.split("-")[0],
        "large":mucgia.split("-")[1],
    }
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(dto)
    });
    var result = await response.json();
    var list = result.content;
    var totalPage = result.totalPages;

    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="col-lg-2 col-md-3 col-sm-6 col-6">
        <div class="singleproductlq">
           <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgproductlq"></a>
           <a href="detail?id=${list[i].id}" class="nameproductlq nameproducfilter">${list[i].name}</a>
           <span class="priceproductlq priceproductfilter">
           ${formatmoney(list[i].price)}
           <span class="giacufilter">${list[i].oldPrice>0?formatmoney(list[i].oldPrice):''}</span>
           </span>
           <button onclick="addCart(${list[i].id})" class="btncartsplq">Giỏ hàng</button>
        </div>
   </div>`
    }
    document.getElementById("listsanpham").innerHTML = main

    var mainpage = ''
    for (i = 1; i <= totalPage; i++) {
        mainpage += `<li onclick="locSanPham(${(Number(i) - 1)})" class="page-item"><a class="page-link">${i}</a></li>`
    }
    document.getElementById("pageable").innerHTML = mainpage
}


async function sanPhamGiamGiaBlog() {
    var url = 'http://localhost:8080/api/product/public/sanPhamKhuyenMai?page=0&size=5';
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    var list = result.content;
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="">
        <div class="singlesp">
            <div class="topspindex">
                <a href="detail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgproindex"></a>
                <a href="detail?id=${list[i].id}" class="tenspindex">${list[i].name}</a>
            </div>
            <div class="divgiaspindex">
                <div class="row">
                    <div class="col-sm-6">
                        <span class="curprice">${formatmoney(list[i].price)}</span>
                        <span class="oldpricesp">${formatmoney(list[i].oldPrice)}</span>
                    </div>
                    <div class="col-sm-6">
                        <button onclick="addCart(${list[i].id})" class="btngiohangsp"><i class="fa fa-shopping-cart"></i></button>
                    </div>
                </div>
            </div>
            <span class="phantramgiam">-${tinhGiamGia(list[i].price, list[i].oldPrice)} %</span>
        </div>
    </div>`
    }
    document.getElementById("spkhuyenmaiindex").innerHTML = main;
}