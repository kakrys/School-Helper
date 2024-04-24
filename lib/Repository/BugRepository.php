<?php

namespace Proj\Independent\Repository;

use Proj\Independent\Model\BugReportTable;

class BugRepository
{
	public static function addBugReport(): void
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$data = $request->getPostList()->toArray();
		$categoryID = $data['CATEGORY_ID'];
		$description = $data['DESCRIPTION'];
		$page = $data['PAGE'];
		BugReportTable::add(
			[
				'CATEGORY_ID' => $categoryID,
				'PAGE' => $page,
				'DESCRIPTION' => $description,
			]
		);
	}

	public static function getBugListForAdmin(): array
	{
		$result = BugReportTable::getList(['select' => ['PAGE', 'DESCRIPTION', 'CATEGORY_NAME' => 'CATEGORY.NAME']]);
		return $result->fetchAll();
	}

	public static function getBugCategories()
	{
		$result = \Proj\Independent\Model\BugCategoriesTable::getList(['select' => ['ID','NAME']]);
		return $result->fetchAll();
	}
}
