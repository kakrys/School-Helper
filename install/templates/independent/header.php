<?php
/**
 * @var CMain $APPLICATION
 */
?>
<!doctype html>
<html lang="<?= LANGUAGE_ID; ?>">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
		  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<title><?php $APPLICATION->ShowTitle(); ?></title>


	<?php
	$APPLICATION->ShowHead();
	?>
</head>
<body>
<?php $APPLICATION->ShowPanel(); ?>

<section class="section">
	<div class="container">
		<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<a class="navbar-item has-text-weight-semibold is-size-4 logo" href="/">
					<span class="has-text-link">🕮</span> Самостоятельные работы
				</a>

				<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" class="navbar-menu">
				<div class="navbar-start">
					<a class="navbar-item" href="/">
						Главная страница
					</a>

					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link">
							Предметы
						</a>

						<div class="navbar-dropdown">
							<a class="navbar-item">
								Математика
							</a>
							<a class="navbar-item">
								Русский язык
							</a>
							<a class="navbar-item">
								Физика
							</a>
							<a class="navbar-item">
								Химия
							</a>
						</div>
					</div>

					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link">
							Классы
						</a>

						<div class="navbar-dropdown">
							<a class="navbar-item">
								1
							</a>
							<a class="navbar-item">
								2
							</a>
							<a class="navbar-item">
								3
							</a>
							<a class="navbar-item">
								4
							</a>
							<a class="navbar-item">
								5
							</a>
							<a class="navbar-item">
								6
							</a>
							<a class="navbar-item">
								7
							</a>
							<a class="navbar-item">
								8
							</a>
							<a class="navbar-item">
								9
							</a>
							<a class="navbar-item">
								10
							</a>
							<a class="navbar-item">
								11
							</a>
						</div>
					</div>
				</div>

				<div class="navbar-end">
					<div class="navbar-item">
						<div class="buttons">
							<a class="button is-link" href="/register">
								<strong>Sign up</strong>
							</a>
							<a class="button is-info" href="/login">
								Log in
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	</div>
</section>

<section class="section">

