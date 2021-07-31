const SERVER_URL = "http://127.0.0.1:5555"
var numSquaers = 15;
var colors = [];
var pickedColor;
var squares;
var colorDisplay;
var messageDisplay;
var h1;
var h2;
var resetButton;
var modeButtons;
var menuButton;
var numberOfusers;
var user;
var sec = 0;
var clicks = 0;
var interval;

const routes = {
    '/' : home,
    '/registration' : registration,
    '/records' : records,
    '/pregame' : pregame,
    '/RGBmap' : RGBmap,
    '/about' : about,
    '/colorgame' : colorgame
};

const rootDiv = document.getElementById('root');
rootDiv.innerHTML = routes[window.location.pathname];

/**
 * take the user from the login page to the menu of the game (the pregame page).
 */
function goto_pregame(){
    updateName()
    clearInterval(interval)
}

/**
 * take the user from the pregame page (the menu) to the game zone.
 */
function goto_colorgame(){
    console.log("in the game!")
    squares = document.querySelectorAll(".square");
    colorDisplay = document.getElementById("colorDisplay");
    messageDisplay = document.querySelector("#message");
    h1 = document.querySelector("h1");
    h2 = document.querySelector("h2");
    resetButton = document.querySelector("#reset");
    modeButtons = document.querySelectorAll(".mode");
    menuButton = document.querySelector("#menu");
    menuButton.addEventListener("click",function (){
        onNavigate('/pregame')
    });
    resetButton.addEventListener("click", function(){
        reset();
    });
    play_game()
}

/**
 * take the user from the login page/ the registration page to the records page ("top players ranking").
 */
function goto_records(){
    getData(SERVER_URL + '/getRecords').then(result => {
        result.json().then(data => {
            let records = data.sort(function (a,b){
                return (a.record - b.record)
            })
            for(let i =0; i<records.length; i++){
                // get the tables by ID
                var table1 = document.getElementById('table');
                var table2 = document.getElementById('table2');
                var table3 = document.getElementById('table3');
                // we will make sure not to continue after 6 rows in every table
                if(records[i].numberOfsquers == 5){
                    if(table1.rows.length - 1 == 6) continue
                    var row = table1.insertRow(table1.rows.length);
                    insertToTableOfRecords(records[i], row, table1)
                }else if(records[i].numberOfsquers == 10){
                    if(table2.rows.length - 1 == 6) continue
                    var row = table2.insertRow(table2.rows.length);
                    insertToTableOfRecords(records[i], row, table2)
                }else if(records[i].numberOfsquers == 15){
                    if(table3.rows.length - 1 == 6) continue
                    var row = table3.insertRow(table3.rows.length);
                    insertToTableOfRecords(records[i], row, table3)
                }
            }
        })
    })
}

/**
 * helper function - help to load the 3 tables of the records and insert every
 * new row to the tables ("easy", "hard", "very hard").
 * @param recordObj - {type, numberOfsquers, user, record, numOfClicks, time, date}
 * @param row
 * @param table
 */
function insertToTableOfRecords(recordObj, row, table){
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = table.rows.length - 1;
    cell2.innerHTML = recordObj.user;
    cell3.innerHTML = recordObj.time;
    cell4.innerHTML = recordObj.numOfClicks;
    cell5.innerHTML = recordObj.date;
}

/**
 * Every time that we navigate to different pages in our app, it will run.
 * @param pathname - the path of the page after the server_url
 */
const onNavigate = (pathname) => {
    window.history.pushState(
        {},
        pathname,
        window.location.origin + pathname
    )
    rootDiv.innerHTML = routes[pathname]
    if(window.location.pathname == '/pregame') goto_pregame();
    if(window.location.pathname == '/colorgame') goto_colorgame();
    if(window.location.pathname == '/records') goto_records();
}


window.onpopstate = () => {
    rootDiv.innerHTML = routes[window.location.pathname]
}



/**
 * Extracts the user name (getElementById) and adds the name to the header.
 */
function updateName(){
    document.getElementById("name_of_user").append(user.userN);
}

/**
 * Make sure that the user won't get to the game without login or register.
 * If accidentally it happens, it will take the user back to the home page (login page).
 */
