<?php
namespace Proj\Independent\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class ReportTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> CATEGORY_ID int mandatory
 * <li> PAGE string(100) mandatory
 * <li> DESCRIPTION string(1000) mandatory
 * </ul>
 *
 * @package Bitrix\Bug
 **/

class BugReportTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'proj_bug_report';
	}

	/**
	 * Returns entity map definition.
	 *
	 * @return array
	 */
	public static function getMap()
	{
		return [
			new IntegerField(
				'ID',
				[
					'primary' => true,
					'autocomplete' => true,
					'title' => Loc::getMessage('REPORT_ENTITY_ID_FIELD')
				]
			),
			new IntegerField(
				'CATEGORY_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('REPORT_ENTITY_CATEGORY_ID_FIELD')
				]
			),
			new Reference(
				'CATEGORY',
				BugCategoriesTable::class,
				Join::on('this.CATEGORY_ID','ref.ID')
			),
			new StringField(
				'PAGE',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validatePage'],
					'title' => Loc::getMessage('REPORT_ENTITY_PAGE_FIELD')
				]
			),
			new StringField(
				'DESCRIPTION',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateDescription'],
					'title' => Loc::getMessage('REPORT_ENTITY_DESCRIPTION_FIELD')
				]
			),
		];
	}

	/**
	 * Returns validators for PAGE field.
	 *
	 * @return array
	 */
	public static function validatePage()
	{
		return [
			new LengthValidator(null, 100),
		];
	}

	/**
	 * Returns validators for DESCRIPTION field.
	 *
	 * @return array
	 */
	public static function validateDescription()
	{
		return [
			new LengthValidator(null, 1000),
		];
	}
}