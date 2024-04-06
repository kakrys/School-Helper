<?php

class AuthComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->transferToTheDesiredPage();
	}
	protected function transferToTheDesiredPage()
	{
		$role = \Proj\Independent\Services\UserService::getCurrentUserWorkPosition();
		LocalRedirect("/$role");
	}
}