<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
?>
	<div class="table">
		<div class="navbar-left nav-menu">
			<div class="box">
				<div class="section">
			<span class="personal-information ">
				Фамилия:Валеев
			</span>
					<span class="personal-information">
				Имя:Вадим
			</span>
					<span class="personal-information">
				Школа:129
			</span>
					<span class="personal-information">
				Город:Челябинск
			</span>
					<span class="personal-information">
				Роль:Учитель
			</span>
				</div>
				<div class="menu-buttons">
					<ul>
						<li class="is-active"><a class="button is-link mt-4" href="#classes">Классы</a></li>
						<li><a class="button is-link" href="#submitted-tasks">Отправленные задания</a></li>
						<li><a class="button is-link" href="#response-statistics">Статистика ответов</a></li>
						<li><a class="button is-link" href="#task-designer">Конструктор заданий</a></li>
						<li><a class="button is-link" href="#schedule-work">Запланировать работу</a></li>
					</ul>
				</div>
			</div>
		</div>

		<!--	ТУТ ВМЕСТО ТЕГОВ h2 НУЖНО НАПОЛНИТЬ ВКЛАДКИ КОНТЕНТОМ-->
		<div class="tabs-content">
			<div id="classes" class="active">
				<h2>Классы</h2>
			</div>
			<div id="submitted-tasks">
				<h2>Отправленные задания</h2>
			</div>
			<div id="response-statistics" >
				<h2>Статистика ответов</h2>
			</div>
			<div id="task-designer" >
				<h2>Конструктор заданий</h2>
			</div>
			<div id="schedule-work" >
				<h2>Запланировать работу</h2>
			</div>
		</div>
	</div>

	<script>
		window.addEventListener('load', () => {
			const tabButtons = document.querySelectorAll('.menu-buttons a');
			const tabContainers = document.querySelectorAll('.tabs-content div');

			tabButtons.forEach(button => {
				button.addEventListener('click', (event) => {
					event.preventDefault();
					tabButtons.forEach(btn => {
						btn.parentElement.classList.remove('is-active');
					});
					button.parentElement.classList.add('is-active');

					const id = event.target.hash.substring(1);
					tabContainers.forEach(container => container.classList.remove('active'));
					document.getElementById(id).classList.add('active');
				})
			})
		})
	</script>
<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>