<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");

$APPLICATION->IncludeComponent("bitrix:main.register","",Array(
														   "USER_PROPERTY_NAME" => "",
														   "SEF_MODE" => "Y",
														   "SHOW_FIELDS" => Array('NAME','LAST_NAME'),
														   "REQUIRED_FIELDS" => Array('NAME','LAST_NAME'),
														   "AUTH" => "Y",
														   "USE_BACKURL" => "Y",
														   "SUCCESS_PAGE" => "/success",
														   "SET_TITLE" => "Y",
														   "USER_PROPERTY" => Array(),
														   "SEF_FOLDER" => "/",
														   "VARIABLE_ALIASES" => Array()
													   )
);

global $USER;
$id = $USER->GetID();
$USER->Update($id,['WORK_POSITION' => 'student']);

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>