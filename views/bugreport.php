<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
$bugType = ['Exercises' => 'Ошибки в упражнениях',
	'Cabinet' => 'Проблемы с личным кабинетом',
	'View' => 'Проблемы с отображением',
	'Other' => 'Другие ошибки'];

$APPLICATION->IncludeComponent('proj:bugreport', '');

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>