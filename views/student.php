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
						<li class="is-active"><a class="button is-link mt-4" href="#teachers">Учителя</a></li>
						<li><a class="button is-link" href="#tasks">Задания</a></li>
						<li><a class="button is-link" href="#statistics">Статистика</a></li>
					</ul>
				</div>
			</div>
		</div>

		<!--	ТУТ ВМЕСТО ТЕГОВ h2 НУЖНО НАПОЛНИТЬ ВКЛАДКИ КОНТЕНТОМ-->
		<div class="tabs-content">
			<div id="teachers" class="active">
				<h2>Учителя</h2>
			</div>
			<div id="tasks">
				<h2>Отправленные задания</h2>
			</div>
			<div id="statistics" >
				<h2>Статистика ответов</h2>
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