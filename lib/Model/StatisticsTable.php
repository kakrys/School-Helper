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
 * Class StatisticsTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> USER_ID int mandatory
 * <li> CLASS_NUMBER string(100) mandatory
 * <li> SUBJECT_NAME string(100) mandatory
 * <li> SOLVED_TASKS int optional
 * <li> TASKS_SOLVED_CORRECTLY int optional
 * </ul>
 *
 * @package Bitrix\Statistics
 **/

class StatisticsTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'proj_statistics';
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
					'title' => Loc::getMessage('STATISTICS_ENTITY_ID_FIELD')
				]
			),
			new IntegerField(
				'USER_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('STATISTICS_ENTITY_USER_ID_FIELD')
				]
			),
			new StringField('CLASS_NUMBER'),
			new Reference(
				'CLASS',
				ClassTable::class,
				Join::on('this.CLASS_NUMBER', 'ref.CLASS_NUMBER')
			),
			new StringField('SUBJECT_NAME'),
			new Reference(
				'SUBJECT',
				SubjectTable::class,
				Join::on('this.SUBJECT_NAME', 'ref.SUBJECT_NAME')
			),
			new IntegerField(
				'SOLVED_TASKS',
				[
					'title' => Loc::getMessage('STATISTICS_ENTITY_SOLVED_TASKS_FIELD')
				]
			),
			new IntegerField(
				'TASKS_SOLVED_CORRECTLY',
				[
					'title' => Loc::getMessage('STATISTICS_ENTITY_TASKS_SOLVED_CORRECTLY_FIELD')
				]
			),
		];
	}

	/**
	 * Returns validators for CLASS_NUMBER field.
	 *
	 * @return array
	 */
	public static function validateClassNumber()
	{
		return [
			new LengthValidator(null, 100),
		];
	}

	/**
	 * Returns validators for SUBJECT_NAME field.
	 *
	 * @return array
	 */
	public static function validateSubjectName()
	{
		return [
			new LengthValidator(null, 100),
		];
	}
}
