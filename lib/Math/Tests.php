<?php
//генерационный тест 1: распределение значений на случайном сиде
function distributionTest(int $maxNumber = 100, int $maxGeneratedValues = 10000000, $seed = [], $mode = 0)
{
	//поле настроек для генерации
	//$maxNumber - Максимальное допустимое к генерации
	//$maxGeneratedValues - Количество генерируемых чисел
	if($seed === [])
	{
		$seed = [
			((int)Date('Y')*(int)Date('s')),
			(((int)Date('m')+(int)Date('d'))*(int)Date('s')),
			((int)Date('i')*(int)Date('s'))
		]; //тестовый seed, основанный на дате и времени
	}
	mt_srand($seed[0]+$seed[1]+$seed[2]);
	#$rand = new Random($seed);
	$values = [];
	for($i = 0; $i < $maxGeneratedValues; $i++)
	{
		$values[] = mt_rand(-$maxNumber,$maxNumber);
	}
	$stat = array_count_values($values);
	$stat_keys = array_keys($stat);
	$mediana = 0;
	$above = 0;
	$under = 0;
	$between = 0;
	if (count($stat)/$maxNumber > 1.0)
	{
		$center = (int)($maxGeneratedValues/(2*$maxNumber + 1));
	}
	else
	{
		$center = (int)($maxGeneratedValues/($maxNumber + 1));
	}
	for ($i = 0; $i < count($stat); $i++)
	{
		$mediana = $mediana + $stat[$stat_keys[$i]]*$stat_keys[$i];
		if ($stat[$stat_keys[$i]] < (int)($center * 0.3)) $under++;
		elseif ($stat[$stat_keys[$i]] > (int)($center * 1.7)) $above++;
		else $between++;
	}
	unset($rand);
	$mediana = (int)($mediana / $maxGeneratedValues);
	if ($mode == 0) var_dump($stat);
	if ($mode == 0)
	{
		echo "Mediana = $mediana\n";
		echo "50%test [$center]: <30% = $under numbers, >70% = $above numbers, >30 and <70 = $between numbers\n";
		echo "Unique numbers: ".count($stat)."\n";
	}
	if ($mode == 1)
	{
		return [
			"Mediana" => $mediana,
			"50%test" => [
				"Center" => $center,
				"<30%" => $under,
				">70%" => $above,
				">30 and <70" => $between,
				"min" => min($stat),
				"max" => max($stat),
				],
			"Unique numbers" => count($stat),
		];
	}
}

function seedsTest(array $seed = [0, 0, 0], int $iterationCount = 3, int $maxValue = 100, int $maxGeneratedValues = 1000)
{
	$percents = $iterationCount ** 3;
	$percentIterator = 0;
	$results = [];
	for ($i = $seed[0]; $i < $seed[0] + $iterationCount; $i++)
	{
		for ($j = $seed[1]; $j < $seed[1] + $iterationCount; $j++)
		{
			for ($k = $seed[2]; $k < $seed[2] + $iterationCount; $k++)
			{
				echo $percentIterator . " points from $percents\n";
				$percentIterator++;
				for($d = 0; $d < $maxGeneratedValues; $d++)
				{
					$predRes = distributionTest($maxValue,$maxGeneratedValues,[$i, $j, $k], 1);
					if ($predRes["Unique numbers"] == $maxValue+1
					&& $predRes['50%test']["min"]<$predRes['50%test']["Center"]*0.5
					&& $predRes['50%test']["max"]>$predRes['50%test']["Center"]*1.5)
					{
						$results["$i, $j, $k"] = $predRes;
					}
				}
			}
		}
	}
	return $results;
}
echo 2/3*10-2/3;