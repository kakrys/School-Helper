<?php

class Bugreport extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->fetchBugCategories();
		$this->includeComponentTemplate();
	}

	protected function fetchBugCategories()
	{
		$this->arResult['BUG_CATEGORIES'] = \Proj\Independent\Repository\BugRepository::getBugCategories();
	}

}