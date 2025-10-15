import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Cliente } from './client';
import { ClienteService } from '../cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrasilapiService } from '../brasilapi';
import { Estado, Municipio } from '../brasilapi.models';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss',
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  estados: Estado[] = [];
  municipios: Municipio[] = [];

  private _snackBar = inject(MatSnackBar);

  constructor(
    private service: ClienteService,
    private brasilApiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const { params } = query;
      const id = params['id'];
      if (id) {
        const findClient = this.service.getClientById(id);
        if (findClient) {
          this.atualizando = true;
          this.cliente = findClient;
          this.cliente.uf && this.listMunicipios({ value: this.cliente.uf } as MatSelectChange);
        }
      }
    });

    this.listUfs();
  }

  listUfs() {
    this.brasilApiService.getUFs().subscribe({
      next: (listEstados) => (this.estados = listEstados),
      error: (error) => console.log(error),
    });
  }

  listMunicipios(event: MatSelectChange) {
    const siglaUf = event.value;
    this.brasilApiService.getMunicipios(siglaUf).subscribe({
      next: (listMunicipios) => (this.municipios = listMunicipios),
      error: (error) => console.log(error),
    });
  }

  createCliente() {
    if (!this.atualizando) {
      this.service.create(this.cliente);
      // isso é feito para limpar os campos do cliente, se não ele continua com o id do cadastro anterior
      this.cliente = Cliente.newCliente();
      this.openSnackBar('Cadastro realizado com sucesso', 'OK');
    } else {
      this.service.update(this.cliente);
      this.router.navigate(['/consulta']);
      this.openSnackBar('Cadastro atualizado com sucesso', 'OK');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
