import { Component, OnInit } from '@angular/core';
import { TipoCitaService } from 'src/app/admin/pages/services/tipo-cita.service';
import { HorarioClinicaService } from '../../services/horario-clinica.service';
import { Horario, HorarioClinicaResponse } from '../interfaces/horario_clinicas';

@Component({
  selector: 'app-agendar-cita',
  templateUrl: './agendar-cita.component.html',
  styleUrls: ['./agendar-cita.component.scss']
})
export class AgendarCitaComponent implements OnInit{

  horarioClinicas: Horario [] = [];


  constructor(private TipoCitaService: TipoCitaService, private HorarioClinicaService: HorarioClinicaService){}


      ngOnInit(): void {
        this.HorarioClinicaService.cargarHorarioClinica()
    .subscribe((resp: HorarioClinicaResponse) => { 

        this.horarioClinicas = resp.horariosClinica;
    });

  }

}
