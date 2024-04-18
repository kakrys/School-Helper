<?php

use Bitrix\Main\Context;
use Proj\Independent\Services\UserService;

class StudentComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->checkRole();
		$this->updateInfo();
		$this->includeComponentTemplate();
	}
	protected function checkRole(): void
	{
		$role = \Proj\Independent\Repository\UserRepository::getCurrentUserWorkPosition();
		if (!isset($role) || $role !== 'student')
		{
			LocalRedirect('/login');
		}
	}

	protected function updateInfo(): void
	{
		global $USER;
		$request = Context::getCurrent()->getRequest();
		$isPost  = $request->isPost();
		$isAuthorized = $USER->IsAuthorized();
		if ($isPost && $isAuthorized)
		{
			$data = $request->getPostList()->toArray();
			$updateField = array_key_first($data);
			$newInfo = array_shift($data);
			$funcName = 'updateUser' . $updateField;
			if (method_exists(UserService::class, (string)$funcName))
			{
				$changeInfoError = UserService::$funcName($newInfo);
			}
		}
	}
}