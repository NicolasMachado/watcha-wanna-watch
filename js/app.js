var controller = {
    currentPage: 1,
    genresToReturn: 2, // number of genres to return
    orderArray: [],
    currentQuestion: 0,
    minResults: 10, // minimum amount of results. Otherwise, reshuffle
    nbQuestions: 1, // number of questions to randomly extract from the pool and ask
    imgBaseUrl: "",
    posterSizes: [],
    releaseYear: 0,
    sortBy: "",
    currentPage: 1,
    genresWeight: {
        "28": 0, // action              18.900
        "12": 0, // adventure           9.700
        "16": 0, // animation           12.000
        "35": 0, // comedy              48.000
        "80": 0, // crime               12.000
        "99": 0, // documentary         27.500
        "18": 0, // drama               69.000
        "10751": 0, // family           10.000
        "14": 0, // fantasy             6.400
        "27": 0, // horror              15.000
        "10402": 0, // music            11.500
        "9648": 0, // mystery           6.000
        "10749": 0, //romance           18.000
        "878": 0, // scifi              7.800
        "53": 0 // thriller             18.000
    },
    // Check the Excel file for question generation
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
            answer2: "They settle this in a fist fight",
            effect: [[28, -1], [80, -2], [27, -1], [10749, 2]]
        },
        {
            type: "genre",
            question: "Blue or black?",
            answer1: "Blue",
            answer2: "Black",
            effect: [[28, 1], [12, 1], [16, 2], [99, -2], [14, 1]]
        },
        {
            type: "genre",
            question: "A monkey walks into a bar",
            answer1: "Good one!",
            answer2: "Monkeys don't go to bars",
            effect: [[16, 1], [35, 3], [18, -1], [10751, 1], [14, 1], [27, -1]]
        },
        {
            type: "genre",
            question: "Who killed Mrs. White?",
            answer1: "Colonel Mustard with the candlestick!",
            answer2: "Heh, who cares?",
            effect: [[80, 3], [27, 1], [9648, 1], [53, 2]]
        },
        {
            type: "genre",
            question: "Your time machine is finally working",
            answer1: "To the future!",
            answer2: "To the past!",
            effect: [[99, -1], [14, 2], [9648, 1], [878, 2]]
        },
        {
            type: "genre",
            question: "Jane from accounting said you were kind of a drama-queen",
            answer1: "Whatever floats her boat",
            answer2: "That is NOT TRUE!",
            effect: [[18, -3], [14, -1]]
        },
        {
            type: "genre",
            question: "Children",
            answer1: "Yay!",
            answer2: "Eww!",
            effect: [[16, 1], [35, 2], [80, -1], [10751, 3], [27, -1]]
        },
        {
            type: "genre",
            question: "What is the deadliest?",
            answer1: "A dragon",
            answer2: "An army of 100 trained soldiers",
            effect: [[28, -1], [12, 1], [14, 3], [878, 2]]
        },
        {
            type: "genre",
            question: "What is hidden under your bed at night?",
            answer1: "I don't want to know!",
            answer2: "Nothing",
            effect: [[35, -1], [80, 1], [14, 1], [27, 2], [9648, 1], [878, 1]]
        },
        {
            type: "genre",
            question: "What would you rather lose?",
            answer1: "Your speech",
            answer2: "Your ears",
            effect: [[28, 1], [18, -1], [10402, 2]]
        },
        {
            type: "genre",
            question: "What is the meaning of life?",
            answer1: "42",
            answer2: "Life is meaningless",
            effect: [[35, 1], [14, 1], [27, -1], [9648, 3], [878, 1], [53, -1]]
        },
        {
            type: "genre",
            question: "Do you know when Valentine's day is?",
            answer1: "Don't know, don't care",
            answer2: "Of course I do, I'm not some kind of monster",
            effect: [[28, 1], [12, 1], [35, 1], [80, 1], [10751, -1], [10749, -2], [53, 1]]
        },
        {
            type: "genre",
            question: "In space, no one can hear you...",
            answer1: "Scream",
            answer2: "Yawn",
            effect: [[12, 1], [35, -1], [14, 1], [27, 1], [9648, 1], [10749, -1], [878, 3]]
        },
        {
            type: "genre",
            question: "How would you find the murderer?",
            answer1: "By picking a random name in the phone book",
            answer2: "By investigating thoroughly",
            effect: [[28, -1], [35, 1], [80, -2], [14, 1], [27, -1], [9648, -1], [53, -3]]
        },
        {
            type: "genre",
            question: "Hierarchy is",
            answer1: "Essential",
            answer2: "Stupid",
            effect: [[28, 1], [80, 1], [27, 1], [10749, -1], [53, 1]]
        }
    ]
};

