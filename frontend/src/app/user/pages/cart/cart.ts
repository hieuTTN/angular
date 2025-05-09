import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../shared/services/user/banner.service';
import { CartService } from '../../../shared/services/user/cart.service';
import { UserService } from '../../../shared/services/user/user.service';
import { CheckoutService } from '../../../shared/services/user/checkout.service';
import { Banner } from '../../../shared/models/banner.model';
import { ToastrService } from 'ngx-toastr';
import { UserLayoutComponent } from '../../layout/user-layout';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone:false,
  templateUrl: './cart.html',
  styleUrl:'../../../style/user.css'
})


export class CartComponent implements OnInit {
  banners: Banner[] = [];
  filteredBanners: Banner[] = [];
  isLoggedIn: boolean = false;
  carts: any[] = [];
  numCart:number = 0;
  totalCart:number = 0;
  userInfor:any = null;
  paytype: string = 'cod';

  fullname:string = ''
  phone:string = ''
  address:string = ''
  note:string = ''

  constructor(
    private toastr: ToastrService,
    private cartService: CartService, 
    private userService: UserService, 
    private checkoutService: CheckoutService, 
    private userLayoutComponent: UserLayoutComponent, 
    private bannerService: BannerService, 
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!window.localStorage.getItem("token");
    if(this.isLoggedIn == false){
      window.location.href = '/login'
    }
    this.loadBanner();
    this.loadCart();
    this.loadUserInfor();
  }

  loadBanner(): void {
    this.bannerService.getBanner().subscribe(data => {
      this.banners = data;
      this.filteredBanners = this.banners.filter(banner => banner.bannerType !== 'TOP');
    });
  }

  loadCart(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.carts = data;
      this.numCart = data.length;
      this.totalCart = 0;
      for(var i=0; i< data.length; i++){
        this.totalCart += data[i].product.price * data[i].quantity
      }
    });
  }
  loadUserInfor(): void {
    this.userService.getUserInfor().subscribe(data => {
      this.userInfor = data;
      this.fullname = data.fullname
      this.address = data.address
      this.phone = data.phone
    });
  }

  deleteCart(id:number): void {
    this.cartService.removeCartItem(id).subscribe({
      next: () => {
        this.toastr.success("xóa giỏ hàng thành công");
        this.userLayoutComponent.loadNumCart();
        this.loadCart();
      },
      error: (error) => {
        this.toastr.error('Lỗi khi xóa sản phẩm trong giỏ hàng:', error);
      }
    });
  }

  updowncart(id:number, quantity:number): void {
    this.cartService.updateCartQuantity(id, quantity).subscribe({
      next: () => {
        this.loadCart();
      },
      error: (error) => {
        this.toastr.error('Lỗi', error);
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

  getBannerIndex(index: number): number {
    return this.filteredBanners[index] ? index : -1;
  }

  checkOutAction(){
    if(this.carts.length == 0){this.toastr.error("Bạn chưa có sản phẩm nào trong giỏ hàng");return;}
    var paydto = {
      payType:'COD',
      fullname:this.fullname,
      phone: this.phone,
      address: this.address,
      note: this.note,
    }
    
    if(window.confirm("Xác nhận đặt hàng") == false){return}
    if(this.paytype == 'cod'){
      this.checkoutService.payCod(paydto).subscribe({
        next: () => {
           Swal.fire({
            title: "Thông báo",
            text: "Đặt hàng thành công, cảm ơn bạn đã mua sản phẩm của chúng tôi!",
            icon: "success"
          }).then(() => {
            window.location.href = '/account'
          });
        },
        error: (error) => {
          this.toastr.error('Lỗi', error);
        }
      });
    }
    else if(this.paytype = 'momo'){
      paydto.payType = 'MOMO'
      this.checkoutService.requestPayMentMomo(paydto).subscribe(data => {
        window.open(data.url, '_blank');
      });
    }
  }
}