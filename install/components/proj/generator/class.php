<?php

class GeneratorComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->checkRole();
		$this->setData();
		$this->includeComponentTemplate();

	}
	private function setData():void
	{
		$data = \Proj\Independent\Repository\GeneratorRepository::getThemesByClassAndSubject();
		$this->arResult['CST_DATA'] = $data;
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