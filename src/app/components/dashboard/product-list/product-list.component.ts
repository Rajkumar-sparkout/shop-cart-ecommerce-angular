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

  constructor(
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.getAllProducts()
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

}
