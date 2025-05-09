import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { InvoiceService } from '../../../shared/services/user/invoice.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.html',
  styleUrls: ['../../../style/user.css']
})
export class AccountComponent implements OnInit {
  userInfor: any = null;
  isLoggedIn: boolean = true;
  selectedTab: string = 'invoice';
  avatarUrl: string = '/image/avatar.webp';

  orders: any[] = [];
  order: any = null;
  orderDetails: any[] = [];

  fullname:string = ''
  phone:string = ''
  address:string = ''

  oldpassword:string = ''
  newpassword:string = ''
  renewpassword:string = ''

  tabs = [
    { id: 'invoice', label: 'Đơn hàng của tôi', icon: 'image/invoice.svg' },
    { id: 'changepass', label: 'Đổi mật khẩu', icon: 'image/pass.svg' },
    { id: 'changeinfor', label: 'Đổi thông tin', icon: 'image/pass.svg' }
  ];

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!window.localStorage.getItem("token");
    if (!this.isLoggedIn) {
      window.location.href = '/login';
    }
    this.loadUserInfor();
    this.loadInvoice();
    this.checkUrlHash();
  }

  loadUserInfor(): void {
    this.userService.getUserInfor().subscribe(data => {
      this.userInfor = data;
      this.fullname = data.fullname
      this.phone = data.phone
      this.address = data.address
    });
  }

  loadInvoice(): void {
    this.invoiceService.getMyInvoice().subscribe(data => {
      this.orders = data;
    });
  }

  formatMoney(money: number): string {
    const VND = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return VND.format(money);
  }

  changeTab(tabId: string): void {
    this.selectedTab = tabId;
    window.location.hash = tabId;
  }

  checkUrlHash(): void {
    const hash = window.location.hash.substr(1);
    if (hash) {
      this.selectedTab = hash;
    }
  }

  logout(): void {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = '/login';
  }

  changePassword(): void {
    if (this.newpassword !== this.renewpassword) {
      this.toastr.error("Mật khẩu xác nhận không trùng khớp");
      return;
    }
    this.userService.changePass(this.oldpassword, this.newpassword).subscribe({
      next: () => this.toastr.success("Đổi mật khẩu thành công"),
      error: (error) => this.toastr.error(error.error.defaultMessage)
    });
  }

  updateAccount(): void {
    this.userService.changeInfor(this.fullname, this.phone, this.address).subscribe({
       next: () => {
          Swal.fire({
          title: "Thông báo",
          text: "Cập nhật thông tin thành công",
          icon: "success"
        }).then(() => {
          window.location.reload();
        });
      },
      error: () => this.toastr.error("Cập nhật thông tin thất bại")
    });
  }

  cancelOrder(orderId: number): void {
    Swal.fire({
      title: 'Xác nhận hủy đơn?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hủy đơn',
      cancelButtonText: 'Không'
    }).then(result => {
      if (result.isConfirmed) {
        this.invoiceService.cancelInvoice(orderId).subscribe({
          next: () => {
            this.toastr.success('Đã hủy đơn hàng')
            this.loadInvoice();
          },
          error: () => this.toastr.error('Hủy đơn thất bại')
        });
      }
    });
  }

  loadChiTietInvoice(od: any): void {
    this.order = od
    this.invoiceService.getDetailInvoice(od.id).subscribe(data => {
      this.orderDetails = data;
    });
  }
}
