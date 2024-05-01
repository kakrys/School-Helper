<?php

namespace Proj\Independent\Repository;

use Proj\Independent\Model\ThemesTable;

class ThemesRepository
{
	public static function addTheme($class,$subject,$themeName,$themeDescription,$videoLink,$literatureLink,$usefulLink,$summaryLink)
	{
		ThemesTable::add(
			[
				'NAME' => $themeName,
				'DESCRIPTION' => $themeDescription,
				'VIDEO_LINK' => $videoLink,
				'LITERATURE_LINK' => $literatureLink,
				'USEFUL_LINK' => $usefulLink,
				'SUMMARY_LINK' => $summaryLink,
				'CLASS_NUMBER' => $class,
				'SUBJECT_NAME' => $subject,
			]
		);
	}

	public static function getThemeById($id)
	{
		$result = ThemesTable::getList(['select' => ['NAME','DESCRIPTION','VIDEO_LINK','LITERATURE_LINK','USEFUL_LINK','SUMMARY_LINK'],
										   'filter' => ['=ID' => $id],
									   ]);
		return $result->fetchAll();
	}

	public static function updateThemeInfo($themeId,$themeName,$themeDescription,$videoLink,$literatureLink,$usefulLink,$summaryLink)
	{
		ThemesTable::update($themeId,
		[
			'NAME' => $themeName,
			'DESCRIPTION' => $themeDescription,
			'VIDEO_LINK' => $videoLink,
			'LITERATURE_LINK' => $literatureLink,
			'USEFUL_LINK' => $usefulLink,
			'SUMMARY_LINK' => $summaryLink,
		]);
	}

	public static function deleteThemeById($id)
	{
		global $USER;
		$role = \Proj\Independent\Repository\UserRepository::getCurrentUserWorkPosition();
		if (isset($role) && $role === 'admin')
		{
			ThemesTable::delete($id);
		}
	}
}