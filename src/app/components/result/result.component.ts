import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  stressLevel: number;

  constructor(private route: ActivatedRoute) {
    const level = this.route.snapshot.paramMap.get('level');
    if (level) {
      this.stressLevel = Number(level);
    } else {
      this.stressLevel = 0;  // Or handle appropriately if no level is passed
    }
  }
  
}
