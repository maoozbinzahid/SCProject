

export default class Likes{

	constructor(){
		this.likedItems = [];
	}

	add(item){
		this.likedItems.push(item);
		alert("Item added to liked list");
	}
	remove(item){

		var itemIndex = this.likedItems.indexOf(item);
		this.likedItems.splice(itemIndex, 1);
		alert("Item Removed from liked list");
	}

}