//controller.js file

import Search from './search.js';
import {searchButton, searchBox, output, column1} from './SearchView.js';
import Likes  from './Likes.js'
import {likeButton, favouriteButton ,like_icon} from './LikesView.js';




//class to maintain state
class Session_Controller{
	
	constructor(){
		
	}

 	setState(){
 		localStorage.setItem("Object",JSON.stringify(likes.likedItems));
 	}

 	ReadState(){
 		var obj = new Likes();
 		if (typeof(Storage) !== "undefined"){
 			if(localStorage.getItem("Object")===null){ 
 				return obj;
 			}
 			else{
 				obj.likedItems = JSON.parse(localStorage.getItem("Object"));
 				console.log(obj.likedItems);
 			}
 		
 		}
 		else{
 			alert("Your browser doesn't support state maintenance");
 		}
 		console.log(obj);
 		return obj;
 }
 	
}


//this object hold the currently like recipes

let session_controller = new Session_Controller();
let likes = session_controller.ReadState();

//This will hold the array that contains the response from the api 
var response;
//this will hold the index of currently selected item
let selectedItem_Index = -1;

const controlsearch = async () => {

    const query = searchBox.value;
    console.log("The query or search is: " + query);

    const search = new Search(query);
    await search.getResults();
    response = search.result.recipes;
    PopulateColumnOne(search.result.recipes);


}

//OnClicking the search button it resturns the json file from the api

searchButton.addEventListener('click', e => {
    e.preventDefault();
    selectedItem_Index=-1; //resetting the selected item on each search
    controlsearch();
});



likeButton.addEventListener('click', e=>{
	e.preventDefault();
	//if item already exists in the liked list
	var a=false;
	for(var i=0 ; i<likes.likedItems.length ; i++){
		if(likes.likedItems[i].recipe_id === response[selectedItem_Index].recipe_id){
			likes.remove(likes.likedItems[i]);
			session_controller.setState();
			a=true;
			break;
		}
	}
	//if item doesn't already exist in the liked list
	if(a===false){
		likes.add(response[selectedItem_Index]);
		session_controller.setState();
		
	}

	console.log(likes.likedItems.length);

});


//clicking on favourite button populates column one with like recipes
favouriteButton.addEventListener('click',e=>{
	e.preventDefault();

	//disables like button
	if(like_icon.classList.contains("fa-heart")){
		like_icon.classList.remove("fa-heart");
	}

	
	Favourites_ColumnOne(likes.likedItems);

});


//function that populates column one with related recipes
function PopulateColumnOne(JSONResponse){

	var html = ""
	for(var i=0 ; i< JSONResponse.length ; i++){
		html = html + `<div class="row"><img class="recipe_image" src=${JSONResponse[i].image_url}><div><p class="recipe_name"><a class="rec" href="#">${JSONResponse[i].title}</a></p><p class="recipe_description">${JSONResponse[i].publisher}</p></div></div>`;
	}

	column1.innerHTML = html;

	//adding on click method of each of list items displayed
	$(".rec").on("click",function(){
		selectedItem_Index = onRecipeNameClick($(this).text(), JSONResponse);
		console.log("Selected Item is:" + selectedItem_Index);
	});

	//enables like button

	if(!like_icon.classList.contains("fa-heart")){
		like_icon.classList.add("fa-heart");
	}


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

function Favourites_ColumnOne(items){
	var html = "";
	for(var i=0 ; i< items.length ; i++){
		html = html + `<div class="row"><img class="recipe_image" src=${items[i].image_url}><div><p class="recipe_name"><a class="rec" href="#">${items[i].title}</a></p><p class="recipe_description">${items[i].publisher}</p></div></div>`;
	}
	if(items.length==0){
		html= `<div class="row" id="nohover" style="height: 100%">You haven't added any recipes to the favourites list.</div>`;
	}
	else{
		html +=`<div class="row" id="nohover" style="height: 100%"> </div>` 
	}
	column1.innerHTML = html;

	$(".rec").on("click",function(){
		selectedItem_Index = onRecipeNameClick($(this).text(), items);
		console.log("Selected Item is:" + selectedItem_Index);
	});

}