import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/client';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  static STORAGE_CLIENTES = '_CLIENTES';

  constructor() {}

  create(cliente: Cliente) {
    const clientes = this.getClienteStorage();
    clientes.push(cliente);
    localStorage.setItem(ClienteService.STORAGE_CLIENTES, JSON.stringify(clientes));
  }

  update(cliente: Cliente) {
    const clientes = this.getClienteStorage();

    clientes.forEach((c) => {
      if (c.id === cliente.id) {
        Object.assign(c, cliente);
      }
    });
    localStorage.setItem(ClienteService.STORAGE_CLIENTES, JSON.stringify(clientes));
  }

  deleteClientById(id: string) {
    const clientes = this.getClienteStorage();

    const newClientes = clientes.filter((cliente) => cliente.id !== id);
    localStorage.setItem(ClienteService.STORAGE_CLIENTES, JSON.stringify(newClientes));
  }

  searchCliente(nome: string): Cliente[] {
    const clientes = this.getClienteStorage();

    if (!nome) return clientes;

    return clientes.filter((cliente) => cliente.nome?.indexOf(nome) !== -1);
  }

  getClientById(id: string): Cliente | undefined {
    const clientes = this.getClienteStorage();

    return clientes.find((cliente) => cliente.id === id);
  }

  private getClienteStorage(): Cliente[] {
    const clientes = localStorage.getItem(ClienteService.STORAGE_CLIENTES);
    return clientes ? JSON.parse(clientes) : [];
  }
}
