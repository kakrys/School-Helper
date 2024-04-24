<?php

namespace Proj\Independent\Controller;
use Proj\Independent\Math\Exercise;
class Generator extends \Bitrix\Main\Engine\Controller
{
	protected function getDefaultPreFilters()
	{
		return [];
	}

	public function getDataAction(array $genSett): string
	{
		$seed = md5(time());
		$exrc = new Exercise($seed, implode('',$genSett));
		return $exrc->renderExercise;
	}
}
