import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/login-service';
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
    name: '',
    email: '',
    password: '',
    role: userRole.ADMIN
  };

  onLoginSubmit(form: any) {
    if (form.valid) {
      console.log('Login data:', this.loginData);
      console.log('Email:', this.loginData.email);
      console.log('Password:', this.loginData.plainPassword);
      
      this.loginService.logIn(this.loginData.email, this.loginData.plainPassword).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          // El router.navigate ya se maneja en el servicio
        },
        error: (error) => {
          console.error('Error completo en login:', error);
          console.error('Status:', error.status);
          console.error('Message:', error.message);
          console.error('Error body:', error.error);
        }
      });
    } else {
      console.error('Formulario no válido');
      alert('Por favor complete todos los campos requeridos');
    }
  }

  onRegisterSubmit(form: any) {
    if (form.valid) {
      console.log('Register data:', this.registerData);
      console.log('Name:', this.registerData.name);
      console.log('Email:', this.registerData.email);
      console.log('Password:', this.registerData.password);
      console.log('Role:', this.registerData.role);
      
      this.loginService.register(
        this.registerData.name,
        this.registerData.email,
        this.registerData.password,
        this.registerData.role,
      ).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          console.log('Intentando login automático...');
          // El login automático ya se maneja en el servicio de registro
        },
        error: (error) => {
          console.error('Error completo en el registro:', error);
          console.error('Status:', error.status);
          console.error('Message:', error.message);
          console.error('Error body:', error.error);
          alert('Error en el registro: ' + (error.error?.message || 'Error desconocido'));
        }
      });
    } else {
      console.error('Formulario no válido');
      alert('Por favor complete todos los campos requeridos');
    }
  }

  toggleLoginPassword() {
    this.showLoginPassord = !this.showLoginPassord;
  }

  toggleRegisterPassword() {
    this.showRegisterPassord = !this.showRegisterPassord;
  }
}
