<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
?>
	<div class="container-fluid mt-1 main" style="margin-top: 1%;flex-grow: 1;">
		<div class="main-content d-flex" style="width: 100%; min-height: 100%;">
			<div class="d-flex left-menu flex-column align-items-center" style="width: 10%;">
				<div class="accordion border bg-light" id="gradesAndSubjects" style="width: 100%;">
					<?php foreach ($arResult['GRADES'] as $grade):?>
						<div class="accordion-item">
							<h2 class="accordion-header" id="grade<?=$grade?>">
								<button class="accordion-button collapsed" <?=(isset($arResult['SUBJECTS']["$grade"])?'':'disabled');?> type="button" data-bs-toggle="collapse" data-bs-target="#collapse<?=$grade?>" aria-expanded="true" aria-controls="collapse<?=$grade?>">
									<?=(isset($arResult['SUBJECTS']["$grade"])?"<a style='font-size: 1vw;'>$grade класс<a>":"<del style='font-size: 1vw;'>$grade класс</del>");?>
								</button>
							</h2>
							<div id="collapse<?=$grade?>" class="accordion-collapse collapse" aria-labelledby="grade<?=$grade?>" data-bs-parent="#gradesAndSubjects">
								<div class="accordion-body p-0">
									<?php foreach ($arResult['SUBJECTS'][$grade] as $subject):?>
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
				<div class="main-content d-flex" style="flex-grow: 1;"></div>
			</div>
			<div class="content border bg-light" style="width: 90%; height: 100%; margin-left: 1%;">
				<?php foreach ($arResult['GRADES'] as $grade):?>
					<?php foreach ($arResult['SUBJECTS'][$grade] as $subject):?>
						<div class="collapse" id="collapseClass<?=$grade?>Subject<?=$subject?>">
							<div class="card card-body">
								<p>
									Какая-то рандомная информация по предмету, быть может статистика или количество тем.
									Кстати, это блок для <?=$grade?> класса и по предмету <?=$subject?>
								</p>
								Здесь текст с возможностью перехода
								<a href="/trainer/<?=$grade.'/'.$subject?>">к тренажёру</a>
								Ну и, конечно же, текст с переходом к
								<a href="/themes/<?=$grade?>/<?=$subject?>">материалам по предмету и спискам тем</a>
							</div>
						</div>
					<?php endforeach;?>
				<?php endforeach;?>
			</div>
		</div>
	</div>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>