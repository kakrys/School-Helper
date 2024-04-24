<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
?>
	<div class="container-fluid mt-1" style="margin-top: 1%; flex-grow: 1;">
		<div class="main-content d-flex" style="width: 100%;">
			<div class="d-flex flex-column" style="max-height: 83vh; min-width: 10%; max-width: 15%;">
				<div class="border bg-light d-flex flex-column p-1" style="overflow-y: auto; overflow-x: auto;">
					<p style="align-self: center;">Тип ошибки</p>
					<?php foreach ($arResult['BUG_CATEGORIES'] as $category):?>
						<a href ='#' class="btn align-self-center" data-target="#bugType<?=$category['ID']?>"><?=$category['NAME']?></a>
					<?php endforeach;?>
				</div>
				<div style="flex-grow: 1;"></div>
			</div>
			<div style="min-height: 83vh; flex-grow: 1;">
				<div class="d-flex flex-column" style="margin-left: 1%;">
					<div class="border bg-light">
						<?php foreach ($arResult['BUG_CATEGORIES'] as $category):?>
							<div id="bugType<?=$category['ID']?>" class="collapse">
								<div class="d-flex flex-column">
									<p style="align-self: center;">
										Обращение по причине: [<?=$category['NAME']?>]
									</p>
									<span style="padding: 1%;">
										Подробно опишите вашу проблему в форме ниже. Затем нажмите кнопку "отправить", чтобы сообщить разработчикам о проблеме
									</span>
									<form action="/sendreport" method="post">
									<div style="padding: 0 1% 0 1%;">
										<div class="form-floating mb-3">
											<input type="hidden" name="CATEGORY_ID" value="<?=$category['ID']?>">
											<textarea id="floatingInput<?=$category['ID']?>_0"  name="DESCRIPTION" class="form-control" placeholder="#"></textarea>
											<label for="floatingInput<?=$category['ID']?>_0"><i>Опишите возникшую проблему</i></label>
										</div>
										<div class="form-floating">
											<input id="floatingInput<?=$category['ID']?>_1" name="PAGE" class="form-control" placeholder="#">
											<label for="floatingInput<?=$category['ID']?>_1"><i>Скопируйте адрес страницы, на которой возникла проблема</i></label>
										</div>
									</div>
									<div class="d-flex" style="padding: 1%;">
										<div style="flex-grow: 1;"></div>
										<button id="sendBugButton" class="btn btn-primary align-self-center" type="submit">Отправить</button>
									</div>
									</form>
								</div>
							</div>
						<?php endforeach;?>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script>
		const links = document.querySelectorAll('a[data-target]');
		links.forEach(link => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
				const target = link.getAttribute('data-target');
				const content = document.querySelector(target);
				if (content) {
					const allContents = document.querySelectorAll('.collapse');
					allContents.forEach(c => {
						if (c !== content) {
							c.classList.remove('show');
						}
					});
					content.classList.toggle('show');
				}
			});
		});
		function disableButton() {
			const button = document.getElementById('sendBugButton');
			button.disabled = false;
			button.innerText = 'Отчёт отправлен!';
		}
	</script>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>