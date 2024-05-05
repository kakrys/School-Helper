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
<div class="container-fluid mt-1" style="margin-top: 1%; flex-grow: 1;">
	<form method="post" action="/edittheme/<?=$arResult['THEME_ID']?>">
		<?=bitrix_sessid_post()?>
		<div class="mb-3">
			<input type="hidden" value="<?=$arResult['THEME_ID']?>" class="form-control" name="ID" required>

			<label for="exampleInputText" class="form-label">Название Темы</label>
			<input type="text" value="<?=$arResult['THEME'][0]['NAME']?>" class="form-control" name="NAME" required>
		</div>
		<div class="mb-3">
			<label for="exampleInputText" class="form-label">Описание</label>
			<input type="text" value="<?=$arResult['THEME'][0]['DESCRIPTION']?>" class="form-control" name="DESCRIPTION" required>
		</div>
		<div class="mb-3">
			<label for="exampleInputText" class="form-label">Ссылка на видео</label>
			<input type="text" value="<?=$arResult['THEME'][0]['VIDEO_LINK']?>" class="form-control" name="VIDEO_LINK" required>
		</div>
		<div class="mb-3">
			<label for="exampleInputLink" class="form-label">Ссылки на литературу</label>
			<input type="text" value="<?=$arResult['THEME'][0]['LITERATURE_LINK']?>" class="form-control" id="exampleInputLink" aria-describedby="linkHelp" name="LITERATURE_LINK" required>
			<div id="linkHelp" class="form-text">Если хотите добавить несколько ссылок,то укажите их через запятую</div>
		</div>
		<div class="mb-3">
			<label for="exampleInputLink" class="form-label">Полезные ссылки</label>
			<input type="text" value="<?=$arResult['THEME'][0]['USEFUL_LINK']?>" class="form-control" id="exampleInputLink" aria-describedby="linkHelp" name="USEFUL_LINK" required>
			<div id="linkHelp" class="form-text">Если хотите добавить несколько ссылок,то укажите их через запятую</div>
		</div>
		<div class="mb-3">
			<label for="exampleInputLink" class="form-label">Конспект по теме</label>
			<input type="text" value="<?=$arResult['THEME'][0]['SUMMARY_LINK']?>" class="form-control" id="exampleInputLink" aria-describedby="linkHelp" name="SUMMARY_LINK" required>
			<div id="linkHelp" class="form-text">Если хотите добавить несколько ссылок,то укажите их через запятую</div>
		</div>
		<button type="submit" class="btn btn-primary">Сохранить изменения</button>
		<a type="button" href="/deletetheme/<?=$arResult['THEME_ID']?>" class="btn btn-danger">Удалить тему</a>
	</form>
</div>
<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>
