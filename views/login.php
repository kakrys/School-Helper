<?php
/**
 * @var CMain $APPLICATION
 */
const NEED_AUTH = true;
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
?>

<?php
global $USER;
$id = $USER->GetID();
$result = \Bitrix\Main\UserTable::query()->setSelect(['*'])->where('ID', (string)$id)->fetchObject();
$role = $result->getWorkPosition();
LocalRedirect("/$role");
?>

<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>