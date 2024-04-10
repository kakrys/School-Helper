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
<div class="container-fluid mt-1" style="margin-top: 1%; flex-grow: 1;">
	<div class="main-content d-flex flex-column justify-content-center align-items-center border bg-light">
		<p>
			Выбранные темы:
		</p>
		<span><?=implode(', ',$exerciseThemes)?></span>
		<p>
			Задачи по темам:
		</p>
		<div class="border bg-light" style="min-width: 70%; min-height: 30%;">
			<?php $count = 1; foreach ($exerciseThemes as $theme):?>
				<?php
					$pos = 0;
					for ($i=1;$i<=$exercises[$theme]['count'];$i++)
					{
						echo "<p>Задание $count. (Тема: $theme) Код [<a href=" . 'answer.?' . $exercises[$theme]['code'] . '_' . $pos . ">" . $exercises[$theme]['code'] . "_$pos</a>]</p>";
						echo "<div>Какое-то условие задания $count...</div>";
						$count++;
						$pos++;
						echo "<p>Поле ответа</p>";
						echo "<input style='width=36px; height=18px; align-self: end;'>";
					}
				?>
			<?php endforeach;?>
		</div>
		<p>
			Отправить на проверку
		</p>
		<a class="btn btn-link" href="/check">Отправить</a>
	</div>
</div>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>
