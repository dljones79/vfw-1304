// David Jones
// VFW 1304
// Project 2

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
		var item 			= {};
			item.cName 		= ["Name:", get('cName').value];
			item.account 	= ["Account:", get('account').value];
			item.server 	= ["Server:", get('server').value];
			item.guild 		= ["Guild:", get('guild').value];
			item.creation	= ["Creation Date:", get('creation').value];
			item.charClass	= ["Class:", get('classes').value];
			item.sex 		= ["Sex:", sexData]; 
			item.level 		= ["Level:", get('level').value];
			item.aa 		= ["AA\'s:", get('aa').value];
			item.enervated  = ["Enervated:", enervated];
			item.harrows	= ["Harrows:", harrows];
			item.skyshrine 	= ["Skyshrine:", skyshrine]; 
			item.bio 		= ["Bio:", get('bio').value];
		//Using stringify to convert data to string and store into Local Data
		localStorage.setItem(uniqueId, JSON.stringify(item));
		alert("Character Saved!");	
	}
	
	function loadData(){
		//Gets data from local storage and writes it.
		var container = document.createElement('div');
		container.setAttribute("id", "elements");
		var makeUl = document.createElement('ul');
		container.appendChild(makeUl);
		document.body.appendChild(container);
		for(var i = 0, j=localStorage.length; i<j; i++){
			var makeListItem = document.createElement('li');
			makeUl.appendChild(makeListItem);
			var theKey = localStorage.key[i];
			var val = localStorage.getItem(theKey);
			//Converting to an object
			var newStr = JSON.parse(val);
			var subUl = document.createElement('ul');
			makeListItem.appendChild(subUl);
			for(var x in newStr){
				var newLi = document.createElement('li');
				subUl.appendChild(newLi); 
				var optText = newStr[x][0] + " " + newStr[x][1];
				newLi.innerHTML = optText;
			}		
		}
	}
	
	//Calling function to build character class select data.
	createClassSelect();

	//Event Listeners for Links and Button Clicks
	var dispData = get('dispData');
	dispData.addEventListener("click", loadData);
//	var clearData = get('clearData');
//	clearData.addEventListener("click", clearAllData); */
	var addChar = get('addChar');
	addChar.addEventListener("click", saveData);
	
});


