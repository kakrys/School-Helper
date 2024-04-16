<?php
namespace Proj\Independent\Services;

class UserService
{
	public static function addStudentPermissionsToUser(): void
	{
			global $USER;
			$id = $USER->GetID();
			$USER->Update($id, ['WORK_POSITION' => 'student']);
	}
}
