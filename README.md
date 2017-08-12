# Watcha Wanna Watch

Thinkful (https://www.thinkful.com/) first portfolio project.

Watcha Wanna Watch is an online app that recommends movies according to your personality and tastes. Those are measured by a remote group of NASA scientists after a series of short random questions (I swear).

## Technology

<img src="https://raw.githubusercontent.com/NicolasMachado/Help-Expat-Berlin/master/views/images/icons/html5.png" height="40px" alt="HTML5" title="HTML5" /> <img src="https://raw.githubusercontent.com/NicolasMachado/Help-Expat-Berlin/master/views/images/icons/css3.png" height="40px" alt="CSS3" title="CSS3" /> <img src="https://raw.githubusercontent.com/NicolasMachado/Help-Expat-Berlin/master/views/images/icons/javascript.png" height="40px" alt="Javascript" title="Javascript" /> <img src="https://raw.githubusercontent.com/NicolasMachado/Help-Expat-Berlin/master/views/images/icons/ajax.png" height="40px" alt="Ajax" title="Ajax" /> <img src="https://raw.githubusercontent.com/NicolasMachado/Help-Expat-Berlin/master/views/images/icons/jquery.png" height="40px" alt="jQuery" title="jQuery" />

## Introduction

There are thousands of movies out there, and still, there you are, wondering what to watch next. You also tend to watch the same kind of movies over and over. Watcha wanna watch takes you out of this mindset by selecting a set of movies for you. They are indirectly selected and calculated depending on the answers your provide to a short series of random questions.

## User interface

The app was designed to work on mobile, tablets and desktop. Its interface is meant to be simple and intuitive. It shouldn't take more than 3 minutes to any user to obtain a custom list of movies. Once done, the user gets a conveniently laid out list of movies represented by their covers and titles on which he can tap/click to access its rating, synopsis and trailer (if available).

## Live Site

You can access Watcha Wanna Watch at http://www.watcha-wanna-watch.com

## Under the hood

* The app is built using HTML5, CSS, Flexbox, Javascript, JQuery, AJAX, the Lightcase plugin and The Movie Database API.
* The app is fully responsive, adapting for mobile, table and desktop viewports.
* Each question is an excuse to add/remove weight to category scores such as "adventure", "romance, "thriller" etc.
* The app selects the two top score genres by default for the final selection.
* The release year is randomly selected between 2000 and 2017 to get better randomization. The API doesn't strictly restrict the year.
* If the user gets less than 10 results, the app automatically removes one genre and resend an API request in order to get a wider selection.
* An Excel file has been created to generate questions that can be directly implemented in the app JS.
* The app doesn't use Flexbox for mobile view in order to maximize compatibility with native mobile browsers.
