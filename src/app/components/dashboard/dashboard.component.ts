import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './common/navbar/navbar.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NavbarComponent, SidebarComponent, ProductListComponent, CommonModule, ProductComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  public admin = false;

  constructor(){}

  ngOnInit(): void {
    if(localStorage.getItem('role') == 'Admin'){
      this.admin = true;
    }
  }

}
