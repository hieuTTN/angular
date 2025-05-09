import { Component, OnInit } from '@angular/core';
import { NhapHangService } from '../../../shared/services/admin/nhaphang.service';
import { ProductService } from '../../../shared/services/admin/product.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-nhaphang',
  standalone: false,
  templateUrl: './nhaphang.html',
  styleUrl: '../../../style/admin.css'
})

export class NhapHangComponent implements OnInit {
  nhaphangs: any[] = [];
  products: any[] = [];
  dataTableInitialized: boolean = false;
  from:any = '';
  to:any = '';
  idproduct:any = '-1';

  constructor(
    private nhaphangService: NhapHangService,
    private productService: ProductService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadInvoice();
    this.loadProduct();
  }

  loadInvoice(): void {
    this.nhaphangService.getNhapHang(this.from, this.to, this.idproduct).subscribe(data => {
      this.nhaphangs = data;
  
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
  loadProduct(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
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
            this.nhaphangService.delete(id).subscribe({
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
