<?php
/**
 * @var CMain $APPLICATION
 */

Bitrix\Main\UI\Extension::load('proj.generator');
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");

$jsonData = json_encode($arResult['CST_DATA']);
?>
	<div class="container-fluid mt-1 main d-flex" style="margin-top: 1%; flex-grow: 1;">
		<div id="mainWorkingArea" class="main-content d-flex" style="width: 100%; min-height: 100%; flex-grow: 1;">
			<div id="mainGeneratorWindow" class="d-flex flex-column" style="width: 50%; height: 100%;">
				<div id="topMenu" class="d-flex">
					<div class="btn-group" style="width: 33%; max-width: 33%;">
						<button class="btn btn-secondary dropdown-toggle" data-value="null" type="button" id="gradeDropdown" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
							Выберите класс
						</button>
						<ul class="dropdown-menu" aria-labelledby="gradeDropdown" style="overflow-y: auto; max-height: 10vh;">
						<?php foreach(array_keys($arResult['CST_DATA']) as $grade):?>
							<li><a class="dropdown-item" data-value="<?=$grade?>" onclick="topMenu.changeGradeValue(this)"><?=$grade?> класс</a></li>
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
								<a class="btn btn-secondary" onclick="generator.addObjectToInstructions('text', 'lightgreen')" style="width: 100%; margin: 1%;">Текст</a>
							</div>
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="generator.addObjectToInstructions('rand.Number' , 'lightblue')" style="width: 100%; margin: 1%;">Случайное число</a>
							</div>
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="generator.deleteLastInstruction()" style="width: 100%; margin: 1%;">Удалить последний элемент</a>
							</div>
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="generator.clearInstructions()" style="width: 100%; margin: 1%;">Очистить поле инструкций</a>
							</div>
							<div class="col d-flex justify-content-center" style="padding: 1%;">
								<a class="btn btn-secondary" onclick="generator.addObjectToInstructions('image' , 'lightcoral')" style="width: 100%; margin: 1%;">Картинка</a>
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
	BX.ready(function () {
		window.topMenu = new BX.Proj.Independent.ClassSubjectThemeMenu({
			rootNodeId: 'topMenu',
			data: <?=$jsonData;?>,
		});
		window.generator = new BX.Proj.Independent.Generator({
			rootNodeId: 'mainGeneratorWindow',
			optionClassName: 'optionator',
		});
		window.optionator = new BX.Proj.Independent.Optionator({
			rootNodeId: 'mainWorkingArea',
		});
	})
</script>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>