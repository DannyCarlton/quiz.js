
	var correct=0;
	var current=0;
	var Option=[];
	var answered=false;
	var finished=0;
	var Used=[];
	var _correct=0;
	var total=0;
	var bkg=2;
	var _question='question';
	var _answer='answer';
	var quiz_type='fte';
	var answershow='show';
	var _count=0;
	var question_title='Questions';
	var answer_title='Answers';
	var Quiz=[];
	var Question1='';
	var Question2='';
	var quiz_type='etf';

	window.onload = function() 
		{
		$("#quiz").html(`
	<div class="quiz-options">
		<div class="quiz-option quiz-option-left col-sm-12 col-md-4">
			<div class="btn-group btn-toggle"> 
				<button id="quiz-type" class="btn btn-xs btn-primary active foreign" onclick="toggleQuizType('fte')"><span id="question_title1">${question_title}</span> to <span id="answer_title1">${answer_title}</span></button>
				<button id="quiz-type" class="btn btn-xs btn-default english" onclick="toggleQuizType('etf')"><span id="answer_title2">${answer_title}</span> to <span id="question_title2">${question_title}</span></button>
	  		</div>
		</div>
		<div class="quiz-option quiz-option-right col-sm-12 col-md-5">
			Answers &nbsp; 
			<div class="btn-group btn-toggle"> 
				<button id="answers-on" class="btn btn-xs btn-primary active on" onclick="toggleShowAnswers('show')">SHOW</button>
				<button id="answers-off" class="btn btn-xs btn-default off" onclick="toggleShowAnswers('hide')">HIDE</button>
	  		</div>
		</div>
	</div>
	<div class="quiz" style="margin-top:40px">
		<div class="question-container"  id="question_container">
			<div id="score" class="score"></div>
			<div id="status" class="status col-md-12">
				Question <span id="current"></span> of <span id="todo"></span> <small>(<span id="done"></span> answered correct.)</small>
			</div>
			<div class="col-md-12">
				<div id="question_title"></div>
				<div id="question"></div>
				<div id="_option_0" class="show-answer" onclick="showAnswer();" style="display:none">
					<div id="select_0" class="select">
						<span class="_option" id="option_0">Show Answer
						</span>
					</div>
				</div>
				<div id="_option_1" class="option" onclick="answer(1);">
					<div id="select_1" class="select">
						<span class="_option" id="option_1"></span>
					</div>
				</div>
				<div id="_option_2" class="option" onclick="answer(2)">
					<div id="select_2" class="select">
						<span class="_option" id="option_2"></span>
					</div>
				</div>
				<div id="_option_3" class="option" onclick="answer(3)">
					<div id="select_3" class="select">
						<span class="_option" id="option_3"></span>
					</div>
				</div>
				<div id="_option_4" class="option" onclick="answer(4)">
					<div id="select_4" class="select">
						<span class="_option" id="option_4"></span>
					</div>
				</div>
				<div id="honor" style="display:none"></div>
			</div>
			<div style="clear:both"></div>
		</div>
		<div id="response" style="display:none"></div>
		<button id="next" type="button" class="btn btn-success" onclick="next()" style="display:none;font-size:27px;font-family:Lato">
			&nbsp; Next &#10132; &nbsp;
		</button>
	</div>`);


	$(document).ready(function() 
		{

		$("#next").hide();
		$("#todo").text(Quiz.length);
		$("#current").text(current+1);
		$("#done").text(finished);

		

		$('.btn-toggle').click(function() 
			{
			$(this).find('.btn').toggleClass('active');  
			
			if ($(this).find('.btn-primary').length>0) {
				$(this).find('.btn').toggleClass('btn-primary');
			}
			if ($(this).find('.btn-danger').length>0) {
				$(this).find('.btn').toggleClass('btn-danger');
			}
			if ($(this).find('.btn-success').length>0) {
				$(this).find('.btn').toggleClass('btn-success');
			}
			if ($(this).find('.btn-info').length>0) {
				$(this).find('.btn').toggleClass('btn-info');
			}
			
			$(this).find('.btn').toggleClass('btn-default');
			
			});

		});
		
		if(quizfile.indexOf('.csv')>0)
			{
			console.log('using csv, file: '+quizfile);
			$.ajax({
				type: "GET",
				url: quizfile,
				dataType: "text",
				success: function(data) {processCSV(data);}
				});
			}
		else if(quizfile.indexOf('.json'))
			{
			console.log('using json, file: '+quizfile);
			$.ajax({
				type: "GET",
				url:quizfile,
				dataType: "text",
				success: function(json) 
					{
					var data = JSON.parse(json);
					var keys = Object.keys(data);
					Question1 = keys[0];
					Question2 = data[keys[0]];
					$("#question_title").html(Question1);
					question_title=keys[1];
					answer_title=data[keys[1]];
					$("#answer_title1").text(answer_title);
					$("#answer_title2").text(answer_title);
					$("#question_title1").text(question_title);
					$("#question_title2").text(question_title);
	
					for (var i=2; i<keys.length; i++) 
						{
						var n = i-2;
						Quiz[n]=[];
						Quiz[n]['question']=keys[i];
						Quiz[n]['answer']=data[keys[i]];
						}
					_count=Quiz.length;
					$("#todo").text(Quiz.length);
					start();
					}
				});
			}
		}

	
	function start()
		{
		correct = Math.floor(Math.random() * 3)+1;			//	Assign a random number from 1 to 4 for the correct answer
		for(var i=1;i<=4;i++)								//	Loop 4 iterations
			{
			if(i==correct)									//	If this is the position assigned to the correct...
				{
				Option[i] = Quiz[current][_answer];		//		...set the word
				Used[i]=current;
				}
			else
				{
				var r = Math.floor(Math.random() * Quiz.length);	//	Grab a random word from the list
				while(Used.indexOf(r)!=-1)									//	if this position has already been filled...
					{  
					var r = Math.floor(Math.random() * Quiz.length);	//	...grab another
					}
				Option[i]=Quiz[r][_answer];				//	Assign this word to the looped position
				Used[i]=r;
				}
			}

		$("#question").html(Quiz[current][_question]);
		$("#option_1").html(Option[1]);
		$("#option_2").html(Option[2]);
		$("#option_3").html(Option[3]);
		$("#option_4").html(Option[4]);
		}
			
	function processCSV(allText) 
		{
		var allTextLines = allText.split(/\r\n|\n/);
		var headers = allTextLines[0].split(',');
		var lines = [];
		Question1=headers[0];
		Question2=headers[1];
		$("#question_title").html(Question1);
		var titles = allTextLines[1].split(',');
		question_title=titles[0];
		answer_title=titles[1];
		$("#answer_title1").text(answer_title);
		$("#answer_title2").text(answer_title);
		$("#question_title1").text(question_title);
		$("#question_title2").text(question_title);
	
		for (var i=2; i<allTextLines.length; i++) 
			{
			var n = i-2;
			var data = allTextLines[i].split(',');
			Quiz[n]=[];
			Quiz[n]['question']=data[0];
			Quiz[n]['answer']=data[1];
			}
		_count=Quiz.length;
		$("#todo").text(Quiz.length);
		start();
		}

	function answer(choice)
		{
		if(!answered)
			{
			answered=true;
			if(answershow=='show')
				{
				$("#response").show();
				$("#next").show();
				}
			if(choice==correct)
				{
				if(answershow=='show')
					{
					$("#response").html("<span class=\"correct\">Yes! That&rsquo;s correct.</span>");
					}
				finished++;
				_correct++;
				}
			else
				{
				if(answershow=='show')
					{
					$("#response").html("<span class=\"wrong\">Sorry. That&rsquo;s wrong.<br>The correct answer is <span class=\"correct\">&ldquo;"+Quiz[current][_answer]+"&rdquo;</span></span>");
					}
				var last=Quiz.length;
				Quiz[last]=Quiz[current];
				}
			}
		$("#todo").text(Quiz.length);
		$("#current").text(current+1);
		$("#done").text(finished);
		if(answershow=='hide')
			{
			$("#honor").css('display','none');
			next();
			}
		}

	function showAnswer()
		{
		$("#honor").css('display','');
		$("#honor").html('<div style="font-weight:bold;font-size:39px;text-shadow:2px 2px 7px #000;margin-top:20px;margin-bottom:30px">'+Quiz[current][_answer]+'</div>'+`
	<div id="_option_c" class="guess" onclick="answer(${correct});">
		<div id="select_c" class="select">
			<span class="_option" id="option_1">I guessed correct</span>
		</div>
	</div>
	<div id="_option_b" class="guess" onclick="answer(6)">
		<div id="select_b" class="select">
			<span class="_option" id="option_b">I guessed wrong</span>
		</div>
	</div>`);
		
		}

	function next()
		{
		current++;answered=false;var Option=[];var Used=[];total++;
		var f = _correct/Quiz.length;
		var grade = f * 100;
		var score = grade.toFixed(0);
		var r=0;
		$("#score").text(score+'%');
		if(current>=Quiz.length)
			{
			$("#question_container").html("<h2 class=\"finished\">Finished with a score of "+score+'%!</h2>');
			$("#response").show();
			if(next_file!='')
				{
				$("#response").html(`<a href="/${school}/${course}/${next_file}" class="next_lesson">Continue to ${next_title} &#10132;</a>`);
				}
			else
				{
				$("#response").html(`<a href="/${school}/${course}/" class="next_lesson">Return to select your next Course ${next_title} &#10132;</a>`);
				}
			$("#next").hide();
			}
		else
			{
			correct = Math.floor(Math.random() * 3)+1;
			for(var i=1;i<=4;i++)
				{
				if(i==correct)
					{
					Option[i] = Quiz[current][_answer];
					Used[i]=current;
					}
				else
					{
					r = Math.floor(Math.random() * Quiz.length);
					while(Used.indexOf(r)>-1 || r==current)
						{
						r = Math.floor(Math.random() * Quiz.length);
						}
					Option[i]=Quiz[r][_answer];
					Used[i]=r;
					}
				}
			$("#question").html(Quiz[current][_question]);
			if(answershow=='show')
				{
				$("#_option_0").css('display','none');
				$("#_option_1").css('display','');
				$("#_option_2").css('display','');
				$("#_option_3").css('display','');
				$("#_option_4").css('display','');
				$("#option_1").html(Option[1]);
				$("#option_2").html(Option[2]);
				$("#option_3").html(Option[3]);
				$("#option_4").html(Option[4]);
				}
			else
				{
				$("#select_0").css('width','100%');
				$("#select_0").css('float','none');
				$("#select_0").css('textAlign','center');
				$("#_option_0").css('display','block');
				$("#_option_1").css('display','none');
				$("#_option_2").css('display','none');
				$("#_option_3").css('display','none');
				$("#_option_4").css('display','none');
				}
			$("#next").hide();
			$("#response").hide();
			}
		}


	function toggleQuizType(type)
		{
		quiz_type=type;
		if(type=='fte')
			{
			_question='question';
			_answer='answer';
			$("#question_title").html(Question1);

			}
		else
			{
			_question='answer';
			_answer='question';
			$("#question_title").html(Question2);
			}
		correct=0;
		current=0;
		Option=[];
		answered=false;
		finished=0;
		Used=[];
		_correct=0;
		total=0;
		bkg=1;
		$("#todo").text(Quiz.length);
		$("#current").text(current+1);
		$("#done").text(finished);
		next();
		}

	function toggleShowAnswers(sh)
		{
		answershow=sh;
		if(sh=='show')
			{
			$("#honor").css('display','none');
			//$("#answers-on").attr("class","btn btn-xs active btn-primary on");
			//$("#answers-off").attr("class","btn btn-xs btn-default off");
			}
		// The following resets the quiz...
		correct=0;
		current=0;
		Option=[];
		answered=false;
		finished=0;
		Used=[];
		_correct=0;
		total=0;
		bkg=1;
		$("#todo").text(Quiz.length);
		$("#current").text(current+1);
		$("#done").text(finished);
		next();
		}
