var Quizzy = (function(){	
	var $quizContainer;
	var quizData;


	var QuizController = {
		checkAnswer : function(input, questionModel) {
			if (input == questionModel.answer){
				alert('You got it!!! *cheering*');
			} else {
				alert('Try again');
			}
		}
	};

	function QuestionModel(questionData) {
		this.question = questionData.question;
		this.answer 	= questionData.answer;
		this.view = new QuestionView(this);
	}

	function QuestionView(questionModel) {
		var me = this;
		this.model = questionModel;
		this.template = $('#template-question').html();

		var preppedTemplate = _.template(this.template);
		var compiledHtml = preppedTemplate({
			question: this.model.question
		});

		var $view = $(compiledHtml);
		$view.find('input[type="submit"]').on('click', function() {
			QuizController.checkAnswer(
				$view.find('input[type="text"]').val(),
				me.model
			);
		});

		$quizContainer.append($view);
	}


	function startApplication(selector, quizData) {
		$quizContainer = $(selector);

		$quizContainer.append('<h1>' + quizData.quizTitle + '</h1>');

		var questionModels = [];

		for (var i in quizData.questions) {
			var model = new QuestionModel(quizData.questions[i]);
			questionModels.push(model);
		}
	}

	return {
		start:  startApplication
	};
})();
