import { Component, OnInit } from '@angular/core';
import { NhapHangService } from '../../../shared/services/admin/nhaphang.service';
import { ProductService } from '../../../shared/services/admin/product.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-nhaphang',
  standalone: false,
  templateUrl: './addnhaphang.html',
  styleUrl: '../../../style/admin.css'
})

export class AddNhapHangComponent implements OnInit {
  products: any[] = [];

  product:any = 1;
  soluong:any = 1;
  gianhap:any = 1;
  content:any = '';

  constructor(
    private nhaphangService: NhapHangService,
    private productService: ProductService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.loadDetail();
  }

  loadDetail(): void {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    if(id){
        this.nhaphangService.getDetail(id).subscribe(data => {
            this.product = data.product.id
            this.soluong = data.quantity
            this.gianhap = data.importPrice
            this.content = data.description
        });
    }
  }

  changegia(){
    for(var i=0; i< this.products.length; i++){
        if(this.products[i].id == this.product){
            this.gianhap = this.products[i].price
            break;
        }
    }
  }

  loadProduct(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      if(data.length > 0){
        this.product = data[0].id
        this.gianhap = data[0].price
      }
    });
  }


  async saveImport(){
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    var importPro = {
        id: id,
        quantity: this.soluong,
        importPrice: this.gianhap,
        description: this.content,
        product: {
            id: this.product
        }
    }
    this.nhaphangService.postNhapHang(importPro).subscribe({
        next: (response) => {
           Swal.fire({
                title: "Thông báo",
                text: "Thành công",
                icon: "success"
            }).then(() => {
                window.location.href='/admin/importproduct'
            });
        },
        error: (error) => {
          this.toastr.error("Thất bại");
        }
      });
  }
  
}
