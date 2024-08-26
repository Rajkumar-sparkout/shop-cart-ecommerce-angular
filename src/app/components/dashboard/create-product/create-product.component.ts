import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiResponseInterface, Product } from '../../../interfaces/common';
import { PopupComponent } from '../../popup/popup.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, FormsModule, ReactiveFormsModule, CommonModule, PopupComponent, RouterLink],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit{

  public categories = ['mobile', "laptop", "computer", "tablet", "LED_tv", "air_cooler", "washine_machine", "fridge"] ;
  public imageSrc: string | ArrayBuffer | null = "";
  public message: string = '';
  public messageType: 'success' | 'error' = 'success';
  public productName: any;
  public category: any;
  public description: any;
  public price: any;
  public offer: any;
  public rating: any;
  public image: any;
  public products: any;
  public id: any;


  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params['id']){
        this.getProductById(params['id']);
        this.id = params['id'];
      }
    }); 
  }

  productForm = new FormGroup({
    productName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    offer: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  get productFormControl(){
    return this.productForm.controls;
  }
  
  fileChangeEvent(event: any) {
    if(event.target.files){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file); 
    }
 }

  onSubmit(){
    let product = {
      productName: JSON.parse(JSON.stringify(this.productForm.value.productName)),
      category: JSON.parse(JSON.stringify(this.productForm.value.category)),
      description: JSON.parse(JSON.stringify(this.productForm.value.description)),
      price: JSON.parse(JSON.stringify(this.productForm.value.price)),
      offer: JSON.parse(JSON.stringify(this.productForm.value.offer)),
      rating: JSON.parse(JSON.stringify(this.productForm.value.rating)),
      image: this.imageSrc,
    }
    // const product = this.productForm.value;
    if(this.products){
      this.productService.updateProductById(this.products[0].id, product).subscribe({
        next: (res: any)=> {
          this.message = 'Product updated successfully';
          this.messageType = 'success';
          setTimeout(()=> {
            this.router.navigate(['/dashboard']);
          },1000)
        }, error: (err: HttpErrorResponse)=> {
          console.log(err);
          this.message = 'Product update failed';
          this.messageType = 'error';
        }
      })
    } else{
      if(this.productForm.valid){
  
        this.productService.createProduct(product as Product).subscribe({
          next: (res: any)=> {
            this.message = 'Product created successfully';
            this.messageType = 'success';
            setTimeout(()=> {
              this.router.navigate(['/dashboard']);
            }, 1000);
          },
          error: (err: HttpErrorResponse)=> {
            console.log(err);
            this.message = 'Product created failed';
            this.messageType = 'error';
          }
        })
      }
    }
  }

  public getProductById(id: string){
    this.productService.getProductById(id).subscribe({
      next: (res: any)=> {
        this.products = res;        
        this.productForm.patchValue({
          productName: res[0].productName,
          category: res[0].category,
          description: res[0].description,
          price: res[0].price,
          rating: res[0].rating,
          offer: res[0].offer,
          // image: res[0].image,
        })
      },
      error: (err: HttpErrorResponse)=> {
        console.log(err);
      }
    })
  }

}
