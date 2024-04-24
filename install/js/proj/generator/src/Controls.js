export class Controls
{
	static showTaskControls()
	{
		return `
		<div class="row row-cols-4" style="width: 100%;">
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.addInstruction('text', 'lightgreen')" style="width: 100%; margin: 1%;">Текст</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.addInstruction('rand.Number' , 'lightblue')" style="width: 100%; margin: 1%;">Случайное число</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.addInstruction('image' , 'lightcoral')" style="width: 100%; margin: 1%;">Картинка</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.addInstruction('rand.Text' , 'lightcyan')" style="width: 100%; margin: 1%;">Случайный текст</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.addInstruction('check' , 'lightsalmon')" style="width: 100%; margin: 1%;">Выбор варианта</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.addInstruction('customEx' , 'lightsalmon')" style="width: 100%; margin: 1%;">Выражение</a>
			</div>
		</div>
		<div class="row row-cols-4" style="width: 100%;">
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.deleteLastInstruction()" style="width: 100%; margin: 1%;">Удалить последний элемент</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.clearInstructions()" style="width: 100%; margin: 1%;">Очистить поле инструкций</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.changeExpressionType()" style="width: 100%; margin: 1%; background:lightcoral;">Смена режима</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.addInstruction('Answer' , 'lightsalmon')" style="width: 100%; margin: 1%;">Генерация ответа</a>
			</div>
		</div>`;
	}
	static showExerciseControls()
	{
		return `
		<div class="row row-cols-4" style="width: 100%;">
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Bracket', 'lightgreen')" style="width: 100%; margin: 1%;">Скобка</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('ABS' , 'lightblue')" style="width: 100%; margin: 1%;">Модуль</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('rand.Number' , 'lightcoral')" style="width: 100%; margin: 1%;">Число</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Div' , 'lightcyan')" style="width: 100%; margin: 1%;">Деление</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Multiply' , 'lightsalmon')" style="width: 100%; margin: 1%;">Умножение</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Minus' , 'skyblue')" style="width: 100%; margin: 1%;">Вычитание</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Plus' , 'lightpink')" style="width: 100%; margin: 1%;">Сложение</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Power' , 'lightseagreen')" style="width: 100%; margin: 1%;">Возведение в степень</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Root' , 'lightcyan')" style="width: 100%; margin: 1%;">Корень</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Equal' , 'olivedrab')" style="width: 100%; margin: 1%;">Равенство</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Rand.Operation' , 'lightslategray')" style="width: 100%; margin: 1%;">Случайный оператор</a>
			</div>
		</div>
		<div class="row row-cols-4" style="width: 100%;">
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.deleteLastInstruction()" style="width: 100%; margin: 1%;">Удалить элемент слева</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.clearInstructions()" style="width: 100%; margin: 1%;">Очистить поле инструкций</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.changeExpressionType()" style="width: 100%; margin: 1%; background:lightcoral;">Смена режима</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.addInstruction('Answer' , 'lightsalmon')" style="width: 100%; margin: 1%;">Генерация ответа</a>
			</div>
		</div>
		<div class="row row-cols-4" style="width: 100%;">
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.changeViewType()" style="width: 100%; margin: 1%; background:lightsteelblue;">Переключить представление</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.movePointer('left')" style="width: 100%; margin: 1%; background:lightsteelblue;">←</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.movePointer('right')" style="width: 100%; margin: 1%; background:lightsteelblue;">→</a>
			</div>
		</div>`;
	}
	static showCurrentExerciseControls(id)
	{
		return `
		<div class="row row-cols-4" style="width: 100%;">
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Bracket', 'lightgreen')" style="width: 100%; margin: 1%;">Скобка</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('ABS' , 'lightblue')" style="width: 100%; margin: 1%;">Модуль</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('rand.Number' , 'lightcoral')" style="width: 100%; margin: 1%;">Число</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Div' , 'lightcyan')" style="width: 100%; margin: 1%;">Деление</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Multiply' , 'lightsalmon')" style="width: 100%; margin: 1%;">Умножение</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Minus' , 'skyblue')" style="width: 100%; margin: 1%;">Вычитание</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Plus' , 'lightpink')" style="width: 100%; margin: 1%;">Сложение</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Power' , 'lightseagreen')" style="width: 100%; margin: 1%;">Возведение в степень</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Root' , 'lightcyan')" style="width: 100%; margin: 1%;">Корень</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Equal' , 'olivedrab')" style="width: 100%; margin: 1%;">Равенство</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a id="draggableElement" class="btn btn-secondary" onclick="generator.addInstruction('Rand.Operation' , 'lightslategray')" style="width: 100%; margin: 1%;">Случайный оператор</a>
			</div>
		</div>
		<div class="row row-cols-4" style="width: 100%;">
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.deleteLastInstruction(${id})" style="width: 100%; margin: 1%;">Удалить элемент слева</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.clearInstructions(${id})" style="width: 100%; margin: 1%;">Очистить поле инструкций</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.backToGenerator()" style="width: 100%; margin: 1%; background:lightcoral;">Вернуться</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.addInstruction('Answer' , 'lightsalmon')" style="width: 100%; margin: 1%;">Генерация ответа</a>
			</div>
		</div>
		<div class="row row-cols-4" style="width: 100%;">
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.changeViewType()" style="width: 100%; margin: 1%; background:lightsteelblue;">Переключить представление</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.movePointer('left')" style="width: 100%; margin: 1%; background:lightsteelblue;">←</a>
			</div>
			<div class="col d-flex justify-content-center" style="padding: 1%;">
				<a class="btn btn-secondary" onclick="generator.movePointer('right')" style="width: 100%; margin: 1%; background:lightsteelblue;">→</a>
			</div>
		</div>`;
	}
}