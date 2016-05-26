var fs = require('fs');

// returns contents of file as a string

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

// takes a string, splits into an array by line break, then splits into sub-arrays by space.

function formatData(data){
	var objOfArrs = {};    
	var lines = data.toString().split("\n");
	//console.log(lines);
	var lineSplit;
	for (var x = 0; x < lines.length - 1; x++){
		var thisLine = lines[x].split('  ');
		var thisWord = thisLine[0];
		if (thisWord.indexOf('\(') !== -1){
			var thisIndex = thisWord.indexOf('\(');
			thisWord = thisWord.slice(0, thisIndex);
		}
		var phonArr = thisLine[1].split(" ");
		var syllCount = 0;
		for (var i = 0; i < phonArr.length; i++){
			if (phonArr[i].match(/\d/)){
				syllCount++;
			}
		}
		if (syllCount in objOfArrs){
			objOfArrs[syllCount].push(thisWord);
		} else {
			objOfArrs[syllCount] = [];
			objOfArrs[syllCount].push(thisWord);
		}
	}
	return objOfArrs; 
}

// generations random structure based on 5/7/5 rule

function randomStructure(){
	var arr = [[],[],[]];
	var linesArr = [5,7,5];
	//returns random number between min and max inclusive
	var randomNumber = function(min,max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	for (var i = 0; i < linesArr.length; i++){
		while (linesArr[i] > 0){
			var numSylls = randomNumber(1,linesArr[i]);
			arr[i].push(numSylls);
			linesArr[i] -= numSylls;
		}
	}
	return arr;	
}

// takes an array containing 3 arrays representing each line of the haiku
// each sub-array indicates how many syllables each word on that line should have
// returns the haiku

function createHaiku(structure, dataObj){
	var haiku = "";
	for (var i = 0; i < structure.length; i++){
		if (i > 0){
			haiku += "\n";
		}
		for (var j = 0; j < structure[i].length; j++){
			var syllables = structure[i][j];
			var choices = dataObj[syllables].length;
			var randomIndex = Math.floor(Math.random() * choices);
			var word = dataObj[syllables][randomIndex];
			haiku += word + " ";
		}
	}
	return haiku.trim();
}

module.exports = {
	readCmudictFile: readCmudictFile,
	formatData: formatData,
	randomStructure: randomStructure,
	createHaiku: createHaiku,
}
