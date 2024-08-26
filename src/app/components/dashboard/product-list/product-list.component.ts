import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { HttpErrorResponse } from '@angular/common/http';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, FormsModule, ReactiveFormsModule, FilterPipe, PopupComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  public productList: any;
  public startingIndex: number = 1;
  public searchKey!: string;
  public message: string = '';
  public messageType: 'success' | 'error' = 'success';
  public pageSize = 10;
  public currentPage = 1;
  // public pagedData: any = [];

  constructor(
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.getAllProducts();
    this.loadPageData();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(response=> {
      this.productList = response;      
    }, error=> {
      console.log(error);
    })
  }

  deleteProduct(id: string){
    this.productService.deleteProductById(id).subscribe({
      next: (res: any)=> {
        this.message = 'Product deleted successfully';
        this.messageType = 'success';
        setTimeout(()=> {
          window.location.href = window.location.href;
        }, 1000)
      },
      error: (err: HttpErrorResponse)=> {
        console.log(err);
        this.message = 'Product deleted failed';
        this.messageType = 'error';
      }
    })
  }

  loadPageData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.productList = this.productList.slice(start, end);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadPageData();
  }

  totalProducts = new Promise((resolve, reject)=> {
    setTimeout(()=> {
      resolve(this.productList.length)
    }, 500)
  })

}
