import { useEffect, useState } from "react";
import countryService from "./services/countries";
import SearchForm from "./components/SearchForm";
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";



const App = () => {
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState("");

  const [filteredCountries, setFilteredCountries] = useState([]);

  const [country, setCountry] = useState({
    name: "",
    capital: "",
    population: "",
    languages: [],
    flag: ""
  });

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {

      console.log(initialCountries);

      const temp = initialCountries.map(({ name, cca2, capital, capitalInfo, population, languages, flag }) => ({
        name: name.common,
        cca2,
        capital,
        capitalInfo: capitalInfo.latlng,
        population,
        languages,
        flag
      }));

      // console.log(temp[0].capitalInfo[0]);
      console.log(temp);
      setCountries(temp);
    });
  }, []);


  const handleSearch = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setSearch(event.target.value);
    const temp = countries.filter((country) => country.name.toLowerCase().includes(event.target.value.toLowerCase()));
    console.log(temp);
    console.log(temp.length);
    setFilteredCountries(temp);
    setCountry({
      name: "",
      capital: "",
      population: "",
      languages: [],
      flag: ""
    });
  }

  const handleShow = (country) => {
    return () => {
      console.log(country);
      setCountry(country);
    }
  }



  return (
    <>
      <h1>Country Data</h1>
      <SearchForm search={search} handleSearch = {handleSearch}/>

      {
        (country.name === '')
          ? ((filteredCountries.length > 11)
            ? (<p>Too many matches</p>)
            : ((filteredCountries.length > 1)
              ? ( <CountryList filteredCountries={filteredCountries} handleShow={handleShow}/> )
              : ((filteredCountries.length === 1)
                ? <CountryInfo country={filteredCountries[0]} />
                : (<p>No Data found</p>))))
          : (<CountryInfo country={country} />)
      }
    </>
  )
}

export default App;





