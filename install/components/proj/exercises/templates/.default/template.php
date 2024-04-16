<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
?>
	<div class="container-fluid mt-1" style="margin-top: 1%; flex-grow: 1;">
		<div class="main-content d-flex flex-column justify-content-center align-items-center border bg-light">
			<p>
				Выбранные темы:
			</p>
			<span>Пока тут заглушка</span>
			<p>
				Задачи по темам: заглушечным
			</p>
			<div class="border bg-light" style="min-width: 70%; min-height: 30%;">
				<?php $count = 1;foreach ($arResult['EXERCISES'] as $exercise):?>
				<div class="border bg-light">
					<div>
						<p>Задание <?=$count?> по заглушечной теме с кодом[заглушка]</p>
						<span><?=$exercise['EXERCISE_DESCRIPTION']?></span>
						<span><?=$exercise['EXERCISE_CONDITION']?></span>
						<?php $count++;?>
					</div>
					<div class="d-flex justify-content-end">
						<div class="d-flex flex-column">
							<p>Поле ответа</p>
							<input style='width=36px; height=18px; align-self: end;'>
						</div>
					</div>
				</div>
				<?php endforeach;?>
			</div>
			<p>
				Отправить на проверку
			</p>
			<a class="btn btn-link" href="/check">Отправить</a>
		</div>
	</div>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>