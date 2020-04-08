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



<<<<<<< Updated upstream
=======
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

	// var b = JSONResponse;
	var max_size=JSONResponse.length;
	var sta = 0;
	var html = " "
    var elements_per_page = 5;
    var limit = elements_per_page;
	pagination(sta, limit, JSONResponse);
	
	
	//Function for the pagination of records
	function pagination(sta,limit, JSONResponse) {

		for (var i =sta ; i < limit; i++) {
			html = html + `<div class="row"><img class="recipe_image" src=${JSONResponse[i].image_url}><div><p class="recipe_name"><a class="rec" href="#">${JSONResponse[i].title}</a></p><p class="recipe_description">${JSONResponse[i].publisher}</p></div></div>`;
		}
		column1.innerHTML = html;
		//adding on click method of each of list items displayed
		$(".rec").on("click",function(){
			selectedItem_Index = onRecipeNameClick($(this).text(), JSONResponse);
			console.log("Selected Item is:" + selectedItem_Index);
			rimage.src = `${JSONResponse[selectedItem_Index].image_url}`;
			rname.innerHTML =` ${JSONResponse[selectedItem_Index].title}`;
			rdesc.innerHTML = `${JSONResponse[selectedItem_Index].publisher}`;
		});	
	}

	
	// for(var i=0 ; i< JSONResponse.length ; i++){
	// 	html = html + `<div class="row"><img class="recipe_image" src=${JSONResponse[i].image_url}><div><p class="recipe_name"><a class="rec" href="#">${JSONResponse[i].title}</a></p><p class="recipe_description">${JSONResponse[i].publisher}</p></div></div>`;
	// }

	// column1.innerHTML = html;

	//enables like button

	if(!like_icon.classList.contains("fa-heart")){
		like_icon.classList.add("fa-heart");
	}

	//to move to the next page with 5 elements
	$('#nextValue').click(function(){
		var next = limit;
		if(max_size>=next) {
		  limit = limit+elements_per_page;
		  column1.innerHTML = "";
		  html = "";
		  pagination(next,limit,JSONResponse);
		}

	  });
	
	  //to move to the previous page with 5 elements
	  $('#PreeValue').click(function(){
		var pre = limit-(2*elements_per_page);
		if(pre>=0) {
		  limit = limit-elements_per_page;
		  column1.innerHTML = "";
		  html = "";
		  pagination(pre,limit,JSONResponse);
		}
	
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
		console.log("Selected Item is:" + items[selectedItem_Index].title);
		rimage.src = items[selectedItem_Index].image_url;
		rname.innerHTML =items[selectedItem_Index].title;
		rdesc.innerHTML = items[selectedItem_Index].publisher;
	});

}
>>>>>>> Stashed changes
