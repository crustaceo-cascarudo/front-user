import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login-service';
import { UserLogin } from '../../../models/user/user-login';
import { UserRegister } from '../../../models/user/user-register';
import { userRole } from '../../../core/enum/user-role';
import { NgClass } from '@angular/common';

@Component({
  selector: 'c-login-register',
  imports: [FormsModule, NgClass],
  templateUrl: './c-login-register.html',
  styleUrl: './c-login-register.scss',
})
export class CLoginRegister {
  @Input() isLoginMode: boolean = true;
  showLoginPassord: boolean = false;
  showRegisterPassord: boolean = false;
  loginService = inject(LoginService);
  router = inject(Router);

  loginData: UserLogin = {
    email: '',
    plainPassword: ''
  };

  registerData: UserRegister = {
    email: '',
    password: '',
    role: userRole.NORMAL
  };

  onLoginSubmit(form: any) {
    if (form.valid) {
      console.log('Login data:', this.loginData);
      this.loginService.logIn(this.loginData.email, this.loginData.plainPassword).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error en login:', error);
        }
      });
    }
  }

  onRegisterSubmit(form: any) {
    if (form.valid) {
      console.log('Register data:', this.registerData);
      this.loginService.register(
        this.registerData.email,
        this.registerData.password,
      ).subscribe({
        next: (response) => {

          this.router.navigate(['/dashboard']);
          console.log('Redirigiendo');
        },
        error: (error) => {
          console.error('Error en el registro');
        }
      });
    }
  }

  toggleLoginPassword() {
    this.showLoginPassord = !this.showLoginPassord;
  }

  toggleRegisterPassword() {
    this.showRegisterPassord = !this.showRegisterPassord;
  }
}
