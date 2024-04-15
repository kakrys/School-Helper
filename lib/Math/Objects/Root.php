<?php
namespace Proj\Independent\Math\Objects;
use Proj\Independent\Math\Objects\Fraction;
class Root
{
	public int|float|Fraction $exponent;
	public int|float|Fraction $value;
	public int|float|Fraction $number;

	public function __construct(int|float|Fraction $number, int|float|Fraction $exponent = 2)
	{
		if ($number<0)
		{
			throw new ValueError('Root for negative numbers is not determined!');
		}
		$this->number = $number;
		$this->exponent = $exponent;
		if ($number instanceof Fraction && $exponent instanceof Fraction)
		{
			$this->value = pow($number->value, $exponent->value);
		}
		elseif ($number instanceof Fraction)
		{
			$this->value = pow($number->value, $exponent);
		}
		elseif ($exponent instanceof Fraction)
		{
			$this->value = pow($number, $exponent->value);
		}
		else
		{
			$this->value = pow($this->number, $this->exponent);
		}
	}

	public function __toString():string
	{
		return $this->value;
	}

	public function htmlRender():string
	{
		$html = "
		<div class='d-flex' style='justify-content: center; align-items: center;'>
			<div class='d-flex flex-column'>
				<div class='d-flex' style='font-size: 50%;'>";
		if ($this->exponent instanceof Fraction)
		{
			$html .= $this->exponent->htmlRender();
		}
		else
		{
			$html .= $this->exponent;
		}
		$html .="</div>
				<div style='height: 3vh;'></div>
			</div>
			<div class='d-flex' style='transform: scaleY(2.65);'>
				√
			</div>
			<div class='d-flex' style='border-top: 1px solid black;'>";
		if ($this->number instanceof Fraction)
		{
			$html .= $this->number->htmlRender();
		}
		else
		{
			$html .= $this->number;
		}
		$html .="</div>
		</div>
		";
		return $html;
	}
}