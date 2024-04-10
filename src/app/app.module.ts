import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// Firebase
//import { AngularFireModule } from '@angular/fire/compat';
//import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

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

const firebase = {
  apiKey: "AIzaSyBi4HgSUzrwrjUvd7pbmzpqaZY_1SZzJ18",
  authDomain: "android-foodie-bf103.firebaseapp.com",
  databaseURL: "https://android-foodie-bf103-default-rtdb.firebaseio.com",
  projectId: "android-foodie-bf103",
  storageBucket: "android-foodie-bf103.appspot.com",
  messagingSenderId: "1018100386893",
  appId: "1:1018100386893:web:3e6a56cb3812abf9a7e004",
  measurementId: "G-MVB24X5ZB6"
};

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
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    provideFirebaseApp(() => initializeApp(firebase)),
    provideAuth(() => getAuth()) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
