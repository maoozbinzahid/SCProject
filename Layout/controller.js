//controller.js file

import Search from './search.js';
import {searchButton, searchBox, output} from './SearchView.js';

const controlsearch = async () => {

    const query = searchBox.value;
    console.log("The query or search is: " + query);

    const search = new Search(query);
    await search.getResults();
    console.log(search.result);

}

//OnClicking the search button it resturns the json file from the api

searchButton.addEventListener('click', e => {
    e.preventDefault();
    controlsearch();
});



