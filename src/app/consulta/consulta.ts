import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../cliente';
import { Cliente } from '../cadastro/client';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule,
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss',
})
export class Consulta implements OnInit {
  searchinput: string = '';
  listClientes: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nome', 'email', 'cpf', 'dataNascimento', 'actions'];
  deletandoId: string = '';

  private _snackBar = inject(MatSnackBar);

  constructor(private service: ClienteService, private router: Router) {}

  ngOnInit() {
    this.listClientes = this.service.searchCliente('');
  }

  search() {
    console.log('Chama o input', this.searchinput);

    this.listClientes = this.service.searchCliente(this.searchinput);
  }

  editClient(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { id } });
  }

  wantDelete(id: string) {
    this.deletandoId = id;
  }

  deleteCliente(id: string) {
    this.service.deleteClientById(id);
    this.deletandoId = '';
    this.listClientes = this.service.searchCliente('');
    this.openSnackBar('Deletado com sucesso', 'OK');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
