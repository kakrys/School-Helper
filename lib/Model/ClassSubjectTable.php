<?php
namespace Proj\Independent\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

/**
 * Class SubjectTable
 *
 * Fields:
 * <ul>
 * <li> CLASS_ID int mandatory
 * <li> SUBJECT_ID int mandatory
 * </ul>
 *
 * @package Bitrix\Class
 **/

class ClassSubjectTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'proj_class_subject';
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
				]
			),
			new IntegerField(
				'CLASS_ID',
				[
					'primary' => true,
				]
			),
			new IntegerField(
				'SUBJECT_ID',
				[
					'primary' => true,
				]
			),
			new Reference(
				'CLASS',
			ClassTable::class,
				Join::on('this.CLASS_ID','ref.ID')
			),
			new Reference(
				'SUBJECT',
				SubjectTable::class,
				Join::on('this.SUBJECT_ID','ref.ID')
			)
		];
	}
}