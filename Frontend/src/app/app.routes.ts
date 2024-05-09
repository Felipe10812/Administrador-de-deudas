import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import DashboardComponent from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./components/login/login.component') },
    { path: 'sig-in', loadComponent: () => import('./components/sig-in/sig-in.component') },
    // { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component') },
    { path: 'dashboard', component: DashboardComponent },

    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
