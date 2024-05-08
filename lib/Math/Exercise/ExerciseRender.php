<?php

namespace Proj\Independent\Math\Exercise;

class ExerciseRender
{
	private string $pattern;
	private array $dictionary = [
		'-' => '&#8722',
		];

	public function __construct(string $pattern)
	{
		$this->pattern = $pattern;
	}
	private function findAllRenderBlocks(string $pattern):array
	{
		$bracketsRegExp = '/(?:Root|Deg|Fraction)\{[^{}]*}/';
		$matches = [];
		$blocks = [];
		preg_match_all($bracketsRegExp, $pattern, $matches);
		$replacementCounter = 0;
		while(!empty($matches[0]))
		{
			$object = $matches[0][0];
			$pattern = $this->oneReplacementInAStringByASubstring($object,"[$replacementCounter]",$pattern);
			$object = explode('{', $object);
			$blocks[$replacementCounter] = [$object[0], substr($object[1],0,strlen($object[1])-1)];
			$replacementCounter+=1;
			preg_match_all($bracketsRegExp, $pattern, $matches);
		}
		$blocks[] = ['Standart', $pattern];
		return $blocks;
	}

	private static function oneReplacementInAStringByASubstring(string $search, string $replace, string $subject):string
	{
		$pos = strpos($subject, $search);
		$subject = substr_replace($subject, $replace, $pos, strlen($search));
		return $subject;
	}

	private function deepHtmlInsert(string $pattern, callable $typedInsert, string $operator,int $position, array &$renderBlocks)
	{
		$workString = str_split($pattern);
		$isOperatorApproved = false;
		$forceBrackets = false;
		$addNumberPattern = false;
		$element1 = '';
		$element2 = '';
		for ($j=0; $j<count($workString); $j++)
		{
			if ($workString[$j] === "[")
			{
				if ($workString[$j+1]==='X')
				{
					$forceBrackets = true;
				}
				$pos = '';
				$j++;
				while ($workString[$j] !== ']')
				{
					$pos .= $workString[$j];
					$j++;
				}
				if ($forceBrackets)
				{
					$forceBrackets = false;
					$pos = "[$pos]";
					$addNumberPattern = true;
				}
				$j++;
				if (!str_contains($pos, 'X'))
				{
					if (!$isOperatorApproved)
					{
						$element1 .= $renderBlocks[$pos];
					}
					else
					{
						$element2 .= $renderBlocks[$pos];
					}
					$pos='';
				}
			}
			if ($workString[$j] === $operator)
			{
				$isOperatorApproved = true;
				if ($pos!=='')
				{
					$element1 .= $pos;
				}
				continue;
			}
			if (!$isOperatorApproved)
			{
				if ($addNumberPattern)
				{
					$element1 .= $pos;
					$addNumberPattern = false;

				}
				$element1 .= $workString[$j];
			}
			if ($isOperatorApproved)
			{
				if ($addNumberPattern)
				{
					$element2 .= $pos;
					$addNumberPattern = false;
				}
				$element2 .= $workString[$j];
			}
			$pos = '';
		}
		$renderBlocks[$position] = $typedInsert($element1, $element2);
	}
	private function numberHandling(string $number, callable $typedInsert, string $operator = '')
	{
		$isAbsolute = false;
		$renderString = '';
		$number = str_replace('.',',',$number);
		if (str_contains($number,'-'))
		{
			str_replace('-','',$number);
			$renderString .= $this->insertObjectIntoStandartContainer('&#8722');
		}
		if (str_contains($number,'|'))
		{
			$isNegative = true;
			str_replace('|','',$number);
			$renderString .= $this->insertObjectIntoStandartContainer('|');
		}
		if ($operator!=='')
		{
			$number = explode($operator, $number);
			if ($isAbsolute)
			{
				$renderString .= $typedInsert($number[0],$number[1]);
				$renderString .= $this->insertObjectIntoStandartContainer('|');
			}
			else
			{
				$renderString .= $typedInsert($number[0],$number[1]);
			}
		}
		else
		{
			$renderString .= $this->insertObjectIntoStandartContainer($number);
		}
		return $renderString;
	}
	public function getHtmlView(array $renderNumbers = [])
	{
		$pattern = $this->pattern;
		$pattern = str_split($pattern);
		$count = 0;
		$workString = $pattern;
		for ($i=0; $i<count($workString); $i++)
		{
			if($workString[$i] === 'X')
			{
				$workString[$i] = "[X_$count]";
				$count+=1;
			}
		}
		$pattern = implode('',$workString);
		$pattern = str_split($pattern);
		for ($i = 0; $i<count($renderNumbers); $i++)
		{
			if (str_contains((string)$renderNumbers[$i],'/'))
			{
				$renderNumbers[$i] = $this->numberHandling($renderNumbers[$i],[$this, 'insertObjectIntoFractionPattern'], '/');
				continue;
			}
			if (str_contains((string)$renderNumbers[$i],'N'))
			{
				$renderNumbers[$i] = $this->numberHandling($renderNumbers[$i],[$this, 'insertObjectIntoRootPattern'], 'N');
				continue;
			}
			if (str_contains((string)$renderNumbers[$i],'^'))
			{
				$renderNumbers[$i] = $this->numberHandling($renderNumbers[$i],[$this, 'insertObjectIntoPowerPattern'], '^');
				continue;
			}
			$renderNumbers[$i] = $this->numberHandling($renderNumbers[$i], [$this, 'insertObjectIntoStandartContainer']);
		}
		$pattern = implode('',$pattern);
		$renderBlocks = $this->findAllRenderBlocks($pattern);
		for ($i=0;$i<count($renderBlocks); $i++)
		{
			if ($renderBlocks[$i][0] === 'Fraction')
			{
				$this->deepHtmlInsert($renderBlocks[$i][1],[$this,'insertObjectIntoFractionPattern'],'/',$i,$renderBlocks);
			}
			elseif ($renderBlocks[$i][0] === 'Root')
			{
				$this->deepHtmlInsert($renderBlocks[$i][1],[$this,'insertObjectIntoRootPattern'],'N',$i,$renderBlocks);
			}
			elseif ($renderBlocks[$i][0] === 'Deg')
			{
				$this->deepHtmlInsert($renderBlocks[$i][1],[$this,'insertObjectIntoPowerPattern'],'^',$i,$renderBlocks);
			}
			else
			{
				$renderString = '';
				$workString = $renderBlocks[$i][1];
				$matches = [];
				$numberReplacement = [];
				$postRules = [];
				preg_match_all('/\[\d+]/',$workString,$matches);
				foreach ($matches[0] as $match)
				{
					$pointer = [];
					preg_match('/\d+/',$match,$pointer);
					$workString = str_replace($match,'B',$workString);
					$postRules[] = $pointer[0];
				}
				preg_match_all('/\[X_\d+]/',$workString,$matches);
				foreach ($matches[0] as $match)
				{
					$pointer = [];
					preg_match('/\d+/',$match,$pointer);
					$pointer = $pointer[0];
					$workString = str_replace($match,'X',$workString);
					$numberReplacement[] = $renderNumbers[$pointer];
				}
				$pointer = 0;
				$blockPointer = 0;
				$workString = str_split($workString);
				foreach ($workString as $litera)
				{
					if ($litera === 'X')
					{
						$renderString .= $this->insertObjectIntoStandartContainer($numberReplacement[$pointer]);
						$pointer++;
						continue;
					}
					if ($litera === 'B')
					{
						$renderString .= $this->insertObjectIntoStandartContainer($renderBlocks[$postRules[$blockPointer]]);
						$blockPointer++;
						continue;
					}
					if (in_array($litera, array_keys($this->dictionary)))
					{
						$renderString .= $this->insertObjectIntoStandartContainer($this->dictionary[$litera]);
					}
					elseif ($litera === '*')
					{
						$renderString .= $this->insertObjectIntoStandartContainer($litera,'transform:translateY(2px);');
					}
					else
					{
						$renderString .= $this->insertObjectIntoStandartContainer($litera);
					}
				}
				$renderBlocks[$i] = $renderString;
			}
		}
		$renderPattern = end($renderBlocks);
		for ($i=0; $i<count($renderNumbers);$i++)
		{
			$renderPattern = str_replace("[X_$i]",$renderNumbers[$i],$renderPattern);
		}
		return '<div class="d-flex">'.$renderPattern.'</div>';
	}

