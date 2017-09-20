(function(window){
	"use strict";
	var storeInstance = new Todo.store();
	var itemsInstance = new Todo.itemsView();
	var itemInstance = new Todo.itemView();
	var appInstance = new AppView();
	var newInputItem;
	var toDoElements = storeInstance.getToDoElements();
	function AppView() {
		
    }
	AppView.prototype.add = function(item) {
			var statusOfAddition = itemsInstance.display(item);
			(statusOfAddition) ? storeInstance.storeElements(item) : alert("Couldn't add new item"); 
	}
			
	AppView.prototype.check = function(){
			if(event.keyCode === 13){
				console.log("Enter key pressed, going to add new items");
				var newItem = newInputItem.value;
				appInstance.add(newItem);
			}
		}
	AppView.prototype.init = function(event){
		console.log("init");
		var preloadedItems = storeInstance.init();
		var itemInit = itemInstance.init();
		var itemsInit = itemsInstance.init();
		(itemInit && itemsInit) ? console.log("item and items initialized") : console.log("item and items initialization failed");
		preloadedItems.map(function(item)
			{
				appInstance.add(item);
			});
		(function(){
			
			var clrscr = document.getElementById("clearScreen");
			clrscr.addEventListener("click",appInstance.clearScreen);
			newInputItem = document.getElementById("newToDoItem");
			newInputItem.addEventListener("keydown",appInstance.check);
			var ulElement = document.getElementById("itemContainerId");
			ulElement.addEventListener("click",itemsInstance.assignListeners);
		})();
		console.log("Keydown event listened");
	}
		
		// store is only accessible by AppView. itemView and itemsView cannot access store.
	AppView.prototype.storeElements = function(insertedItems){
			storeInstance.storeElements(insertedItems);
	}
		
	AppView.prototype.deleteFromStorage = function(id){
			var storeInstance = new Todo.store();
			console.log("delete from storage");
			delete toDoElements[id];
			console.log(toDoElements);
			storeInstance.setElement(toDoElements);
			console.log("Item deleted from storage");
		}
		
	AppView.prototype.changeState = function(state,id){
			var x = new Todo.store();
			(state == "checked") ? x.setState(id,"checked") : x.setState(id,"unchecked");
			storeInstance.setElement = toDoElements;
			console.log("item state changed");
		}
		
		function clearScreen(){
			var id = "clearScreen";
			Todo.itemsView.remove(id);
		}
		
		// As soon as the DOM loads, I'm calling init function
		document.addEventListener("DOMContentLoaded", function(event) {
		console.log("DOM loaded");
		Todo.AppView.prototype.init();
		});
	window.Todo = window.Todo || {};
	window.Todo.AppView = AppView;
})(window);