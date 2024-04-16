<?php
namespace Proj\Independent\Repository;

class UserRepository
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
}
