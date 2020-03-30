//controller.js file

import Search from './search.js';
import {searchButton, searchBox, column1} from './SearchView.js';

import {recipe_column} from './RecipeView.js';
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
    var response;
	var htmlc2 = "" ;
	//adding on click method of each of list items displayed
	$(".rec").on("click",function(){
		//console.log(onRecipeNameClick($(this).text(), JSONResponse));
		response = onRecipeNameClick($(this).text(), JSONResponse);
		htmlc2 = `<div class="card"><div class="header"><img  src="${JSONResponse[response].image_url}" alt = "Picture for recipe" id = "rimage"  style="background-size: cover"><div class="icon"><a href="#"><i class=" fa fa-heart"></i></a></div></div><div class="text"><h1 class="food" id = "rname">${JSONResponse[response].title}</h1><i class="fa fa-clock" aria-hidden="true"> 15 Mins</i><i class="fa fa-users"> Serves 2</i><div class="stars"><li><a href="#"><i class="fa fa-star"></i></a><a href="#"><i class="fa fa-star"></i></a><a href="#"><i class="fa fa-star"></i></a><a href="#"><i class="fa fa-star"></i></a><a href="#"><i class="fa fa-star-o"></i></a></li></div><p class="info" id = ""rinfo> ">${JSONResponse[response].publisher}</p></div><a href="#" class="btn1">Let's Cook!</a></div>`;
		recipe_column.innerHTML = htmlc2;
		
		 
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