$(function () {
    "use strict";
    $(".questions-container").hide().removeClass("hidden");
    controller.orderArray = shuffle(); // randomize questions
    controller.sortBy = randSortBy(); // get a random sortBy
    displayQuestion();
    $(".restart").hide();
    $(".more").hide();
    getConfig(); // get config from API
    // click on Start
    $(".start").click(function () {
        $(".intro").hide();  
        $(".questions-container").show();  
    });
    // click on Restart
    $(".restart").click(function () {
        controller.releaseYear = 0;
        controller.currentPage = 1;
        controller.orderArray = shuffle(); // randomize questions
        controller.sortBy = randSortBy(); // get a random sortBy
        displayQuestion();
        $(".questions-container").show();
        $(".movies").empty();
        $(".restart").hide();
        $(".more").hide();
        $.each(controller.genresWeight, function (genre) {
            controller.genresWeight[genre] = 0;
        });
    });
    // click on More
    $(".more").click(function () {
        controller.currentPage++;
        var genres = getHighestGenres();
        getDataFromApi(genres, displayResults);
    });
    // click on answer 1
    $(".answer1-container").click(function () {
        recordAnswer(controller.questions[controller.orderArray[controller.currentQuestion]], true);
        controller.currentQuestion += 1;
        displayQuestion();
    });
    // click on answer 2
    $(".answer2-container").click(function () {
        recordAnswer(controller.questions[controller.orderArray[controller.currentQuestion]], false);
        controller.currentQuestion += 1;
        displayQuestion();
    });
    // click on movie image
    $(".movies").on("click", ".lightbox", function () {
    });
});

function displayQuestion() {
    "use strict";
    var currentQ = controller.questions[controller.orderArray[controller.currentQuestion]];
    $(".question-title").text(currentQ.question);
    $(".answer1").text(currentQ.answer1);
    $(".answer2").text(currentQ.answer2);
}

function recordAnswer(question, answer) {
    "use strict";
    var effectsArray = question.effect;
    // add respective weights to controller depending on answer (1 or 2)
    effectsArray.forEach(function (element) {
        if (answer) {
            controller.genresWeight[element[0]] += element[1];
        } else {
            controller.genresWeight[element[0]] -= element[1];
        }
    });
    // if it is the last question, show results
    if (controller.currentQuestion >= controller.nbQuestions - 1) {
        //$(".questions-container").empty();
        $(".questions-container").hide();
        $(".movies").show();
        var genres = getHighestGenres();
        getDataFromApi(genres, displayResults);
    }
    console.log(controller.genresWeight);
}

function getDataFromApi(genres, callback) {
    "use strict";
    if (controller.releaseYear === 0) {
        controller.releaseYear = 2000 + Math.floor(Math.random()*17);
    }
    var settings = {
        async: true,
        crossDomain: true,
        url: "https://api.themoviedb.org/3/discover/movie?",
        method: "GET",
        headers: {},
        data: {
            api_key: "88de9361639ced0c7b6766740b0e8527",
            with_genres: genres.toString(),
            include_adult: "false",
            page: controller.currentPage,
            sort_by: controller.sortBy,
            language: "en-US",
            page: controller.currentPage,
            year: controller.releaseYear
        },
        success: callback,
        error: function (result, status, error) {
            console.log(result + " - " + status + " - " + error);
        }
    };
    $.ajax(settings);
}

function getConfig() {
    "use strict";
    var config = {
        async: true,
        crossDomain: true,
        url: "https://api.themoviedb.org/3/configuration?",
        method: "GET",
        headers: {},
        data: {
            api_key: "88de9361639ced0c7b6766740b0e8527"
        },
        success: recordConfig,
        error: function (result, status, error) {
            console.log(result + " - " + status + " - " + error);
        }
    };
    $.ajax(config);
}

function recordConfig(config) {
    "use strict";
    controller.imgBaseUrl = config.images.secure_base_url;
    controller.posterSizes = config.images.poster_sizes[3]; // poster size
    console.log(config);
}

