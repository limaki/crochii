import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  standalone: true,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  imports: [CommonModule, RouterModule]
})
export class AdminComponent implements OnInit {
  stats: { usuarios: number; anuncios: number; verificados: number; activosHoy?: number } | null = null;

  constructor(private admin: AdminService) {}

  ngOnInit(): void {
    this.admin.getDashboard().subscribe({
      next: (res) => this.stats = res,
      error: (err) => {
        console.error('Error dashboard', err);
        this.stats = { usuarios: 0, anuncios: 0, verificados: 0, activosHoy: 0 };
      }
    });
  }
}