window.onload = function (){
    if((window.location != SERVER_URL + '/' || window.location != SERVER_URL + '/registration') && !user){
        onNavigate('/')
    }
    // getDataFromServer()
}

/**
 * In the case of a match between the username and password, it will take the user to the game menu ('pregame').
 * @param userObj - {_id, date, type, userE, userN, userP, EasyBestRecord:{}, MediumBestRecord:{}, HardBestRecord:{}}
 */
function get_in(userObj) {
    user = userObj
    console.log(user)
    onNavigate('/pregame')
}

/**
 * Send a get request for all users in the database and check if
 * there is a match so the user can login to the application.
 * @param userName
 * @param pass
 */
function check_login(userName, pass) {
    getData(SERVER_URL + '/getAll').then(result => {
        result.json().then(data => {
            // [{}, {}, {}]
            for(let i =0; i<data.length; i++){
                if(data[i].userN == userName && data[i].userP == pass){
                    get_in(data[i])
                    return
                }
            } alert("One of your login details are not correct")
        })
    })
}

/**
 * Take the username and password from the login form and send them to the checking process.
 */
function send_login_details(){
    let userN, userP
    userN = document.getElementById('login_name').value
    userP = document.getElementById('login_pass').value
    if(userN == '' || userP == ''){
        return
    }
    check_login(userN, userP)
}

/**
 * Send to the database a post with the user name from a type of "forget password".
 */
function send_forgetPassword_request(){
    let userN = document.getElementById('login_name').value
    if(userN == '' ) return
    let data = {type: 'forgot password', userN: userN}
    postData(SERVER_URL + '/forgot', data).then(result => {
        // 200, 201, 202, 203 - OK
        // 400, 401, - Client problem
        // 404 - not found
        // 500 - Server problem
        if (result.status === 500) {
            alert("Error accured.")
        }
    })
    alert("In the next 48 hours we will send you new password to your email address.")
}

/**
 * Register a new user to the application with all the details below:
 {
 type of jason, date of registration, user Email address, user name, user password, records ({easy}, {medium}, {hard})
 }
 * if the user name and email doesnt exist already in the database, it will send a post request to the server.
 * @param path
 */
function send_registration_details(path){
    let userE, userN, userP, type, EasyBestRecord, MediumBestRecord, HardBestRecord
    type = 'registration'
    userE = document.getElementById('reg_email').value
    userN = document.getElementById('reg_name').value
    userP = document.getElementById('reg_pass').value
    EasyBestRecord = {clicks: 100000, time: 100000}
    MediumBestRecord = {clicks: 100000, time: 100000}
    HardBestRecord = {clicks: 100000, time: 100000}
    if(userN == '' || userE == '' || userP == ''){
        return
    }
        var newDate = new Date()
        var date = newDate.getMonth() + "-" + newDate.getDate() + "-" + newDate.getFullYear()
        let data = {"date": date, type, userE, userN, userP, EasyBestRecord:EasyBestRecord, MediumBestRecord:MediumBestRecord, HardBestRecord:HardBestRecord}
        postData(SERVER_URL + path, data).then(result => {
            // 200, 201, 202, 203 - OK
            // 400, 401, - Client problem
            // 404 - not found
            // 500 - Server problem
            if (result.status === 515){
                alert("This user name or Email address is already in use. You should change it.")
            }
            if (result.status === 500) {
                alert("Error accured.")
            }
        })
}

/**
 * post a request to the server
 * @param url - the post url
 * @param data
 * @returns {Promise<Response>}
 */
function postData(url, data) {
    const params = {
        method: "POST",
        mode: "cors", //  HTTP-header mechanism that allows a server to indicate any other origins (to load resources)
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }
    return fetch(url, params)
}

/**
 * Ask for a get request from the server
 * @param url – the get url
 * @returns {Promise<Response>}
 */
function getData(url) {
    const params = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": 'application/json'
        }
    }
    return fetch(url, params)
}



/**
 * --------------------------------------------------------------
 * the colorgame script
 * --------------------------------------------------------------
 */


/**
 * Starts the timer in the game mode (colorgame)
 */
function startGameTimer(){
    sec = 0
    interval = setInterval(function (){
        document.getElementById('timer').innerHTML = "your time: " + sec;
        sec ++
    }, 1000)
}

