var myFancyQuizData = {
	quizTitle: "rEvErSe JeOpArDy v2.0",
	questions: [
		{
			question: "What decade was J.R.R. Tolkien's \"Lord of the Rings\" triology first published?",
			answer: "1950s",
			name: "literature",
			choices: [
				"1980s",
				"1950s",
				"1910s",
				"1890s"
			]
		},
		{
			question: "Which command will remove recursively and forcefully all folders of root?",
			answer: "rm -rf /",
			name: "programming",
			choices: [
				"rm -rf",
				"rm -rf \/",
				"rm",
				"rm -f \/"
			]
		},
		{
			question: "What is the official national language of Qatar?",
			name: "language",
			answer: "Arabic",
			choices: [
				"Arabic",
				"Farsi",
				"Urdu",
				"Pashto"
			]
		},
		{
			question: "Which actor bought the first Hummer made for civilian use?",
			name: "language",
			answer: "Arnold Schwarzenegger",
			choices: [
				"Brad Pitt",
				"Tom Cruise",
				"Arnold Schwarzenegger",
				"Shah Rukh Khan"
			]
		},
		{
			question: "Which Western nation underwent the Quiet Revolution in the 1960s?",
			name: "history",
			answer: "Canada",
			choices: [
				"USA",
				"Guatemala",
				"Puerto Rico",
				"Canada"
			]
		},
		{
			question: "What is standard tuning of a violin (low to high)?",
			name: "music",
			answer: "G D A E",
			choices: [
				"E A D G",
				"A D G B",
				"G D A E",
				"C G D A"
			]
		},
		{
			question: "Who murdered Robert F. Kennedy in 1968?",
			name: "history",
			answer: "Sirhan Sirhan",
			choices: [
				"Sirhan Sirhan",
				"Lee Harvey Oswald",
				"Nathuram Godse",
				"James Earl Ray"
			]
		},
		{
			question: "In golf terminology, what is referred to as an \"eagle\"?",
			name: "sports",
			answer: "2 under par",
			choices: [
				"1 under par",
				"2 under par",
				"par",
				"+1 over par"
			]
		},
		{
			question: "Which is the longest river in Australia?",
			name: "geography",
			answer: "Murray River",
			choices: [
				"Murrumbidgee River",
				"Lachlan River",
				"Murray River",
				"Darling River"
			]
		},
		{
			question: "What percentage of the cucumber is water?",
			name: "science",
			answer: "96%",
			choices: [
				"80%",
				"96%",
				"60%",
				"75%"
			]
		}
	]
};

Quizzy.start('#quiz-app', myFancyQuizData);
