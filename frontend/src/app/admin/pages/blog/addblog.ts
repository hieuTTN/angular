import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../shared/services/admin/blog.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-addblog',
  standalone: false,
  templateUrl: './addblog.html',
  styleUrl: '../../../style/admin.css'
})

export class AddBlogComponent implements OnInit {

    tinyMceSettings = {
        base_url: '/tinymce', // nếu dùng local
        suffix: '.min',
        height: 500,
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
    };
  products: any[] = [];
  isLoading:boolean = false;
  title:any = '';
  description:any = '';
  content:any = '';
  image:any = '';
  imgpreview:any = '';
  fileImage:File | null = null

  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadDetail();
  }

  loadDetail(): void {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    if(id){
        this.blogService.getDetail(id).subscribe(data => {
            this.title = data.title
            this.description = data.description
            this.content = data.content
            this.image = data.imageBanner
            this.imgpreview = data.imageBanner
        });
    }
  }



  async saveBlog(){
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var imageBannerUrls = null;
    this.isLoading = true;
    if(this.fileImage != null){
        imageBannerUrls = await this.uploadFile(this.fileImage);
    }
    if(imageBannerUrls != null){
        this.image = imageBannerUrls;
    }
    var blog = {
        id: id,
        title: this.title,
        description: this.description,
        content: this.content,
        imageBanner: this.image,
    }
    this.blogService.postBlog(blog).subscribe({
        next: (response) => {
           Swal.fire({
                title: "Thông báo",
                text: "Thành công",
                icon: "success"
            }).then(() => {
                window.location.href='/admin/blog'
            });
        },
        error: (error) => {
          this.toastr.error("Thất bại");
          this.isLoading = false
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
