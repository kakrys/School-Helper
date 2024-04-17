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
$this->addExternalJS("/local/components/proj/generator/templates/js/mainScript.js");
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
				<div id="instructionsContainer" class="border bg-light d-flex align-items-start" style="margin: 1% 1% 0 0; flex-grow: 0.6; padding: 1%; flex-wrap: wrap; overflow-y: auto; height: 40%; align-content: flex-start;"><i>Пока тут пусто. Выберите элементы из управления ниже, чтобы начать писать инструкцию!</i></div>
				<div class="border bg-light d-flex" style="margin: 1% 1% 0 0; height:40%;">
					<div class="container">
						<div class="row row-cols-4">
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="addObjectToInstructions('text', 'lightgreen')" style="width: 100%; margin: 1%;">Текст</a>
							</div>
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="addObjectToInstructions('rand.Number' , 'lightblue')" style="width: 100%; margin: 1%;">Случайное число</a>
							</div>
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="deleteLastInstruction()" style="width: 100%; margin: 1%;">Удалить последний элемент</a>
							</div>
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="clearInstructions()" style="width: 100%; margin: 1%;">Очистить поле инструкций</a>
							</div>
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="addObjectToInstructions('image' , 'lightcoral')" style="width: 100%; margin: 1%;">Картинка</a>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex justify-content-end" style="margin: 1% 1% 0 0;">
					<a class="btn btn-primary" role="button" href="#">Сохранить</a>
				</div>
			</div>
			<div class="d-flex flex-column" style="width: 50%;">
				<div id="parametersContainer" class="border bg-light d-flex flex-column align-items-start" style="margin: 1% 1% 0 0; flex-grow: 0.25; padding: 1%; flex-wrap: wrap; overflow-y: auto; align-content: flex-start;"><i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i></div>
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
	Proj.ready(function () {
		window.generator = new Proj.Independent.generator();
	})
</script>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>