import axios from './node_modules/axios';

export default class Search{

	constructor(q){
		this.query = q;
	}

	async getResults(){

		try{

			const res = axios ("http://forkify-api.herokuapp.com/api/search?q="+this.query);
			this.result = (await res).data;
		}

		catch(error){

			alert(error);
		
		}
	}
}
