<?php
class Exercise
{
	private string $generatorCode;
	public string $generatorRules;
	public string $answer;
	private int $seed;
	public string $renderCondition;
	private string $conditionToSolve;

	public function __construct(string $generatorCode, string $generatorRules)
	{
		$this->generatorCode = $generatorCode;
		$this->seed = hexdec($generatorCode);
		$this->generatorRules = $generatorRules;
	}

	public function constructExercise()
	{
		mt_srand($this->seed);
		$exercise = '';
	}

	private function parse(string $exercise): array|string
	{
		$matches = [];
		$blocks = [];
		$pattern = '/\([^()]*\)/';
		$exercise = '(2+3*(9-17)+24-((56*(3-15)*2)-1)';
		preg_match_all($pattern, $exercise, $matches);
	}
	public function solve()
	{

	}
}