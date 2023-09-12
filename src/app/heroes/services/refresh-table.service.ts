import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshTableService {
  // Define un EventEmitter u otros métodos para compartir datos/eventos
  public actionTriggered = new EventEmitter<void>();

  // Otros métodos y datos compartidos si es necesario
}

