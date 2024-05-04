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
				<a href ='#' class="btn align-self-center" data-target="#addClass"> Добавить класс </a>
				<a href ='#' class="btn align-self-center" data-target="#addSubject"> Добавить предмет </a>


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
									<th scope="col"></th>
								</tr>
								</thead>
								<tbody>
								<?php foreach ($arResult['BUG_LIST'] as $bug): ?>
								<tr>
									<td><?=$bug['CATEGORY_NAME']?></td>
									<td><?=$bug['DESCRIPTION']?></td>
									<td><?=$bug['PAGE']?></td>
									<td><a type="button" href="/deletebug/<?=$bug['ID']?>" class="btn btn-danger">Устранено</a></td>
								</tr>
								<?php endforeach; ?>
								</tbody>
							</table>
						</div>
					</div>
					<div id="addThemes" class="collapse">
						<div class="d-flex flex-column">
							<table class="table">
								<thead>
								<tr>
									<th scope="col">Класс</th>
									<th scope="col">Дисциплина</th>
									<th></th>
								</tr>
								</thead>
								<tbody>
								<?php foreach ($arResult['SUBJECTS'] as $subject): ?>
									<tr>
										<td><?=$subject['CLASS']?></td>
										<td><?=$subject['SUBJECT_NAME']?></td>
										<td><a href="/addtheme/<?=$subject['CLASS'] . '/' . $subject['SUBJECT_NAME']?>" type="button" class="btn btn-primary">Добавить</a></td>
									</tr>
								<?php endforeach; ?>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div class="d-flex flex-column" style="margin-left: 1%;">
				<div class="border bg-light">
					<div id="addClass" class="collapse">
						<div class="d-flex flex-column">
							<form method="post" action="/admin">
								<div class="mb-3">
									<label for="exampleInputPassword1" class="form-label">Название</label>
									<input type="text" name = 'CLASS_NUMBER' class="form-control" id="exampleInputPassword1" pattern="[а-яёА-ЯЁa-zA-Z0-9]+">
								</div>
								<?=bitrix_sessid_post()?>
								<button type="submit" class="btn btn-primary">Добавить</button>
							</form>
						</div>
					</div>
					<div id="addThemes" class="collapse">
						<div class="d-flex flex-column">
							<table class="table">
								<thead>
								<tr>
									<th scope="col">Класс</th>
									<th scope="col">Дисциплина</th>
									<th></th>
								</tr>
								</thead>
								<tbody>
								<?php foreach ($arResult['SUBJECTS'] as $subject): ?>
									<tr>
										<td><?=$subject['CLASS']?></td>
										<td><?=$subject['SUBJECT_NAME']?></td>
										<td><a href="/addtheme/<?=$subject['CLASS'] . '/' . $subject['SUBJECT_NAME']?>" type="button" class="btn btn-primary">Добавить</a></td>
									</tr>
								<?php endforeach; ?>
								</tbody>
							</table>
						</div>
					</div>
					<div id="addSubject" class="collapse">
						<div class="d-flex flex-column">
							<table class="table">
								<thead>
								<tr>
									<th scope="col">Класс</th>
									<th scope="col">Название предмета</th>
									<th></th>
								</tr>
								</thead>
								<tbody>
								<?php foreach ($arResult['CLASSES'] as $class):?>
									<tr>
										<td><?=$class['CLASS_NUMBER']?></td>
										<form method="post" action="/admin">
											<td>
												<div class="mb-3">
													<input type="text" name = 'SUBJECT_NAME' class="form-control" id="exampleInputPassword1" >
													<input type="hidden" name="CLASS_ID" value="<?=$class['ID']?>">
												</div>
											</td>
											<td>
												<?=bitrix_sessid_post()?>
												<button type="submit" class="btn btn-primary">Добавить</button>
											</td>
										</form>
									</tr>
								<?php endforeach; ?>
								</tbody>
							</table>
						</div>
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
