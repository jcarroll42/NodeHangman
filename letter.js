var Letter = function(letter) {
	//make a charac property and set it to what you think makes second_instructor_demonstration
	this.charac = letter;

	//make an appear property and set it to what makes sense
	this.appear = false;

	//make a letterRender property and set it to a function that does what you think makes sense
	this.letterRender = function(){
		if (this.appear){
			return this.charac;
		}
		else{
			var emptyLet = " _ ";
			return emptyLet;
		}
	}
};

//export the Letter constructor here
module.exports = Letter;