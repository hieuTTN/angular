import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../../shared/services/admin/product.service';
import { CategoryService } from '../../../shared/services/admin/category.service';
import { Product } from '../../../shared/models/product.model';
import { Category } from '../../../shared/models/category.model';
import { ProductRequest } from '../../../shared/models/productrequest.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductImage } from '../../../shared/models/ProductImage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-addproduct',
  standalone:false,
  templateUrl: './addproduct.component.html',
  styleUrl:'../../../style/admin.css'
})


export class ProductAddComponent implements OnInit {
    @ViewChild('imgpreproduct') imgpreproduct!: ElementRef<HTMLImageElement>;
    listFile: File[] = []; // Mảng chứa các file đã chọn
    previewUrls: string[] = []; // Mảng chứa URL ảnh preview
    categories: Category[] = [];
    productForm!: FormGroup;
    productId: number | null = null;
    imagePreview : string = ''
    loading = false;
    uploadedImages: ProductImage[] = []; // Chứa các link ảnh đã upload

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router) { }

    ngOnInit(): void {
        this.initForm();
        this.loadCategories();

        // Lấy ID sản phẩm nếu đang ở chế độ "Cập nhật"
        this.route.queryParams.subscribe((params) => {
        this.productId = params['id'] ? +params['id'] : null;
        if (this.productId) {
            this.loadProduct(this.productId);
        }
        });
    }

    initForm() {
        this.productForm = this.fb.group({
        name: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(1)]],
        oldPrice: ['', [Validators.required, Validators.min(1)]],
        quantity: ['', [Validators.required, Validators.min(1)]],
        unit: ['', Validators.required],
        expiry: ['', Validators.required],
        description: [''],
        category: [null, Validators.required],
        imageBanner: [null], // Banner chính
        });
    }

    loadCategories() {
        this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories;
        });
    }

    loadProduct(id: number) {
        this.productService.getProductById(id).subscribe((product) => {
        this.productForm.patchValue({
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            quantity: product.quantity,
            unit: product.unit,
            expiry: product.expiry,
            description: product.description,
            category: product.category.id,
            imageBanner: product.imageBanner,
        });
        this.uploadedImages = product.productImages; // Khởi tạo mảng rỗng
        console.log(product);
        
        this.imagePreview = product.imageBanner
        console.log(this.imagePreview);
        
        });
    }

    deleteImage(id: number): void{
        if (confirm('Bạn có chắc chắn muốn xóa ảnh này?')) {
            this.productService.deleteProductImage(id).subscribe(
                () => {
                // Xóa ảnh khỏi danh sách uploadedImages
                this.uploadedImages = this.uploadedImages.filter((image) => image.id !== id);
                this.toastr.success('Xóa ảnh thành công!', 'Thành công');
                }
            );
        }
    }

    async onSave() {
        if (this.productForm.invalid) {
        return;
        }
    
        this.loading = true;
    
        try {
        // 1. Upload file imageBanner
        const imageBannerFileInput = document.getElementById('imageBanner') as HTMLInputElement;
        if (!imageBannerFileInput || !imageBannerFileInput.files || imageBannerFileInput.files.length === 0 && this.productId == null) {
            throw new Error('Vui lòng chọn ảnh nền (imageBanner).');
        }
        var imageBannerUrl : string = this.imagePreview;
        if(imageBannerFileInput.files.length > 0){
            const imageBannerUrls = await this.uploadFile(imageBannerFileInput.files[0]);
            if (!imageBannerUrls) {
                // throw new Error('Không thể upload ảnh nền. Vui lòng thử lại.');
            }
            else{
                imageBannerUrl = imageBannerUrls 
            }
        }
        else{}
    
        // 2. Upload file ảnh phụ
        const uploadedUrls = await this.uploadMultipleFileNotResp();
        // if (!uploadedUrls || uploadedUrls.length === 0) {
        //     throw new Error('Không thể upload ảnh phụ. Vui lòng thử lại.');
        // }
    
        // 3. Chuẩn bị dữ liệu sản phẩm
        const formValue = this.productForm.value;
    
        const productData: ProductRequest = {
            product: {
            id: this.productId,
            ...formValue,
            imageBanner: imageBannerUrl, // Gán link ảnh nền
            category: {
                id: formValue.category, // Lấy id từ form
                name: '', // Có thể lấy tên từ danh sách categories nếu cần
            },
            },
            linkLinkImages: uploadedUrls, // Gán danh sách URL ảnh phụ
        };
    
        //   console.log(productData); return;
        
        // 4. Gửi dữ liệu sản phẩm lên server
        this.productService.createOrUpdateProduct(productData).subscribe(
            () => {
            this.loading = false;
            alert('Thêm/Cập nhật sản phẩm thành công');
            this.router.navigate(['/admin/product']);
            },
            (error) => {
            this.loading = false;
            console.error(error);
            alert('Thêm/Cập nhật sản phẩm thất bại');
            }
        );
        } catch (error) {
        this.loading = false;
        console.error(error);
        alert('Đã xảy ra lỗi khi lưu sản phẩm.');
        }
    }

    onFileUpload(event: any) {
        const files = event.target.files;
        // Upload logic here, then add uploaded link to `this.uploadedImages`
    }


    // Hàm xử lý khi người dùng chọn file
    onFileSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
    
        if (input.files) {
          const files = Array.from(input.files); // Chuyển FileList thành mảng
    
          // Thêm file vào mảng `listFile`
          files.forEach((file) => {
            this.listFile.push(file);
            this.readAndPreview(file); // Gọi hàm đọc và preview ảnh
          });
        }
    }
    
      // Hàm đọc file và tạo preview
    private readAndPreview(file: File): void {
        const reader = new FileReader();
    
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target?.result) {
            this.previewUrls.push(event.target.result as string); // Lưu URL ảnh vào mảng
          }
        };
    
        reader.readAsDataURL(file); // Đọc file dưới dạng Data URL
    }
    
      // Hàm xóa ảnh
    removeImage(index: number): void {
    this.listFile.splice(index, 1); // Xóa file khỏi mảng `listFile`
    this.previewUrls.splice(index, 1); // Xóa URL khỏi mảng `previewUrls`
    }

    triggerFileInput(fileInput: HTMLInputElement): void {
        fileInput.click(); // Kích hoạt dialog chọn file
    }

    async uploadFile(file: File): Promise<string | null> {
        const formData = new FormData();
        formData.append('file', file);
      
        const urlUpload = 'http://localhost:8080/api/public/upload-file';
      
        try {
          const response = await fetch(urlUpload, {
            method: 'POST',
            body: formData,
          });
      
          if (response.status >= 200 && response.status < 300) {
            return await response.text(); // Trả về link ảnh nền
          } else {
            console.error('Upload failed with status:', response.status);
            return null;
          }
        } catch (error) {
          console.error('Error during file upload:', error);
          return null;
        }
    }

    async uploadMultipleFileNotResp(): Promise<string[]> {
        const formData = new FormData();
        
        // Thêm từng file từ this.listFile vào formData
        for (let i = 0; i < this.listFile.length; i++) {
          formData.append('file', this.listFile[i]);
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