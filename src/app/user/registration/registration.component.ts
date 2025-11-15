import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registration.component.html',
  styles: ``,
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    private router: Router ) {
    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(/(?=.*[^a-zA-Z0-9])/), // at least one special char
          ],
        ],
        confirmPassword: [''],
      },
      { validators: this.passwordMatchValidator }
    );
  }

   ngOnInit() {
      if (this.service.isLoggedIn()) this.router.navigateByUrl('/dashboard');
    }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({
          ...(confirmPassword.errors || {}),
          passwordMismatch: true,
        });
      } else {
        if (confirmPassword.errors) {
          // Remove only passwordMismatch, keep other errors
          delete confirmPassword.errors['passwordMismatch'];
          if (!Object.keys(confirmPassword.errors).length) {
            confirmPassword.setErrors(null);
          } else {
            confirmPassword.setErrors(confirmPassword.errors);
          }
        }
      }
    }
    return null;
  };

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.service.createUser(this.form.value).subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            this.form.reset();
            this.isSubmitted = false;
            this.toastr.success('New user created!', 'Registration Successful');
          }
        },

        //start shows error with filter only shows duplicate email error
        error: (err) => {
          if (err.error && Array.isArray(err.error)) {
            // 👉 Look for DuplicateEmail first
            const dupEmail = err.error.find(
              (x: any) => x.code === 'DuplicateEmail'
            );
            if (dupEmail) {
              this.toastr.error(
                'Email is already taken.',
                'Registration Failed'
              );
            } else {
              // 👉 fallback: just show the first error
              this.toastr.error(
                err.error[0].description,
                'Registration Failed'
              );
            }
          } else if (err.error.errors) {
            // fallback in case it's in the .errors object (IdentityResult format)
            const dupEmail = err.error.errors.find(
              (x: any) => x.code === 'DuplicateEmail'
            );
            if (dupEmail) {
              this.toastr.error(
                'Email is already taken.',
                'Registration Failed'
              );
            } else {
              this.toastr.error(
                err.error.errors[0].description,
                'Registration Failed'
              );
            }
          } else {
            console.log('error:', err);
            this.toastr.error(
              'Unexpected error occurred.',
              'Registration Failed'
            );
          }
        },
        //end shows error with filter only shows duplicate email error

        //start shows both user name and email error
        // error: (err) => {
        //   if (err.error && Array.isArray(err.error)) {
        //     err.error.forEach((x: any) => {
        //       this.toastr.error(x.description, 'Registration Failed');
        //     });
        //   } else if (err.error.errors) {
        //     err.error.errors.forEach((x: any) => {
        //       this.toastr.error(x.description, 'Registration Failed');
        //     });
        //   } else {
        //     console.log('error:', err);
        //     this.toastr.error(
        //       'Unexpected error occurred.',
        //       'Registration Failed'
        //     );
        //   }
        // },
        //end shows both user name and email error
      });
    }
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }

  getFirstError(controlName: string): string | null {
    const control = this.form.get(controlName);
    if (control && control.errors) {
      const firstKey = Object.keys(control.errors)[0];
      switch (firstKey) {
        case 'required':
          return 'Please enter your Password';
        case 'minlength':
          return 'At least 6 characters required.';
        case 'pattern':
          return 'One or more special characters required.';
      }
    }
    return null;
  }
}
