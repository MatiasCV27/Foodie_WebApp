import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { MenuRestComponent } from './pages/menu-rest/menu-rest.component';
import { GestionMenuComponent } from './pages/admin/gestion-menu/gestion-menu.component';
import { GestionRestComponent } from './pages/admin/gestion-rest/gestion-rest.component';
import { GestionUserComponent } from './pages/admin/gestion-user/gestion-user.component';
import { GestionRestAsociadosComponent } from './pages/admin/gestion-rest-asociados/gestion-rest-asociados.component';
import { UserDashboardComponent } from './pages/usuario/user-dashboard/user-dashboard.component';
import { UserAyudaComponent } from './pages/usuario/user-ayuda/user-ayuda.component';
import { UserHistorialComponent } from './pages/usuario/user-historial/user-historial.component';
import { UserInfoComponent } from './pages/usuario/user-info/user-info.component';
import { UserPreguntasComponent } from './pages/usuario/user-preguntas/user-preguntas.component';

const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'registro', component: RegistroComponent, pathMatch: 'full' },
  { path: 'restaurantes', component: RestaurantesComponent, pathMatch: 'full' },
  { path: 'menus', component: MenuRestComponent, pathMatch: 'full' },
  { path: 'menu-rest', component: MenuRestComponent },

  { path: 'admin/gestion-menu', component: GestionMenuComponent, pathMatch: 'full' },
  { path: 'admin/gestion-restaurantes', component: GestionRestComponent, pathMatch: 'full' },
  { path: 'admin/gestion-user', component: GestionUserComponent, pathMatch: 'full' },
  { path: 'admin/gestion-asociados', component: GestionRestAsociadosComponent, pathMatch: 'full' },

  { path: 'user', component: UserDashboardComponent, children: [
    { path: 'ayuda', component: UserAyudaComponent },
    { path: 'historial', component: UserHistorialComponent },
    { path: 'informacion', component: UserInfoComponent },
    { path: 'preguntas', component: UserPreguntasComponent }
  ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
