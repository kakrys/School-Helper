<?php

use Bitrix\Main\Context;

class EditThemeComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->checkRole();
		$this->fetchTheme();
		$this->updateTheme();
		$this->includeComponentTemplate();
	}

	protected function checkRole(): void
	{
		$role = \Proj\Independent\Repository\UserRepository::getCurrentUserWorkPosition();
		if (!isset($role) || $role !== 'admin')
		{
			LocalRedirect('/login');
		}
	}

	protected function fetchTheme()
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$themeId = $request->getQueryList()->toArray()['ID'];
		$this->arResult['THEME_ID'] = $themeId;
		$this->arResult['THEME'] = \Proj\Independent\Repository\ThemesRepository::getThemeById($themeId);
	}

	protected function updateTheme()
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		if ($request->isPost())
		{
			$data = $request->getPostList()->toArray();
			$themeID = $data['ID'];
			$themeName = trim($data['NAME']);
			$themeDescription = trim($data['DESCRIPTION']);
			$videoLink = trim($data['VIDEO_LINK']);
			$literatureLink = trim($data['LITERATURE_LINK']);
			$usefulLink = trim($data['USEFUL_LINK']);
			$summaryLink = trim($data['SUMMARY_LINK']);


			$themeNameNotEmpty = $themeName !== '';
			$themeDescriptionNotEmpty = $themeDescription !== '';
			$videoLinkNotEmpty = $videoLink !== '';
			$literatureLinkNotEmpty = $literatureLink !== '';
			$usefulLinkNotEmpty = $usefulLink !== '';
			$summaryLinkNotEmpty = $summaryLink !== '';

			if (
				$themeNameNotEmpty
				&& $themeDescriptionNotEmpty
				&& $videoLinkNotEmpty
				&& $literatureLinkNotEmpty
				&& $usefulLinkNotEmpty
				&& $summaryLinkNotEmpty
			)
			{
				\Proj\Independent\Repository\ThemesRepository::updateThemeInfo($themeID,$themeName,$themeDescription,$videoLink,$literatureLink,$usefulLink,$summaryLink);
				LocalRedirect('/');
			}
		}
	}

}