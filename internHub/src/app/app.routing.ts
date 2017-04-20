import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Angular2TokenService } from './services/token-service/auth-token.service';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: false });
