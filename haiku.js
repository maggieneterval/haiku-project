var fs = require('fs');

// returns contents of file as a string

function fileToString(file){
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

// returns an object with each word as key and number of syllables it has as value

function createDict(data){
	var obj = {};    
	var lines = data.toString().split("\n");
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
		obj[thisWord] = syllCount;
	}
	return obj; 
}

function haikuFromCorpus(fileString, dictObj){
	var textArr = fileString.split(' ');
	var randomStart = Math.floor(Math.random() * ((textArr.length - 1) + 1));

	var haiku = "";
	var syllCount = 0;
	var currentLine = 1;
	var totalSyll;

	for (var i = randomStart; i < textArr.length; i++){

		var thisWord = textArr[i].toUpperCase();
		var thisCount = dictObj[thisWord];

		if (currentLine === 1 || currentLine === 3){
			totalSyll = 5;
		} else if (currentLine === 2){
			totalSyll = 7;
		} else {
			return haiku.trim();
		}

		if ((syllCount + thisCount) < totalSyll){
			haiku += thisWord + " ";
			syllCount += thisCount;
		} else if ((syllCount + thisCount) === totalSyll){
			haiku += thisWord + "\n";
			currentLine += 1;
			syllCount = 0;
		} else if (((syllCount + thisCount) > totalSyll) || (thisCount === undefined)){
			haiku = "";
			syllCount = 0;
			currentLine = 1;
		}
	}
	
}

module.exports = {
	fileToString: fileToString,
	formatData: formatData,
	randomStructure: randomStructure,
	createHaiku: createHaiku,
	createDict: createDict,
	haikuFromCorpus: haikuFromCorpus,
}
