<?php

use Bitrix\Main\Config\Configuration;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ModuleManager;

Loc::loadMessages(__FILE__);

class proj_independent extends CModule
{
	public $MODULE_ID = 'proj.independent';
	public $MODULE_VERSION;
	public $MODULE_VERSION_DATE;
	public $MODULE_NAME;
	public $MODULE_DESCRIPTION;

	public $PARTNER_NAME;
	public $PARTNER_URI;

	public function __construct()
	{
		$arModuleVersion = [];
		$develop = [];
		include(__DIR__ . '/version.php');

		if (is_array($arModuleVersion) && $arModuleVersion['VERSION'] && $arModuleVersion['VERSION_DATE'])
		{
			$this->MODULE_VERSION = $arModuleVersion['VERSION'];
			$this->MODULE_VERSION_DATE = $arModuleVersion['VERSION_DATE'];
		}

		$this->MODULE_NAME = Loc::getMessage('PROJ_INDEPENDENT_MODULE_NAME');
		$this->MODULE_DESCRIPTION = Loc::getMessage('PROJ_INDEPENDENT_MODULE_DESCRIPTION');
		$this->PARTNER_NAME = $develop["DEVELOPERS"];
		$this->PARTNER_URI = $develop["DEVELOP_SITE"];
	}

	public function installDB(): void
	{
		global $DB;

		$DB->RunSQLBatch($_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/db/install.sql');
		$DB->RunSQLBatch($_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/db/testData.sql');

		ModuleManager::registerModule($this->MODULE_ID);
	}

	public function uninstallDB($arParams = []): void
	{
		global $DB;

		$DB->RunSQLBatch($_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/db/uninstall.sql');

		ModuleManager::unRegisterModule($this->MODULE_ID);
	}

	public function installFiles(): void
	{
		CopyDirFiles(
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/php_interface',
			$_SERVER['DOCUMENT_ROOT'] . '/local/php_interface/',
			true,
			true
		);
		CopyDirFiles(
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/components',
			$_SERVER['DOCUMENT_ROOT'] . '/local/components/',
			true,
			true
		);

		CopyDirFiles(
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/templates',
			$_SERVER['DOCUMENT_ROOT'] . '/local/templates/',
			true,
			true
		);

		CopyDirFiles(
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/routes',
			$_SERVER['DOCUMENT_ROOT'] . '/local/routes/',
			true,
			true
		);

		CopyDirFiles(
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/js',
			$_SERVER['DOCUMENT_ROOT'] . '/local/js/',
			true,
			true
		);

		copy($_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/.htaccess',$_SERVER['DOCUMENT_ROOT']);
		$file = fopen($_SERVER['DOCUMENT_ROOT'] . '/index.php', 'w');
		fwrite($file, `<?php
require_once __DIR__ . '/bitrix/routing_index.php';`);
		fclose($file);
	}

	public function uninstallFiles(): void
	{
		DeleteDirFiles(
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/components/',
			$_SERVER['DOCUMENT_ROOT'] . '/local/components/');
		DeleteDirFiles(
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/templates/',
			$_SERVER['DOCUMENT_ROOT'] . '/local/templates/');
		DeleteDirFiles(
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/routes/',
			$_SERVER['DOCUMENT_ROOT'] . '/local/routes/');
		DeleteDirFiles(
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/php_interface/',
			$_SERVER['DOCUMENT_ROOT'] . '/local/php_interface/');
		DeleteDirFiles(
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/proj.independent/install/js/',
			$_SERVER['DOCUMENT_ROOT'] . '/local/js/');
	}

	public function installEvents(): void
	{
	}

	public function uninstallEvents(): void
	{
	}

	public function doInstall(): void
	{
		global $USER, $APPLICATION;

		if (!$USER->isAdmin())
		{
			return;
		}

		$this->installDB();
		$this->installFiles();
		$this->installEvents();

		$settings = Configuration::getInstance()->get('routing');
		$settings['value']['config'][] = 'independent.php';
		Configuration::getInstance()->add('routing', $settings);
		Configuration::getInstance()->saveConfiguration();
		$APPLICATION->IncludeAdminFile(
			Loc::getMessage('PROJ_INDEPENDENT_INSTALL_TITLE'),
			$_SERVER['DOCUMENT_ROOT'] . '/local/modules/' . $this->MODULE_ID . '/install/step.php'
		);
	}

	public function doUninstall(): void
	{
		global $USER, $APPLICATION, $step;

		if ($USER->isAdmin())
		{
			$step = intval($step);

			if ($step < 2)
			{
				$APPLICATION->IncludeAdminFile(Loc::getMessage('PROJ_INDEPENDENT_UNINSTALL_TITLE'), $_SERVER['DOCUMENT_ROOT'] . '/local/modules/' . $this->MODULE_ID . '/install/unstep1.php');
			}
			elseif ($step == 2)
			{
				$this->uninstallDB();
				$this->uninstallFiles();
				$this->uninstallEvents();

				$GLOBALS["errors"] = $this->errors;

				$APPLICATION->IncludeAdminFile(
					Loc::getMessage('PROJ_INDEPENDENT_UNINSTALL_TITLE'),
					$_SERVER['DOCUMENT_ROOT'] . '/local/modules/' . $this->MODULE_ID . '/install/unstep2.php'
				);
			}
		}

	}
}
