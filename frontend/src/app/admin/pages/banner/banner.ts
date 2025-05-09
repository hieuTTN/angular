import { Component, OnInit } from '@angular/core';
import { BannerService } from '../../../shared/services/admin/banner.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-banner',
  standalone: false,
  templateUrl: './banner.html',
  styleUrl: '../../../style/admin.css'
})

export class BannerComponent implements OnInit {
  banners: any[] = [];
  dataTableInitialized: boolean = false;
  isLoading:boolean = false;
  idbanner:any = null;
  tentrang:any = '';
  linkweb:any = '';
  bannerType:any = 'NORMAL';
  image:any = '';
  fileImage:File | null = null
  imgpreview:any


  constructor(
    private bannerService: BannerService,
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.loadbanner();
  }

  loadbanner(): void {
    this.bannerService.getBanner().subscribe(data => {
      this.banners = data;
        setTimeout(() => {
            if (!this.dataTableInitialized) {
            $('#example').DataTable();
            this.dataTableInitialized = true;
            }
        }, 0);
    });
  }

 async saveBanner(){
    var imageBannerUrls = null;
    this.isLoading = true;
    if(this.fileImage != null){
        imageBannerUrls = await this.uploadFile(this.fileImage);
    }
    if(imageBannerUrls != null){
        this.image = imageBannerUrls;
    }
    var banner = {
        id: this.idbanner,
        pageName: this.tentrang,
        linkWeb: this.linkweb,
        bannerType: this.bannerType,
        image: this.image,
    };
    this.bannerService.postBanner(banner).subscribe({
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

  
  delete(id:number): void {
      Swal.fire({
        title: 'Xác nhận xóa?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Không'
    }).then(result => {
        if (result.isConfirmed) {
            this.bannerService.delete(id).subscribe({
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

  setData(cate: any){
    if(cate == null){
        this.idbanner = null
        this.tentrang = ''
        this.bannerType = ''
        this.linkweb = ''
        this.image = ''
        this.imgpreview = ''
    }
    else{
        this.idbanner = cate.id
        this.tentrang = cate.pageName
        this.bannerType = cate.bannerType
        this.linkweb = cate.linkWeb
        this.image = cate.image
        this.imgpreview = cate.image
    }
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
