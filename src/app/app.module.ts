import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// Firebase
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

// Paypal
import { NgxPayPalModule } from 'ngx-paypal'; 

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

// Extras
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { RestaurantesComponent } from './pages/restaurantes/restaurantes.component';
import { MenuRestComponent } from './pages/menu-rest/menu-rest.component';
import { UserHistorialComponent } from './pages/usuario/user-historial/user-historial.component';
import { UserAyudaComponent } from './pages/usuario/user-ayuda/user-ayuda.component';
import { UserPreguntasComponent } from './pages/usuario/user-preguntas/user-preguntas.component';
import { UserInfoComponent } from './pages/usuario/user-info/user-info.component';
import { UserDashboardComponent } from './pages/usuario/user-dashboard/user-dashboard.component';
import { GestionRestComponent } from './pages/admin/gestion-rest/gestion-rest.component';
import { GestionMenuComponent } from './pages/admin/gestion-menu/gestion-menu.component';
import { GestionUserComponent } from './pages/admin/gestion-user/gestion-user.component';
import { GestionRestAsociadosComponent } from './pages/admin/gestion-rest-asociados/gestion-rest-asociados.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    RestaurantesComponent,
    MenuRestComponent,
    UserHistorialComponent,
    UserAyudaComponent,
    UserPreguntasComponent,
    UserInfoComponent,
    UserDashboardComponent,
    GestionRestComponent,
    GestionMenuComponent,
    GestionUserComponent,
    GestionRestAsociadosComponent
  ],
  imports: [
    BrowserModule,
    NgxPayPalModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase), 
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
