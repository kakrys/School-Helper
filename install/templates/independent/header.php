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
	<div class="content has-text-centered">
		<p>
			<strong>Independent work trainer</strong> by <a href="">Bitrix University (Михаил Бакиновский и Вадим Валеев)</a>. The source code is licensed
			<a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
			is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
		</p>
	</div>
</section>

<section class="section">

