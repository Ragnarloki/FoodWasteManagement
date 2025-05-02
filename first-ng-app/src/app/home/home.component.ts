import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocationMapComponent } from "../location-map/location-map.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, LocationMapComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
