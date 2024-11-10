import { Component } from '@angular/core';
import { CocheComponent } from '../nota/nota.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CocheComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
