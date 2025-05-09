import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../shared/services/admin/blog.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-blog',
  standalone: false,
  templateUrl: './blog.html',
  styleUrl: '../../../style/admin.css'
})

export class BlogComponent implements OnInit {
  blogs: any[] = [];
  dataTableInitialized: boolean = false;

  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadBlog();
  }

  loadBlog(): void {
    this.blogService.getBlog().subscribe(data => {
      this.blogs = data;
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


    delete(id:number): void {
     Swal.fire({
        title: 'Xác nhận xóa?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Không'
    }).then(result => {
        if (result.isConfirmed) {
            this.blogService.delete(id).subscribe({
                next: () => {
                  this.toastr.success("xóa thành công");
                  window.location.reload();
                },
                error: (error) => {
                  this.toastr.error('Lỗi khi xóa', error.erorr);
                }
            });
        }
    });
    }
  
  formatMoney(money:number):string {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return VND.format(money);
}
}
