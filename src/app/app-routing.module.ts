import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CrearUsuarioComponent } from './components/USUARIO/crear-usuario/crear-usuario.component';
import { ActualizarUsuarioComponent } from './components/USUARIO/actualizar-usuario/actualizar-usuario.component';
import { ListUserComponent } from './components/USUARIO/listar-usuario/list-user.component';
import { DetalleUsuarioComponent } from './components/USUARIO/detalle-usuario/detalle-usuario.component';
import { ListVehiculoComponent } from './components/VEHICULO/list-vehiculo/list-vehiculo.component';
import { CrearVehiculoComponent } from './components/VEHICULO/crear-vehiculo/crear-vehiculo.component';
import { ActualizarVehiculoComponent } from './components/VEHICULO/actualizar-vehiculo/actualizar-vehiculo.component';
import { DetalleVehiculoComponent } from './components/VEHICULO/detalle-vehiculo/detalle-vehiculo.component';
import { ListPagoComponent } from './components/PAGO/listar-pago/listar-pago.component';
import { DetallePagoComponent } from './components/PAGO/detalle-pago/detalle-pago.component';
import { ActualizarPagoComponent } from './components/PAGO/actualizar-pago/actualizar-pago.component';
import { PagarPagoComponent } from './components/PAGO/pagar-pago/pagar-pago.component';
import { ListServicioComponent } from './components/SERVICIO/listar-servicio/listar-servicio.component';
import { CrearServicioComponent } from './components/SERVICIO/crear-servicio/crear-servicio.component';
import { ListarServiCitaComponent } from './components/SERVICITA/listar-servi-cita/listar-servi-cita.component';
import { DetalleServiCitaComponent } from './components/SERVICITA/detalle-servi-cita/detalle-servi-cita.component';
import { CrearServiCitaComponent } from './components/SERVICITA/crear-servi-cita/crear-servi-cita.component';
import { ActualizarServiCitaComponent } from './components/SERVICITA/actualizar-servi-cita/actualizar-servi-cita.component';
import { ListarCitaComponent } from './components/CITA/listar-cita/listar-cita.component';
import { DetalleCitaComponent } from './components/CITA/detalle-cita/detalle-cita.component';
import { CrearCitaComponent } from './components/CITA/crear-cita/crear-cita.component';
import { ActualizarCitaComponent } from './components/CITA/actualizar-cita/actualizar-cita.component';
import { RegisterComponent } from './components/AUTH/register/register.component';
import { LoginComponent } from './components/AUTH/login/login.component';
import { AcercaDeNosotrosComponent } from './components/INFORMACION/acerca-de-nosotros/acerca-de-nosotros.component';
import { TerminosYCondicionesComponent } from './components/INFORMACION/terminos-y-condiciones/terminos-y-condiciones.component';
import { PoliticaPrivacidadComponent } from './components/INFORMACION/politica-privacidad/politica-privacidad.component';
import { DashboardComponent } from './components/VISTA_USUARIO/dashboard/dashboard.component';
import { DesktopComponent } from './components/VISTA_ADMIN/desktop/desktop.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';
import { ActualizarServicioComponent } from './components/SERVICIO/actualizar-servicio/actualizar-servicio.component';
import { DetalleServicioComponent } from './components/SERVICIO/detalle-servicio/detalle-servicio.component';
import { ADMINISTARUSUARIOComponent } from './components/VISTA_ADMIN/administar-usuario/administar-usuario.component';
import { ACTUALIZARADMINComponent } from './components/VISTA_ADMIN/actualizar-admin/actualizar-admin.component';
import { VehiculoComponent } from './components/VISTA_USUARIO/vehiculo/vehiculo.component';
import { CitaComponent } from './components/VISTA_USUARIO/cita/cita.component';
import { ValoracionComponent } from './components/VISTA_USUARIO/valoracion/valoracion.component';
import { CreateVehiculoComponent } from './components/VISTA_USUARIO/vehiculo/create-vehiculo/create-vehiculo.component';
import { UpdateVehiculoComponent } from './components/VISTA_USUARIO/vehiculo/update-vehiculo/update-vehiculo.component';
import { DetailsVehiculoComponent } from './components/VISTA_USUARIO/vehiculo/details-vehiculo/details-vehiculo.component';
import { AdministrarUserComponent } from './components/VISTA_USUARIO/administrar-user/administrar-user.component';
import { ActualizarUserComponent } from './components/VISTA_USUARIO/actualizar-user/actualizar-user.component';
import { PagoComponent } from './components/VISTA_USUARIO/pago/pago.component';
import { CreateCitaComponent } from './components/VISTA_USUARIO/cita/create-cita/create-cita.component';
import { DetailsCitaComponent } from './components/VISTA_USUARIO/cita/details-cita/details-cita.component';
import { CreateValoracionComponent } from './components/VISTA_USUARIO/valoracion/create-valoracion/create-valoracion.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Ruta principal

  // RUTAS DE AUTH 
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  // RUTAS DE VISTA USUARIO 
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserGuard] },
  { path: 'dashboard/administrador', component: AdministrarUserComponent, canActivate: [UserGuard] },
  { path: 'dashboard/update', component: ActualizarUserComponent, canActivate: [UserGuard] },
  { path: 'dashboard/vehiculos', component: VehiculoComponent, canActivate: [UserGuard] },
  { path: 'dashboard/citas', component: CitaComponent, canActivate: [UserGuard] },
  { path: 'dashboard/valoraciones', component: ValoracionComponent, canActivate: [UserGuard] },
  { path: 'dashboard/pagos', component: PagoComponent, canActivate: [UserGuard] },

  // RUTAS DE VISTA USUARIO (VEHICULO)
  { path: 'dashboard/vehiculos/create', component: CreateVehiculoComponent, canActivate: [UserGuard] },
  { path: 'dashboard/vehiculos/:id/update', component: UpdateVehiculoComponent, canActivate: [UserGuard] },
  { path: 'dashboard/vehiculos/:id/details', component: DetailsVehiculoComponent, canActivate: [UserGuard] },

  // RUTAS DE VISTA USUARIO (CITA)
  { path: 'dashboard/citas/create', component: CreateCitaComponent, canActivate: [UserGuard] },
  { path: 'dashboard/citas/:id/details', component: DetailsCitaComponent, canActivate: [UserGuard] },
  { path: 'dashboard/citas/valoraciones/create/:idCita', component: CreateValoracionComponent, canActivate: [UserGuard] },

  // RUTAS DE VISTA ADMIM
  { path: 'desktop', component: DesktopComponent, canActivate: [AdminGuard] },
  { path: 'desktop/administrador', component: ADMINISTARUSUARIOComponent, canActivate: [AdminGuard] },
  { path: 'desktop/update', component: ACTUALIZARADMINComponent, canActivate: [AdminGuard] },

  // RUTAS DE USUARIO ADMIN
  { path: 'desktop/usuarios', component: ListUserComponent, canActivate: [AdminGuard] },
  { path: 'desktop/usuarios/create', component: CrearUsuarioComponent, canActivate: [AdminGuard] },
  { path: 'desktop/usuarios/:id/update', component: ActualizarUsuarioComponent, canActivate: [AdminGuard] },
  { path: 'desktop/usuarios/:id', component: DetalleUsuarioComponent, canActivate: [AdminGuard] },

  // RUTAS DE VEHICULO ADMIN
  { path: 'desktop/vehiculos', component: ListVehiculoComponent, canActivate: [AdminGuard] },
  { path: 'desktop/vehiculos/create', component: CrearVehiculoComponent, canActivate: [AdminGuard] },
  { path: 'desktop/vehiculos/:id/update', component: ActualizarVehiculoComponent, canActivate: [AdminGuard] },
  { path: 'desktop/vehiculos/:id', component: DetalleVehiculoComponent, canActivate: [AdminGuard] },

  // RUTAS DE PAGO ADMIN
  { path: 'desktop/pagos', component: ListPagoComponent, canActivate: [AdminGuard] },
  { path: 'desktop/pagos/:idPago', component: DetallePagoComponent, canActivate: [AdminGuard] },
  { path: 'desktop/pagos/:idPago/update', component: ActualizarPagoComponent, canActivate: [AdminGuard] },
  { path: 'desktop/pagos/:idPago/pay', component: PagarPagoComponent, canActivate: [AdminGuard] },

  // RUTAS DE SERVICIO ADMIN
  { path: 'desktop/servicios', component: ListServicioComponent, canActivate: [AdminGuard] },
  { path: 'desktop/servicios/create', component: CrearServicioComponent, canActivate: [AdminGuard] },
  { path: 'desktop/servicios/:id/update', component: ActualizarServicioComponent, canActivate: [AdminGuard] },
  { path: 'desktop/servicios/:id', component: DetalleServicioComponent, canActivate: [AdminGuard] },

  // RUTAS DE SERVICITAS ADMIN
  { path: 'desktop/servicitas', component: ListarServiCitaComponent, canActivate: [AdminGuard] },
  { path: 'desktop/servicitas/create', component: CrearServiCitaComponent, canActivate: [AdminGuard] },
  { path: 'desktop/servicitas/:id/update', component: ActualizarServiCitaComponent, canActivate: [AdminGuard] },
  { path: 'desktop/servicitas/:id', component: DetalleServiCitaComponent, canActivate: [AdminGuard] },

  // RUTAS DE CITA ADMIN
  { path: 'desktop/citas', component: ListarCitaComponent, canActivate: [AdminGuard] },
  { path: 'desktop/citas/create', component: CrearCitaComponent, canActivate: [AdminGuard] },
  { path: 'desktop/citas/:id/update', component: ActualizarCitaComponent, canActivate: [AdminGuard] },
  { path: 'desktop/citas/:id', component: DetalleCitaComponent, canActivate: [AdminGuard] },

  // RUTAS DE INFORMACIÓN
  { path: 'acerca-de-nosotros', component: AcercaDeNosotrosComponent },
  { path: 'terminos-y-condiciones', component: TerminosYCondicionesComponent },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' }  // Ruta de redirección para páginas no encontradas
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
