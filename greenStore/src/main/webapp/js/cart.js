async function addCart(idproduct) {
    if(token == null){
        toastr.warning("Hãy đăng nhập để thực hiện chức năng này")
        return;
    }
    var url = 'http://localhost:8080/api/cart/user/create?idproduct='+idproduct;
    const response = await fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        })
    });
    if (response.status < 300) {
        toastr.success("Thêm giỏ hàng thành công!");
        countCart();
    }
    else {
        toastr.erorr("Thêm giỏ hàng thất bại!");
    }
}

async function loadAllCart() {
    if(token == null){
        window.location.href = 'login'
    }
    var url = 'http://localhost:8080/api/cart/user/my-cart' ;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    document.getElementById("soluonggiohang").innerHTML = list.length;
    var main = '';
    var totalAmount = 0;
    for (i = 0; i < list.length; i++) {
        totalAmount += list[i].product.price * list[i].quantity
        main += `<tr>
        <td>
            <a href=""><img class="imgprocart" src="${list[i].product.imageBanner}"/></a>
            <div class="divnamecart">
                <a href="" class="nameprocart">${list[i].product.name}</a>
            </div>
        </td>
        <td>
            <p class="boldcart">${formatmoney(list[i].product.price)}</p>
        </td>
        <td>
            <div class="clusinp">
                <button onclick="upDownQuantity(${list[i].id},'DOWN')" class="cartbtn"> - </button>
                <input class="inputslcart" value="${list[i].quantity}"/>
                <button onclick="upDownQuantity(${list[i].id},'UP')" class="cartbtn"> + </button>
            </div>
        </td>
        <td>
            <div class="tdpricecart">
                <p class="boldcart">${formatmoney(list[i].product.price * list[i].quantity)}</p>
                <p onclick="removeCart(${list[i].id})" class="delcart"><i class="fa fa-trash facartde"></i></p>
            </div>
        </td>
    </tr>`
    }
    document.getElementById("listcartDes").innerHTML = main
    document.getElementById("tonggiatien").innerHTML = formatmoney(totalAmount)
    document.getElementById("tongtienthanhtoan").innerHTML = formatmoney(totalAmount)
}


async function removeCart(id) {
    var con = confirm("Bạn muốn xóa sản phẩm này khỏi giỏ hàng?")
    if(con == false){
        return;
    }
    var url = 'http://localhost:8080/api/cart/user/delete?id='+id ;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status < 300){
        loadAllCart();
    }
}


async function upDownQuantity(id, type) {
    var url = 'http://localhost:8080/api/cart/user/up-and-down-cart?id='+id+"&quantity=-1" ;
    if(type == "UP"){
        url = 'http://localhost:8080/api/cart/user/up-and-down-cart?id='+id+"&quantity=1" ;
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    if(response.status < 300){
        loadAllCart();
    }
}

