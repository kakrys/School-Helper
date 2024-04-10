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
				<p style="align-self: center;">Фамилия: <?=$USER->GetLastName()?></p>
				<p style="align-self: center;">Имя: <?=$USER->GetFirstName()?></p>
				<p style="align-self: center;">Логин: <?=$USER->GetLogin()?></p>
				<p style="align-self: center;">Роль: Ученик</p>
				</span>
				<a href ='#' class="btn align-self-center" data-target="#changeData"> Смена личной информации</a>
				<a href ='#' class="btn align-self-center" data-target="#statistics"> Статистика</a>
			</div>
			<div style="flex-grow: 1;"></div>
		</div>
		<div style="min-height: 83vh; flex-grow: 1;">
			<div class="d-flex flex-column" style="margin-left: 1%;">
				<div class="border bg-light">
							<div id="changeData" class="collapse">
<!--								МЕСТО ДЛЯ ИЗМЕНЕНИЯ ВКЛАДКИ СМЕНА ЛИЧНЫХ ДАННЫХ-->
								<div class="d-flex flex-column">
									<form style="margin-bottom: 10px">
										<div class="mb-3">
											<label for="exampleInputNewLastName" class="form-label">Фамилия</label>
											<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="LastNameHelp">
											<div id="LastNameHelp" class="form-text">We'll never share your email with anyone else.</div>
										</div>
										<button type="submit" class="btn btn-primary">Изменить</button>
									</form>
									<form style="margin-bottom: 10px">
										<div class="mb-3">
											<label for="exampleInputNewLastName" class="form-label">Имя</label>
											<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="LastNameHelp">
											<div id="LastNameHelp" class="form-text">We'll never share your email with anyone else.</div>
										</div>
										<button type="submit" class="btn btn-primary">Изменить</button>
									</form >
									<form style="margin-bottom: 10px">
										<div class="mb-3">
											<label for="exampleInputNewLastName" class="form-label">Логин</label>
											<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="LastNameHelp">
											<div id="LastNameHelp" class="form-text">We'll never share your email with anyone else.</div>
										</div>
										<button type="submit" class="btn btn-primary">Изменить</button>
									</form>
									<form>
										<div class="mb-3">
											<label for="exampleInputNewLastName" class="form-label">Пароль</label>
											<input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="LastNameHelp">
											<div id="LastNameHelp" class="form-text">We'll never share your email with anyone else.</div>
										</div>
										<button type="submit" class="btn btn-primary">Изменить</button>
									</form>
								</div>
							</div>
					<div id="statistics" class="collapse">
<!--						МЕСТО ДЛЯ ИЗМЕНЕНИЯ ВКЛАДКИ 'СТАТИСТИКА'-->
						<div class="d-flex flex-column">
							<strong>coming soon</strong>
							<div class="spinner-border text-info" role="status">
								<span class="visually-hidden">Загрузка...</span>
							</div>
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