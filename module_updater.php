<?php

use Bitrix\Main\ModuleManager;
use Bitrix\Main\Config\Option;

function __independentMigrate(int $nextVersion, callable $callback):void
{
	global $DB;
	$moduleId = 'proj.independent';

	if (!ModuleManager::isModuleInstalled($moduleId))
	{
		return;
	}

	$currentVersion = intval(Option::get($moduleId, '~database_schema_version', 0));

	if ($currentVersion < $nextVersion)
	{
		include_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/classes/general/update_class.php');
		$updater = new \CUpdater();
		$updater->Init('', 'mysql', '', '', $moduleId, 'DB');

		$callback($updater, $DB, 'mysql');
		Option::set($moduleId, '~database_schema_version', $nextVersion);
	}
}

__independentMigrate(2, function($updater, $DB)
{
	//TODO update function
});
