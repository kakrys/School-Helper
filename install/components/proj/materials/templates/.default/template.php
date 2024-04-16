<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
if (empty($arResult['THEMES']))
{
	LocalRedirect('/404');
}
?>
	<div class="container-fluid mt-1" style="margin-top: 1%; flex-grow: 1;">
		<div class="main-content d-flex" style="width: 100%;">
			<div class="d-flex flex-column" style="max-height: 83vh; min-width: 10%; max-width: 15%;">
				<div class="border bg-light d-flex flex-column p-1" style="overflow-y: auto; overflow-x: auto;">
					<p style="align-self: center;">Темы "<?=$arResult['CLASS']?>" класса по предмету "<?=$arResult['SUBJECT']?>"</p>
					<a href ='#' class="btn" data-target="#theme-1"></a>
					<?php foreach ($arResult['THEMES'] as $theme):?>
						<a href ='#' class="btn align-self-center" data-target="#theme<?=$theme['ID']?>"> <?=$theme['NAME']?></a>
					<?php endforeach;?>
				</div>
				<div style="flex-grow: 1;"></div>
			</div>
			<div style="min-height: 83vh; flex-grow: 1;">
				<div class="d-flex flex-column" style="margin-left: 1%;">
					<div class="border bg-light">
						<div id="theme-1" class="collapse show">
							<p style="align-self: center;">
								Выберите тему, чтобы увидеть подробную информацию по ней
							</p>
						</div>
						<?php foreach ($arResult['THEMES'] as $theme):?>
							<?php if(isset($theme['DESCRIPTION'])):?>
								<div id="theme<?=$theme['ID']?>" class="collapse">
									<div class="d-flex flex-column">
										<p style="align-self: center;">
											Тема: <?=$theme['NAME']?>
										</p>
										<a>
											<?=$theme['DESCRIPTION'];?>
										</a>
										<p style="align-self: center;">
											Тренажёр
										</p>
										<a href="/exercises">
											Ссылка на тренажёр по <strong>этой</strong> теме
										</a>
										<p style="align-self: center;">
											Материалы
										</p>
										<div class="d-flex container-fluid">
											<?php if(isset($theme['VIDEO_LINK'])):?>
											<div class="d-flex flex-column" style="min-width: 30%;">
												<p style="align-self: center;">Видео по теме</p>
												<div class="ratio ratio-16x9">
													<iframe width="560" height="315" src="<?=$theme['VIDEO_LINK']?>" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
												</div>
											</div>
											<?php endif;?>
											<div style="margin-left: 1%;">
												<?php if(isset($theme['LITERATURE_LINK'])):?>
												<p>
													Ссылки на литературу:
												</p>
												<?php foreach(explode(',',$theme['LITERATURE_LINK']) as $literatureNumber=> $literatureLink):?>
												<a href="<?=$literatureLink?>">Литература <?=$literatureNumber+1?></a>
												<?php endforeach;?>
												<?php endif;?>
												<?php if(isset($theme['USEFUL_LINK'])):?>
												<p>
													Полезные ссылки:
												</p>
												<?php foreach(explode(',',$theme['USEFUL_LINK']) as $usefulNumber=> $usefulLink):?>
												<a href="<?=$usefulLink?>">Полезное <?=$usefulNumber+1?></a>
												<?php endforeach;?>
												<?php endif;?>
												<?php if(isset($theme['SUMMARY_LINK'])):?>
												<p>
													Конспект по теме:
												</p>
												<?php foreach(explode(',',$theme['SUMMARY_LINK']) as $summaryNumber=> $summaryLink):?>
												<a href="<?=$summaryLink?>">Конспект <?=$summaryNumber+1?></a>
												<?php endforeach;?>
												<?php endif;?>
											</div>
										</div>
									</div>
								</div>
							<?php else:?>
								<div id="theme<?=$theme['ID']?>" class="collapse">
									Нам очень жаль, но тему "<?=$theme['NAME']?>" пока не заполнили :(
								</div>
							<?php endif;?>
						<?php endforeach;?>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script>
		const links = document.querySelectorAll('a[data-target]');
		const theme1 = document.getElementById('theme-1');

		links.forEach(link => {
			link.addEventListener('click', (event) => {
				event.preventDefault();
				const target = link.getAttribute('data-target');
				const content = document.querySelector(target);
				const showElements = document.querySelectorAll('.show');

				if (content) {
					const allContents = document.querySelectorAll('.collapse');

					allContents.forEach(c => {
						if (c !== content) {
							c.classList.remove('show');
						}
					});

					if (!content.classList.contains('show')) {
						allContents.forEach(c => c.classList.remove('show'));
						content.classList.add('show');
						theme1.classList.remove('show');
					} else {
						content.classList.remove('show');
						const remainingContents = document.querySelectorAll('.collapse.show');
						if (remainingContents.length === 0) {
							theme1.classList.add('show');
						}
					}
				}
			});
		});

		window.addEventListener('DOMContentLoaded', () => {
			const showElements = document.querySelectorAll('.collapse.show');
			if (showElements.length === 0) {
				theme1.classList.add('show');
			}
		});
	</script>
<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php"); ?>