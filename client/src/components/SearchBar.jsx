import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = ({allProducts}) => {
  
const [searchByName, setSearchByName] = useState('');
const [filteredItems, setFilteredItems] = useState([]);
const navigate = useNavigate();
console.log(filteredItems,'filteredItems')
console.log(searchByName)

useEffect(()=>{
  setFilteredItems([])
},[allProducts])

  const handleSearchFilter = (e) => {
    console.log(e)
    const searchResult = e.currentTarget.value;
    setSearchByName(searchResult);
    const newFilter = allProducts?.filter(product => {
      return product.title.toLowerCase().includes(searchByName.toLowerCase());
    });
    if(searchByName < 1) {
      setFilteredItems([])
    } else {
    setFilteredItems(newFilter);
    }
  };

  const clearInput = (e) => {
    e.preventDefault()
    setFilteredItems([]);
    setSearchByName('');
  };

  return (
    <section className="relative" >
      <div className="flex m-2 border rounded-xl bg-white overflow-hidden">
        <input
          type="text"
          placeholder='🔍  Search'
          onChange={handleSearchFilter}
          value={searchByName}
          className="text-2xl pt-2 pb-1 pl-3 focus:outline-none flex-1" />
        <button onClick={clearInput} className=' px-4 flex-2'>x</button>
      </div>
        <section className={`absolute pr-2 bg-white max-h-96 w-[92vw] md:w-[96vw] xl:w-[88vw] 2xl:w-[50vw] overflow-auto rounded-b-md shadow-xl ${filteredItems.length === 0 ? 'top-1 left-3 -z-10': 'top-12 left-2'}`}>
          {filteredItems.map(product => 
          <article key={product.id} className=' w-full' onClick={() => navigate(`/product/${product.id}`)}>
            <div className='my-1 mx-1 pl-2 flex items-center justify-between border rounded-lg cursor-pointer  hover:bg-rose-100 overflow-hidden'>
              <h1>{product.title}</h1>
              <img src={product.imageUrl} alt={"picture of product"} className='max-w-[100px] min-h-[50px]'/>
            </div>
          </article>)}
        </section>
    </section>
  );
}

export default SearchBar