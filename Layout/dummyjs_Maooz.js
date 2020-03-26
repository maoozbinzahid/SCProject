//this is a dummy file used during Front end development. Not used in the final version of the app


//global response variable

var JSONResponse;


$(document).ready(function() {
    //this will be the response of the API
	JSONResponse = [{
					"name" : "Mom's Spaghetti",
					"description" : "There's vomit on his sweater already",
					"img":"moms_spaghetti.jpg"},
					{"name" : "Mom's Spaghetti 2",
					"description" : "There's vomit on his sweater already",
					"img":"moms_spaghetti.jpg"},
					{"name" : "Mom's Spaghetti 3",
					"description" : "There's vomit on his sweater already",
					"img":"moms_spaghetti.jpg"},
					{
					"name" : "Mom's Spaghetti 4",
					"description" : "There's vomit on his sweater already",
					"img":"moms_spaghetti.jpg"},
					{"name" : "Mom's Spaghetti 5",
					"description" : "There's vomit on his sweater already",
					"img":"moms_spaghetti.jpg"},
					{"name" : "Mom's Spaghetti 6",
					"description" : "There's vomit on his sweater already",
					"img":"moms_spaghetti.jpg"},
					{
					"name" : "Mom's Spaghetti 7",
					"description" : "There's vomit on his sweater already",
					"img":"moms_spaghetti.jpg"},
					{"name" : "Mom's Spaghetti 8",
					"description" : "There's vomit on his sweater already",
					"img":"moms_spaghetti.jpg"},
					{"name" : "Mom's Spaghetti 9",
					"description" : "There's vomit on his sweater already",
					"img":"moms_spaghetti.jpg"}
					];
				

var html = ""
for(var i=0 ; i< JSONResponse.length ; i++){
	html = html + `<div class="row"><img class="recipe_image" src=${JSONResponse[i].img}><div><p class="recipe_name"><a class="rec" href="#">${JSONResponse[i].name}</a></p><p class="recipe_description">${JSONResponse[i].description}</p></div></div>`;
}

document.getElementById("first_column").innerHTML = html;

//adding on click method of each of list items displayed
$(".rec").on("click",function(){
	console.log(onRecipeNameClick($(this).text()));
});

    
});

//function that returns the index of object clicked
function onRecipeNameClick(val){
	var index = -1;
	JSONResponse.find(function(item, i){
  		if(item.name === val){
  		index = i;	
    	return i;
  		}
	});
	return index;
}
