import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/admin/product.service';
import { CategoryService } from '../../../shared/services/admin/category.service';
import { Product } from '../../../shared/models/product.model';
import { Category } from '../../../shared/models/category.model';
@Component({
  selector: 'app-admin-product',
  standalone:false,
  templateUrl: './product.component.html',
  styleUrl:'../../../style/admin.css'
})


export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];

  selectedCategoryId: number = -1;

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService) {

    }

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategory();
  }

  loadProducts(): void {
    this.productService.getProducts(this.selectedCategoryId).subscribe(data => {
      this.products = data;
      console.log(data);
    });
  }

  loadCategory(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
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