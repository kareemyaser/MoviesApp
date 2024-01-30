import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MovieService } from '../../AppServices/MovieService';
import { MovieListInterface } from '../Models/MovieListInterface';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  MovieList: MovieListInterface = <MovieListInterface>{};
  ResultSize: number = 0;

  minPage: number = 1;
  maxPage: number = 0;
  pages: number[] = [];
  displayedPages: number[] = [];
  selectedPage: number = this.minPage;
  maxPagesDisplayed: number = 5;
  step: number = 1;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies(1, true);
  }

  loadMovies(page: number = 1, isInit: boolean = false) {
    this.movieService.getAllMovies(page).subscribe(
      (data: any) => {
        this.MovieList = data;
        this.MovieList.results.sort((a, b) =>
          a.original_title.localeCompare(b.original_title)
        );

        this.maxPage = this.MovieList.total_pages;

        for (let i = this.minPage; i <= this.maxPage; i++) {
          this.pages.push(i);
        }

        if (isInit) {
          if (this.pages[this.pages.length - 1] > this.maxPagesDisplayed) {
            for (let i = this.minPage; i <= this.maxPagesDisplayed; i++) {
              this.displayedPages.push(i);
            }
          } else {
            for (let i = this.minPage; i <= this.maxPage; i++) {
              this.displayedPages.push(i);
            }
          }
        }

        console.log(this.MovieList);
      },
      (error: any) => {}
    );
  }

  onPageChange(pageNumber: number) {
    this.selectedPage = pageNumber;
    this.loadMovies(this.selectedPage);
  }

  onNextPageClick() {
    let nextPageNumber = this.selectedPage + 1;
    if (nextPageNumber > Math.max(...this.displayedPages)) {
      let maxDisplayedPage = Math.max(...this.displayedPages);
      // if (this.selectedPage == maxDisplayedPage)
        this.displayedPages = this.returnIncrementedPages(maxDisplayedPage);

      this.onPageChange(nextPageNumber);
    } else this.onPageChange(nextPageNumber);
  }

  onNextMoreClick() {
    let maxDisplayedPage = Math.max(...this.displayedPages);
    if (maxDisplayedPage != this.maxPage) {
      this.displayedPages = this.returnIncrementedPages(maxDisplayedPage);
      this.onPageChange(maxDisplayedPage + 1);
    }
  }

  returnIncrementedPages(start: number) {
    let pages: number[] = [];

    for (let i = 0; i < this.maxPagesDisplayed; i++) {
      let pageNumber = start + 1 + this.step * i;
      // checks if the page number is more than the maximum pages count
      // or not and so to prevent (eg. 9 10 11 12 while the maximum pages count is 10)
      // so the display will be 9 10 only as required
      if (pageNumber <= this.maxPage) pages.push(pageNumber);
      else break;
    }

    return pages;
  }

  onPreviousPageClick() {
    let previousPageNumber = this.selectedPage - 1;
    if (previousPageNumber >= this.minPage) {
      let minDisplayedPage = Math.min(...this.displayedPages);
      if (this.selectedPage == minDisplayedPage)
        this.displayedPages = this.returnDecrementedPages(
          minDisplayedPage - this.maxPagesDisplayed
        );

      this.onPageChange(previousPageNumber);
    }
  }

  returnDecrementedPages(start: number) {
    let pages: number[] = [];
    for (let i = 0; i < this.maxPagesDisplayed; i++) {
      let pageNumber = start + this.step * i;
      pages.push(pageNumber);
    }

    return pages;
  }

  onPreviousMoreClick() {
    let minDisplayedPage = Math.min(...this.displayedPages);
    if (minDisplayedPage != this.minPage) {
      this.displayedPages = this.returnDecrementedPages(
        minDisplayedPage - this.maxPagesDisplayed
      );
      this.onPageChange(minDisplayedPage - 1);
    }
  }
}
