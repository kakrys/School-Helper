<?php

use Bitrix\Main\Context;

class AddThemeComponent extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->checkRole();
		$this->addTheme();
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

	protected function addTheme()
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$data = $request->getQueryList()->toArray();
		$class = trim($data['class']);
		$subject = trim($data['subject']);
		$this->arResult['CLASS'] = $class;
		$this->arResult['SUBJECT'] = $subject;

		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$data = $request->getPostList()->toArray();

		$themeName = trim($data['NAME']);
		$themeDescription = trim($data['DESCRIPTION']);
		$videoLink = trim($data['VIDEO_LINK']);
		$literatureLink = trim($data['LITERATURE_LINK']);
		$usefulLink = trim($data['USEFUL_LINK']);
		$summaryLink = trim($data['SUMMARY_LINK']);

		$classNotEmpty = $class !== '';
		$subjectNotEmpty = $subject !== '';
		$themeNameNotEmpty = $themeName !== '';
		$themeDescriptionNotEmpty = $themeDescription !== '';
		$videoLinkNotEmpty = $videoLink !== '';
		$literatureLinkNotEmpty = $literatureLink !== '';
		$usefulLinkNotEmpty = $usefulLink !== '';
		$summaryLinkNotEmpty = $summaryLink !== '';

		if (
			$classNotEmpty
			&& $subjectNotEmpty
			&& $themeNameNotEmpty
			&& $themeDescriptionNotEmpty
			&& $videoLinkNotEmpty
			&& $literatureLinkNotEmpty
			&& $usefulLinkNotEmpty
			&& $summaryLinkNotEmpty
		)
		{
			\Proj\Independent\Repository\ThemesRepository::addTheme(
				$class,
				$subject,
				$themeName,
				$themeDescription,
				$videoLink,
				$literatureLink,
				$usefulLink,
				$summaryLink
			);
			LocalRedirect('/admin');
		}
	}

}