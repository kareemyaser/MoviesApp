import { Routes } from '@angular/router';
import { SearchComponent } from './Search/search.component';
import { HomeComponent } from './home/home.component';
import { ViewMovieDetailsComponent } from './view-movie-details/view-movie-details.component';

export const routes: Routes = [
  { path: 'Search', component: SearchComponent },
  { path: '', component: HomeComponent },
  { path: 'ViewDetails/:id', component: ViewMovieDetailsComponent },
];
