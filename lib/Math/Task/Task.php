<?php

namespace Proj\Independent\Math\Task;
use Proj\Independent\Math\Exercise\ExerciseParser;
use Proj\Independent\Math\Objects\Fraction;
use Proj\Independent\Math\Objects\Root;

class Task
{
	private string $exercisePattern;
	private array $numberGeneratorRules;
	private string $renderExercise;
	private string $error = '';
	public string $answer;
	public array $answerArray;

	public function __construct(string $exercisePattern, array $numberGeneratorRules)
	{
		$this->exercisePattern = $exercisePattern;
		$this->numberGeneratorRules = $numberGeneratorRules;
	}
	public function getError():void
	{
		$this->renderExercise = $this->error;
	}

	public function constructExercise(int $seed = null):string
	{
		if ($seed === null)
		{
			mt_srand(microtime(true)*1000000);
		}
		else
		{
			mt_srand($seed);
		}
		$contentForRender = [];
		$rules = $this->numberGeneratorRules;
		for ($i=0; $i < count($rules);$i++)
		{
			$rule = $rules[$i];
			switch ($rule['Type'])
			{
				case 'text':
					$contentForRender[] = ['text', $rule['text']];
					break;
				case 'image':
					$contentForRender[] = ['image', $rule['url']];
					break;
				case 'rand.Text':
					if ($rule['areWeightUnlocked'] === 'true')
					{
						$weightSum = 0;
						foreach ($rule['phrases'] as $phrase => [$text, $weight])
						{
							$weightSum += $weight;
						}
						$randomWeight = mt_rand(0, $weightSum);
						$weightSum = 0;
						foreach ($rule['phrases'] as $phrase => [$text, $weight])
						{
							$weightSum += $weight;
							if ($weightSum >= $randomWeight)
							{
								$contentForRender[] = ['rand.Text', $text];
								break;
							}
						}
					}
					else
					{
						$phrases = [];
						foreach ($rule['phrases'] as $phrase => [$text, $weight])
						{
							$phrases[] = $text;
						}
						$contentForRender[] = ['rand.Text', $phrases[array_rand($phrases)]];
					}
					break;
				case 'check':
					$incorrectPhrases = [];
					$correctPhrases = [];
					foreach ($rule['phrases'] as $phrase => [$text, $isCorrect])
					{
						if ($isCorrect === 'true')
						{
							$correctPhrases[] = $text;
						}
						else
						{
							$incorrectPhrases[] = $text;
						}
					}
					while (count($correctPhrases) > $rule['correctAnswers'])
					{
						unset($correctPhrases[array_rand($correctPhrases)]);
						$correctPhrases = array_values($correctPhrases);
					}
					while (count($incorrectPhrases) + count($correctPhrases) > $rule['usedPhrases'])
					{
						unset($incorrectPhrases[array_rand($incorrectPhrases)]);
						$incorrectPhrases = array_values($incorrectPhrases);
					}
					$resultPrhases = array_merge($correctPhrases, $incorrectPhrases);
					shuffle($resultPrhases);
					$this->answer = '';
					foreach ($correctPhrases as $phrase)
					{
						$this->answer .= array_search($phrase, $resultPrhases)+1;
					}
					$contentForRender[] = ['check', $resultPrhases];
					break;
				case 'customEx':
					$exrc = (new ExerciseParser($rule['exerciseSettings']))->getExerciseInstance();
					$contentForRender[] = ['customEx', $exrc->constructExercise(mode:'inner')];
					$this->answer = $exrc->solve();
					break;
				case 'rand.Number':
					$number = $this->generateNumber($rule['MinNumber'],$rule['MaxNumber'],$rule, $this->parseNumberSettings($rule));
					$contentForRender[] = ['rand.Number', $number];
					$this->answer = $number;
					break;
			}
		}
		$renderObject = new TaskRender($contentForRender);
		return $renderObject->getHtmlView();
	}

