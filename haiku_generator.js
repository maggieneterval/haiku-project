var haiku = require('./haiku.js');

// sets cmudictFile to equal the contents of the dictionary output as a string

var cmudictFile = haiku.fileToString('./cmudict.txt');

// passes in the dictionary file and returns an object with keys of number of syllables pointing to arrays of words with that number of syllables

var formattedData = haiku.formatData(cmudictFile);

// generates random structure

var newStructure = haiku.randomStructure();

// generates haiku with 5/7/5 syllable words and the formatted Data object 

var newHaiku = haiku.createHaiku(newStructure, formattedData);

console.log(newHaiku);

//generate Hume haiku

var humeFile = haiku.fileToString('./hume.txt');
var dict = haiku.createDict(cmudictFile);
var humeHaiku = haiku.haikuFromCorpus(humeFile, dict);
console.log(humeHaiku);