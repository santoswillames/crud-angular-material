import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/client';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static STORAGE_CLIENTES = '_CLIENTES';

  constructor() {}

  create(cliente: Cliente) {
    const storage = this.getClienteStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.STORAGE_CLIENTES, JSON.stringify(storage));
  }

  getClienteStorage(): Cliente[] {
    const clientes = localStorage.getItem(ClienteService.STORAGE_CLIENTES);
    return clientes ? JSON.parse(clientes) : [];
  }
}
