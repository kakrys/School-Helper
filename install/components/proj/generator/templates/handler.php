<?php
function getData()
{
	$subjects = [
		9 => ['Math','Chemistry','Russian','English','Physics','Literature'],
		8 => ['Math','Chemistry','English','Literature'],
		7 => ['Math','Russian','English','Literature'],
		6 => ['Math' => [
			'Умножение и деление дробей', 'Отрицательные числа', 'Действия с отрицательными числами',
			'Пропорции', 'Симметрия', 'Решение линейных уравнений', 'Составление математической модели',
			'Проценты', 'Дробь от числа и число по дроби'
		],
			'Russian' => '']
	];
	header('Content-Type: application/json');
	echo json_encode($subjects);
}
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest')
{
	if (isset($_GET['action']))
	{
		switch ($_GET['action']) {
			case 'getData':
				getData();
				break;
			default:
				break;
		}
	}
}
