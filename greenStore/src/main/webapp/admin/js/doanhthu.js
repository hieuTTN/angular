var token = localStorage.getItem("token");

async function revenueYear(nam) {
    if (nam < 2000) {
        nam = new Date().getFullYear();
    }
    var url = 'http://localhost:8080/api/statistic/admin/revenue-year?year=' + nam;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    console.log(list);
    
    for (i = 0; i < list.length; i++) {
        if (list[i] == null) {
            list[i] = 0;
        }
    }

    var lb = 'doanh thu năm ' + nam;
    const ctx = document.getElementById("chart").getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"],
            datasets: [{
                label: lb,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)', // Màu xanh đậm hơn
                    'rgba(75, 192, 192, 0.8)', // Màu xanh ngọc đậm hơn
                    'rgba(255, 206, 86, 0.8)', // Màu vàng đậm hơn
                    'rgba(255, 99, 132, 0.8)', // Màu đỏ đậm hơn
                    'rgba(153, 102, 255, 0.8)', // Màu tím đậm hơn
                    'rgba(255, 159, 64, 0.8)', // Màu cam đậm hơn
                    'rgba(199, 199, 199, 0.8)', // Màu xám đậm hơn
                    'rgba(83, 102, 255, 0.8)', // Màu xanh đậm hơn
                    'rgba(54, 162, 235, 0.8)', // Màu xanh đậm hơn
                    'rgba(255, 159, 64, 0.8)', // Màu cam đậm hơn
                    'rgba(255, 99, 132, 0.8)', // Màu đỏ đậm hơn
                    'rgba(153, 102, 255, 0.8)'  // Màu tím đậm hơn
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
                data: list,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value) {
                            return formatmoney(value);
                        }
                    }
                }]
            }
        },
    });
}


function loadByNam() {
    var nam = document.getElementById("nams").value;
    revenueYear(nam);
}

const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function formatmoney(money) {
    return VND.format(money);
}


async function sanPhamBanTheoNgay() {
    $('#example').DataTable().destroy();
    var ngay = document.getElementById("ngaycanxem").value
    var url = 'http://localhost:8080/api/product/admin/san-pham-ban-theo-ngay';
    if (ngay != "") {
        url += '?date='+ngay
    }
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    console.log(list)
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td><img src="${list[i].imageBanner}" style="width: 100px;"></td>
                    <td>${list[i].name}</td>
                    <td>${formatmoney(list[i].price)}</td>
                    <td>${list[i].soLuongBan}</td>
                </tr>`
    }
    document.getElementById("listproduct").innerHTML = main
    $('#example').DataTable();
}


async function sanPhamBanTheoThang() {
    $('#examplemonth').DataTable().destroy();
    var month = document.getElementById("thangcanxem").value
    var year = document.getElementById("namcanxem").value
    var url = 'http://localhost:8080/api/product/admin/san-pham-ban-theo-thang?month='+month+'&year='+year;
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var list = await response.json();
    console.log(list)
    var main = '';
    for (i = 0; i < list.length; i++) {
        main += `<tr>
                    <td>${list[i].id}</td>
                    <td><img src="${list[i].imageBanner}" style="width: 100px;"></td>
                    <td>${list[i].name}</td>
                    <td>${formatmoney(list[i].price)}</td>
                    <td>${list[i].soLuongBan}</td>
                </tr>`
    }
    document.getElementById("listproductmonth").innerHTML = main
    $('#examplemonth').DataTable();
}