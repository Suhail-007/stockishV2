export type Gender = 'M' | 'F';

export type Filters = {
  sortBy: SORT_BY;
  searchKey: string;
  isActive: boolean;
  minPriceFilter: number;
  maxPriceFilter: number;
  groupBy: string;
  userId: number;
};

export type SORT_BY = 'ASC' | 'DESC';
