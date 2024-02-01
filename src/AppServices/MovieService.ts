import {
  HttpClientModule,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiUrl = 'https://api.themoviedb.org/3';
  constructor(private http: HttpClient) {}

  getAllMovies(page: number): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmJlY2FiZTc3Y2IwNTg3MTZhM2IxODM1Y2UzZDUwMyIsInN1YiI6IjY1Yjc3NTI5YTBiNjkwMDE3YmNmNDkwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kqvR5Cb5qxYbpBx7faKt1M2xxQ0V5oh2HtWO0eFgEPI`,
    });

    const params = new HttpParams().set('page', page.toString());

    return this.http.get<any[]>(`${this.apiUrl}/movie/top_rated`, {
      headers,
      params,
    });
  }

  viewMovieByID(id: number): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmJlY2FiZTc3Y2IwNTg3MTZhM2IxODM1Y2UzZDUwMyIsInN1YiI6IjY1Yjc3NTI5YTBiNjkwMDE3YmNmNDkwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kqvR5Cb5qxYbpBx7faKt1M2xxQ0V5oh2HtWO0eFgEPI`,
    });
    return this.http.get<any[]>(`${this.apiUrl}/movie/${id}`, { headers });
  }

  searchMovieByName(name: string, page: number): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNmJlY2FiZTc3Y2IwNTg3MTZhM2IxODM1Y2UzZDUwMyIsInN1YiI6IjY1Yjc3NTI5YTBiNjkwMDE3YmNmNDkwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kqvR5Cb5qxYbpBx7faKt1M2xxQ0V5oh2HtWO0eFgEPI`,
    });
    const params = new HttpParams()
      .set('query', name)
      .set('page', page.toString());

    return this.http.get<any[]>(`${this.apiUrl}/search/movie`, {
      headers,
      params,
    });
  }
}
