import axios from "axios";

// baseUrl for the server 
const baseUrl = "http://localhost:3001/api/persons";

// getAll method for fetching all the data from the server
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
}

// create method for creating a new object
const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

// update method for updating an existing object
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

// delete method for deleting an existing object
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

// putting all the methods in an object to export as a single module
const phonebookService = { getAll, create, update, deletePerson };

export default phonebookService;
