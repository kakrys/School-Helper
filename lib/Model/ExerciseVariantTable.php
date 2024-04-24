<?php
namespace Proj\Independent\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class VariantTable
 *
 * Fields:
 * <ul>
 * <li> EXERCISE_ID int mandatory
 * <li> VARIANT_ID int mandatory
 * </ul>
 *
 * @package Bitrix\Exercise
 **/

class ExerciseVariantTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'proj_exercise_variant';
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
				'EXERCISE_ID',
				[
					'primary' => true,
				]
			),
			new IntegerField(
				'VARIANT_ID',
				[
					'primary' => true,
				]
			),
			new Reference(
				'EXERCISE',
				ExerciseTable::class,
				Join::on('this.EXERCISE_ID','ref.ID')
			),
			new Reference(
				'VARIANT',
				VariantTable::class,
				Join::on('this.VARIANT_ID','ref.ID')
			)
		];
	}
}