<?php
/**
 * @var CMain $APPLICATION
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Independent");
?>

	<section class="hero is-success is-fullheight">
		<div class="hero-body">
			<div class="container has-text-centered">
				<div class="column is-4 is-offset-4">
					<h3 class="title has-text-black">Register</h3>
					<hr class="login-hr">
					<p class="subtitle has-text-black">Please register to proceed.</p>
					<div class="box">
						<form>
							<div class="field">
								<div class="control">
									<input class="input is-large" type="email" placeholder="Your Email" autofocus="">
								</div>
							</div>

							<div class="field">
								<div class="control">
									<input class="input is-large" type="password" placeholder="Your Password">
								</div>
							</div>


							<button class="button is-block is-info is-large is-fullwidth">Register <i class="fa fa-sign-in" aria-hidden="true"></i></button>
						</form>
					</div>
					<p class="has-text-grey">
						<a href="/">Главная страница</a> &nbsp;·&nbsp;
					</p>
				</div>
			</div>
		</div>
	</section>
	<script async type="text/javascript" src="../js/bulma.js"></script>

<?php require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>