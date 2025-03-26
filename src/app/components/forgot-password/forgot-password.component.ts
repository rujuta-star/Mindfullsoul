import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  username: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  message: string = '';
  success: boolean = false;
  loading: boolean = false;

  registeredUsers: { username: string; password: string }[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Fetch users from localStorage
    const users = localStorage.getItem('registeredUsers');
    if (users) {
      this.registeredUsers = JSON.parse(users);
    }
  }

  // In ForgotPasswordComponent
forgotPassword() {
  // Retrieve existing users from localStorage
  const users = localStorage.getItem('registeredUsers');
  this.registeredUsers = users ? JSON.parse(users) : [];

  // Find the user by username
  const user = this.registeredUsers.find(u => u.username === this.username);
  if (user) {
    // Check if the old password matches
    if (this.oldPassword === user.password) {
      // Check if the new passwords match
      if (this.newPassword === this.confirmNewPassword) {
        // Update the user's password
        user.password = this.newPassword;

        // Save the updated users list to localStorage
        localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));

        this.success = true;
        this.message = 'Password reset successfully!';
      } else {
        this.success = false;
        this.message = 'New passwords do not match.';
      }
    } else {
      this.success = false;
      this.message = 'Old password is incorrect.';
    }
  } else {
    this.success = false;
    this.message = 'User not found.';
  }
}


  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
