const Search = ({ filter, handleFilter}) => {
    return (
        <div>
          Search: <input value={filter} onChange={handleFilter} /> 
        </div>
    )
}

export default Search