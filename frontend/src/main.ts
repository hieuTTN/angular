// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { ToastrModule } from 'ngx-toastr';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // Cần thiết cho Toastr
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { appRoutes } from './app/app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(), // Đăng ký animations cho Toastr
    provideRouter(appRoutes),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000, // Thời gian hiển thị toast
        positionClass: 'toast-top-right', // Vị trí của toast
        preventDuplicates: true, // Ngăn trùng lặp thông báo
      })
    ),
  ],
})
  .catch((err) => console.error(err));


