
import axios from './node_modules/axios';

export default class shoppingList{

	constructor(recipeClicked, JSONResponse){
		this.index = recipeClicked;
		this.response=JSONResponse
	}

	 async getIngred(){

		var rec =this.response[this.index].recipe_id;
		var ing=[];
		var quantity=[];
		    

		try
		{

			const res = axios ("https://forkify-api.herokuapp.com/api/get?rId="+rec);
			var result = (await res).data;
			console.log(result.recipe);
			var Ingredients=result.recipe.ingredients;

			const fractionStringToNumber = s => s.split("/").map(s => Number(s)).reduce((a, b) => a / b);


		    	for (var i =0 ; i <Ingredients.length; i++){
		    
		    	var clean = Ingredients[i].replace(/ *\([^)]*\) */g, ' ');
               
				var q= clean.match(/(?:[1-9][0-9]*|0)(?:\/[1-9][0-9]*)?/);
				
				if (q== null){ing.push(clean); quantity.push("-"); }

				else { 

				quantity.push(q[0]);

			 	var temp =(clean.split(quantity[i]));
			 	
				if ( temp.length > 2){var toBePushed=temp[1]+temp[2];}
				else{ var toBePushed=temp[1]; }
                
                
				var t= toBePushed.match(/(?:[1-9][0-9]*|0)(?:\/[1-9][0-9]*)?/);
				
				
				if (t !=null){
				quantity.pop();
				var x= fractionStringToNumber(q[0]);
				var y = fractionStringToNumber(t[0]);
                
				quantity.push(String(x*y));
			    toBePushed= (toBePushed.split(t[0]))[1];}
			      
			
            
            
			ing.push(toBePushed);
			



		  	 	}
			}

			 //Convertig to proper format ( From string to numbers)
            for (var i = 0; i < quantity.length; i++)
            {
            if (fractionStringToNumber(quantity[i])===quantity[i]){ quantity[i]=parseInt(quantity[i]);}
        	else{ if(quantity[i]=="-" ) {quantity[i]="-"} else {quantity[i]=fractionStringToNumber(quantity[i]).toFixed(2); } }
            }

            

		}

		catch(error){ alert(error);}

        console.log(ing)
        console.log(quantity)

       
        this.n=ing;
        this.q=quantity;
        
		    
		}
	}

		
		



	
