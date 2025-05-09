import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../shared/services/admin/category.service';
import { Category } from '../../../shared/models/category.model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-danhmuc',
  standalone: false,
  templateUrl: './danhmuc.html',
  styleUrl: '../../../style/admin.css'
})

export class DanhMucComponent implements OnInit {
  categories: Category[] = [];
  dataTableInitialized: boolean = false;
  isLoading:boolean = false;
  idcate:any = null;
  catename:any = '';
  imgpreview:any = '';
  image:any = '';
  fileImage:File | null = null


  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
        setTimeout(() => {
            if (!this.dataTableInitialized) {
            $('#example').DataTable();
            this.dataTableInitialized = true;
            }
        }, 0);
    });
  }

  async saveCategory(){
    var imageBannerUrls = null;
    this.isLoading = true;
    if(this.fileImage != null){
        imageBannerUrls = await this.uploadFile(this.fileImage);
    }
    if(imageBannerUrls != null){
        this.image = imageBannerUrls;
    }
    var category = {
        id: this.idcate,
        name: this.catename,
        image: this.image,
    };
    this.categoryService.postCategory(category).subscribe({
        next: (response) => {
           Swal.fire({
                title: "Thông báo",
                text: "Thành công",
                icon: "success"
            }).then(() => {
                window.location.reload()
            });
        },
        error: (error) => {
          this.toastr.error("Thất bại");
          this.isLoading = false
        }
      });
  }

  setData(cate: any){
    if(cate == null){
        this.idcate = null
        this.catename = ''
        this.image = ''
        this.imgpreview = ''
    }
    else{
        this.idcate = cate.id
        this.catename = cate.name
        this.image = cate.image
        this.imgpreview = cate.image
    }
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
            this.categoryService.delete(id).subscribe({
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

  changeFile(event: Event): void{
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.fileImage = input.files[0];
        this.imgpreview = URL.createObjectURL(this.fileImage);
    } 
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
      } 
      else {
        console.error('Upload failed with status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      return null;
    }
}
}
