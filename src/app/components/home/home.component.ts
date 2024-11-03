import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.router.navigate(['dashboard']);
    }
  }

}
