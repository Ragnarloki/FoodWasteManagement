import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NbLayoutModule, NbSidebarModule, NbCardModule } from '@nebular/theme';
@Component({
  selector: 'app-learn-more',
  imports: [RouterLink,NbLayoutModule, NbSidebarModule, NbCardModule],
  templateUrl: './learn-more.component.html',
  styleUrl: './learn-more.component.scss'
})
export class LearnMoreComponent {

}
