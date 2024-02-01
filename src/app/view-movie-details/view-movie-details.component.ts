import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MovieService } from '../../AppServices/MovieService';
import { MovieListInterface } from '../Models/MovieListInterface';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-view-movie-details',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, RouterModule],
  templateUrl: './view-movie-details.component.html',
  styleUrl: './view-movie-details.component.css',
})
export class ViewMovieDetailsComponent {
  Movie: any = {};
  id: any;
  Rating!: number;
  Voted!: number;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.movieService.viewMovieByID(this.id).subscribe(
      (data: any) => {
        this.Movie = data;
        this.Rating = Math.round(data.vote_average * 10);
        this.Voted = data.vote_count;
        console.log(this.Movie);
      },
      (error: any) => {}
    );
  }
  exportToExcel(movieObject: any): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Movie Details');

    // Iterate over the object's properties and add them to the worksheet
    Object.entries(movieObject).forEach(([key, value]) => {
      worksheet.addRow([key, value]);
    });

    // Generate the Excel file
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(blob, 'movie_details.xlsx');
    });
  }

  exportExcel(): void {
    this.exportToExcel(this.Movie);
  }
}
