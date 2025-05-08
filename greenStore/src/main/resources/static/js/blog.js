var size = 10;


async function loadChiTietBaiViet(){
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var url = 'http://localhost:8080/api/blog/public/findById?id='+id;
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    document.getElementById("titlebg").innerHTML = result.title
    document.getElementById("desdetailblog").innerHTML = result.description
    document.getElementById("anhctbaiviet").src = result.imageBanner
    document.getElementById("noidungctbaiviet").innerHTML = result.content
}

async function loadAllBlogList(page) {
    var url = 'http://localhost:8080/api/blog/public/findAll-page?page=' + page + '&size=' + size+'&sort=id,desc';
    const response = await fetch(url, {
        method: 'GET'
    });
    var result = await response.json();
    console.log(result)
    var list = result.content;
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<div class="row singlebloglist">
                    <div class="col-sm-4">
                        <a href="blogdetail?id=${list[i].id}"><img src="${list[i].imageBanner}" class="imgbloglist"></a>
                    </div>
                    <div class="col-sm-8">
                        <a href="blogdetail?id=${list[i].id}" class="blognamemain">${list[i].title}</a>
                        <span class="desblogmain">${list[i].description}</span>
                    </div>
                </div>`
    }
    document.getElementById("listblogmain").innerHTML += main

    if(result.last == false){
        document.getElementById("btnbaiviet").onclick=function(){
            loadAllBlogList(Number(page) + Number(1));
        }
    }
    else{
        document.getElementById("btnbaiviet").onclick=function(){
            toastr.warning("Đã hết kết quả tìm kiếm");
        }
    }
}