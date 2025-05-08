import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-confirm',
  standalone:false,
  templateUrl: './forgot.html',
  styleUrl:'../../../style/user.css'
})
export class forgotComponent implements OnInit {
  email: string = ''; // Assuming `key` is set elsewhere

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {}

  async forgot() {
    const url = `http://localhost:8080/api/public/quen-mat-khau?email=${this.email}`;
  
    try {
      // Gửi yêu cầu với responseType: 'text'
      const response = await lastValueFrom(
        this.http.post(url, {}, { observe: 'response', responseType: 'text' })
      );
  
      // Kiểm tra status code
      if (response.status < 300) {
        Swal.fire({
          title: "Thông báo",
          text: "Kiểm tra email của bạn",
          icon: "success"
        }).then(() => {
          window.location.href = '/login';
        });
      }
    } catch (error: any) {
      // Log lỗi để kiểm tra
      console.error('Error occurred:', error);
  
      if (error.status === 417) {
        this.toastr.error(error.error?.defaultMessage || 'Lỗi không xác định');
      } else {
        this.toastr.error("Đã xảy ra lỗi, vui lòng thử lại!");
      }
    }
  }
}