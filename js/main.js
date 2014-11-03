var Quizzy = (function() {
	var $quizContainer,
			questionModels = [],
			quizData,
			questionUp = 0,
			score = 0,
			correct = 0,
			highScore = 0,
			questionCount = 1,
			totalAnswered = 0,
			username = '',
			user = {
				username: highScore
			};

			QuizController = {
				checkAnswer: function(input, questionModel) {
					$('#quiz-app').append('<p><input type="button" value="Next Question" class="btn btn-md btn-primary next-question">');
					if (input == questionModel.answer) {
						console.log("input", input);
						// Assign correct answers
						correct = parseInt(localStorage[questionCount]) + 1;
						localStorage[questionCount] = correct;
						// Assign total answered
						totalAnswered = parseInt(localStorage["Total" + questionCount]) + 1;
						localStorage["Total" + questionCount] = totalAnswered;
						// Assign current score
						score++;
						localStorage[username] = score;

						$('#quiz-app')
							.append('Correct! Current score: ' + score + ' out of ' + myFancyQuizData.questions.length)
							.append('<br>Question #' + questionCount + ' answered correctly of all users: ' + (correct/totalAnswered * 100).toFixed(2) + '%')
							.append('<br>Total times this question has been answered: ' + totalAnswered);
					} else {
						// No need to record incorrect/wrong count
						// Assign correct answers (notice not increment for wrong answer!)
						correct = parseInt(localStorage[questionCount]);
						// Assign total answered (in case they miss the first question)
						totalAnswered = parseInt(localStorage["Total" + questionCount]) + 1;
						localStorage["Total" + questionCount] = totalAnswered;

						$('#quiz-app')
							.append('Wrong... Current Score: ' + score + ' out of ' + myFancyQuizData.questions.length)
							.append('<br>Question #' + questionCount + ' answered correctly of all users: ' + (correct/totalAnswered * 100).toFixed(2) + '%')
							.append('<br>Total times this question has been answered: ' + totalAnswered);
					}
					questionCount++;

					$('.next-question').click(function() {
						$('#quiz-app').empty();
						nextQuestion('#quiz-app', myFancyQuizData);
					});

					if (questionCount === myFancyQuizData.questions.length) {
						console.log("score: ", score);
						if (score === undefined) { score = 0; }
						// Confirm if current score is higher than player's high score
						if (score > localStorage[username]){
							localStorage[username] = score;
						}

						$('#quiz-app')
							.empty()
							.append('<h1>Game over. Your score is ' + score + ' out of ' + questionCount + '.</h1>')
							.append('<h2>' + username + '\'s high score: ' + localStorage[username] + '</h2>')
							// .append('<input type="button" name="reloadjs" value="Start New Game" onClick="LoadMyJs(\'main.js\')">');
							.append('<FORM><INPUT TYPE="button" class="btn btn-lg btn-info" onClick=location.reload() VALUE="Start Over"></FORM>');
					}
				}
			};

	// Event Listeners

	$(document).on('click', '.login-submit-button',function(e) {
		e.preventDefault();
		username = $('.login-submit').val();
		$('.login-submit').val(''); //clear the field with empty string but unnecessary since moving to next view
		if (!localStorage[username]) {
			localStorage[username] = score;
		}
		$('#quiz-app').empty();
		startApplication('#quiz-app', quizData);
	});

	$(document).on('click', '.custom-question', function(e) {
		e.preventDefault();
		$('#quiz-app').empty();
		createQuestion('#quiz-app', quizData);
	});

	// Models

	function QuestionModel(questionData) {
		this.question = questionData.question;
		this.answer   = questionData.answer;
		this.choices  = questionData.choices;
		this.name     = questionData.name;
		this.view = new QuestionView(this);
	}

	// Views

	function LoginView() {
		var me = this;
		this.template = $('#template-login').html();

		var preppedTemplate = _.template(this.template);
		var compiledHtml = preppedTemplate();

		$quizContainer.append(compiledHtml);
	}

	function CreateQuestionView() {
		var me = this;
		this.template = $('#template-create-question').html();

		var preppedTemplate = _.template(this.template);
		var compiledHtml = preppedTemplate();

		$quizContainer.append(compiledHtml);
	}

	function QuestionView(questionModel) {
		var me     = this;
		this.model = questionModel;
		this.template = $('#template-question').html();

		var preppedTemplate = _.template(this.template);
		var compiledHtml = preppedTemplate({
			question: this.model.question,
			choices: this.model.choices,
			name: this.model.name
		});
		var $view = $(compiledHtml);
		$view.find('button[type="submit"]').on('click', function() {
			QuizController.checkAnswer(
				$view.find('input[type="radio"]:checked').val(),
				me.model
			);
		});

		$quizContainer.append($view);
	}

	// Controllers and Initiators
	// This function kicks off the quiz game
	function startLogin(selector, myFancyQuizData) {
		quizData = myFancyQuizData;
		$quizContainer = $(selector);
		$quizContainer.append('<h1 class="quiz-title">' + quizData.quizTitle + '</h1>Presented by Joseph Tingsanchali');

		LoginView();

		// Prime localStorage for each questions' correct and totalAnswered variables if not created yet
		if (!localStorage[1]) {
			for( var i = 1; i < quizData.questions.length; i++) {
				localStorage[i] = 0;						// Initiate values for correct answers
				localStorage["Total" + i] = 0;	// Initiate values for total answers = correct + wrong
			}
		}
	}

	function startApplication(selector, quizData) {
		$quizContainer = $(selector);
		var playerHighScore = localStorage[username];

		$quizContainer.append('<h1 class="quiz-title">' + quizData.quizTitle + '</h1>')
			.append('<h2 class="user-score">' + username + '\'s high score: ' + playerHighScore +'</h2>');

		var model = new QuestionModel(quizData.questions[questionUp]);
		questionModels.push(model);

	}

	function nextQuestion(selector, quizData) {
		$quizContainer = $(selector);
		var playerHighScore = localStorage[username];

		$quizContainer.append('<h1 class="quiz-title">' + quizData.quizTitle + '</h1>')
			.append('<h2 class="user-score">' + username + '\'s high score: ' + playerHighScore +'</h2>');

		questionUp += 1;
		var model = QuestionModel(quizData.questions[questionUp]);
		questionModels.push(model);	
	}

	return {
		start: startLogin
	};

	function createQuestion(selector, quizData){
		$quizContainer = $(selector);

		$quizContainer.append('<h1 class="quiz-title">' + quizData.quizTitle + '</h1>')
			.append();

			CreateQuestionView();
	}

})();
