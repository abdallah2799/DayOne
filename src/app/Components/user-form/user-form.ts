import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { User } from '../../Models/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  successMessage = '';
  isEditMode = false;
  userId?: number;

  constructor(
    private formBuilder: FormBuilder,
    private mockDataService: MockDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.userId;

    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '', 
        this.isEditMode ? [] : [Validators.required, Validators.minLength(6)]
      ],
      role: ['user', [Validators.required]]
    });

    if (this.isEditMode) {
      this.loadUser();
    }
  }

  loadUser(): void {
    this.loading = true;
    this.mockDataService.getUserById(this.userId!).subscribe({
      next: (user) => {
        if (user) {
          this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          });
        }
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading user';
        this.loading = false;
      }
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.isEditMode) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser(): void {
    this.mockDataService.createUser(this.userForm.value).subscribe({
      next: (user) => {
        this.loading = false;
        this.successMessage = 'User created successfully! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/admin-dashboard']);
        }, 1500);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Error creating user';
      }
    });
  }

  updateUser(): void {
    const updates = { ...this.userForm.value };
    
    // Remove password if empty in edit mode
    if (!updates.password) {
      delete updates.password;
    }

    this.mockDataService.updateUser(this.userId!, updates).subscribe({
      next: (user) => {
        this.loading = false;
        this.successMessage = 'User updated successfully! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/admin-dashboard']);
        }, 1500);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.message || 'Error updating user';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}
