import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes';  // Import routes from app.routes.ts

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Use routes defined in app.routes.ts
  exports: [RouterModule]
})
export class AppRoutingModule { }
