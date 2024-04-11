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
	<div class="container-fluid mt-1 main" style="margin-top: 1%;flex-grow: 1;">
		<div class="main-content d-flex" style="width: 100%; min-height: 100%;">
			<div class="d-flex flex-column" style="width: 50%;">
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
						<ul class="dropdown-menu" aria-labelledby="subjectDropdown" style="overflow-y: auto; max-height: 10vh;">
							JS
						</ul>
					</div>
					<div id="topicDropdownContainer" class="btn-group invisible" style="width: 33%; max-width: 33%;">
						<button class="btn btn-secondary dropdown-toggle overflow-hidden" data-value="null" type="button" id="topicDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
							Выберите тему
						</button>
						<ul class="dropdown-menu" aria-labelledby="topicDropdown" style="overflow-y: auto; max-height: 10vh;">
							JS
						</ul>
					</div>
				</div>
				<div>
					Окно условий генерации
				</div>
				<div>
					Таблица с кнопками генератора
				</div>
			</div>
			<div class="d-flex flex-column" style="width: 50%;">
				Правое окно
				<div>
					Окно с настройками величин генератора
				</div>
				<div>
					Окно предпросмотра
				</div>
			</div>
		</div>
	</div>

<script>
	const data = <?php echo $jsonData;?>;
	const menu2 = document.getElementById('subjectDropdownContainer');
	const menu3 = document.getElementById('topicDropdownContainer');

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
</script>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>