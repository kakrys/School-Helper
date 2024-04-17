<?php

namespace Proj\Independent\Controller;
class GeneratorData extends Bitrix\Main\Engine\Controller
{
	public function getDataAction()
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
		return json_encode($subjects);
	}
}
