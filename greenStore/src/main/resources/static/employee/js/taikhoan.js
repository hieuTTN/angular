var token = localStorage.getItem("token");
var size = 20;
async function loadAllUser() {
    $('#example').DataTable().destroy();
    var url = 'http://localhost:8080/api/admin/get-user-by-role?role=ROLE_USER';
    const response = await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token
        })
    });
    var listUser = await response.json();
    var main = '';
    for (i = 0; i < listUser.length; i++) {
        var btn = '';
        main += `<tr>
                    <td>${listUser[i].id}</td>
                    <td>${listUser[i].email}</td>
                    <td>${listUser[i].fullname}</td>
                    <td>${listUser[i].phone}</td>
                    <td>${listUser[i].createdDate}</td>
                </tr>`
    }
    document.getElementById("listuser").innerHTML = main
    $('#example').DataTable();
}



