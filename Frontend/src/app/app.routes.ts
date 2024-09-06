import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./components/login/login.component') },
    { path: 'sig-in', loadComponent: () => import('./components/sig-in/sig-in.component') },
    { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component') },
    { path: 'deudores', loadComponent: () => import('./components/Administrador/deudores/deudores.component') },
    { path: 'gestor-usuarios', loadComponent: () => import('./components/Administrador/gestor-usuarios/gestor-usuarios.component') },
    { path: 'registros-deudas-pagos', loadComponent: () => import('./components/Administrador/registros-deudas-pagos/registros-deudas-pagos.component') },

    // { path: 'dashboard', component: DashboardComponent },

    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
