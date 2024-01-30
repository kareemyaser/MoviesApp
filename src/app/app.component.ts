import { APP_INITIALIZER, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { SearchComponent } from './Search/search.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from '../AppServices/Interceptor';
import { MovieService } from '../AppServices/MovieService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    SearchComponent,
    RouterModule,
    HttpClientModule,
  ],
  providers: [
    MovieService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'IOCodeTask';
  confirmDelete(): void {
    console.log('searched');
  }
}
