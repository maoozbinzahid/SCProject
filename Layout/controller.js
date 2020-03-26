//controller.js file

import Search from './search.js';
import {searchButton, searchBox, output, column1} from './SearchView.js';


//This will hold the array that contains the response from the api 

const controlsearch = async () => {

    const query = searchBox.value;
    console.log("The query or search is: " + query);

    const search = new Search(query);
    await search.getResults();
    PopulateColumnOne(search.result.recipes);


}

//OnClicking the search button it resturns the json file from the api

searchButton.addEventListener('click', e => {
    e.preventDefault();
    controlsearch();
});

function PopulateColumnOne(JSONResponse){
	var html = ""
	for(var i=0 ; i< JSONResponse.length ; i++){
		html = html + `<div class="row"><img class="recipe_image" src=${JSONResponse[i].image_url}><div><p class="recipe_name"><a class="rec" href="#">${JSONResponse[i].title}</a></p><p class="recipe_description">${JSONResponse[i].publisher}</p></div></div>`;
	}

	column1.innerHTML = html;

	//adding on click method of each of list items displayed
	$(".rec").on("click",function(){
		console.log(onRecipeNameClick($(this).text(), JSONResponse));
	});

}

//function that returns the index of object clicked
function onRecipeNameClick(val,JSONResponse){
	var index = -1;
	JSONResponse.find(function(item, i){
  		if(item.title == val){
  		index = i;	
    	return i;
  		}
	});
	return index;
}