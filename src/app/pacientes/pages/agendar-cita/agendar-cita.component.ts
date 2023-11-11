import { Component, OnInit } from '@angular/core';
import { TipoCitaService } from 'src/app/admin/pages/services/tipo-cita.service';
import { HorarioClinicaService } from '../../services/horario-clinica.service';
import { Horario, HorarioClinicaResponse } from '../interfaces/horario_clinicas';
import dayGridPlugin from '@fullcalendar/daygrid';

import { Router } from '@angular/router';
import { CalendarOptions } from 'fullcalendar';
@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss']
})
export class AgendarCitaComponent implements OnInit{

  horarioClinicas: Horario [] = [];
  calendarOptions: CalendarOptions;

  constructor(private TipoCitaService: TipoCitaService, private HorarioClinicaService: HorarioClinicaService, private router: Router){
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
  }
  }

      ngOnInit(): void {
        this.HorarioClinicaService.cargarHorarioClinica()
    .subscribe((resp: HorarioClinicaResponse) => { 

        this.horarioClinicas = resp.horariosClinica;
    });

  }
  handleDateClick(arg:any) {
    // ... tu código para manejar el clic en la fecha ...
  }

}
