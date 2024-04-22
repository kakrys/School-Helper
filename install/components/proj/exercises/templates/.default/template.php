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
				Вариант: <?=$arResult['GENERATOR_CODE']?>
			</p>
			<div class="border bg-light" style="min-width: 70%; min-height: 30%;">
				<form action="/check/<?=$arResult['GENERATOR_CODE']?>" method="post">
				<?php $count = 1;foreach ($arResult['EXERCISES'] as $exercise):?>
				<div class="border bg-light">
					<div>
						<p>Задание <?=$count?></p>
						<span><?=$exercise['EXERCISE_DESCRIPTION']?></span>
						<span><?=$exercise['EXERCISE_CONDITION']?></span>
					</div>
					<div class="d-flex justify-content-end">
						<div class="d-flex flex-column">
							<p>Поле ответа</p>
							<input type="text" name="<?=$count-1?>" style='width=36px; height=18px; align-self: end;'>
						</div>
					</div>
				</div>
				<?php $count++;?>
				<?php endforeach;?>
			</div>
			<p>
				Отправить на проверку
			</p>
			<button class="btn btn-link" type="submit">Отправить</button>
			</form>
		</div>
	</div>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>