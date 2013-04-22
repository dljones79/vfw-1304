// David Jones
// VFW 1304
// Project 3

//Don't initialize until the DOM is done loading.
window.addEventListener("DOMContentLoaded", function(){

	//Variable Defaults
	var charClasses = ["--Choose A Class--", "Berserker", "Guardian", "Paladin", "Shadowknight", "Monk", "Bruiser", 
		"Ranger", "Assassin", "Swashbuckler", "Beastlord", "Brigand", "Troubadour", "Dirge", "Mystic", "Defiler", "Templar",
		"Inquisitor", "Fury", "Warden"],
		sexData,
		enervated,
		harrows,
		skyshrine
	; //End of Variable Defaults

	//getElementById Function
	function get(elm){
		var theElm = document.getElementById(elm);
		return theElm;
	}
	
	//Array Function to populate a form element. (JavaScript: Array Function)
	function createClassSelect(){
		var fTag = document.getElementsByTagName("form"), //This will be an array.
			selLi = get('selClass'),
			makeSel = document.createElement('select');
			makeSel.setAttribute("id", "classes");
		for(var i=0, j=charClasses.length; i<j; i++){
			var createOp = document.createElement('option');
			var optionTxt = charClasses[i];
			createOp.setAttribute("value", optionTxt);
			createOp.innerHTML = optionTxt;
			makeSel.appendChild(createOp);
		}
		selLi.appendChild(makeSel);
	}
	
	// Functions to find values of radio buttons.
	function selRadio(){
		var rad = document.forms[0].sex;
		for (var i = 0; i<rad.length; i++){
			if(rad[i].checked){
			sexData = rad[i].value;
			}
		}
	}
	
	//Function to find checkbox data.
	function chkBoxData(){
		if(get('enervated').checked){
		 	enervated = "Yes";
		}else {
			enervated = "No";
		}
		
		if(get('harrows').checked){
			harrows = "Yes";
		}else {
			harrows = "No";
		}
		
		if(get('skyshrine').checked){
			skyshrine = "Yes";
		}else {
			skyshrine = "No";
		}
	} 
	
	function saveData(){
		// Create random number for each character.
		var uniqueId        = Math.floor(Math.random()*100000001);
		// Get data from form and store in an object.
		// Object properties contain array with form label and input values.
		selRadio();
		chkBoxData();
		var obj 			= {};
			obj.cName 		= ["Name:", get('cName').value];
			obj.account 	= ["Account:", get('account').value];
			obj.server 	    = ["Server:", get('server').value];
			obj.guild 		= ["Guild:", get('guild').value];
			obj.creation	= ["Creation Date:", get('creation').value];
			obj.charClass	= ["Class:", get('classes').value];
			obj.sex 		= ["Sex:", sexData]; 
			obj.level 		= ["Level:", get('level').value];
			obj.aa 		    = ["AA\'s:", get('aa').value];
			obj.enervated   = ["Enervated:", enervated];
			obj.harrows 	= ["Harrows:", harrows];
			obj.skyshrine 	= ["Skyshrine:", skyshrine]; 
			obj.bio 		= ["Bio:", get('bio').value];
		//Using stringify to convert data to string and store into Local Data
		localStorage.setItem(uniqueId, JSON.stringify(obj));
		alert("Character Saved!");
		window.location.reload();	
	}
	
	//Switch/Case to toggle visibility of form and buttons.
	function controls(arg){
		switch(arg){
			case "on":
				get('characterDataForm').style.display = "none";
				get('clearData').style.display = "inline";
				get('dispData').style.display = "none";
				get('newChar').style.display = "inline";
				break;				
			case "off":
				get('characterDataForm').style.display = "block";
				get('clearData').style.display = "inline";
				get('dispData').style.display = "inline";
				get('newChar').style.display = "none";
				get('elements').style.display = "none";
				break;				
			default:
				return false;
		}
	}
	
	//Function to display saved character data on screen.
	function displayData(){
		controls("on");
		if(localStorage.length === 0){
			alert("No character data on file!");
		}
		//Gets data from local storage and writes it.
		var container = document.createElement('div');
		container.setAttribute("id", "elements");
		var makeUl = document.createElement('ul');
		container.appendChild(makeUl);
		document.body.appendChild(container);
		get('elements').style.display = "block";
		for(var i = 0, j=localStorage.length; i<j; i++){
			var makeListItem = document.createElement('li');
			var makeEditLi = document.createElement('li');
			makeUl.appendChild(makeListItem);
			var theKey = localStorage.key(i);
			var val = localStorage.getItem(theKey);
			//Converting to an object
			var newStr = JSON.parse(val);
			var subUl = document.createElement('ul');
			makeListItem.appendChild(subUl);
			for(var x in newStr){
				var newLi = document.createElement('li');
				subUl.appendChild(newLi); 
				var optText = newStr[x][0]+" "+newStr[x][1];
				newLi.innerHTML = optText;
				subUl.appendChild(makeEditLi);
			}
			createEditLinks(localStorage.key(i), makeEditLi); //Function call to create edit and delete links.		
		}
	}
	
	//Creates edit and delete links for stored data.
	function createEditLinks(objKey, makeEditLi){
		//Edit Link
		var editChar = document.createElement('a');
		editChar.href = "#";
		editChar.key = objKey;
		var text = "Edit Character";
		editChar.addEventListener("click", editCharacter);
		editChar.innerHTML = text;
		makeEditLi.appendChild(editChar);
		
		var pageBreak = document.createElement('br');
		makeEditLi.appendChild(pageBreak);
		
		//Delete Link
		var delChar = document.createElement('a');
		delChar.href = "#";
		delChar.key = objKey;
		var delText = "Delete Character";
		//delChar.addEventListener("click", deleteCharacter);
		delChar.innerHTML = delText;
		makeEditLi.appendChild(delChar);
	}
	
	function editCharacter(){
		// Retrieve data from local storage.
		var keyVal = localStorage.getItem(this.key);
		var charObj = JSON.parse(keyVal);
		
		//Show the form
		controls("off");
		
		//Send data to form fields.
		get('cName').value = charObj.cName[1];
		get('account').value = charObj.account[1];
		get('server').value = charObj.server[1];
		get('guild').value = charObj.guild[1];
		get('creation').value = charObj.creation[1];
		get('classes').value = charObj.charClass[1];
		var sexRadios = document.forms[0].sex;
		for(var i=0; i<sexRadios.length; i++){
			if(sexRadios[i].value == "Male"){
				sexRadios[i].setAttribute("checked", "checked");
			}else if(sexRadios[i].value == "Female"){
				sexRadios[i].setAttribute("checked", "checked");
			}
		}
		get('level').value = charObj.level[1];
		get('aa').value = charObj.aa[1];
		if(charObj.enervated[i] == "Yes"){
			get('enervated').setAttribute("checked", "checked");
		}
		if(charObj.harrows[i] == "Yes"){
			get('harrows').setAttribute("checked", "checked");
		}
		if(charObj.skyshrine[i] == "Yes"){
			get('skyshrine').setAttribute("checked", "checked");
		}
		get('bio').value = charObj.bio[1];
		
		//Remove listener from Add Character button
		addChar.removeEventListener("click", saveData);
		//Change value of button to edit
		get('addChar').value = "Edit Character";
		var editButton = get('addChar');
		//Save the key value established in this function as a property of the editButton event
		//so we can use that value when we save the data we edited.
		editButton.addEventListener("click", validateFields);
		editButton.key = this.key;
	}
	
	//Function to clear all data in local storage.
	function clearAllData(){
		if(localStorage.length === 0){
			alert("Nothing to clear! Storage empty.");
		}else {
			localStorage.clear();
			alert("Character data was erased!")
			window.location.reload();
			return false;
		}
	}
	
	function validateFields(){
		
	}

	//Calling function to build character class select data.
	createClassSelect();

	//Event Listeners for Links and Button Clicks
	var dispData = get('dispData');
	dispData.addEventListener("click", displayData);
	var clearData = get('clearData');
	clearData.addEventListener("click", clearAllData); 
	var addChar = get('addChar');
	addChar.addEventListener("click", saveData);
	
});


