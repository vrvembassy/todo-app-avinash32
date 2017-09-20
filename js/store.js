	
(function(window){
		var toDoElements = {};
		function store(){
			return this;
			}
		store.prototype.init = function(){
			var preloadedItems = ["Eat","sleep"];
			return preloadedItems;
		}
		store.prototype.storeElements = function(insertedItems){
			if(insertedItems.id!= undefined){
			console.log("New todo item stored.  id : "+insertedItems.id+", name : "+insertedItems.name+", status : "+insertedItems.state);
			idOfTheItem = insertedItems.id;
			toDoElements[idOfTheItem] = insertedItems;
			console.log("Stored items summary :");
			console.log(toDoElements);
			}
		}
		//simulating encapsulation
		store.prototype.getToDoElements = function(){
			return toDoElements;
		}
		store.prototype.setState = function(id,stat){
			toDoElements[id].state = stat;
		}
		store.prototype.setElement = function(ele){
			toDoElements = ele;
		}
		window.Todo = window.Todo || {};
		window.Todo.store = store;
})(window);