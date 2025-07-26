import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-entity-not-found',
  imports: [
    MatButtonModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './entity-not-found.component.html',
  styleUrl: './entity-not-found.component.scss'
})
export class EntityNotFoundComponent {

  @Input({ required: true }) entityName!: string;
  @Input() redirectPath: string | null = null;
  @Input() backLabel: string = 'list';

}
