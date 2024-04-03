<?php

//it's implementation with additions of itamaraca(c) prn-algorithm
include_once 'Tests.php';
/**
 * Implements prn-generating algorithm and methods to obtain random numbers
 */
class Random
{
	public const STANDARD = 1;
	public const LINE_BREAK = 2;
	public const SEQUENCE_STANDARD = 3;
	public const SEQUENCE_LINE_BREAK = 4;
	public const EXCEPT_NEGATIVES = 0;
	public const ALLOW_NEGATIVES = 1;
	private int $mode;
	private int $negativesMode;
	private array $seed = [];
	private float|int $coefficient = 2.638;
	private int $generatingRange;
	private array $generatedNumbers = [];

	/**
	 * @param int[] $seed array [int1, int2, int3]
	 * @param int $mode STANDART / LINE_BREAK / SEQUENCE_STANDART / SEQUENCE_LINE_BREAK
	 * @param float|int $coefficient value between 1 and 4
	 */
	public function __construct(array $seed, int $mode = Random::STANDARD, int $negatives = Random::EXCEPT_NEGATIVES, float|int $coefficient = 2.638)
	{
		$this->mode = match ($mode) {
			Random::LINE_BREAK => 2,
			Random::SEQUENCE_STANDARD => 3,
			Random::SEQUENCE_LINE_BREAK => 4,
			default => Random::STANDARD,
		};

		$this->negativesMode = match ($negatives) {
			Random::ALLOW_NEGATIVES => 1,
			default => Random::EXCEPT_NEGATIVES,
		};

		if (count($seed) != 3) {
			throw new ValueError("Wrong number count. Expected 3 but got " . count($seed));
		}
		$this->seed = $seed;
		$process = abs($seed[2]-$seed[0]+$seed[1]);
		$result = (int)abs($process * ($coefficient ** (0.5)));
		$this->seed[] = $result;

		if ($coefficient <= 1 || $coefficient >= 4) {
			throw new ValueError("Wrong coefficient. Expected 1<coefficient<4 but got " . $coefficient);
		}
		$this->coefficient = $coefficient;
	}
	private function preGenerationSeedDefinition(): array
	{
		if (count($this->generatedNumbers) < 4)
		{
			$seed = $this->seed;
			if ($this->generatedNumbers != [])
			{
				$seed = array_slice($seed, count($this->generatedNumbers));
				$seed = array_merge($seed, $this->generatedNumbers);
			}
		}
		else
		{
			$seed = array_slice($this->generatedNumbers,-4);
		}
		return $seed;
	}

	private function generatorAlgorithm(int $maxValue): int
	{
		$seed = $this->preGenerationSeedDefinition();
		$process = $seed[3] - $seed[2] + $seed[1] - $seed[0];
		if($this->negativesMode)
		{
			$result = (int)($maxValue - ($process * $this->coefficient ** (0.5)))  % ($maxValue + 1);
		}
		else
		{
			$result = (int)abs($maxValue - ($process * $this->coefficient ** (0.5))) % ($maxValue + 1);
		}
		return $result;
	}

	/**
	 * Provides random number from 0 to $maxValue OR from -$maxValue to $maxValue with ALLOW_NEGATIVES mode. Include both endpoints
	 * @param int $maxValue max cap of random number
	 * @return int random number
	 * @throws Exception $iterations < 1
	 */
	public function randInt(int $maxValue):int
	{
		$result = $this->generatorAlgorithm($maxValue);
		$this->generatedNumbers[] = $result;
		return $result;
	}

	/**
	 * Provides random number from $minValue to $maxValue. Include both endpoints
	 * @param int $minValue min cap of random number
	 * @param int $maxValue max cap of random number
	 * @return int random number
	 * @throws Exception $iterations < 1
	 */
	public function randRange(int $minValue, int $maxValue): int
	{
		if($minValue >= $maxValue)
		{
			throw new Exception("Wrong random number interval. Expected minValue<maxValue, but got $minValue>=$maxValue");
		}
		if($minValue < 0 || $maxValue < 0)
		{
			$this->negativesMode = Random::ALLOW_NEGATIVES;
		}
		if(abs($minValue) > abs($maxValue))
		{
			$result = $this->generatorAlgorithm(abs($minValue));
		}
		else
		{
			$result = $this->generatorAlgorithm(abs($maxValue));
		}
		if ($result > $maxValue)
		{
			$result = $result % $maxValue;
		}
		if ($result < $minValue)
		{
			$result = $result % $minValue;
		}
		return $result;
	}

	/**
	 * @return array
	 */
	public function getSeed(): array
	{
		return $this->seed;
	}

	/**
	 * @return array
	 */
	public function getGeneratedNumbers(): array
	{
		return $this->generatedNumbers;
	}
	public function fullDump():string
	{
		$generatedNumbers = implode(', ', $this->generatedNumbers);
		$seed = implode(', ' ,$this->seed);
		return "Generation seed = [$seed]\nGenerated numbers = [$generatedNumbers]\n";
	}
}
distributionTest();
#var_dump(seedsTest([0,0,0], 2, 1000, 10000));