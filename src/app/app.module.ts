import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http'; // Añadir esta línea para habilitar fetch

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './components/USUARIO/listar-usuario/list-user.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetalleUsuarioComponent } from './components/USUARIO/detalle-usuario/detalle-usuario.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { CrearUsuarioComponent } from './components/USUARIO/crear-usuario/crear-usuario.component';
import { ActualizarUsuarioComponent } from './components/USUARIO/actualizar-usuario/actualizar-usuario.component';
import { BorrarUsuarioComponent } from './components/USUARIO/borrar-usuario/borrar-usuario.component';
import { ListVehiculoComponent } from './components/VEHICULO/list-vehiculo/list-vehiculo.component';
import { BorrarVehiculoComponent } from './components/VEHICULO/borrar-vehiculo/borrar-vehiculo.component';
import { CrearVehiculoComponent } from './components/VEHICULO/crear-vehiculo/crear-vehiculo.component';
import { ActualizarVehiculoComponent } from './components/VEHICULO/actualizar-vehiculo/actualizar-vehiculo.component';
import { DetalleVehiculoComponent } from './components/VEHICULO/detalle-vehiculo/detalle-vehiculo.component';
import { DetallePagoComponent } from './components/PAGO/detalle-pago/detalle-pago.component';
import { ActualizarPagoComponent } from './components/PAGO/actualizar-pago/actualizar-pago.component';
import { PagarPagoComponent } from './components/PAGO/pagar-pago/pagar-pago.component';
import { ListPagoComponent } from './components/PAGO/listar-pago/listar-pago.component';
import { ListServicioComponent } from './components/SERVICIO/listar-servicio/listar-servicio.component';
import { DetalleServicioComponent } from './components/SERVICIO/detalle-servicio/detalle-servicio.component';
import { ActualizarServicioComponent } from './components/SERVICIO/actualizar-servicio/actualizar-servicio.component';
import { CrearServicioComponent } from './components/SERVICIO/crear-servicio/crear-servicio.component';
import { BorrarServicioComponent } from './components/SERVICIO/borrar-servicio/borrar-servicio.component';
import { ListarServiCitaComponent } from './components/SERVICITA/listar-servi-cita/listar-servi-cita.component';
import { DetalleServiCitaComponent } from './components/SERVICITA/detalle-servi-cita/detalle-servi-cita.component';
import { CrearServiCitaComponent } from './components/SERVICITA/crear-servi-cita/crear-servi-cita.component';
import { ActualizarServiCitaComponent } from './components/SERVICITA/actualizar-servi-cita/actualizar-servi-cita.component';
import { BorrarServiCitaComponent } from './components/SERVICITA/borrar-servi-cita/borrar-servi-cita.component';
import { ListarCitaComponent } from './components/CITA/listar-cita/listar-cita.component';
import { DetalleCitaComponent } from './components/CITA/detalle-cita/detalle-cita.component';
import { CrearCitaComponent } from './components/CITA/crear-cita/crear-cita.component';
import { BorrarCitaComponent } from './components/CITA/borrar-cita/borrar-cita.component';
import { ActualizarCitaComponent } from './components/CITA/actualizar-cita/actualizar-cita.component';
import { RegisterComponent } from './components/AUTH/register/register.component';
import { LoginComponent } from './components/AUTH/login/login.component';
import { AuthInterceptor } from './services/INTERCEPTOR/auth.interceptor';
import { AcercaDeNosotrosComponent } from './components/INFORMACION/acerca-de-nosotros/acerca-de-nosotros.component';
import { TerminosYCondicionesComponent } from './components/INFORMACION/terminos-y-condiciones/terminos-y-condiciones.component';
import { PoliticaPrivacidadComponent } from './components/INFORMACION/politica-privacidad/politica-privacidad.component';
import { DashboardComponent } from './components/VISTA_USUARIO/dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MaterialModule } from '../shared/material.module';
import { DesktopComponent } from './components/VISTA_ADMIN/desktop/desktop.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { register } from 'swiper/element/bundle';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { HeaderAdminComponent } from './components/header-admin/header-admin.component';
import { ADMINISTARUSUARIOComponent } from './components/VISTA_ADMIN/administar-usuario/administar-usuario.component';
import { ACTUALIZARADMINComponent } from './components/VISTA_ADMIN/actualizar-admin/actualizar-admin.component';
import { VehiculoComponent } from './components/VISTA_USUARIO/vehiculo/vehiculo.component';
import { CitaComponent } from './components/VISTA_USUARIO/cita/cita.component';
import { ValoracionComponent } from './components/VISTA_USUARIO/valoracion/valoracion.component';
import { CreateVehiculoComponent } from './components/VISTA_USUARIO/vehiculo/create-vehiculo/create-vehiculo.component';
import { DetailsVehiculoComponent } from './components/VISTA_USUARIO/vehiculo/details-vehiculo/details-vehiculo.component';
import { UpdateVehiculoComponent } from './components/VISTA_USUARIO/vehiculo/update-vehiculo/update-vehiculo.component';
import { DeleteVehiculoComponent } from './components/VISTA_USUARIO/vehiculo/delete-vehiculo/delete-vehiculo.component';
import { ActualizarUserComponent } from './components/VISTA_USUARIO/actualizar-user/actualizar-user.component';
import { AdministrarUserComponent } from './components/VISTA_USUARIO/administrar-user/administrar-user.component';
import { PagoComponent } from './components/VISTA_USUARIO/pago/pago.component';
import { CreateCitaComponent } from './components/VISTA_USUARIO/cita/create-cita/create-cita.component';
import { DeleteCitaComponent } from './components/VISTA_USUARIO/cita/delete-cita/delete-cita.component';
import { DetailsCitaComponent } from './components/VISTA_USUARIO/cita/details-cita/details-cita.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateValoracionComponent } from './components/VISTA_USUARIO/valoracion/create-valoracion/create-valoracion.component';
import { FormatEnumPipe } from './pipes/format-enum.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    HeaderComponent,
    FooterComponent,
    DetalleUsuarioComponent,
    HomeComponent,
    CrearUsuarioComponent,
    ActualizarUsuarioComponent,
    BorrarUsuarioComponent,
    ListVehiculoComponent,
    BorrarVehiculoComponent,
    CrearVehiculoComponent,
    ActualizarVehiculoComponent,
    DetalleVehiculoComponent,
    ListPagoComponent,
    DetallePagoComponent,
    ActualizarPagoComponent,
    PagarPagoComponent,
    ListServicioComponent,
    DetalleServicioComponent,
    ActualizarServicioComponent,
    CrearServicioComponent,
    BorrarServicioComponent,
    ListarServiCitaComponent,
    DetalleServiCitaComponent,
    CrearServiCitaComponent,
    ActualizarServiCitaComponent,
    BorrarServiCitaComponent,
    ListarCitaComponent,
    DetalleCitaComponent,
    CrearCitaComponent,
    BorrarCitaComponent,
    ActualizarCitaComponent,
    RegisterComponent,
    LoginComponent,
    AcercaDeNosotrosComponent,
    TerminosYCondicionesComponent,
    PoliticaPrivacidadComponent,
    DashboardComponent,
    DesktopComponent,
    HeaderUserComponent,
    HeaderAdminComponent,
    ADMINISTARUSUARIOComponent,
    ACTUALIZARADMINComponent,
    VehiculoComponent,
    CitaComponent,
    ValoracionComponent,
    CreateVehiculoComponent,
    DetailsVehiculoComponent,
    UpdateVehiculoComponent,
    DeleteVehiculoComponent,
    ActualizarUserComponent,
    AdministrarUserComponent,
    PagoComponent,
    CreateCitaComponent,
    DeleteCitaComponent,
    DetailsCitaComponent,
    CreateValoracionComponent,
    FormatEnumPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule
  ],
  providers: [
    provideHttpClient(withFetch()),  // Habilitar fetch en HttpClient
    provideClientHydration(withEventReplay()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }  
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Permitir Web Components (Swiper)
})
export class AppModule { 
  constructor() {
    register(); // Inicializar Swiper para toda la aplicación
  }
}
