<?php
namespace Proj\Independent\Services;

class UserService
{
	public static function getCurrentUserWorkPosition(): ?string
	{
		global $USER;
		$id = $USER->GetID();
		$result = \Bitrix\Main\UserTable::query()->setSelect(['*'])->where('ID', (string)$id)->fetchObject();
		if ($result!==null)
		{
			$role = $result->getWorkPosition();
			return $role;
		}
		return null;
	}

	public static function addStudentPermissionsToUser(): void
	{
			global $USER;
			$id = $USER->GetID();
			$USER->Update($id, ['WORK_POSITION' => 'student']);
	}
}
