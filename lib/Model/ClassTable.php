<?php
namespace Proj\Independent\Model;


use Bitrix\Main\Entity\StringField;
use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\ManyToMany;

/**
 * Class ClassTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> CLASS_NUMBER int mandatory
 * </ul>
 *
 * @package Bitrix\Class
 **/

class ClassTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'proj_class';
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
			new StringField(
				'CLASS_NUMBER',
				[
					'required' => true,
				]
			),
			(new ManyToMany(
				'SUBJECTS',
				SubjectTable::class)
			)->configureTableName('proj_class_subject'),
		];
	}
}