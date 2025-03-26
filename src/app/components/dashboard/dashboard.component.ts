import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  
  styleUrls: [ './dashboard.component.css']

})
export class DashboardComponent {
  constructor(private router: Router) {} 
    
  startMeditation() {
    alert('Starting meditation session...');
  }

  startBreathing() {
    alert('Starting breathing exercises...');
  }

  playMusic() {
    alert('Playing relaxing music...');
  }

  startYoga() {
    alert('Starting yoga session...');
  }
  
   // Inject Router
  
    predictStress() {
      this.router.navigate(['/predict']);
      
    }
    navigateToLogin() {
      this.router.navigate(['/login']); // Navigate to login page
    }
  
    navigateToPredict() {
      this.router.navigate(['/predict']); // Navigate to the prediction page
    }
    navigateToAbout() {
      this.router.navigate(['/about']); // Navigate to the prediction page
    }
}
