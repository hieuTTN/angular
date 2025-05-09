import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/user/product.service';
import { CategoryService } from '../../../shared/services/admin/category.service';
import { BlogService } from '../../../shared/services/user/blog.service';
import { Category } from '../../../shared/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { UserLayoutComponent } from '../../layout/user-layout';
@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './blogdetail.html',
  styleUrl:'../../../style/user.css'
})


export class BlogDetailComponent implements OnInit {
  categories: Category[] = [];
  blog: any = null;

  constructor(
    private blogService: BlogService, 
    private categoryService: CategoryService) {

    }

  ngOnInit(): void {
    this.loadCategory();
    this.loadBlog();
  }


  loadCategory(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      
    });
  }

  loadBlog(): void {
    var uls = new URL(document.URL)
    var id = uls.searchParams.get("id");
    this.blogService.getBlogDetail(id).subscribe(result => {
      this.blog = result
    });
  }
}