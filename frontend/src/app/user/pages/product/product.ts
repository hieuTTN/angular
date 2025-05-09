import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/user/product.service';
import { CategoryService } from '../../../shared/services/admin/category.service';
import { BannerService } from '../../../shared/services/user/banner.service';
import { CartService } from '../../../shared/services/user/cart.service';
import { Banner } from '../../../shared/models/banner.model';
import { ToastrService } from 'ngx-toastr';
import { UserLayoutComponent } from '../../layout/user-layout';
@Component({
  selector: 'app-product',
  standalone:false,
  templateUrl: './product.html',
  styleUrl:'../../../style/user.css'
})


export class ProductComponent implements OnInit {
  categories: any[] = [];
  banners: Banner[] = [];
  filteredBanners: Banner[] = []; // Banners không phải TOP
  isLoggedIn: boolean = false;

  size: number = 12;
  products: any[] = [];
  numPage: number = 1;

  selectedCategoryId: any = -1;
  searchParam: any = '';
  mucGia: any = '0-1000000000';
  sort: any = 'id,desc';

  constructor(
    private toastr: ToastrService,
    private productService: ProductService, 
    private cartService: CartService, 
    private userLayoutComponent: UserLayoutComponent, 
    private bannerService: BannerService, 
    private categoryService: CategoryService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadUrl();
    await this.loadCategory();
    this.loadBanner();
    this.laodProduct(0);
    this.isLoggedIn = !!window.localStorage.getItem("token");
  }


  laodProduct(page:number){
    var dto = {
      search: this.searchParam,
      category:this.selectedCategoryId == -1?null: this.selectedCategoryId,
      small:this.mucGia.split("-")[0],
      large:this.mucGia.split("-")[1],
    }
    console.log(dto);
    
    this.productService.searchFullProduct(page, this.size, dto, this.sort).subscribe(result => {
      this.products = [];
      this.products.push(...result.content);
      this.numPage = result.totalPages;
    });
  }

  loadUrl(){
    var uls = new URL(document.URL)
    var category = uls.searchParams.get("category");
    var search = uls.searchParams.get("search");
    if(category != null){
      this.selectedCategoryId = category;
    }
    if(search != null){
      this.searchParam = search;
    }
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