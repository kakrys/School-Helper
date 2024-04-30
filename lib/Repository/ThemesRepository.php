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
				'SUBJECT_NAME' => $subject
			]
		);
	}
}