import { Component, OnInit } from '@angular/core';
import { CitaService } from '../../../services/cita.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DateTimeFormatter, LocalDate, LocalTime } from '@js-joda/core';
import { Vehiculo } from '../../../models/vehiculo';
import { Servicio } from '../../../models/servicio';
import { VehiculoService } from '../../../services/vehiculo.service';
import { ServicioService } from '../../../services/servicio.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-crear-cita',
  standalone: false,
  templateUrl: './crear-cita.component.html',
  styleUrl: './crear-cita.component.css'
})
export class CrearCitaComponent implements OnInit {
  usuarios: any[] = [];
  usuarioId: number | null = null;

  vehiculos: Vehiculo[] = [];
  servicios: Servicio[] = [];
  horariosDisponibles: string[] = [];
  horariosOcupados: string[] = [];
  citasExistentes: any[] = [];

  idVehiculo!: number;
  idServicio!: number;
  fecha: Date | null = null;
  hora: string | null = null;
  mensajeErrorGeneral: string = '';

  semanas: (number | null)[][] = [];
  today: number = new Date().getDate();
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(
    private citaService: CitaService,
    private vehiculoService: VehiculoService,
    private servicioService: ServicioService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarServicios();
    this.cargarCitasExistentes();
    this.generarCalendario();
  }

  private cargarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  cargarVehiculos(): void {
    if (this.usuarioId !== null) {
      this.vehiculoService.getVehiculosPorUsuario(this.usuarioId).subscribe(data => {
        this.vehiculos = data;
      });
    }
  }

  private cargarCitasExistentes(): void {
    this.citaService.listarCitas().subscribe(data => {
      this.citasExistentes = data;
    });
  }

  get vehiculosActivos(): Vehiculo[] {
    return this.vehiculos?.filter(v => v.activo) ?? [];
  }

  private cargarServicios(): void {
    this.servicioService.listarServicios().subscribe(data => {
      this.servicios = data;
    });
  }

  private obtenerHorasOcupadas(): void {
    if (this.idServicio && this.fecha) {
      const fechaString = this.fecha.getFullYear() + "-" +
        (this.fecha.getMonth() + 1).toString().padStart(2, '0') + "-" +
        this.fecha.getDate().toString().padStart(2, '0');

      this.citaService.obtenerHorasOcupadas(this.idServicio, fechaString).subscribe(horas => {
        this.horariosOcupados = horas;
      });
    }
  }

  ServicioSeleccionado(): void {
    const horariosPorServicio: Record<number, string[]> = {
      1: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00'],
      2: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45'],
      3: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30'],
      4: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00'],
      5: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30'],
      6: ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30']
    };

    this.horariosDisponibles = horariosPorServicio[this.idServicio] || [];
    this.obtenerHorasOcupadas();
  }

  cambiarMes(incremento: number): void {
    this.currentMonth += incremento;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generarCalendario();
  }

  private generarCalendario(): void {
    const primerDiaSemana = new Date(this.currentYear, this.currentMonth, 1).getDay(); // Obtiene el día de la semana del primer día del mes
    const ultimoDiaMes = new Date(this.currentYear, this.currentMonth + 1, 0).getDate(); // Último día del mes
    let contador = 1;

    // Ajustamos para que la tabla comience en domingo
    this.semanas = [];

    for (let i = 0; i < 6; i++) {
      let semana: (number | null)[] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < primerDiaSemana) {
          semana.push(null); // Espacios vacíos antes del primer día
        } else if (contador > ultimoDiaMes) {
          semana.push(null); // Después del último día del mes
        } else {
          semana.push(contador++);
        }
      }
      this.semanas.push(semana);
    }
  }


  esDiaHabil(dia: number | null): boolean {
    if (!dia) return false;

    const date = new Date(this.currentYear, this.currentMonth, dia);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Eliminamos la hora para que no se coma el dia de hoy

    // Verifica que la fecha no sea anterior al día actual
    return date >= today && date.getDay() !== 0 && date.getDay() !== 6;
  }



  seleccionarFecha(dia: number | null): void {
    if (dia && this.esDiaHabil(dia)) {
      this.fecha = new Date(this.currentYear, this.currentMonth, dia);
      this.obtenerHorasOcupadas();
    }
  }

  seleccionarHora(hora: string): void {
    this.hora = hora;
  }

  esHorarioDisponible(hora: string): boolean {
    const ahora = new Date();
    const fechaHoraCita = new Date(this.fecha!);

    // Convertir hora seleccionada en objeto Date
    const [horas, minutos] = hora.split(':').map(Number);
    fechaHoraCita.setHours(horas, minutos, 0, 0);

    // Calcular diferencia en minutos
    const diferenciaMinutos = (fechaHoraCita.getTime() - ahora.getTime()) / (1000 * 60);

    // Si el horario ya pasó o faltan menos de 30 minutos, no es disponible
    return !this.horariosOcupados.includes(hora) && diferenciaMinutos > 30;
  }

  crearCita(form: NgForm): void {
    if (form.valid && this.fecha && this.hora) {
      // Convertimos la fecha a la zona horaria correcta
      const fechaLocal = new Date(this.fecha);
      fechaLocal.setHours(12); // Ajuste para evitar el cambio de día por UTC


      const nuevaCita = {
        idVehiculo: this.idVehiculo,
        idServicio: this.idServicio,
        fecha: fechaLocal.toISOString().split('T')[0], // Guardar en formato correcto
        hora: this.hora
      };

      this.citaService.crearCita(nuevaCita).subscribe({
        next: () => this.router.navigate(['desktop/citas']),
        error: err => this.mensajeErrorGeneral = err.status === 400 ? err.error : "Error inesperado. Recargue la página"
      });
    }
  }

  volver(): void {
    this.router.navigate(['desktop/citas']);
  }
}