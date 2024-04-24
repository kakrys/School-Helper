<?php
/**
 * @var CMain $APPLICATION
 */
global $USER
?>
<!doctype html>
<html lang="<?= LANGUAGE_ID; ?>">
<head>
	<meta charset="UTF-8">
	<meta name="viewport"
		  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
	<title><?php $APPLICATION->ShowTitle(); ?></title>
	<style>.bx-auth-reg{display: flex; flex-direction: column; justify-content: center; align-items: center; margin-top: 1%;}</style>
	<?php
	$APPLICATION->ShowHead();
	?>
</head>
<body class="d-flex flex-column" style="min-height: 100vh; overflow-y: hidden;">
<?php $APPLICATION->ShowPanel(); ?>
<nav class="navbar navbar-light d-flex justify-content-between flex-nowrap h-10" style="background-color: #e3f2fd; font-size: 1vw; height: 7%;">
	<div class="container-fluid px-6 flex-nowrap">
		<ul class="nav nav-pills align-items-center pl-6" style="min-width: 300px;">
			<li class="nav-item">
				<a class="nav-link" href="/">
					<span class="has-text-link fs-3 align-middle"><strong>🕮</span class="align-middle"> Самостоятельные работы</strong>
				</a>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Навигация</a>
				<ul class="dropdown-menu">
					<li><a class="dropdown-item" href="#">Тренажёр</a></li>
					<li><a class="dropdown-item" href="#">Материалы</a></li>
					<li><a class="dropdown-item" href="#">Каталог заданий</a></li>
				</ul>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Изучение</a>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">О нас</a>
				<ul class="dropdown-menu">
					<li><a class="dropdown-item" href="/about">Информация</a></li>
					<li><hr class="dropdown-divider"></li>
					<li><a class="dropdown-item" href="/bugreport">Сообщить о баге</a></li>
				</ul>
			</li>
		</ul>

		<div class="d-flex justify-content-end" style="width: 40%; margin-right: 2%; height: 100%;">
			<a type="button" class="btn btn-primary align-self-center" style="width: 30%; min-height: 50%; max-height: 75%; margin-left: 1%;font-size: 1vw;" href="/login" role="button"><?=$USER->GetID() ? 'Личный кабинет' : 'Вход'?></a>
			<?php if ($USER->GetID() !== '0'):?>
				<a type="button" class="btn btn-primary align-self-center" style="width: 30%; min-height: 50%; max-height: 75%; margin-left: 1%;font-size: 1vw;" href="/logout" role="button">Выход</a>
			<?php endif?>
		</div>
	</div>
</nav>

