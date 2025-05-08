import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/user/product.service';
import { CategoryService } from '../../../shared/services/admin/category.service';
import { BannerService } from '../../../shared/services/user/banner.service';
import { Product } from '../../../shared/models/product.model';
import { Category } from '../../../shared/models/category.model';
import { Banner } from '../../../shared/models/banner.model';
@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.html',
  styleUrl:'../../../style/user.css'
})


export class HomeComponent implements OnInit {
  categories: Category[] = [];
  banners: Banner[] = [];
  filteredBanners: Banner[] = []; // Banners không phải TOP

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
    private productService: ProductService, 
    private bannerService: BannerService, 
    private categoryService: CategoryService) {

    }

  ngOnInit(): void {
    this.loadCategory();
    this.loadBanner();
    this.loadBestSellingProducts();
    this.loadProductKhuyenMai();
    this.loadSanPhamMoi();
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
      console.log(this.filteredBanners);
      
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

  }

  tinhGiamGia(price:number, oldPrice:number){
    var giamoi = (oldPrice - price) / oldPrice * 100;
    return giamoi.toFixed(0)
  }

  getBannerIndex(index: number): number {
    console.log(this.filteredBanners[index] ? index : -1);
    
    return this.filteredBanners[index] ? index : -1;
  }
}