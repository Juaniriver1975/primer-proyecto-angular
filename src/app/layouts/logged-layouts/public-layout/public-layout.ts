
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet/>', 
})
export class PublicLayout {}