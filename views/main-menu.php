<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
//ТЕСТОВЫЕ ДАННЫЕ, НАДО ПЕРЕВЕСТИ НА БД
$grades = [1,2,3,4,5,6,7,8,9,10,11];
$subjects['9']=['Math','Chemistry','Russian','English','Physics','Literature'];
$subjects['8']=['Math','Chemistry','English','Literature'];
$subjects['7']=['Math','Russian','English','Literature'];
//КОНЕЦ ТЕСТОВЫХ ДАННЫХ
?>
<div class="container-fluid mt-1" style="">
	<div class="main-content d-flex" style="width: 100%; margin-bottom: 1%; min-height: 81vh;">
		<div class="d-flex left-menu border bg-light flex-column align-items-center" style="width: 10%;">
			<div class="accordion" id="gradesAndSubjects" style="width: 100%;">
				<?php foreach ($grades as $grade):?>
					<div class="accordion-item">
						<h2 class="accordion-header" id="grade<?=$grade?>">
							<button class="accordion-button collapsed" <?=(isset($subjects["$grade"])?'':'disabled');?> type="button" data-bs-toggle="collapse" data-bs-target="#collapse<?=$grade?>" aria-expanded="true" aria-controls="collapse<?=$grade?>">
								<?=(isset($subjects["$grade"])?"<a style='font-size: 1vw;'>$grade класс<a>":"<del style='font-size: 1vw;'>$grade класс</del>");?>
							</button>
						</h2>
						<div id="collapse<?=$grade?>" class="accordion-collapse collapse" aria-labelledby="grade<?=$grade?>" data-bs-parent="#gradesAndSubjects">
							<div class="accordion-body p-0">
								<?php foreach ($subjects[$grade] as $subject):?>
									<div class="subject">
										<a data-bs-toggle="collapse" href="#collapseClass<?=$grade?>Subject<?=$subject?>" role="button" aria-expanded="false" aria-controls="collapseClass<?=$grade?>Subject<?=$subject?>">
											<?=$subject?>
										</a>
									</div>
								<?php endforeach;?>
							</div>
						</div>
					</div>
				<?php endforeach;?>
			</div>
		</div>
		<div class="content border bg-light" style="width: 90%; height: 100%; margin-left: 1%;">
			<?php foreach ($grades as $grade):?>
				<?php foreach ($subjects[$grade] as $subject):?>
					<div class="collapse" id="collapseClass<?=$grade?>Subject<?=$subject?>">
						<div class="card card-body">
							<p>
								Какая-то рандомная информация по предмету, быть может статистика или количество тем.
								Кстати, это блок для <?=$grade?> класса и по предмету <?=$subject?>
							</p>
							Здесь текст с возможностью перехода
							<a href="/trainer">к тренажёру</a>
							А также текст с возможностью перехода к
							<a href="/exercises">задачам по предмету</a>
							Ну и, конечно же, текст с переходом к
							<a href="/themes">материалам по предмету и спискам тем</a>
						</div>
					</div>
				<?php endforeach;?>
			<?php endforeach;?>
		</div>
	</div>
</div>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>