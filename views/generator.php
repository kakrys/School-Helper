<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
$subjects = [
	9 => ['Math','Chemistry','Russian','English','Physics','Literature'],
	8 => ['Math','Chemistry','English','Literature'],
	7 => ['Math','Russian','English','Literature'],
	6 => ['Math' => [
		'Умножение и деление дробей', 'Отрицательные числа', 'Действия с отрицательными числами',
		'Пропорции', 'Симметрия', 'Решение линейных уравнений', 'Составление математической модели',
		'Проценты', 'Дробь от числа и число по дроби'
	],
		'Russian' => '']
];

$jsonData = json_encode($subjects);
?>
	<div class="container-fluid mt-1 main d-flex" style="margin-top: 1%; flex-grow: 1;">
		<div class="main-content d-flex" style="width: 100%; min-height: 100%; flex-grow: 1;">
			<div class="d-flex flex-column" style="width: 50%; height: 100%;">
				<div class="d-flex">
					<div class="btn-group" style="width: 33%; max-width: 33%;">
						<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="gradeDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
							Выберите класс
						</button>
						<ul class="dropdown-menu" aria-labelledby="gradeDropdown" style="overflow-y: auto; max-height: 10vh;">
						<?php foreach(array_keys($subjects) as $grade):?>
							<li><a class="dropdown-item" data-value="<?=$grade?>" onclick="changeGradeValue(this)"><?=$grade?> класс</a></li>
						<?php endforeach;?>
						</ul>
					</div>
					<div id="subjectDropdownContainer" class="btn-group invisible" style="width: 33%; max-width: 33%;">
						<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="subjectDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
							Выберите предмет
						</button>
						<ul class="dropdown-menu" aria-labelledby="subjectDropdown" style="overflow-y: auto; max-height: 10vh;"></ul>
					</div>
					<div id="topicDropdownContainer" class="btn-group invisible" style="width: 33%; max-width: 33%;">
						<button class="btn btn-secondary dropdown-toggle overflow-hidden" data-value="null" type="button" id="topicDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
							Выберите тему
						</button>
						<ul class="dropdown-menu" aria-labelledby="topicDropdown" style="overflow-y: auto; max-height: 10vh;"></ul>
					</div>
				</div>
				<p style="padding: 0;">
					Инструкция генерации заданий
				</p>
				<div id="instructionsContainer" class="border bg-light d-flex align-items-start" style="margin: 1% 1% 0 0; flex-grow: 0.6; padding: 1%; flex-wrap: wrap; overflow-y: auto; height: 40%;"><i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i></div>
				<div class="border bg-light d-flex" style="margin: 1% 1% 0 0; height:40%;">
					<div class="container">
						<div class="row row-cols-4">
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="addObjectToInstructions('text')" style="width: 100%; margin: 1%;">Текст</a>
							</div>
							<div class="col d-flex justify-content-center" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Отвечает за добавление текста" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="addObjectToInstructions('rand.Number')" style="width: 100%; margin: 1%;">Случайное число</a>
							</div>
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="deleteLastInstruction()" style="width: 100%; margin: 1%;">Удалить последний элемент</a>
							</div>
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="clearInstructions()" style="width: 100%; margin: 1%;">Очистить поле инструкций</a>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex justify-content-end" style="margin: 1% 1% 0 0;">
					<a class="btn btn-primary" role="button" href="#">Сохранить</a>
				</div>
			</div>
			<div class="d-flex flex-column" style="width: 50%;">
				<div class="border bg-light d-flex" style="margin: 1% 1% 0 0; flex-grow: 0.25;">
					Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!
				</div>
				<div style="margin: 1%;">
					<a class="btn btn-primary" style="margin 1%;" role="button" href="#">Сгенерировать предпросмотр!</a>
				</div>
				<div class="border bg-light d-flex" style="margin: 1% 1% 0 0; flex-grow: 0.75;">
					Нажмите кнопку генерации предпросмотра, чтобы посмотреть, как будет выглядеть ваше задание!
				</div>
			</div>
		</div>
	</div>

