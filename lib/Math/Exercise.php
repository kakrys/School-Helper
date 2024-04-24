<?php

namespace Proj\Independent\Math;
class Exercise
{
	/**
	 * @var string $generatorCode md5 hash
	 */
	private string $generatorCode;
	public string $generatorRules;
	public string $answer;
	public array $answerArray;
	private int $seed;
	private string $stringExercise;
	public array $renderAnswerArray;
	public string $renderAnswer;
	public string $renderExercise;

	public function __construct(string $generatorCode, string $generatorRules)
	{
		$this->generatorCode = $generatorCode;
		$this->seed = intval(hexdec($generatorCode));
		$this->generatorRules = $generatorRules;
		$this->constructExercise();
	}

	public function constructExercise()
	{
		#mt_srand($this->seed);
		$exercise = '';
		$rules = $this->generatorRules;
		while(str_contains($rules, '[X]'))
		{
			$number = (string)mt_rand();
			$rules = str_replace('[X]',$number,$rules);
		}
		$this->stringExercise = $rules;
		$this->renderExercise = $rules;
	}

	public function calculateByCondition()
	{

	}

	private function parse(string $exercise): array|string
	{
		$regExpBracket = '/\([^()]*\)/';
		$regExpAbsolute = '/\|[^()]*\|/';
		$regExpRoot = '/sqrt\[[^()^]+]/';
		$pos = 1;
		$blocks = [];
		while (true)
		{
			switch (true)
			{
				case preg_match($regExpRoot, $exercise, $match):
				case preg_match($regExpAbsolute, $exercise, $match):
				case preg_match($regExpBracket, $exercise, $match):
					$blocks[$pos] = $match[0];
					$exercise = str_replace($match, "[$pos]", $exercise);
					$pos++;
					break;
				default: break 2;
			}
		}
		$blocks[$pos] = $exercise;
		return $blocks;
	}
	private function solve(string $exercise): void
	{
		$blocks = $this->parse($exercise);
		foreach ($blocks as $block => $value)
		{
			if(preg_match_all('/\[\d+\]/',$value, $matches))
			{
				foreach ($matches[0] as $match)
				{
					$pos = str_replace(['[',']'],'',$match);
					$value = str_replace($match, $blocks[$pos], $value);
				}
			}
			$blocks[$block] = \Proj\Independent\Math\Math::calculate($value);
		}
		$this->answer = end($blocks);
		$this->answerArray = $blocks;
	}
}