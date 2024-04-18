<?php

class AuthComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->transferToTheDesiredPage();
	}
	protected function transferToTheDesiredPage()
	{
		$role = \Proj\Independent\Repository\UserRepository::getCurrentUserWorkPosition();
		LocalRedirect("/$role");
	}
}