/**
 * start new color game by running these functions:
 * clearInterval,  startGameTimer, setUpModeButtons, setUpSquares, reset
 */
function play_game(){
    var text = document.createTextNode(user.userN + ", lets see your skills")
    document.getElementById("name_of_user").append(text);
    clearInterval(interval)
    startGameTimer()
    setUpModeButtons();
    setUpSquares();
    reset();
}

/**
 * In the colorgame page (the game mode), set up the mode buttons of the levels.
 */
function setUpModeButtons(){
    for(var i=0; i< modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            modeButtons[2].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent ==="Easy") numSquaers = 5;
            else if(this.textContent ==="Hard") numSquaers = 10;
            else numSquaers = 15;
            reset();
        });
    }
}


/**
 * In the colorgame page (the game mode), set up the color squares (15, 10 or 5 squares depending the difficulty)
 */
function setUpSquares(){
    for (var i = 0; i < squares.length; i++) {
        //add initial colors to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            clicks ++
            //compare color to pockedColor
            if(clickedColor === pickedColor){
                if(clicks + sec <= user.EasyBestRecord.clicks + user.EasyBestRecord.time && numSquaers == 5){
                    user.EasyBestRecord.clicks = clicks
                    user.EasyBestRecord.time = sec
                }else if(clicks + sec <= user.MediumBestRecord.clicks + user.MediumBestRecord.time && numSquaers == 10){
                    user.MediumBestRecord.clicks = clicks
                    user.MediumBestRecord.time = sec
                }else if(clicks + sec <= user.HardBestRecord.clicks + user.HardBestRecord.time && numSquaers == 15){
                    user.HardBestRecord.clicks = clicks
                    user.HardBestRecord.time = sec
                }
                updateUser()
                let data = {'type': 'new record', 'numberOfsquers':numSquaers, 'user': user.userN, 'record': clicks + sec, 'numOfClicks': clicks, 'time': sec, "date": user.date}
                updateRecord(data)
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = pickedColor;
                h2.style.backgroundColor = pickedColor;
                console.log(user)
            }else{
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

/**
 * When a new record is taken, the system will send a post request to update the user object in the database.
 */
function updateUser(){
    postData(SERVER_URL + '/updateUser', user).then(result => {
        console.log(result.status)
        console.log()
        if (result.status === 500) {
            alert("Error accured.")
        }
        console.log('update user number' + user._id)
    })
}

/**
 * When a new record is taken, the system will send a post request to add another object from a type of 'new record'.
 * @param data - {type, numberOfsquers, userN, record: clicks + sec, numOfClicks, time, date}
 */
function updateRecord(data){
    postData(SERVER_URL + '/record', data).then(result => {
        // 200, 201, 202, 203 - OK
        // 400, 401, - Client problem
        // 404 - not found
        // 500 - Server problem
        console.log(result.status)
        if (result.status === 500) {
            alert("Error accured.")
        }
    })
}

/**
 * Reset the game (new colors, timer, buttons).
 */
function reset(){
    sec = 0
    clicks = 0
    colors = generateRandomColors(numSquaers);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New colors";
    messageDisplay.textContent ="";
    for(var i=0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
    h2.style.backgroundColor = "steelblue";
}

/**
 * Color the squares according to the parameter it receives.
 * @param color - array of squares (colors)
 */
function changeColors(color){
    //loop throuh all squares
    for (var i = 0; i < squares.length; i++){
        //change each color match given color
        squares[i].style.backgroundColor = color;
    }
}

/**
 * random a color and returns it.
 * @returns {*}
 */
function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}


/**
 * Generate and push a random color to the array of the squares (it could be 5, 10 or 15 - according the difficulty).
 * @param num - a random RGB type of color
 * @returns {[]}
 */
function generateRandomColors(num){
    //make an array
    var arr =[];
    //repeat num times
    for(var i = 0; i<num; i++){
        arr.push(randomColor());
    }
    return arr;
}

/**
 * Create and return a random RGB type of color.
 * (0 - 255, 0 - 255, 0 - 255)
 * @returns {string}
 */
function randomColor(){
    var  r = Math.floor(Math.random() * 256);
    var  g = Math.floor(Math.random() * 256);
    var  b = Math.floor(Math.random() * 256);
    return "rgb("+ r +", " + g + ", " + b + ")";
}


