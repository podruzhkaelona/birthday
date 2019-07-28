var hint2 = `
<div >
    <img class="img-border" src="img\\hint2.png"></img>
</div>
`;

var hint6 = `
<div >
    <img class="img-border" style="max-height: 300px" src="img\\hint6.jpg"></img>
</div>
`;

var current = -1;
var questions = [
    { "text": "Первый вопрос", "img": "img\\quest1.jpg", "answer": "Elon Musk", "hint": "Этот ребус слишком простой, чтобы здесь была подсказка!" },
    { "text": "Второй вопрос", "img": "img\\quest2.jpg", "answer": "Артемий Лебедев", "hint": hint2 },
    { "text": "Третий вопрос", "img": "img\\quest3.jpg", "answer": "Кодзима гений", "hint": "Закупился в столичном секонде Бурятии - ждем в свежих обновках на линейке" },
    { "text": "Четвертый вопрос", "img": "img\\quest4.jpg", "answer": "Post Bar", "hint": "Ты любишь его" },
    { "text": "Пятый вопрос", "img": "img\\quest5.jpg", "answer": "New Order", "hint": "Yes, I heard you calling" },
    { "text": "Шестой вопрос", "img": "img\\quest6.jpg", "answer": "Скриптонит", "hint": hint6 },
]

var congrats = `
<div class="background">
    <div id="congrats" class="start-container">
        <div class="centered">
            <div class="rainbow">
                <span class="text">С днем рождения!</span>
            </div>
            <div>
                <img src="img\\final.jpg" style="max-height: 300px"></img>
            </div>
        </div>	
    </div>
</div>
`;

function getTemplate(index) {
    return `
	<div class="background" id="question${index}">
        <div class="container">
			<div class="centered">
				<div class="blues">
					<span class="text">${questions[index].text}</text>
				</div>
				<div>
					<img class="img-border" src="${questions[index].img}" style="max-width: 80%; max-height: 300px"></img>
				</div>
				<div>
					<span class="superhero">
						<span class="text">Ответ:</span>
					</span>
					<input type="text" id="answer${index}">
				</div>
				<div>
					<button id="submit${index}">Дальше</button>
					<button id="hint${index}">Подсказка</button>
				</div>
			</div>
		</div>
    </div>`;
}

function appendQuestion() {
    var template = getTemplate(current);
    $("body").append(template);
}

function nextQuestion(prevButtonSelector, prevHintButtonSelector) {
    $(prevButtonSelector).prop("disabled", true);
    
    if (prevHintButtonSelector) {
        $(prevHintButtonSelector).prop("disabled", true);
    }

    current++;
    
    if (current >= questions.length) {
        $("body").append(congrats);
        $('html, body').animate({ scrollTop: $("#congrats").offset().top }, 600);
        return;
    }

    appendQuestion();
    var question = $("#question" + current);
    var destination = question.offset().top;
    $('html, body').animate({ scrollTop: destination }, 600);

    $(`#hint${current}`).on("click", function(e) {
        $("#popup_content").html(questions[current].hint);
        $("#parent_popup_click1").css("display", "block");
    });

	var buttonSelector = `#submit${current}`;
    $(buttonSelector).on("click", function(e) {
        var answer = $(`#answer${current}`).val().toLowerCase();
		var expectedAnswer = questions[current].answer.toLowerCase();
        if (answer == expectedAnswer) {
            nextQuestion(buttonSelector, `#hint${current}`);
        } else {
            $("#popup_content").html("Смешной рот, но попробуй еще раз");
            $("#parent_popup_click1").css("display", "block");
        }
    });
}

$("#begin").on("click", function () {
    nextQuestion("#begin");
})
