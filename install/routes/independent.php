<?php

use Bitrix\Main\Routing\Controllers\PublicPageController;
use Bitrix\Main\Routing\RoutingConfigurator;

return function (RoutingConfigurator $routes) {

	$routes->get('/', new PublicPageController('/local/modules/up.tasks/views/main-menu.php'));
	$routes->get('/admin', new PublicPageController('/local/modules/up.tasks/views/task-list.php'));
	#$routes->post('/task/create', [\Up\Tasks\Controller\TaskEditor::class, 'add']); оставлено как пример
	#$routes->post('/task/delete', [\Up\Tasks\Controller\TaskEditor::class, 'delete']); оставлено как пример
	$routes->get('/teacher', new PublicPageController('/local/modules/proj.independent/views/teacher.php'));
	$routes->get('/student', new PublicPageController('/local/modules/proj.independent/views/student.php'));

	$routes->any('/{route}',new PublicPageController('/local/modules/proj.independent/views/404.php'));
};