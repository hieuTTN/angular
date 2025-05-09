import { Component, OnInit } from '@angular/core';
import { ThongKeService } from '../../../shared/services/admin/thongke.service';
import { ToastrService } from 'ngx-toastr';
import { Chart, registerables } from 'chart.js';

import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-admin-index',
  standalone: false,
  templateUrl: './index.html',
  styleUrl: '../../../style/admin.css'
})

export class IndexComponent implements OnInit {
  products: any[] = [];
  dataTableInitialized: boolean = false;
  doanhThuThangNay:any = 0;
  slQuantri:any = 0;
  slMathang:any = 0;
  doanhThuNgay:any = 0;
  donHtNgay:any = 0;
  currentyear:any = 2025;
  chart: any;


  constructor(
    private thongKeService: ThongKeService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.getAllText();
    this.getDoanhThuNam();
    Chart.register(...registerables);
  }

  loadProduct(): void {
    this.thongKeService.getSpChay().subscribe(data => {
      this.products = data;
  
      if (this.dataTableInitialized) {
        const table = $('#example').DataTable();
        table.clear().destroy();  
        this.dataTableInitialized = false;
      }
  
      setTimeout(() => {
        $('#example').DataTable();
        this.dataTableInitialized = true;
      }, 0);
    });
  }
  
  getAllText(){
    this.thongKeService.doanhThuThangNay().subscribe(data => {
      this.doanhThuThangNay = data;
    });
    this.thongKeService.slQuantri().subscribe(data => {
      this.slQuantri = data;
    });
    this.thongKeService.slSanPham().subscribe(data => {
      this.slMathang = data;
    });
    this.thongKeService.doanhThuNgay().subscribe(data => {
      this.doanhThuNgay = data;
    });
    this.thongKeService.soDonHtNgay().subscribe(data => {
      this.donHtNgay = data;
    });
  }

  getDoanhThuNam(){
    this.thongKeService.doanhThuNam(this.currentyear).subscribe(data => {
      this.createChart(data);
    });
  }

  createChart(dulieu: number[]) {
    // Đảm bảo biểu đồ trước đó được hủy nếu tồn tại
    if (this.chart) {
      this.chart.destroy();
    }
  
    // Lấy phần tử canvas
    const canvas = document.getElementById('chart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Không tìm thấy phần tử canvas với id "chart"');
      return;
    }
  
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Không thể lấy được context 2D từ canvas');
      return;
    }
    for (var i = 0; i < dulieu.length; i++) {
      if (dulieu[i] == null) {
      }
  }
    // Tạo biểu đồ
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["tháng 1", "tháng 2", "tháng 3", "tháng 4", "tháng 5", "tháng 6", "tháng 7", "tháng 8", "tháng 9", "tháng 10", "tháng 11", "tháng 12"],
        datasets: [{
          label: 'Doanh thu năm '+this.currentyear,
          backgroundColor: [
              'rgba(54, 162, 235, 0.8)', // Màu xanh đậm hơn
              'rgba(75, 192, 192, 0.8)', // Màu xanh ngọc đậm hơn
              'rgba(255, 206, 86, 0.8)', // Màu vàng đậm hơn
              'rgba(255, 99, 132, 0.8)', // Màu đỏ đậm hơn
              'rgba(153, 102, 255, 0.8)', // Màu tím đậm hơn
              'rgba(255, 159, 64, 0.8)', // Màu cam đậm hơn
              'rgba(199, 199, 199, 0.8)', // Màu xám đậm hơn
              'rgba(83, 102, 255, 0.8)', // Màu xanh đậm hơn
              'rgba(54, 162, 235, 0.8)', // Màu xanh đậm hơn
              'rgba(255, 159, 64, 0.8)', // Màu cam đậm hơn
              'rgba(255, 99, 132, 0.8)', // Màu đỏ đậm hơn
              'rgba(153, 102, 255, 0.8)'  // Màu tím đậm hơn
          ],
          borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(199, 199, 199, 1)',
              'rgba(83, 102, 255, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1,
          data: dulieu,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 100000,
              callback: function (value) {
                return value.toLocaleString('vi-VN') + ' ₫';
              }
            }
          }
        }
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
}
