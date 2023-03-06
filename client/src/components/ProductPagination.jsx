import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "./products/Product.jsx";
import SearchBar from "./SearchBar";

function ProductPagination({ products }) {

  const [currentItems, setCurrentItems] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / itemsPerPage));
  }, [itemOffset, pageCount, products]);

  useEffect(() => {
    setItemOffset(0);
  }, [products]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <>
    <SearchBar allProducts={products}/>
    <section className="grid md:grid-cols-2 ">
      {currentItems.map((p) => {
        return <Product key={p.id} product={p} />; // addToCart={addToCart}
      })}
    </section>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName=" md:mx-2 min-w-[2.5rem] border rounded-lg flex justify-center"
        pageLinkClassName="p-3  text-center  cursor-pointer"
        previousClassName=" md:mx-2 min-w-[2.5rem] border rounded-lg flex justify-center"
        previousLinkClassName="p-3  text-center  cursor-pointer"
        nextClassName=" md:mx-2 min-w-[2.5rem] border rounded-lg flex justify-center"
        nextLinkClassName="p-3  text-center  cursor-pointer"
        breakClassName=" md:mx-2 min-w-[2.5rem] border rounded-lg flex justify-center"
        breakLinkClassName="p-3  text-center "
        containerClassName="my-10 flex justify-center"
        activeClassName="bg-blue-200/70  "
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default ProductPagination;
