import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public sidebarItems = [
    { label: 'Agendar cita', icon: 'label', url: './Agendar-cita' },
    { label: 'historial Medico', icon: 'add', url: './historial-medico' },
    { label: 'Buscar', icon: 'search', url: './search' },
  ];

  constructor(
    private router: Router
  ) {}
  
}
