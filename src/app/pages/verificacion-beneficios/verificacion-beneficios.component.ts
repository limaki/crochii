import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MercadoPagoService } from '../../services/mp.service';

@Component({
  selector: 'app-verificacion-beneficios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verificacion-beneficios.component.html',
  styleUrls: ['./verificacion-beneficios.component.css']
})
export class VerificacionBeneficiosComponent {
  cargando = false;

  constructor(private mpService: MercadoPagoService) {}

  verificarAhora() {
    this.mpService.generarLinkDePagoAsync()
      .then((link) => {
        window.open(link, '_blank');
      })
      .catch((err) => {
        console.error('Error al generar el link de pago', err);
        alert('Ocurrió un error al generar el link de pago');
      });
  }
  
}