	private function parseNumberSettings($rule):array
	{
		$number = '';
		$generatorVariants = [];
		if ($rule['integer'] !== 'false')
		{
			$generatorVariants[] = 'Integer';
		}
		if ($rule['Fraction'] !== ['none'])
		{
			$generatorVariants[] = 'Fraction';
		}
		if ($rule['Root'] !== ['none'])
		{
			$generatorVariants[] = 'Root';
		}
		if ($rule['Absolute'] !== ['none'])
		{
			if($rule['MinNumber'] >= 0)
			{
				$generatorVariants[] = 'Absolute';
			}
		}
		if ($rule['FloatDigits'][0] === 'true' || is_float($rule['MinNumber']) || is_float($rule['MaxNumber']))
		{
			$digitsMin = [0, 0];
			$digitsMax = [0, 0];
			if(is_float($rule['MinNumber']))
			{
				$digitsMin = explode('.',$rule['MinNumber']);
			}
			if(is_float($rule['MaxNumber']))
			{
				$digitsMax = explode('.',$rule['MaxNumber']);
			}
			$rule['FloatDigits'][0] = 'true';
			$rule['FloatDigits'][1] = max(strlen($digitsMin[1]),strlen($digitsMax[1]), $rule['FloatDigits'][1]);
			$generatorVariants[] = 'Float';
		}
		return $generatorVariants;
	}
	private function generateNumber(int $min, int $max, array $rule, array $numberTypes = ['integer'])
	{
		switch ($numberTypes[mt_rand(0,count($numberTypes)-1)])
		{
			case 'Fraction':
				$fraction = Fraction::rand_fraction($rule['MinNumber'], $rule['MaxNumber'], $rule['Fraction']);
				if (!$fraction)
				{
					$this->error = 'Подбор значений занимает слишком много времени! Попробуйте изменить параметры генерации...';
					return false;
				}
				$number = (string)$fraction;
				break;
			case 'Float':
				$deg = $rule['FloatDigits'][1];
				$number =  mt_rand($rule['MinNumber']*pow(10,$deg), $rule['MaxNumber']*pow(10,$deg))/pow(10,$deg);
				break;
			case 'Root':
				if($rule['Combination'] === 'true')
				{
					$newNumberTypes = array_diff($numberTypes, ['Root']);
					$rule['Combination'] = 'false';
					$number = "Root{2N".$this->generateNumber($min, $max, $rule, $newNumberTypes)."}";
				}
				else
				{
					$root = Root::rand_root($rule['MinNumber'], $rule['MaxNumber'], $rule['Root'][0]);
					if (!$root)
					{
						$this->error = 'Подбор значений занимает слишком много времени! Попробуйте изменить параметры генерации...';
						return false;
					}
					$number = $root;
				}
				break;
			case 'Absolute':
				$numberToAdd = mt_rand($rule['MinNumber'], $rule['MaxNumber']);
				if($rule['Combination'] === 'true')
				{
					$newNumberTypes = array_diff($numberTypes, ['Absolute']);
					$rule['Combination'] = 'false';
					$numberToAdd = $this->generateNumber($min, $max, $rule, $newNumberTypes);
				}
				if ($rule['Absolute'] == ['UseModule'])
				{
					if ($numberToAdd < 0)
					{
						$number =  "|$numberToAdd|";
					}
					else
					{
						$number =  "|-$numberToAdd|";
					}
				}
				if ($rule['Absolute'] == ['DontUseModule'])
				{
					$number =  "-" . abs($numberToAdd);
				}
				if ($rule['Absolute'] == ['BothUsingModule'])
				{
					if ($numberToAdd < 0)
					{
						$number =  "|$numberToAdd|";
					}
					else
					{
						$number =  $numberToAdd;
					}
				}
				break;
			default:
				$number =  mt_rand(ceil($rule['MinNumber']), floor($rule['MaxNumber']));
		}
		return $number;
	}
	public function solve(): string
	{
		return $this->answer;
	}
}