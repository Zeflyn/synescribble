# SyneScribble

Georgia Tech Coding Bootcamp
Fullstack Web Development
Project 1

# Team:
* Aarick Farist
* Michael Dibble
* Lisa Huynh

# Project Description
The purpose of this project is utilizing Paper.js and Firebase to create a dynamically updated community gallery of in-browser drawings.
Paper.js allows a user to draw on the canvas element in HTML as point values.
The drawing canvas is converted to an image and the data for it + the creator's name are stored in the Firebase database.
The ColorAPI pulls rgb values that allow the users to choose which color to use when drawing.
When the "Submit" button is clicked, the user's drawing is appended into the Gallery div, the data is pushed into Firebase and it is posted into Twitter with the use of the Twitter API and Codebird.

# Project Sketches


# API's and Technology

* ColorAPI for pulling color options
* Twitter API to post drawings into Twitter account
* Codebird.js for handling automated posting to twitter
* Paper.js for drawing 
* Bootstrap for extra styling and responsiveness
* Firebase for persistent data storage

# Who is doing what?


## Aarick

Paper.js, Firebase interaction, Twitter API, Codebird implementation

## Michael

Bootstrap implementation, HTML markup (Header + dynamically updating gallery images), CSS Styling

## Lisa

The Color API Implementation, HTML markup (footer + dynamically generating color squares), CSS styling

