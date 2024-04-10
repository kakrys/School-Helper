<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
$exerciseThemes=['Дроби', 'Отрицательные числа'];
$exercises['Дроби'] = ['count' => 3, 'code' => 'l2kuh3'];
$exercises['Отрицательные числа'] = ['count' => 2, 'code' => 'l2kuh3'];
?>
<div class="container mt-1" style="margin-top: 1%; flex-grow: 1;">
	<div class="main-content d-flex flex-column justify-content-center align-items-center ">
		<p>
			Решение задачи [21ljkbh23k]
		</p>
		<div class="border bg-light" style="min-width: 70%; min-height: 30%;">
			<p>
				Тема: "X"
			</p>
			<p>
				Какое-то условие задания <p>первая строка</p><p>вторая строка</p>
			</p>
			<p>
				Какое-то решение задания<p>первая строка</p><p>вторая строка</p><p>третья строка</p><p>И в завершении - достаточно длинная четвёртая строка</p>
			</p>
		</div>
		<div class="d-flex justify-content-center" style="width: 100%; padding: 3%;">
			<a class="btn btn-primary align-self-center" role="button" href="/">На главную</a>
		</div>
	</div>
</div>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>
