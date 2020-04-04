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

const controlsearch = async () => {

    const query = searchBox.value;
    console.log("The query or search is: " + query);

    const search = new Search(query);
    await search.getResults();
    response = search.result.recipes;
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
		generatelist(selectedItem_Index,JSONResponse);
		console.log("Selected Item is:" + selectedItem_Index);
		 rimage.src = `${JSONResponse[selectedItem_Index].image_url}`;
		rname.innerHTML =` ${JSONResponse[selectedItem_Index].title}`;
		rdesc.innerHTML = `${JSONResponse[selectedItem_Index].publisher}`;
	
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
		generatelist(selectedItem_Index,items);
		console.log("Selected Item is:" + selectedItem_Index);
		console.log("Selected Item is:" + items[selectedItem_Index].title);
		rimage.src = items[selectedItem_Index].image_url;
		rname.innerHTML =items[selectedItem_Index].title;
		rdesc.innerHTML = items[selectedItem_Index].publisher;
	});

}


// function confirmOrder(){
//   var number = parseInt(prompt("Please enter your contact number so that we can contact you for further details:"));
//     checkNumber(number);
// }


// function checkNumber(number){

//     if (number.length != 11) {
//     number = prompt("Invalid Number\nPlease Enter Again", "");
//     checkNumber(number);
//   } 
//     else if (isNaN(number)) {
//     number = prompt(" Please Enter Valid Number", "");
//   checkNumber(number);} 
//     else {
//     alert("Thanks For Shopping With Us\nPaymet Will Be Collected On Delivery");

// }

// }