<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
//ТЕСТОВЫЕ ДАННЫЕ, НАДО ПЕРЕВЕСТИ НА БД
$themes=['Умножение и деление дробей', 'Отрицательные числа', 'Действия с отрицательными числами',
	'Пропорции', 'Симметрия', 'Решение линейных уравнений', 'Составление математической модели',
	'Проценты', 'Дробь от числа и число по дроби'];
$variants[] = ['name' => 'Входной', 'id' => 'l2j3b2'];
$variants[] = ['name' => 'Итоговый', 'id' => '23klm4bnrklj'];
//КОНЕЦ ТЕСТОВЫХ ДАННЫХ

$APPLICATION->IncludeComponent('proj:trainer','');

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>