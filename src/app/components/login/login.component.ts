import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  standalone: true,  // ✅ Add this line to make it standalone
  imports: [FormsModule,CommonModule], 
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  newUsername: string = '';
  newPassword: string = '';
  registrationMessage: string = '';
  registeredUsers: { username: string, password: string }[] = [];
  isRegistering: boolean = false;


  constructor(private router: Router) { }

  toggleRegister() {
    this.isRegistering = true;
    document.querySelector('.container')?.classList.add('register-mode');
  }

  toggleLogin() {
    this.isRegistering = false;
    document.querySelector('.container')?.classList.remove('register-mode');
  }

  onRegister() {
    if (this.newUsername && this.newPassword) {
      let storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = storedUsers.find((u: any) => u.username === this.newUsername);
      
      if (!existingUser) {
        storedUsers.push({ username: this.newUsername, password: this.newPassword });
        localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
        
        this.registrationMessage = 'Registration successful!';
        alert(this.registrationMessage);
        this.newUsername = '';
        this.newPassword = '';
        this.toggleLogin();
      } else {
        alert('Username already exists!');
      }
    } else {
      alert('Please fill in both fields.');
    }
  }
  

  onLogin() {
    // Retrieve existing users from localStorage
    const users = localStorage.getItem('registeredUsers');
    this.registeredUsers = users ? JSON.parse(users) : [];
  
    // Check if the username and password match
    const user = this.registeredUsers.find(u => u.username === this.username && u.password === this.password);
    if (user) {
      this.router.navigate(['/dashboard']);  // This redirects to the Predict component
    } else {
      alert('Invalid credentials');
    }
  }
  
  
  

  switchMode(mode: string) {
    const container = document.querySelector('.container');
    if (mode === 'register') {
      container?.classList.add('register-mode');
    } else {
      container?.classList.remove('register-mode');
    }
  }
}
