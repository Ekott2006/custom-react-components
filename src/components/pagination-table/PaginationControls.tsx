import { useEffect, useState } from "react";
import styles from "./Pagination.module.css"; // Using CSS Modules for styling
import usePagination from "./usePagination";
import usePaginationQuery from "./usePaginationQuery";
import { Data } from "./utils";

const PaginatedList = () => {
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 })
  const { data, isLoading } = usePaginationQuery<Data>("http://localhost:3000/users", pagination.currentPage, pagination.itemsPerPage)
  const myPagination = usePagination({currentPage: 1, itemsPerPage: -1, ...data?.meta})

  useEffect(() => {
    setPagination(prev => ({ ...prev, currentPage: myPagination.currentPage }))
  }, [myPagination.currentPage])


  return (
    <div className={styles.paginationContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul
          className={styles.dataList}
          style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
        >
          {data?.data.map((item) => (
            <li key={item.id} className={styles.dataItem}>
              <b>{item.id}. </b>
              {item.userName}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.paginationControls}>
        <button className={styles.pageButton} onClick={myPagination.first}>First</button>
        <button
          className={styles.pageButton}
          onClick={myPagination.prev}
          disabled={!myPagination.hasPrev()}
        >
          Previous
        </button>
        {[-2, -1, 0, 1, 2].map((index) => {
          const page = myPagination.currentPage + index;
          if (page > 0 && page <= (myPagination.totalPages ?? -1) ) {
            return (
              <button
                key={page}
                className={
                  page === myPagination.currentPage
                    ? styles.pageButton
                    : styles.numberButton
                }
                onClick={() => myPagination.setPageIndex(page)}
              >
                {page}
              </button>
            );
          }
          return null;
        })}
        <span className={styles.pageIndicator}>
          Page {myPagination.currentPage} of {myPagination.totalPages}
        </span>
        <button
          className={styles.pageButton}
          onClick={myPagination.next}
          disabled={!myPagination.hasNext()}
        >
          Next
        </button>
        <button className={styles.pageButton} onClick={myPagination.last} disabled={!myPagination.hasNext()}>Last</button>
      </div>
    </div>
  );
};

export default PaginatedList;
