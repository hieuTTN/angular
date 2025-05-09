import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../shared/services/admin/invoice.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-taikhoan',
  standalone: false,
  templateUrl: './invoice.html',
  styleUrl: '../../../style/admin.css'
})

export class InvoiceComponent implements OnInit {
  invoices: any[] = [];
  trangthais: any[] = [];
  orderDetails: any[] = [];
  dataTableInitialized: boolean = false;
  start:any = '';
  end:any = '';
  type:any = '-1';
  trangthai:any = '-1';
  order:any = null;
  trangThaiUpdate:any = 'DANG_CHO_XAC_NHAN'
  idselect:any = -1;

  constructor(
    private invoiceService: InvoiceService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadInvoice();
    this.loadTrangThai();
  }

  loadInvoice(): void {
    this.invoiceService.getInvoice(this.start, this.end, this.type, this.trangthai).subscribe(data => {
      this.invoices = data;
  
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
  
  loadTrangThai(): void {
    this.invoiceService.loadStatus().subscribe(data => {
      this.trangthais = data;
    });
  }
  
  loadChiTietInvoice(od: any): void {
    this.order = od
    this.invoiceService.getDetailInvoice(od.id).subscribe(data => {
      this.orderDetails = data;
    });
  }

  setTrangThai(tt:any, id:any){
    this.trangThaiUpdate = tt;
    this.idselect = id;
  }

  capNhatTt(): void {
       Swal.fire({
          title: 'Xác nhận cập nhật trạng thái đơn hàng '+this.idselect+" sang trạng thái "+this.trangThaiUpdate,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Xác nhận',
          cancelButtonText: 'Không'
      }).then(result => {
          if (result.isConfirmed) {
              this.invoiceService.updateStatus(this.idselect, this.trangThaiUpdate).subscribe({
                  next: () => {
                    this.toastr.success("Thành công");
                    window.location.reload();
                  },
                  error: (error) => {
                    this.toastr.error('Lỗi', error.error.defaultMessage);
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
