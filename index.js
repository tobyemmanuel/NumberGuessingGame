const inquirer = require("inquirer");

class guessingGame {
    constructor() {
        //set init variables
        this.username = ''
        this.userpoint = 0
        this.userLevel = 1
        this.freshStart = true
    }

    chooseConfirmMsg() {
        const confirmMsg = ['Genius', 'You are Smart', 'Excellent', 'Fantastic', 'You have a high IQ'] //congrats messages array
        const randomizer = Math.floor(Math.random() * confirmMsg.length) //congrats message output
        return confirmMsg[randomizer] //return congrats message
    }

    //Start game with welcome and instruction messages
    startGame() {
        console.log(``)
        console.log(`### Welcome to the Number Guessing Game by sefanruru.`)
        console.log(`Instructions: Please note that you have only one guess.
                You can type in "xcancelx" at anytime to end the game.`)
    }

    //Start the game and ensure username is logged before loading game component
    async gameDLLCont() {
        this.startGame() //start game with messages
        let userN = ''
        this.getUserName().then(res => { //get username
            if (this.username == 0) {
                userN = res;
                if (userN == "xcancelx") { //check if user wants to cancel game
                    console.log(`Game Cancelled!`)
                    this.endGame() // close the game
                }
                if (userN !== false) this.username = userN //assign get username to constructor variable
            }
            this.gameDLL() //load game component
        })


    }

    //game component
    gameDLL() {
        if (this.freshStart == true) { //log messages for first time user
            console.log(`What a nice name! I will call you ${this.username}.`)
            console.log(`Let's get started, ${this.username}!`)
            this.freshStart = false //remove freshstart messages from reappearing
        } else {
            console.log(`Hey ${this.username}, Let's keep it rolling!`)
        }
        console.log(`>>> Level ${this.userLevel}`) //indicate user level
        let maxNumber = ++this.userLevel //set new guessing number maximum and update level for next round
        let randomNumber = this.getRandomNumber(this.userLevel) //get random number
        inquirer
            .prompt([{
                name: 'value',
                message: `Guess a number (Hint 1- ${maxNumber} ) ?`
            }, ])
            .then(guess => {
                if (guess.value == "xcancelx") { //check if user wants to cancel game
                    console.log(`Game Cancelled! You ended with ${this.userpoint} point(s).`)
                    this.endGame() //end the game
                } else if (guess.value == randomNumber) { //check if user is correct
                    ++this.userpoint;
                    let chosenConfirmMsg = this.chooseConfirmMsg(); //get congrats message
                    console.log(`${chosenConfirmMsg}! Good Job ${this.username}!`)
                    console.log(`The correct answer is ${randomNumber}. You now have ${this.userpoint} point(s).`)
                    console.log(`Loading next level...`)
                    this.gameDLL() //move to next level
                } else {
                    console.log(`Oops! That answer is incorrect.`)
                    console.log(`Game over. You ended with ${this.userpoint} point(s). Please try again.`)
                    console.log(`Restarting game...`)
                    //restore initial variables
                    this.userpoint = 0
                    this.userLevel = 1
                    this.gameDLL() //move to first level
                }
            });
    }


    async getUserName() { //get username by prompt
        return new Promise((resolve, reject) => {
            let output = false;
            inquirer
                .prompt([{
                    name: 'username',
                    message: `Hello! How can I address you :) ?`
                }, ])
                .then(user => {
                    if (user.username.length > 0) {
                        output = user.username
                        resolve(output)
                    }
                });
        })
    }

    //randomly pick a number with the maximum ceiling
    getRandomNumber(level) {
        return Math.round(Math.random() * (level - 1)) + 1;
    }

    endGame() { //quit the game
        process.exit(0);
    }

    errorLog(errorLog) { //error handler
        console.log(errorLog)
        process.exit(0);
    }
}

const guessingNumber = new guessingGame() //init game class
guessingNumber.gameDLLCont() //launch game