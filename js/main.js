var Quizzy = (function() {
	var $quizContainer,
			questionModels = [],
			quizData,
			questionUp = 0,
			score = 0,
			highScore = 0,
			questionCount = 0,
			username = "Joe",
			user = {
				username: highScore
			},
			QuizController = {
				checkAnswer: function(input, questionModel) {
					$('#quiz-app')
						.append('<p><input type="button" value="Next Question" class="btn btn-md btn-primary next-question">')
						.append('<FORM><INPUT TYPE="button" class="btn btn-lg btn-info" onClick="history.go(0)" VALUE="Start Over"></FORM>');
					if (input == questionModel.answer) {
						// questionCount++;
						score++;
							$('#quiz-app')
								.append('Correct! Current score: ' + score + ' out of ' + myFancyQuizData.questions.length);
					} else {
						$('#quiz-app')
							.append('Wrong... ' + score + ' out of ' + myFancyQuizData.questions.length);
					}
					questionCount++;
					$('.next-question').click(function() {
						$('#quiz-app').empty();
						nextQuestion('#quiz-app', myFancyQuizData);
					});
					console.log("questionCount", questionCount);
					if (questionCount === myFancyQuizData.questions.length) {
						if (score > localStorage[username]){
							localStorage[username]=score;
						}
						console.log("LS check", localStorage[username]);
						$('#quiz-app')
							.empty()
							.append('<h1>Game over. Your score is ' + score + ' out of ' + questionCount + '.</h1>')
							.append('<h2>' + username + '\'s high score: ' + localStorage[username] + '</h2>')
							.append('<FORM><INPUT TYPE="button" class="btn btn-xs" onClick="history.go(0)" VALUE="Start Over"></FORM>');
					}
				},
				lookupUser: function(){
					$('#quiz-app')
						.empty()
						.append('<h1 class="quiz-title">' + myFancyQuizData.quizTitle + '</h1>')
						.append('<h2 class="user-score">' + username + '\'s high score: ' + highScore +'</h2>');
				}
			};

	function QuestionModel(questionData) {
		this.question = questionData.question;
		this.answer   = questionData.answer;
		this.choices  = questionData.choices;
		this.name     = questionData.name;
		this.view = new QuestionView(this);
	}

	// function ScoreModel(scoreData) {
	// 	this.score 			= scoreData.correct;
	// 	this.totalScore = myFancyQuizData.questions.length;
	// }

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

	function LoginModel(loginData) {
		this.username = username
	}

	function LoginView(loginModel) {
		var me = this;
		this.model = loginModel;
		this.template = $('template-login').html();

		var preppedTemplate = _.template(this.template);
		var compiledHtml = preppedTemplate({
			// username: 
		});

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
		start: startApplication
	};

	function LoadMyJs(scriptName) {
   var docHeadObj = document.getElementsByTagName("head")[0];
   var dynamicScript = document.createElement("script");
   dynamicScript.type = "text/javascript";
   dynamicScript.src = scriptName;
   docHeadObj.appendChild(newScript);
	}

})();
