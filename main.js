var Word = require('./Word');
var words = require('./game');
var promptly = require('promptly');

game = {
	wordBank : words.game.wordChoices,
	wordsWon : 0,
	guessesRemaining : 10, //per word
	currentWrd : null, //the word object
	alreadyGuessed: [],
	validator: function (value){
		if(value.length != 1){
			throw new Error("Guess must be one letter")
		}
		if (game.alreadyGuessed.indexOf(value) != -1){
			throw new Error("Letter already guessed. Try a different letter");
		}
		if (/^[a-zA-Z]+$/.test(value) === false){
			throw new Error("Guess must be a letter. Try again.");
		}

		return value;
	},
	startGame : function (wrd){
		//make sure the user has 10 guesses 
		this.resetGuessesRemaining();

		//get a random word from the array
		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);

		//populate currentWrd (made from Word constructor function) object with letters
		this.currentWrd.getLets(); 

		console.log("For testing/grading purposes here's the word: " + this.currentWrd.word);

		this.keepPromptingUser();

	}, 
	resetGuessesRemaining : function(){
		this.guessRemaining = 10;
	},
	keepPromptingUser : function(){
		var self = this;

		promptly.prompt('guess a letter: ', {validator: self.validator}, function(err, result) {
			result = result.toLowerCase();
		    self.alreadyGuessed.push(result);
	
		    console.log('The letter you guessed is: ' + result);

		    //this checks if the letter was found and if it is then it sets that specific letter in the word to be found
		    var findHowManyOfUserGuess = self.currentWrd.checkIfLetterFound(result);

		    //if the user guessed incorrectly minus the number of guesses they have left
		    if (findHowManyOfUserGuess == 0){
		    	console.log('You guessed wrong!');
		    	self.guessesRemaining--;
		    }else{
		    	console.log('You guessed right!');

		    	//check if you win only when you are right
	    		if(self.currentWrd.didWeFindTheWord()){
			    	console.log('You Won!!! The word was', self.currentWrd.word);
			    	return; //end game
			    }
		    }
		    
		    console.log('Guesses remaining: ', self.guessesRemaining);
		    console.log(self.currentWrd.wordRender());
		    console.log('here are the letters you guessed already: ' + self.alreadyGuessed.join(", "));

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	console.log('Game over bro. It was:', self.currentWrd.word);
		    	console.log('Get with the program man');
		    }else{
		    	console.log(self.currentWrd.wordRender());
		    }
		});
	}


};

game.startGame();