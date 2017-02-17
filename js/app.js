var controller = {
	currentPage: 1,
	genresToReturn: 3, // number of genres to return
	questionsasked: 0,
	nbQuestions: 5, // number of questions to ask
	genresWeight: {
		"28": 0, // action				18.900
		"12": 0, // adventure 			9.700
		"16": 0, // animation 			12.000
		"35": 0, // comedy 				48.000
		"80": 0, // crime 				12.000
		"99": 0, // documentary 		27.500
		"18": 0, // drama 				69.000
		"10751": 0, // family			10.000
		"14": 0, // fantasy				6.400
		"27": 0, // horror				15.000
		"10402": 0, // music			11.500
		"9648": 0, // mystery			6.000
		"10749": 0, //romance			18.000
		"878": 0, // scifi 				7.800
		"53": 0, // thriller			18.000
		//"10752": 50 // war			4.000
	},
	// Check the Excel file
	questions: [
		{
			type: "genre",
			question: "Looks like your plane is going down. Your parachute might or might not work...",
			answer1: "JUMP!",
			answer2: "Who's in charge here? Land that plane NOW!",
			effect: [[12, 1], [28, 3], [27, 1], [10749, -1]]
		},
		{
			type: "genre",
			question: "A man and a woman bump into each other...",
			answer1: "They'll fall in love for sure",
			answer2: "Gotta settle this in a fist fight",
			effect: [[28, -1], [80, -2], [27, -1], [10749, 3]]
		}
	]
}

function recordAnswer(question, answer) {
	var effectsArray = question.effect;
	// add resective weight to controller depending on answer (1 or 2)
	for (var i=0; i < effectsArray.length; i++) {
		if (answer) {
			controller.genresWeight[effectsArray[i][0]] = effectsArray[i][1];
		} else {
			controller.genresWeight[effectsArray[i][0]] = -effectsArray[i][1];
		}
	}
	console.log(controller.genresWeight);
}

function getDataFromApi(genres, callback) {
	var settings = {
	  	"async": true,
		"crossDomain": true,
		"url": "https://api.themoviedb.org/3/discover/movie?",
		"method": "GET",
		"headers": {},
		"data": {
			"api_key": "88de9361639ced0c7b6766740b0e8527",
			"with_genres": genres.toString(),
			"include_adult": "false",
			"page": controller.currentPage,
			"sort_by": "popularity.desc",
			"language": "en-US"
	 	},
	 	success: callback,
        error: function(result, status, error) { console.log(status + " - " + error); }
	}
   $.ajax(settings);
}

function displayResults(response) {
  console.log(response);
}

function getHighestGenres() {
	var resultArray = [];
	var finalArray = [];
	// transform genres object into array in order to extract info
	$.each(controller.genresWeight, function(genre, weight) {
		resultArray.push([genre, weight]);
	});
	// sort array and return n = numberGenres highest values
	resultArray.sort(function(a, b) { return a[1] - b[1]; }).splice(0, resultArray.length - controller.genresToReturn);
	// put genres in final array
	$.each(resultArray, function(i, array) {
		finalArray.push(array[0]);
	});
	console.log(finalArray);
  	return finalArray;
}

// ======= TEMP =======
recordAnswer(controller.questions[0], true);
var genres = getHighestGenres();
getDataFromApi(genres, displayResults);