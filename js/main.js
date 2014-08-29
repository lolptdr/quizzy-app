var Quizzy = (function() {
	var $quizContainer,
			questionModels = [],
			quizData,
			questionUp = 0,
			score = 0,
			questionCount = 0,
			QuizController = {
				checkAnswer: function(input, questionModel) {
					if (input == questionModel.answer) {
						questionCount++;
						score++;
						 $('.submit-button').after($('<p><input type="button" value="Next Question" class="btn btn-md btn-primary next-question">'));
						// console.log('Correct! Current score: ' + score + ' out of ' + myFancyQuizData.questions.length);
						$('#quiz-app').append('Correct! Current score: ' + score + ' out of ' + myFancyQuizData.questions.length);
						$(".next-question").click(function() {
							$("#quiz-app").empty();
							nextQuestion('#quiz-app', myFancyQuizData);
						});
						if (questionCount === myFancyQuizData.questions.length) {
							alert('Game over. Your score is ' + score + ' out of ' + questionCount + '.');
							$("#quiz-app").empty();
						}
					} else {
						alert('Wrong. Try again.');
					}
				},
				checkScore: function(){
					return score;
				}
			};

	function QuestionModel(questionData) {
		this.question = questionData.question;
		this.answer   = questionData.answer;
		this.choices  = questionData.choices;
		this.name     = questionData.name;
		this.view = new QuestionView(this);
	}

	function ScoreModel(scoreData) {
		this.score 			= scoreData.correct;
		this.totalScore = myFancyQuizData.questions.length;
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

	function ScoreView(scoreModel) {
		var me = this;
		this.model = scoreModel;
		this.template = ('#template-score').html();

		var preppedTemplate = _.template(this.template);
		var compiledHtml = preppedTemplate({
			score: this.model.score
		});
		var $view = $(compiledHtml);

		$quizContainer.append($view);
	}

	function startApplication(selector, quizData) {
		$quizContainer = $(selector);

		$quizContainer.append('<h1 class="quiz-title">' + quizData.quizTitle + '</h1>');

		var model = new QuestionModel(quizData.questions[questionUp]);
		questionModels.push(model);	
	}

	function nextQuestion(selector, quizData) {
		$quizContainer = $(selector);

		$quizContainer.append('<h1 class="quiz-title">' + quizData.quizTitle + '</h1>');

		questionUp += 1;
		var model = QuestionModel(quizData.questions[questionUp]);
		questionModels.push(model);	
	}

	return {
		start: startApplication
	};
})();
