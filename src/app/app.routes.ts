import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProfileCreateComponent } from './components/profile-create/profile-create';
import { QrScannerComponent } from './components/qr-scanner/qr-scanner';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';

export const routes: Routes = [
  // Redirect root to dashboard if authenticated, otherwise to login
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Authentication routes (no guard needed)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Protected routes (require authentication)
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'create-profile', 
    component: ProfileCreateComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'qr-scanner', 
    component: QrScannerComponent,
    canActivate: [authGuard]
  },
  
  // Fallback route
  { path: '**', redirectTo: '/dashboard' }
];
