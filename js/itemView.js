(function(){

	function itemView(){}
	itemView.prototype.init = function(){
		return true;
	}
	itemView.prototype.checkBoxEffect = function(id){
		var appInstance = new Todo.AppView();
		var checkBox = document.getElementById(id);
		var name = checkBox.nextSibling;
		if (checkBox.checked){
		name.classList.add("strikeItOut");
		appInstance.changeState("checked",id);
		}else {
			name.classList.remove("strikeItOut");
			appInstance.changeState("unchecked",id);
		}
	}
	itemView.prototype.remove = function(divId,checkId){
		var newInputItem = document.getElementById("newToDoItem");
		var appInstance = new Todo.AppView();
		var clrscr = document.getElementById("clearScreen");
		if(divId == "clearScreen"){
		newInputItem.removeEventListener("keydown",Todo.AppView.check);			
		clrscr.removeEventListener("click",clearScreen);
		document.body.innerHTML = null;
		console.log("Clear screen, inputbox Event listener removed and screen cleared");
		}
		else{
			var decision = confirm("Do you want to delete?");
			if(decision == true){
				var outerDivId = "#"+divId;
				var outerDiv = document.querySelector(outerDivId);
				outerDiv.remove();
				console.log("todo item deleted successfully");
				alert("item deleted successfully");
				appInstance.deleteFromStorage(checkId);
			}
			else {
				alert("You chose not to delete that item");
			}
		}
	}
	itemView.prototype.display = function(newItem,checkBoxid,divId){
		var newItemToBeAdded = [];
		var count = 0;
		var deleteButtonId = "deleteButton"+newItem;
		var liId = "li"+newItem;
		newItemToBeAdded[count++] = "<li id = '"+liId+"' class = 'customHorizontalRule'  checkId = "+checkBoxid+" deleteId = "+deleteButtonId+">";
		newItemToBeAdded[count++] = "<input type = 'checkbox' id = '"+checkBoxid+"' class = 'checkBox visibilityNone'/>";
		newItemToBeAdded[count++] = "<span>"+newItem+"</span>";
		newItemToBeAdded[count++] = "<a href = '#' class = 'moveRightSide visibilityNone' divId = "+divId+" id = '"+deleteButtonId+"' checkId = "+checkBoxid+">Delete</a>";
		newItemToBeAdded = newItemToBeAdded.join("");
		return newItemToBeAdded;
		}
	
	window.Todo = window.Todo || {};        
    window.Todo.itemView = itemView;  
})(window);