function displayResults(response) {
    "use strict";
    var genres = getHighestGenres();
    console.log(response.page);
    if (response.page !== response.total_pages) {
        $(".more").show();       
    } else {
        $(".more").hide();           
    }
    $(".restart").show();
    // check if more than 10 results, otherwise, reshuffle
    if (response.total_results < controller.minResults && controller.genresToReturn > 1) {
        console.log("not enough results... reshuffling");
        var genres = getHighestGenres();
        console.log(genres);
        genres.splice(0,1);
        console.log(genres);
        getDataFromApi(genres, displayResults);
        return
    }
    console.log(response);
    $.each(response.results, function (i) {
        var imagePath = "";
        if (response.results[i].poster_path) {
            imagePath = controller.imgBaseUrl + controller.posterSizes + response.results[i].poster_path;
        } else {
            imagePath = "images/unavailable.jpg";           
        }
        $(".movies").append(
            "<div class=\"col-3\">" +
                "<a class=\"lightbox\" data-id=\"" + response.results[i].id + "\">" + 
                    "<div class=\"movie-container\" style=\"background: url(\'" + imagePath + "\') no-repeat center;background-size: 100% auto;\">" +
                    "<span class=\"movie-title\">" + response.results[i].title + "</span>" +
                    "</div>" +
                "</a>" +
            "</div>"
        );
    });
    $(".lightbox").lightcase({
        href:"#desc",
        transitionOut: "elastic",
        cssTransitions: true,
        liveResize: true,
        // Would be called before generating content
        onInit : {
            a: function() {
                var movieID = $(this).data("id");
                // ajax movie details
                var configDetails = {
                    async: false,
                    crossDomain: true,
                    url: "https://api.themoviedb.org/3/movie/" + movieID +"?",
                    method: "GET",
                    language: "en-US",
                    headers: {},
                    data: {
                        api_key: "88de9361639ced0c7b6766740b0e8527"
                    },
                    success: recordDetails,
                    error: function (result, status, error) {
                        console.log(result + " - " + status + " - " + error);
                    }                
                }
                $.ajax(configDetails);

                // ajax movie videos
                var configVDetails = {
                    async: false,
                    crossDomain: true,
                    url: "https://api.themoviedb.org/3/movie/" + movieID + "/videos?",
                    method: "GET",
                    language: "en-US",
                    headers: {},
                    data: {
                        api_key: "88de9361639ced0c7b6766740b0e8527"
                    },
                    success: recordVideoDetails,
                    error: function (result, status, error) {
                        console.log(result + " - " + status + " - " + error);
                    }                
                }
                $.ajax(configVDetails);
            }
        },
        // Would be called when aborting lightcase
        onClose : {
            a: function() {
                $(".desc-title").empty();
                $(".desc-rating").empty();
                $(".desc-synopsis").empty();     
                $(".desc-trailer").attr("src", "").hide();          
            }
        }
    });
}

function recordDetails(config) {
    "use strict";
    console.log(config);
    var numFullStars = config.vote_average/2;
    var halfStar = "";
    var starString = "";
    numFullStars % 1 >= .5 ? halfStar = "<img src=\"images/star-half.png\">" : halfStar = "<img src=\"images/star-empty.png\">";
    for (var i = 1; i <= 5; i++) {
        if (i <= numFullStars) {
            starString += "<img src=\"images/star-full.png\">";
        } else if (i == Math.floor(numFullStars)+1) {
            starString += halfStar;          
        } else {
            starString += "<img src=\"images/star-empty.png\">";           
        }
    }
    $(".desc-title").text(config.title);
    if (numFullStars > 0) {
        $(".desc-rating").append(starString);
    }
    $(".desc-synopsis").text(config.overview);
}

function recordVideoDetails(config) {
    "use strict";
    console.log(config);
    if (config.results.length > 0) {
        $(".desc-trailer").show();
        $(".desc-trailer").attr("src", "https://www.youtube.com/embed/" + config.results[0].key).show();
    }
}

function getHighestGenres() {
    "use strict";
    var resultArray = [];
    var finalArray = [];
    // transform genres object into array in order to extract info
    $.each(controller.genresWeight, function (genre, weight) {
        resultArray.push([genre, weight]);
    });
    // sort array and return n = numberGenres highest values
    resultArray.sort(function (a, b) {
        return a[1] - b[1];
    }).splice(0, resultArray.length - controller.genresToReturn);
    // put genres in final array
    $.each(resultArray, function (i) {
        finalArray.push(resultArray[i][0]);
    });
    console.log(finalArray);
    return finalArray;
}

function shuffle() {
    "use strict";
    var array = [];
    $.each(controller.questions, function (i) {
        array[i] = i;
    });
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function randSortBy() {
    "use strict";
    var sortArray = ["popularity.desc", "revenue.desc", "vote_average.desc", "vote_count.desc"];
    return sortArray[Math.floor(Math.random()*sortArray.length)];
}