import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DonateFoodComponent } from './components/donate-food/donate-food.component';
import { DonationListComponent } from './donation-list/donation-list.component';
import { LearnMoreComponent } from './components/learn-more/learn-more.component';
import { SignupComponent } from './signup/signup.component';
import { RoleAuthGuard } from './auth/role-auth.guard';
import { AwarenessComponent } from './components/awareness/awareness.component';
import { ContactComponent } from './components/contact/contact.component';
import { SigninComponent } from './signin/signin.component';
import { LocationMapComponent } from './location-map/location-map.component';

export const routes: Routes = [
  // Basic routes
  { path: '', component: HomeComponent },
  {
    path: 'signin',
    loadChildren: () => import('./features/signin/signin.module').then(m => m.SigninModule)
  },

  // { path: 'signin', component: SigninComponent },


  { path: 'signup', component: SignupComponent },

  // Donation routes
  { path: 'donate', component: DonateFoodComponent },

  // Guarded routes
  {
    path: 'available',
    component: DonationListComponent,
    canActivate: [RoleAuthGuard],
    data: { role: 'volunteer' }
  },
  {
    path: 'donations',
    component: DonationListComponent,
    canActivate: [RoleAuthGuard],
    data: { role: 'ngo' }
  },

  // Awareness routes
  {
    path: 'awareness',
    loadChildren: () => import('./features/awareness/awareness.module').then(m => m.AwarenessModule)
  },
  // {
  //   path:'awareness',component: AwarenessComponent,
  // },
  { path: 'awareness/learn-more', component: LearnMoreComponent },

  // Contact routes
  {
    path: 'contact',
    loadChildren: () => import('./features/contact/contact.module').then(m => m.ContactModule)
  },

 
  // {
  //   path:'contact',component: ContactComponent,
  // },

  // Future routes (example commented)
  { path: 'map', component: LocationMapComponent},
  { path: '**', redirectTo: '' }  // Redirect to home for any unknown routes
];
