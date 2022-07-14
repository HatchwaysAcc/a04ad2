export const DOTS = "...";

function usePagination({ currentPage, totalCount, pageSize, maxPageNumber }) {
  /*
   This hook determines which page numbers to display and where to place DOTS if they are required. 
   
   1) If the number of pages is less than 5, there is no need for DOTS since the siblings of the selected page number will always either be 1 less than or 1 greater than the selected page, or will always include the lowest or highest page number as a sibling. In these cases, an array is constructed starting at 1 with a length equal to the maxPageNumber.
   
   2) If the number of pages is greater than 5, then DOTS are placed around a selected page and its siblings, or between the highest or lowest page number and the selected page and its sibling group.
  */

  if (maxPageNumber >= 5) {

    if (currentPage === 1 || currentPage === 2) {
      return [1, 2, 3, DOTS, maxPageNumber];
    } else if (currentPage > 2 && currentPage < (maxPageNumber - 2)) {
      return [1, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, maxPageNumber]
    } else if (currentPage === maxPageNumber - 2 || currentPage === maxPageNumber - 1 || currentPage === maxPageNumber) {
      return [1, DOTS, maxPageNumber - 2, maxPageNumber - 1, maxPageNumber];
    };
  
  } else {
    return Array.from({ length: maxPageNumber }).map((ele, i) => i + 1);
  };

}

export default usePagination;
