<?php

class TeacherComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->checkRole();
		$this->includeComponentTemplate();
	}
	protected function checkRole(): void
	{
		$role = \Proj\Independent\Repository\UserRepository::getCurrentUserWorkPosition();
		if (!isset($role) || $role !== 'teacher')
		{
			LocalRedirect('/login');
		}
	}
}