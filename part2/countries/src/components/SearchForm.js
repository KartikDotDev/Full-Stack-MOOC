const SearchForm = ( {search, handleSearch} ) => {
    return (
    <form>
      <label htmlFor="search">Find country data </label>
      <input type="text" placeholder="Search" value={search} onChange={handleSearch} />
    </form>
    )
  }

export default SearchForm;