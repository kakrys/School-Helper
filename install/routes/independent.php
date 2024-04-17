<?php

use Bitrix\Main\Routing\Controllers\PublicPageController;
use Bitrix\Main\Routing\RoutingConfigurator;
return function (RoutingConfigurator $routes) {

	$routes->get('/', new PublicPageController('/local/modules/proj.independent/views/main-menu.php'));
	#$routes->post('/task/create', [\Up\Tasks\Controller\TaskEditor::class, 'add']); оставлено как пример
	#$routes->post('/task/delete', [\Up\Tasks\Controller\TaskEditor::class, 'delete']); оставлено как пример
	$routes->get('/teacher', new PublicPageController('/local/modules/proj.independent/views/teacher.php'));
	$routes->get('/student', new PublicPageController('/local/modules/proj.independent/views/student.php'));
	$routes->get('/login', new PublicPageController('/local/modules/proj.independent/views/login.php'));
	$routes->get('/register', new PublicPageController('/local/modules/proj.independent/views/register.php'));
	$routes->post('/student', new PublicPageController('/local/modules/proj.independent/views/student.php'));
	$routes->get('/admin', new PublicPageController('/local/modules/proj.independent/views/admin.php'));
	$routes->post('/login', new PublicPageController('/local/modules/proj.independent/views/login.php'));
	$routes->get('/success', new PublicPageController('/local/modules/proj.independent/views/success.php'));
	$routes->post('/register', new PublicPageController('/local/modules/proj.independent/views/register.php'));
	$routes->get('/logout', function () {
		global $USER;
		$USER->Logout();
		LocalRedirect('/');
	});
	$routes->get('/trainer', new PublicPageController('/local/modules/proj.independent/views/trainer.php'));
	$routes->get('/exercises', new PublicPageController('/local/modules/proj.independent/views/exercises.php'));
	$routes->get('/themes/{class}/{subject}', new PublicPageController('/local/modules/proj.independent/views/materials.php'));
	$routes->get('/information', new PublicPageController('/local/modules/proj.independent/views/information.php'));
	$routes->get('/contacts', new PublicPageController('/local/modules/proj.independent/views/contacts.php'));
	$routes->get('/bugreport', new PublicPageController('/local/modules/proj.independent/views/bugreport.php'));
	$routes->get('/check', new PublicPageController('/local/modules/proj.independent/views/check.php'));
	$routes->get('/answers', new PublicPageController('/local/modules/proj.independent/views/answers.php'));
	$routes->get('/about', new PublicPageController('/local/modules/proj.independent/views/about.php'));
	$routes->get('/generator', new PublicPageController('/local/modules/proj.independent/views/generator.php'));
	$routes->get('/test', new PublicPageController('/local/modules/proj.independent/views/test.php'));

	$routes->any('/{route}',new PublicPageController('/local/modules/proj.independent/views/404.php'));
};