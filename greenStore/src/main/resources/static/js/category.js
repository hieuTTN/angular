async function loadCategoryLeft() {
    var url = 'http://localhost:8080/api/category/public/findAll';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<span class="spdanhmucleft">
        <a href="product?category=${list[i].id}" class="danhmucnameleft">${list[i].name}
        <span class="slsanphamdanhmuc">(${list[i].products.length})</span>
        </a>
        <img src="${list[i].image}" class="anhdmleft">
    </span>`
    }
    document.getElementById("danhmucleft").innerHTML = main;
}

async function loadCategorySelectSearch() {
    var uls = new URL(document.URL)
    var category = uls.searchParams.get("category");
    var search = uls.searchParams.get("search");
    var url = 'http://localhost:8080/api/category/public/findAll';
    const response = await fetch(url, {
        method: 'GET'
    });
    var list = await response.json();
    var main = '<option value="">Tất cả danh mục</option>';
    for (i = 0; i < list.length; i++) {
        main += `<option ${category==list[i].id?'selected':''} value="${list[i].id}">${list[i].name}</option>`
    }
    document.getElementById("danhmuc").innerHTML = main;
    document.getElementById("search").value = search;
}
