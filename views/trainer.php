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
?>
<div class="container-fluid mt-1 main" style="margin-top: 1%;flex-grow: 1;">
	<div class="main-content d-flex" style="width: 100%; min-height: 100%;">
		<div class="d-flex left-menu flex-column align-items-center border bg-light" style="width: 10%;">
			<p>
				Готовые варианты
			</p>
			<?php foreach ($variants as $var):?>
				<div>
					<a class="btn" href="/exercises?<?=$var['id']?>"> <?=$var['name']?></a>
				</div>
			<?php endforeach;?>
			<a data-bs-toggle="collapse" href="#collapseVariant" role="button" class="btn" aria-expanded="false" aria-controls="collapseVariant">
				Составить свой вариант
			</a>
			<div class="main-content d-flex" style="flex-grow: 1;"></div>
		</div>
		<div class="content border bg-light" style="width: 90%; height: 100%; margin-left: 1%;">
			<div class="collapse" id="collapseVariant">
				<div class="card card-body">
					<p>
						Какая-то некудышная заготовка-заглушка
					</p>
					<p>
						В теории здесь должен быть список тем, с возможностью их выбора и прописыванием количества заданий
					</p>
					<p>
						Ну и, конечно же, с возможностью перехода к решению составленного <a class="btn btn-link" href="/exercises">варианта</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>