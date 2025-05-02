import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

// ✅ Import these Nebular modules
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbCardModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      NbThemeModule.forRoot({ name: 'default' }), // ✅ required
      NbSidebarModule.forRoot(),                  // ✅ must use forRoot()
      NbLayoutModule,
      NbCardModule,
    ),
  ]
}).catch(err => console.error(err));
