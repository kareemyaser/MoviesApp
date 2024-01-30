import { result } from './result';

export interface MovieListInterface {
  page: number;
  results: result[];
  total_pages: number;
  total_results: number;
}
