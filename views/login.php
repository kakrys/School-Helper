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
$APPLICATION->IncludeComponent('proj:auth', '');
?>

<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>