<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}
$APPLICATION->SetTitle("Independent");
global $USER;
$jsonData = json_encode($arResult['CST_DATA']);
?>
<div class="container-fluid mt-1" style="margin-top: 1%; flex-grow: 1;">
	<div class="main-content d-flex" style="width: 100%;">
		<div class="d-flex flex-column" style="max-height: 83vh; min-width: 10%; max-width: 15%;">
			<div class="border bg-light d-flex flex-column p-1" style="overflow-y: auto; overflow-x: auto;">
				<span class="border border-3 text-primary">
				<p style="align-self: center;">Фамилия: <?=htmlspecialcharsbx($USER->GetLastName())?></p>
				<p style="align-self: center;">Имя: <?=htmlspecialcharsbx($USER->GetFirstName())?></p>
				<p style="align-self: center;">Логин: <?=htmlspecialcharsbx($USER->GetLogin())?></p>
				<p style="align-self: center;">Роль: Админ</p>
				</span>
				<a href ='/generator' class="btn align-self-center"> Генератор</a>
				<a href ='#' class="btn align-self-center" data-target="#bugs"> Сообщения о багах</a>
				<a href ='#' class="btn align-self-center" data-target="#addThemes"> Добавить тему </a>
			</div>
			<div style="flex-grow: 1;"></div>
		</div>
		<div style="min-height: 83vh; flex-grow: 1;">
			<div class="d-flex flex-column" style="margin-left: 1%;">
				<div class="border bg-light">
					<div id="bugs" class="collapse">
						<div class="d-flex flex-column">
							<table class="table">
								<thead>
								<tr>
									<th scope="col">Категория</th>
									<th scope="col">Описание</th>
									<th scope="col">Страница</th>
								</tr>
								</thead>
								<tbody>
								<?php foreach ($arResult['BUG_LIST'] as $bug): ?>
								<tr>
									<td><?=$bug['CATEGORY_NAME']?></td>
									<td><?=$bug['DESCRIPTION']?></td>
									<td><?=$bug['PAGE']?></td>
								</tr>
								<?php endforeach; ?>
								</tbody>
							</table>
						</div>
					</div>
					<div id="addThemes" class="collapse">
						ВОТ ТУТ ИЗМЕНЕНИЕ ТЕМ
					</div>
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
			const showElements = document.querySelectorAll('.show');
			if (content) {
				const allContents = document.querySelectorAll('.collapse');
				allContents.forEach(c => {
					if (c !== content) {
						c.classList.remove('show');
					}
				});
				content.classList.toggle('show');
				if (showElements.length === 0) {
					const specificElement = document.getElementById('theme-1');
					specificElement.classList.add('show');
				}
			}
		});
	});
</script>
