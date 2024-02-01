import { CommonModule } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MovieService } from '../../AppServices/MovieService';
import { MovieListInterface } from '../Models/MovieListInterface';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  MovieList: MovieListInterface = <MovieListInterface>{};
  SearchedMovieList: MovieListInterface = <MovieListInterface>{};
  ResultSize: number = 0;
  searchHistory: string[] = [];
  minPage: number = 1;
  maxPage: number = 0;
  pages: number[] = [];
  displayedPages: number[] = [];
  selectedPage: number = this.minPage;
  maxPagesDisplayedCount: number = 5;
  step: number = 1;
  searchText: string = '';
  showSearchHistoryDropdown: boolean = false;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies(1, true);

    // const storedArrayString = localStorage.getItem('searchHistory') || '';
    // const storedArray: string[] = JSON.parse(storedArrayString);
    // this.searchHistory = storedArray;
  }

  // ngOnDestroy(): void {
  //   localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
  // }

  loadMovies(page: number = 1, isInit: boolean = false) {
    this.movieService.getAllMovies(page).subscribe(
      (data: any) => {
        this.MovieList = data;
        this.MovieList.results.sort((a, b) =>
          a.original_title.localeCompare(b.original_title)
        );

        this.maxPage = this.MovieList.total_pages;
        this.pages = [];

        for (let i = this.minPage; i <= this.maxPage; i++) {
          this.pages.push(i);
        }

        this.selectedPage = page;

        if (isInit) {
          this.displayedPages = [];
          if (this.pages[this.pages.length - 1] > this.maxPagesDisplayedCount) {
            for (let i = this.minPage; i <= this.maxPagesDisplayedCount; i++) {
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
    console.log(pageNumber);
    console.log(this.searchText);
    if (this.searchText)
      this.SearchClicked(this.searchText, false, this.selectedPage);
    else this.loadMovies(this.selectedPage);
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

    for (let i = 0; i < this.maxPagesDisplayedCount; i++) {
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
          minDisplayedPage - this.maxPagesDisplayedCount
        );

      this.onPageChange(previousPageNumber);
    }
  }

  returnDecrementedPages(start: number) {
    let pages: number[] = [];
    for (let i = 0; i < this.maxPagesDisplayedCount; i++) {
      let pageNumber = start + this.step * i;
      pages.push(pageNumber);
    }

    return pages;
  }

  onPreviousMoreClick() {
    let minDisplayedPage = Math.min(...this.displayedPages);
    if (minDisplayedPage != this.minPage) {
      this.displayedPages = this.returnDecrementedPages(
        minDisplayedPage - this.maxPagesDisplayedCount
      );
      this.onPageChange(minDisplayedPage - 1);
    }
  }

  SearchClicked(
    input: string,
    isInit: boolean,
    page: number = this.minPage
  ): void {
    if (input) {
      if (!this.searchHistory.includes(input)) this.searchHistory.push(input);
      this.movieService.searchMovieByName(input, page).subscribe(
        (data: any) => {
          this.SearchedMovieList = data;

          this.maxPage = this.SearchedMovieList.total_pages;
          this.pages = [];

          for (let i = this.minPage; i <= this.maxPage; i++) {
            this.pages.push(i);
          }

          if (isInit) {
            this.selectedPage = this.minPage;
            this.displayedPages = [];
            if (
              this.pages[this.pages.length - 1] > this.maxPagesDisplayedCount
            ) {
              for (
                let i = this.minPage;
                i <= this.maxPagesDisplayedCount;
                i++
              ) {
                this.displayedPages.push(i);
              }
            } else {
              this.selectedPage = page;
              for (let i = this.minPage; i <= this.maxPage; i++) {
                this.displayedPages.push(i);
              }
            }
          }
        },
        (error: any) => {}
      );
    } else {
      this.SearchedMovieList.results = [];
      this.loadMovies(this.minPage, true);
    }
  }
  selectSearchHistory(selectedItem: string): void {
    this.searchText = selectedItem;
    this.toggleSearchHistoryDropdown(); // Close the dropdown after selection
  }

  toggleSearchHistoryDropdown(): void {
    this.showSearchHistoryDropdown = !this.showSearchHistoryDropdown;
  }
}
