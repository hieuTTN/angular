import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/user/product.service';
import { CategoryService } from '../../../shared/services/admin/category.service';
import { BannerService } from '../../../shared/services/user/banner.service';
import { CartService } from '../../../shared/services/user/cart.service';
import { Product } from '../../../shared/models/product.model';
import { Category } from '../../../shared/models/category.model';
import { Banner } from '../../../shared/models/banner.model';
import { ToastrService } from 'ngx-toastr';
import { UserLayoutComponent } from '../../layout/user-layout';
@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.html',
  styleUrl:'../../../style/user.css'
})


export class HomeComponent implements OnInit {
  categories: any[] = [];
  banners: Banner[] = [];
  filteredBanners: Banner[] = []; // Banners không phải TOP
  isLoggedIn: boolean = false;

  size: number = 5;

  bestSellingProducts: any[] = [];
  page: number = 0;
  lastPage: boolean = false;
  productKhuyenMai: any[] = [];

  productMoi: any[] = [];
  pageMoi: number = 0;
  lastPageMoi: boolean = false;

  selectedCategoryId: number = -1;

  constructor(
    private toastr: ToastrService,
    private productService: ProductService, 
    private cartService: CartService, 
    private userLayoutComponent: UserLayoutComponent, 
    private bannerService: BannerService, 
    private categoryService: CategoryService) {

    }

  ngOnInit(): void {
    this.loadCategory();
    this.loadBanner();
    this.loadBestSellingProducts();
    this.loadProductKhuyenMai();
    this.loadSanPhamMoi();
    this.isLoggedIn = !!window.localStorage.getItem("token");
  }


  loadCategory(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadBanner(): void {
    this.bannerService.getBanner().subscribe(data => {
      this.banners = data;
      this.filteredBanners = this.banners.filter(banner => banner.bannerType !== 'TOP');
    });
  }

  loadBestSellingProducts(): void {
    if (this.lastPage) {
      alert('Đã hết kết quả tìm kiếm');
      return;
    }

    this.productService.getBestSellingProducts(this.page, this.size).subscribe(result => {
      if (result && result.content) {
        this.bestSellingProducts.push(...result.content);
        this.lastPage = result.last;
        this.page++;
      }
    });
  }

  loadProductKhuyenMai(): void {
    this.productService.getDiscountedProducts(0, this.size).subscribe(result => {
      if (result && result.content) {
        this.productKhuyenMai.push(...result.content);
      }
    });
  }

  loadSanPhamMoi(): void {
    if (this.lastPageMoi) {
      alert('Đã hết kết quả tìm kiếm');
      return;
    }

    this.productService.getNewProducts(this.pageMoi, this.size).subscribe(result => {
      if (result && result.content) {
        this.productMoi.push(...result.content);
        this.lastPageMoi = result.last;
        this.pageMoi++;
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

  addToCart (id:number){
    if(this.isLoggedIn == false){
      this.toastr.error("Hãy đăng nhập thể thêm sản phẩm vào giỏ hàng");return;
    }
    this.cartService.addToCart(id).subscribe({
      next: (response) => {
        this.toastr.success("Thêm vào giỏ hàng thành công");
        this.userLayoutComponent.loadNumCart();
      },
      error: (error) => {
        this.toastr.error("Thêm sản phẩm thất bại");
      }
    });
  }

  tinhGiamGia(price:number, oldPrice:number){
    var giamoi = (oldPrice - price) / oldPrice * 100;
    return giamoi.toFixed(0)
  }

  getBannerIndex(index: number): number {
    return this.filteredBanners[index] ? index : -1;
  }
}