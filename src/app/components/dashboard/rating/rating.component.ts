import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css'
})
export class RatingComponent implements OnInit{

  @Input() rating: number = 0; // current rating
  @Input() readonly: boolean = false; // flag to make it read-only
  @Output() ratingChange = new EventEmitter<number>(); // emits rating changes

  public maxRating: number = 5; // maximum rating value

  constructor(){}

  ngOnInit(): void {
    
  }

  onRate(value: number, id: string): void {
    if (!this.readonly) {
      this.rating = value;
      this.ratingChange.emit(this.rating);
    }
  }

  isStarActive(value: number): boolean {
    return value <= this.rating;
  }

}
