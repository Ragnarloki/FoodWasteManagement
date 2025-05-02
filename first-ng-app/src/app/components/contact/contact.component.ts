import { Component } from '@angular/core';
import { LocationMapComponent } from "../../location-map/location-map.component";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: []
})
export class ContactComponent {
  config = {
    email: 'sivasankarswaminathan62@gmail.com',
    mobile: '9361487662',
    whatsapp: 'https://wa.me/9361487662',
    instagram: 'https://www.instagram.com/siva_white_oc',
    linkedIn:'https://linkedin.com/in/sivasankar-s-79b52a2a5',
    location: '22, Pillaiyar Koil Street, Goripalayam, Madurai, Tamil Nadu 625002',
    workingHours: 'Mon - Fri: 9 AM - 9 PM'
  };
}
