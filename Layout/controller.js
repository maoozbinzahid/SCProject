//controller.js file

import Search from './search.js';
import {searchButton, searchBox, output, column1} from './SearchView.js';
import Likes  from './Likes.js'
import {likeButton, favouriteButton ,like_icon} from './LikesView.js';
import {recipe_column, rname,rimage,rdesc} from './recipeView.js';

import shoppingList from './List.js';
import {checkoutButton, def_serving,ingredients, i} from './ListView.js';

let def = def_serving.innerText.match(/\d+/g)[0];

function getFirstWord(str) { str=str.split(" "); return (str[1]); };

function onlyUnique(value, index, self) { return self.indexOf(value) === index;}




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
var elements_per_page = 5;
var sta = 0;
var limit = elements_per_page;
var max_size = 0;
var check = true; 
var html = " ";

const controlsearch = async () => {

    const query = searchBox.value;
    console.log("The query or search is: " + query);

    const search = new Search(query);
    await search.getResults();
	response = search.result.recipes;
	max_size = response.length;
	check = true;
	PopulateColumnOne(search.result.recipes);
	
}


const generatelist = async (index,JSONResponse) => {

    const list = new shoppingList(index, JSONResponse);
    await list.getIngred(); // list.n gives array of ingredients and list.q gives quantities
    window.PerServing= ForOneServing(list.q);
    PopulateList(list.n,list.q);
  
}


//Adjusting Quantities depending upon serving

function ForOneServing (q){
  let forOne=[];
  for (var i=0; i < q.length;i++)
  {

    if (q[i]=="-") { forOne.push("-");}

    else{ forOne.push( ((q[i]))/(def));}
  }
  console.log(forOne)
  return forOne
}


function Adjust(s, i ){
  if (PerServing[i]=="-") return PerServing[i];
  return ((PerServing[i])*parseInt(s)).toFixed(2); 
}



function PopulateList(ing, quant){
        ingredients.innerHTML="";
        ingredients.innerHTML= "<li><p id='h'> Serving:<input type='number' min='1' id='s' value='" +def +"'></p></li>";
        

        for(var i=0; i < ing.length; i++)
        {
          var name =ing[i];
          var q=quant[i];
          if (q !="-") { 
            var m = getFirstWord(name); 
            name=name.replace(m,"");
            name=name.replace(/^\s+/g, "");
            name = name.replace(name[0],name[0].toUpperCase());
             var m = m.replace(m[0],m[0].toUpperCase());

          ingredients.innerHTML= ingredients.innerHTML + "<li><div class='each-item'><h6>"+name+
            "</h6><p><input type='text' class='qty' placeholder='" +q +"'>" + "&nbsp &nbsp"+ m +"</p><hr></div></li>";
       }
       else { ingredients.innerHTML= ingredients.innerHTML + "<li><div class='each-item'><h6>"+name+
            "</h6><p><input type='text' class='qty' placeholder='" +q +"'>"+ " </p><hr></div></li>";} }
        

        let update= document.getElementById("s");
        let input_box=document.getElementsByClassName("qty");
        
        update.addEventListener('change',()=> { 
         
          for (var i=0; i < input_box.length;i++){
            var new_v = Adjust(update.value, i);
            input_box[i].placeholder=new_v;


}

        });

      }


//OnClicking the search button it resturns the json file from the api


searchButton.addEventListener('click', e => {
    e.preventDefault();
    selectedItem_Index=-1; //resetting the selected item on each search
    controlsearch();
});

//Checkout button confirms the order
// checkoutButton.addEventListener('click', e => {
//     e.preventDefault();
//     confirmOrder();
// });


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

	sta = 0;
	limit = elements_per_page;
	max_size = likes.likedItems.length;
	check = false;
	Favourites_ColumnOne(likes.likedItems);

});


//function that populates column one with related recipes
function PopulateColumnOne(JSONResponse){

	html = " ";
	sta = 0;
	max_size = JSONResponse.length;
	console.log("len of search",max_size);
	limit = elements_per_page;
	column1.innerHTML = " ";
	pagination(sta, limit, JSONResponse);

	
	// var b = JSONResponse;
	//Function for the pagination of records

	function pagination(sta,limit, json) {
		for (var i =sta ; i < limit; i++) {
			if(i<max_size){
			html = `<div class="row"><img class="recipe_image" src=${json[i].image_url}><div><p class="recipe_name"><a class="rec" href="#">${json[i].title}</a></p><p class="recipe_description">${json[i].publisher}</p></div></div>`;
			column1.innerHTML += html;
			}
			else{break;}
			//adding on click method of each of list items displayed
			
		}
		$(".rec").on("click",function(){
			selectedItem_Index = onRecipeNameClick($(this).text(), json);
			console.log("Selected Item is:" + selectedItem_Index);
			rimage.src = `${json[selectedItem_Index].image_url}`;
			rname.innerHTML =` ${json[selectedItem_Index].title}`;
			rdesc.innerHTML = `${json[selectedItem_Index].publisher}`;
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
			if (check == true){
				pagination(next,limit,JSONResponse);
			}
			else {
				pagination(next,limit,likes.likedItems);
			}
			
		}
	});
	
	//to move to the previous page with 5 elements
	$('#PreeValue').click(function(){
		var pre = limit-(2*elements_per_page);
		if(pre>=0) {
			limit = limit-elements_per_page;
			column1.innerHTML = "";
			html = "";
			if (check == true){
				pagination(pre,limit,JSONResponse);
			}
			else {
				pagination(pre,limit,likes.likedItems);
			}
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
	column1.innerHTML = " ";
	html = " ";
	console.log("items", items[0]);
	// pagination(start,end,items);
	// var JSONResponse = items;
	console.log("len of items: ", items.length);
	if (items.length > 0){

		for (var i =sta ; i < limit; i++) {
			console.log(items[i].image_url);
			html = `<div class="row"><img class="recipe_image" src=${items[i].image_url}><div><p class="recipe_name"><a class="rec" href="#">${items[i].title}</a></p><p class="recipe_description">${items[i].publisher}</p></div></div>`;
			column1.innerHTML += html;
			$(".rec").on("click",function(){
				selectedItem_Index = onRecipeNameClick($(this).text(), items);
				console.log("Selected Item is:" + selectedItem_Index);
				console.log("Selected Item is:" + items[selectedItem_Index].title);
				rimage.src = items[selectedItem_Index].image_url;
				rname.innerHTML =items[selectedItem_Index].title;
				rdesc.innerHTML = items[selectedItem_Index].publisher;
			});

		}
	}

	// column1.innerHTML = html;
	// //adding on click method of each of list items displayed
	// $(".rec").on("click",function(){
	// 	selectedItem_Index = onRecipeNameClick($(this).text(), JSONResponse);
	// 	console.log("Selected Item is:" + selectedItem_Index);
	// 	rimage.src = `${JSONResponse[selectedItem_Index].image_url}`;
	// 	rname.innerHTML =` ${JSONResponse[selectedItem_Index].title}`;
	// 	rdesc.innerHTML = `${JSONResponse[selectedItem_Index].publisher}`;
	// });

	else if(items.length==0){
		html = `<div class="row" style="height: 100%">You haven't added any recipes to the favourites list.</div>`;
		alert("No items added to favourites, Please select items first")
	}
	else{
		html +=`<div class="row" style="height: 100%"> </div>` 
	}

}
