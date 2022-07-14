import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, { useState } from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [arrayStart, setArrayStart] = useState(0);

  let arrayEnd = arrayStart + rowsPerPage;
  let maxPageNumber = Math.ceil(blogs.posts.length / rowsPerPage);

  const currentPaginationData = blogs.posts.slice(arrayStart, arrayEnd);

  const updateRowsPerPage = (rowsPerPage) => {
    // get the number of rows per page, set current page to 1, and set array start to [0] whenever the user changes the amount of posts per page
    setRowsPerPage(Number(rowsPerPage));
    setCurrentPage(1);
    setArrayStart(0);
  };

  const updatePage = (pageNumber) => {
    // get the starting point of the sliced array when the page changes
    if (pageNumber === 1) {
      setArrayStart(0);
    } else {
      setArrayStart((pageNumber - 1) * rowsPerPage);
    };

    // set the current page number when the page changes
    if (pageNumber < 1) {
      setCurrentPage(1);
    } else if (pageNumber > maxPageNumber) {
      setCurrentPage(maxPageNumber);
    } else {
      setCurrentPage(pageNumber);
    };
  };

  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalCount={blogs.posts.length}
        pageSize={rowsPerPage}
        pageSizeOptions={PAGE_SIZES}
        maxPageNumber={maxPageNumber}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
