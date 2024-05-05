<?php

/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
?>
	<div class="container-fluid mt-1 main" style="margin-top: 1%;flex-grow: 1;">
		<div class="main-content d-flex" style="width: 100%; min-height: 100%;">
			<div class="d-flex left-menu flex-column align-items-center border bg-light" style="width: 10%;">
				<p>
					Готовые варианты
				</p>
				<div>
					<a data-bs-toggle="collapse" href="#collapseFindVariant" role="button" class="btn" aria-expanded="false" aria-controls="collapseVariant">
						Найти готовый вариант
					</a>
				</div>
				<a data-bs-toggle="collapse" href="#collapseVariant" role="button" class="btn" aria-expanded="false" aria-controls="collapseVariant">
					<p>
						Составить свой вариант
					</p>
				</a>
				<div class="main-content d-flex" style="flex-grow: 1;"></div>
			</div>
			<div class="content border bg-light" style="width: 90%; height: 100%; margin-left: 1%;">
				<div class="collapse" id="collapseVariant">
					<div class="card card-body">
						<?php
						if (!empty($arResult['THEMES'])):?>
						<p>
							Введите количество заданий по нужным темам
						</p>
						<p>
						<form method="post" action="/trainer/<?= $arResult['CLASS'] . '/' . $arResult['SUBJECT'] ?>">
							<?php
							foreach ($arResult['THEMES'] as $theme): ?>
								<div class="row g-3 align-items-center">
									<div class="col-auto">
										<label for="inputNumberOfExercise" class="col-form-label"><?= $theme['NAME'] ?></label>
									</div>
									<div class="col-auto">
										<input type="text" name="<?= $theme['ID'] ?>" id="inputNumberOfExercise" class="form-control" aria-describedby="exerciseHelpInline" pattern="[0-9]+">
									</div>
<!--									<div class="col-auto">-->
<!--									<span id="exerciseHelpInline" class="form-text">-->
<!--      									Максимум Х заданий-->
<!--    								</span>-->
<!--									</div>-->
								</div>
							<?php
							endforeach; ?>
							</p>
							<p>
								<button type="submit" class="btn btn-primary">Создать вариант</button>
							</p>
						</form>
						<?php endif;?>
						<?php if (empty($arResult['THEMES'])): ?>
							<p>
								К сожалению, задания по этому предмету отсутствуют
							</p>
						<?php endif;?>
					</div>
				</div>
				<div class="collapse" id="collapseFindVariant">
					<div class="card card-body">
						<p>
							Введите номер варианта
						</p>
						<form method="post" action="/find">
							<div class="col-auto">
								<input type="text" name="Variant" id="inputVariant" class="form-control" aria-describedby="exerciseHelpInline">
							</div>
							<p>
								<button type="submit" class="btn btn-primary">Найти</button>
							</p>
						</form>
					</div>
				</div>
			</div>

		</div>
	</div>
<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>