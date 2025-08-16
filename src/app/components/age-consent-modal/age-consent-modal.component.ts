import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-age-consent-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="open" class="fixed inset-0 z-[9999]">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-black/60"></div>

    <!-- Modal -->
    <div class="absolute inset-0 flex items-center justify-center p-4">
      <div class="w-full max-w-xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
        <div class="px-6 py-5 border-b border-zinc-200">
          <h2 class="text-xl font-bold text-zinc-900">Acceso exclusivo para mayores de 18 años</h2>
        </div>

        <div class="px-6 py-5 space-y-4 text-zinc-700 text-sm leading-6 max-h-[60vh] overflow-auto">
          <p>
            Esta plataforma contiene anuncios y contenido dirigido exclusivamente a personas adultas (18+).
            Al continuar, declarás bajo tu exclusiva responsabilidad que sos mayor de edad conforme a la
            legislación aplicable en tu jurisdicción.
          </p>
          <p>
            Asimismo, reconocés y aceptás que:
          </p>
          <ul class="list-disc pl-5 space-y-2">
            <li>Actuás de forma voluntaria y bajo tu propio criterio y responsabilidad.</li>
            <li>No compartirás el acceso con menores de edad ni permitirás su exposición al contenido.</li>
            <li>El uso de la plataforma debe respetar la ley, la moral y los Términos de Uso y la Política de Privacidad.</li>
            <li>La plataforma no intermedia ni garantiza acuerdos entre usuarios y anunciantes.</li>
          </ul>
          <p class="text-xs text-zinc-500">
            Al presionar <strong>“Acepto y tengo 18+”</strong> confirmás haber leído y aceptado los Términos de Uso
            y la Política de Privacidad. Si no estás de acuerdo, seleccioná <strong>Salir</strong>.
          </p>
        </div>

        <div class="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <!-- <button
            type="button"
            class="w-full sm:w-auto px-4 h-11 rounded-xl font-semibold bg-zinc-200 text-zinc-800 hover:bg-zinc-300 transition"
            (click)="declined.emit()"
            aria-label="Salir">
            Salir
          </button> -->
          <button
            type="button"
            class="w-full sm:w-auto px-4 h-11 rounded-xl font-semibold text-white bg-violet-600 hover:bg-violet-700 shadow transition"
            (click)="accepted.emit()"
            aria-label="Acepto y tengo 18+">
            Acepto y tengo 18+
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
})
export class AgeConsentModalComponent {
  @Input() open = false;
  @Output() accepted = new EventEmitter<void>();
  @Output() declined = new EventEmitter<void>();
}