<script>
	const data = <?php echo $jsonData;?>;
	const menu2 = document.getElementById('subjectDropdownContainer');
	const menu3 = document.getElementById('topicDropdownContainer');
	const instructionsContainer = document.getElementById('instructionsContainer');
	let addedInstructions = 0;

	function updateMenu2(value){
		let newHtml = '';
		menu2.innerHTML = '';
		newHtml = '<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="subjectDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">Выберите предмет</button>';
		newHtml += '<ul class="dropdown-menu" aria-labelledby="subjectDropdown" style="overflow-y: auto; max-height: 10vh;">';
		for (let grade in data) {
			if (grade === value)
			{
				if (Array.isArray(data[grade]))
				{
					for (let subject of data[grade]) {
						newHtml += '<li><a class="dropdown-item" data-value="' + subject + '" onclick="changeSubjectValue(this)">' + subject +'</a></li>';
					}
				}
				else
				{
					for (let subject in data[grade]) {
						newHtml += '<li><a class="dropdown-item" data-value="' + subject + '" onclick="changeSubjectValue(this)">' + subject +'</a></li>';
					}
				}
				newHtml += '</ul>';
				menu2.innerHTML = newHtml;
				menu2.classList.remove("invisible");
				return;
			}
		}
		menu2.classList.add("invisible");
	}
	function updateMenu3(value){
		const grade = document.getElementById('gradeDropdown').getAttribute('data-value');
		let newHtml = '';
		menu3.innerHTML = '';
		newHtml = '<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="topicDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">Выберите тему</button>';
		newHtml += '<ul class="dropdown-menu" aria-labelledby="topicDropdown" style="overflow-y: auto; max-height: 10vh;">';
		if (Array.isArray(data[grade])) {
			for (let subject of data[grade]) {
				if (subject === value) {
					if(data[grade][subject] === undefined){
						menu3.classList.add("invisible");
						return;
					}
					if (Array.isArray(data[grade][subject]))
					{
						for (let topic of data[grade][subject]) {
							newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="changeTopicValue(this)">' + topic +'</a></li>';
						}
					}
					else {
						if(data[grade][subject] === '') {menu3.classList.add("invisible");return;}
						for (let topic in data[grade][subject]) {
							newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="changeTopicValue(this)">' + topic +'</a></li>';
						}
					}
					newHtml += '</ul>';
					menu3.innerHTML = newHtml;
					menu3.classList.remove("invisible");
					return;
				}
			}
		}
		else
		{
			for (let subject in data[grade]) {
				if (subject === value) {
					if(data[grade][subject] === undefined){
						menu3.classList.add("invisible");
						return;
					}
					if (Array.isArray(data[grade][subject]))
					{
						for (let topic of data[grade][subject]) {
							newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="changeTopicValue(this)">' + topic +'</a></li>';
						}
					}
					else {
						if(data[grade][subject] === '') {menu3.classList.add("invisible");return;}
						for (let topic in data[grade][subject]) {
							newHtml += '<li><a class="dropdown-item" data-value="' + topic + '" onclick="changeTopicValue(this)">' + topic +'</a></li>';
						}
					}
					newHtml += '</ul>';
					menu3.innerHTML = newHtml;
					menu3.classList.remove("invisible");
					return;
				}
			}
		}
		menu3.classList.add("invisible");
	}
	function changeGradeValue(element) {
		const $mainButton = document.getElementById('gradeDropdown');
		$mainButton.innerText = element.innerText;
		$mainButton.setAttribute('data-value',element.getAttribute('data-value'));
		menu3.classList.add("invisible");
		updateMenu2(element.getAttribute('data-value'));
	}
	function changeSubjectValue(element) {
		const $mainButton = document.getElementById('subjectDropdown');
		$mainButton.innerText = element.innerText;
		$mainButton.setAttribute('data-value',element.getAttribute('data-value'));
		updateMenu3(element.getAttribute('data-value'));
	}
	function changeTopicValue(element) {
		const $mainButton = document.getElementById('topicDropdown');
		$mainButton.innerText = element.innerText;
		$mainButton.setAttribute('data-value',element.getAttribute('data-value'));
	}
	function addObjectToInstructions(type){
		if (instructionsContainer.innerHTML === '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>')
		{
			addedInstructions = 1;
			instructionsContainer.innerHTML = '<span id="instruction" data-instruction="' + addedInstructions + '" class="border" style="padding: 1%; margin:1%;">' + type + '</span>';
		}
		else
		{
			addedInstructions += 1;
			instructionsContainer.innerHTML += '<span id="instruction" data-instruction="' + addedInstructions + '" class="border" style="padding: 1%; margin:1%;">' + type + '</span>';
		}
	}
	function clearInstructions(){
		instructionsContainer.innerHTML = '<i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i>';
	}
	function deleteLastInstruction(){
		let addedInstruction = document.querySelectorAll('#instruction');
		if (addedInstruction.length === 0) {return;}
		let presavedInstruction = 0;
		addedInstruction.forEach(element =>{
			if (element.getAttribute('data-instruction') > presavedInstruction)
			{
				presavedInstruction = element.getAttribute('data-instruction');
			}
		});
		let elements = document.querySelectorAll('[data-instruction="' + presavedInstruction + '"]');
		elements.forEach(function(element) {
			element.remove();
		});
		addedInstructions -= 1;
	}
</script>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>