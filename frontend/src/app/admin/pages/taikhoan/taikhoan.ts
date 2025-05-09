import { Component, OnInit } from '@angular/core';
import { TaiKhoanService } from '../../../shared/services/admin/taikhoan.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-taikhoan',
  standalone: false,
  templateUrl: './taikhoan.html',
  styleUrl: '../../../style/admin.css'
})

export class TaiKhoanComponent implements OnInit {
  taikhoans: any[] = [];
  dataTableInitialized: boolean = false;
  roleSearch:any = '';
  fullname:any = '';
  phone:any = '';
  email:any = '';
  password:any = '';
  repass:any = '';
  roleadd:any = 'ROLE_ADMIN';

  constructor(
    private taikhoanService: TaiKhoanService,
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.loadTaiKhoan();
  }

  loadTaiKhoan(): void {
    this.taikhoanService.getTaiKhoan(this.roleSearch).subscribe(data => {
      this.taikhoans = data;
  
      if (this.dataTableInitialized) {
        const table = $('#example').DataTable();
        table.clear().destroy();  
        this.dataTableInitialized = false;
      }
  
      setTimeout(() => {
        $('#example').DataTable();
        this.dataTableInitialized = true;
      }, 0);
    });
  }
  

  async saveTaiKhoan(){
    if(this.password == ''){
      this.toastr.error("Mật khẩu không được bỏ trống"); return;
    }
    if(this.password != this.repass){
      this.toastr.error("Mật khẩu không trùng khớp");return
    }
    var user = {
        fullname: this.fullname,
        phone: this.phone,
        email: this.email,
        password: this.password,
        authorities:{
            name: this.roleadd
        }
    };
    this.taikhoanService.postUser(user).subscribe({
        next: (response) => {
           Swal.fire({
                title: "Thông báo",
                text: "Thành công",
                icon: "success"
            }).then(() => {
                window.location.reload()
            });
        },
        error: (error) => {
          console.log(error.error);
          
          this.toastr.error(error.error.defaultMessage);
        }
      });
  }

  
  lockUnLock(id:number): void {
     Swal.fire({
        title: 'Xác nhận hành động?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Không'
    }).then(result => {
        if (result.isConfirmed) {
            this.taikhoanService.lockUnLock(id).subscribe({
                next: () => {
                  this.toastr.success("Thành công");
                  window.location.reload();
                },
                error: (error) => {
                  this.toastr.error('Lỗi', error.erorr);
                }
            });
        }
    });
  }

}
