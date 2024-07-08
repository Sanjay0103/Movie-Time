import React from "react";
import Pagination from "@mui/material/Pagination";

function Mvpagination({ setPage, numOfPages = 500 }) {
  function HandlePageBehavour(page) {
    setPage(page);
    window.scroll(0, 0);
  }

  const customStyle = {
    "& .MuiPaginationItem-root": {
      color: "white",
      backgroundColor: "blue",
    },
  };

  return (
    <div>
      <Pagination
        className="mx-auto w-fit p-2"
        count={numOfPages}
        variant="outlined"
        shape="rounded"
        onChange={(e) => HandlePageBehavour(e.target.textContent)}
        sx={customStyle}
        hideNextButton
        hidePrevButton
      />
    </div>
  );
}
export default Mvpagination;
