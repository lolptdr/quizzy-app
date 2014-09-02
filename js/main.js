var Quizzy = (function() {
	var $quizContainer,
			questionModels = [],
			quizData,
			questionUp = 0,
			score = 0,
			highScore = 0,
			questionCount = 0,
			username = '',
			user = {
				username: highScore
			},
			QuizController = {
				checkAnswer: function(input, questionModel) {
					$('#quiz-app').append('<p><input type="button" value="Next Question" class="btn btn-md btn-primary next-question">');
					if (input == questionModel.answer) {
						// questionCount++;
						score++;
						localStorage[username] = score;
						$('#quiz-app').append('Correct! Current score: ' + score + ' out of ' + myFancyQuizData.questions.length);
					} else {
						$('#quiz-app').append('Wrong... ' + score + ' out of ' + myFancyQuizData.questions.length);
					}
					questionCount++;

					$('.next-question').click(function() {
						$('#quiz-app').empty();
						nextQuestion('#quiz-app', myFancyQuizData);
					});

					console.log("questionCount", questionCount);

					if (questionCount === myFancyQuizData.questions.length) {
						console.log("score: ", score);
						if (score === undefined) { score = 0; }
						// Confirm if current score is higher than player's high score
						if (score > localStorage[username]){
							localStorage[username] = score;
						}
						console.log("LS check", localStorage[username]);
						$('#quiz-app')
							.empty()
							.append('<h1>Game over. Your score is ' + score + ' out of ' + questionCount + '.</h1>')
							.append('<h2>' + username + '\'s high score: ' + localStorage[username] + '</h2>')
							// .append('<input type="button" name="reloadjs" value="Start New Game" onClick="LoadMyJs(\'main.js\')">');
							.append('<FORM><INPUT TYPE="button" class="btn btn-lg btn-info" onClick=location.reload() VALUE="Start Over"></FORM>');
					}
				}
			};

	// event listeners

	$(document).on('click', '.login-submit-button',function(e) {
		e.preventDefault();
		username = $('.login-submit').val();
		$('.login-submit').val(''); //clear the field with '' but unnecessary moving to next view
		console.log("explanation",username);
		if (!localStorage[username]) {
			localStorage[username] = score;
		}
		$('#quiz-app').empty();
		startApplication('#quiz-app', quizData);
	});

	function QuestionModel(questionData) {
		this.question = questionData.question;
		this.answer   = questionData.answer;
		this.choices  = questionData.choices;
		this.name     = questionData.name;
		this.view = new QuestionView(this);
	}

	function LoginView() {
		var me = this;
		this.template = $('#template-login').html();

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


	function startLogin(selector, myFancyQuizData) {
		quizData = myFancyQuizData;
		$quizContainer = $(selector);
		$quizContainer.append('<h1 class="quiz-title">' + quizData.quizTitle + '</h1>Presented by Joseph Tingsanchali');

		LoginView();
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

})();
