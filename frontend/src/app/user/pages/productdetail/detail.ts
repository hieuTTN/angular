import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/admin/category.service';
import { ProductService} from '../../../shared/services/user/product.service';
import { Category } from '../../../shared/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { UserLayoutComponent } from '../../layout/user-layout';
import { CartService } from '../../../shared/services/user/cart.service';
import { CommentService } from '../../../shared/services/user/comment.service';

@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './detail.html',
  styleUrl:'../../../style/user.css'
})


export class DetailComponent implements OnInit {
  categories: Category[] = [];
  products: any[] = [];
  comments: any[] = [];
  product: any = null;
  imagebanner:string ='';
  isLoggedIn: boolean = false;
  isLoading: boolean = false;
  star:number = 5;
  soFile:number = 0;
  fileComment:File[]=[]
  noidungbl:string = '';

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private cartService: CartService, 
    private commentService: CommentService, 
    private userLayoutComponent: UserLayoutComponent, 
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!window.localStorage.getItem("token");
    this.loadCategory();
    this.loadProduct();
    this.loadProductLienQuan();
    this.loadComment();
  }


  loadCategory(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  loadComment(): void {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    this.commentService.getComment(id).subscribe(data => {
      this.comments = data;
    });
  }

  loadProductLienQuan(): void {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    this.productService.getRelatedProducts(id).subscribe(data => {
      this.products = data;
    });
  }

  loadProduct(): void {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    this.productService.getProductDetail(id).subscribe(result => {
      this.product = result
      this.imagebanner = result.imageBanner
    });
  }

  changeImage(link:string){
    this.imagebanner = link;
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

  loadStar(val:number) {
    this.star = val + 1;
  }

  setFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileCount = input.files.length;
      this.soFile = fileCount
      this.fileComment = [];
      this.fileComment.push(...input.files);
    } else {
      this.soFile = 0;
      this.fileComment = []
    }
  }

  async postComment(){
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    this.isLoading = true
    const uploadedUrls = await this.uploadMultipleFileNotResp();
    var comment = {
      star: this.star,
      content: this.noidungbl,
      listLink: uploadedUrls,
      product: {
          id: id
      }
    }

    this.commentService.postComment(comment).subscribe({
      next: (response) => {
        this.toastr.success("Tải bình luận thành công");
        this.loadComment();
        this.noidungbl = '';
        this.star = 5;
        this.fileComment = [];
        this.isLoading = false
      },
      error: (error) => {
        this.toastr.error("Bình luận thất bại");
        this.isLoading = false
      }
    });
  }


  async uploadMultipleFileNotResp(): Promise<string[]> {
    const formData = new FormData();
    
    // Thêm từng file từ this.listFile vào formData
    for (let i = 0; i < this.fileComment.length; i++) {
      formData.append('file', this.fileComment[i]);
    }
  
    const urlUpload = 'http://localhost:8080/api/public/upload-multiple-file';
  
    try {
      const response = await fetch(urlUpload, {
        method: 'POST',
        body: formData,
      });
  
      if (response.status >= 200 && response.status < 300) {
        return await response.json();
      } else {
        console.error('Upload failed with status:', response.status);
        return [];
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      return [];
    }
}
}