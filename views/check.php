<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
$studentAnswers = ['a', '24', '157', '11', 'ac'];
$correctAnswers = ['a', '27', '157', '11', 'abc'];
?>
<div class="container mt-1" style="margin-top: 1%; flex-grow: 1;">
	<div class="main-content d-flex flex-column justify-content-center align-items-center ">
		<p>
			Результат решения варианта [2j3bn4k2j]
		</p>
		<div class="container">
			<table class="table">
				<thead>
				<tr>
					<th style="border: 1px solid #dee2e6">№ Задания</th>
					<th style="border: 1px solid #dee2e6">Ответ</th>
					<th style="border: 1px solid #dee2e6">Верный ответ</th>
					<th style="border: 1px solid #dee2e6">Результат</th>
					<th style="border: 1px solid #dee2e6">Решение</th>
				</tr>
				</thead>
				<tbody>
				<?php for($i=0;$i<count($correctAnswers);$i++)
				{
					echo "<tr>";
					echo "<td style='border: 1px solid #dee2e6'>".$i+1 ."</td>";
					echo "<td style='border: 1px solid #dee2e6'>$studentAnswers[$i]</td>";
					echo "<td style='border: 1px solid #dee2e6'>$correctAnswers[$i]</td>";
					if($studentAnswers[$i] == $correctAnswers[$i])
					{
						echo "<td style='border: 1px solid #dee2e6; background: lightgreen;'>Верно</td>";
					}
					else
					{
						echo "<td style='border: 1px solid #dee2e6; background: lightcoral;'>Неверно</td>";
					}
					echo "<td style='border: 1px solid #dee2e6'><a href='/answers' target='_blank'>Решение</a></td>";
					echo "</tr>";
				}
				?>
				</tbody>
			</table>
		</div>
		<div class="d-flex justify-content-between" style="width: 100%; padding: 3%;">
			<a class="btn btn-primary align-self-center" role="button" href="/">На главную</a>
			<a class="btn btn-primary align-self-center" role="button" href="/">Скачать задания</a>
		</div>
	</div>
</div>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>