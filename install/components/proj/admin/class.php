<?php

use Bitrix\Main\Context;

class AdminComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->checkRole();
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

}