	private function insertObjectIntoStandartContainer(string $object, string $translate = ''):string
	{
		return "<div class='d-flex align-self-center align-items-center' style='padding: 1px 1px 1px 1px;$translate'>
					$object
				</div>
			";
	}

	private function insertObjectIntoFractionPattern(string $numerator, string $denominator):string
	{
		return "<div class='d-flex justify-content-center' style='padding: 1px 1px 1px 1px;'>
					<div class='d-flex flex-column'>
						<div class='d-flex align-self-center align-items-center' style='border-bottom: 1px solid black;'>
							$numerator
						</div>
						<div class='d-flex align-self-center align-items-center'>
							$denominator
						</div>
					</div>
				</div>
			";
	}

	private function insertObjectIntoRootPattern(string $exponent, string $number, int $objScaling = 1):string
	{
		$scaleY=1.1+($objScaling-1)*1.5;
		$scaleX=2+($objScaling-1)*0.5;
		if ($exponent==2)
		{
			return "<div class='d-flex' style='justify-content: center; align-items: center;' style='padding: 1px 1px 1px 1px;'>
						<div class='d-flex' style='transform: scaleY($scaleY) scaleX($scaleX);'>
							√
						</div>
						<div class='d-flex' style='border-top: 1px solid black;'>
							$number
						</div>
					</div>";
		}
		else
		{
			return "<div class='d-flex' style='justify-content: center; align-items: center;' style='padding: 1px 1px 1px 1px;'>
						<div class='d-flex' style='font-size: 75%;transform:translateX(3px) translateY(-7px) ;'>
							$exponent
						</div>
						<div class='d-flex' style='transform: scaleY($scaleY) scaleX($scaleX) translateX(-2px);'>
							√
						</div>
						<div class='d-flex' style='border-top: 1px solid black;'>
							$number
						</div>
					</div>";
		}
	}

	private function insertObjectIntoPowerPattern(string $number,string $exponent):string
	{
		return "<div class='d-flex' style='justify-content: center; align-items: center; padding: 1px 1px 1px 1px;'>
					<div class='d-flex align-items-center'>
						$number
					</div>
					<div class='d-flex align-items-center' style='font-size: 75%;transform:translateY(-5px)'>
						$exponent
					</div>
				</div>";
	}
}