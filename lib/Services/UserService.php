<?php
namespace Proj\Independent\Services;

use Bitrix\Main\UserTable;
use Proj\Independent\Model\StatisticsTable;
use Proj\Independent\Model\VariantTable;

class UserService
{
	public static function addStudentPermissionsToUser(): void
	{
			global $USER;
			$id = $USER->GetID();
			$USER->Update($id, ['WORK_POSITION' => 'student']);
	}

	public static function updateUserSurname($newSurname): ?string
	{
		global $USER;
		$isSurnameEmpty = empty(trim($newSurname));
		if ($isSurnameEmpty)
		{
			return 'Некорректная Фамилия';
		}
		$id = $USER->GetID();
		$USER->Update($id,['LAST_NAME' => (string)$newSurname]);
		return null;
	}

	public static function updateUserName($newName)
	{
		global $USER;
		$isNameEmpty = empty(trim($newName));
		if ($isNameEmpty)
		{
			return 'Некорректное Имя';
		}
		$id = $USER->GetID();
		$USER->Update($id,['NAME' => (string)$newName]);
		return null;
	}

	public static function updateUserLogin($newLogin)
	{
		global $USER;
		$newLogin = trim($newLogin);
		$isLoginEmpty = empty($newLogin);
		$isLoginShort = mb_strlen($newLogin) < 3;
		$result = UserTable::getList([
																  'select' => ['ID'],
																  'filter' => [
																	  '=LOGIN' => $newLogin,
																  ]]);
		$isLoginExists = $result->fetchRaw();
		if ($isLoginEmpty || $isLoginShort || $isLoginExists)
		{
			return 'Некорректный Логин';
		}
		$id = $USER->GetID();
		$USER->Update($id,['LOGIN' => (string)$newLogin]);
		return null;
	}

	public static function updateUserPassword($newPassword)
	{
		global $USER;
		$newPassword = trim($newPassword);
		$isPasswordEmpty = empty($newPassword);
		$isPasswordShort = mb_strlen($newPassword) < 6;
		if ($isPasswordEmpty || $isPasswordShort)
		{
			return 'Некорректное Имя';
		}
		$id = $USER->GetID();
		$USER->Update($id,['PASSWORD' => (string)$newPassword]);
		return null;
	}
}
