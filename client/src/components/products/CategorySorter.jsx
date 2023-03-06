function CategorySorter({categories, sorterFunction}) {
    return (
        <section className="flex mt-6 mb-1 justify-center items-center">
            <h2 className="mr-3">Filter by category:</h2>
            <select onChange={(e) => sorterFunction(e.target.value)}
                    className="p-1 border rounded-md focus:outline-none">
                {categories.map(c =>
                    <option value={c}  key={c}>{c}</option>
                )}
            </select>
        </section>
    )
}

export default CategorySorter;