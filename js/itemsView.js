(function(window){
	function itemsView(){
		return this;
	}
	itemsView.prototype.init = function(item) {
			return true;
	}
		
		
	itemsView.prototype.remove = function(divId,checkId) {
			Todo.itemView.remove(divId,checkId);
	}
	
	itemsView.prototype.display = function(item) {
			var newInputItem = document.getElementById("newToDoItem");
			var div = document.createElement("div");
			var ulContainer = document.getElementById("itemContainerId");
			newInputItem.value = "";
			var divId = item+"div";;
			div.id = divId;
			var checkBoxid = "checkBox"+item;
			var stat = "unchecked";
			var itemInstance = new Todo.itemView();
			div.innerHTML = itemInstance.display(item,checkBoxid,divId);
			console.log("new TODO item added");
			var insertedItems = {id : checkBoxid, name : item, state : stat};
			var appViewInstance = new Todo.AppView();
			appViewInstance.storeElements(insertedItems);
			ulContainer.appendChild(div);
			return true;
	}
	
		//delegation function
	itemsView.prototype.assignListeners = function(){
		var itemInstance = new Todo.itemView();
		var width = window.innerWidth;
		console.log(width);
		if(width < 1000){
			console.log("mobile version");
			if(event.target.classList.contains("customHorizontalRule")){
				checkId = event.target.getAttribute("checkid");
				deleteId = event.target.getAttribute("deleteid");
				console.log(width);
				let checkBox = document.getElementById(checkId);
				let deleteButton = document.getElementById(deleteId);
				checkBox.classList.toggle("mobileVisibility");
				deleteButton.classList.toggle("mobileVisibility");
			}
		}
		console.log("reached delegation");
		var id = event.target.id;
		item = event.target;
		if (item.classList.contains("checkBox")){
			itemInstance.checkBoxEffect(id);
		}
		else if(item.classList.contains("moveRightSide")){
			var outerDivId = event.target.getAttribute("divid");
			var checkId = event.target.getAttribute("checkId");
			itemInstance.remove(outerDivId,checkId);
		}
	}
	window.Todo = window.Todo || {};        
    window.Todo.itemsView = itemsView;
})(window);