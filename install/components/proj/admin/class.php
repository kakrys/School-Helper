<?php

use Bitrix\Main\Context;

class AdminComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->checkRole();
		$this->fetchBugList();
		$this->setData();
		$this->includeComponentTemplate();
	}
	protected function checkRole(): void
	{
		$role = \Proj\Independent\Repository\UserRepository::getCurrentUserWorkPosition();
		if (!isset($role) || $role !== 'admin')
		{
			LocalRedirect('/login');
		}
	}

	protected function fetchBugList()
	{
		$this->arResult['BUG_LIST'] = \Proj\Independent\Repository\BugRepository::getBugListForAdmin();
	}

	protected function setData()
	{
		$data = \Proj\Independent\Repository\GeneratorRepository::getThemesByClassAndSubject();
		$this->arResult['CST_DATA'] = $data;
	}
}