const CountryList = ( {filteredCountries, handleShow }) => {
    return (
      <ul>
        {filteredCountries.map((country, idx) => {return <div key={idx}><span>{country.name}</span> <button onClick={handleShow(country)}>show</button></div>; })}
      </ul>
    )
  }

export default CountryList;
