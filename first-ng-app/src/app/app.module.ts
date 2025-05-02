import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocationMapComponent } from './location-map/location-map.component';

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),FormsModule,CommonModule,LocationMapComponent],
  exports: [RouterModule,FormsModule,CommonModule]
})
export class AppModule { }
