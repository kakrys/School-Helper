<?php

namespace Proj\Independent\Math\Task;

class TaskRender
{
	private array $renderParameters;
	private array $dictionary = [
		'&' => '&amp;',
		'-' => '&#8722',
		'<' => '&lt;',
		'>' => '&gt;',
		'"' => '&quot;',
		"'" => '&apos;',
		];

	public function __construct(array $renderParameters)
	{
		$this->renderParameters = $renderParameters;
	}

	private function htmlTextReplacementByDictionary(string $text):string
	{
		foreach ($this->dictionary as $litera => $value)
		{
			$text = str_replace($litera,$value,$text);
		}
		return $text;
	}

	public function getHtmlView(array $renderParameters = [])
	{
		$renderPattern = '';
		$renderParameters = $this->renderParameters;

		foreach ($renderParameters as $parameter)
		{
			switch ($parameter[0])
			{
				case 'rand.Text':
				case 'text':
					$textToRender = $this->htmlTextReplacementByDictionary($parameter[1]);
					$renderPattern .= $this->insertObjectIntoStandartViewContainer($textToRender);
					break;
				case 'image':
					$renderPattern .= $this->insertUrlIntoImageContainer($parameter[1]);
					break;
				case 'check':
					$renderPattern .= $this->insertObjectIntoCheckContainer($parameter[1]);
					break;
				case 'rand.Number':
				case 'customEx':
					$renderPattern .= $this->insertObjectIntoStandartViewContainer($parameter[1]);
					break;
			}
		}

		return '<div class="d-flex flex-column">'.$renderPattern.'</div>';
	}

	private function insertUrlIntoImageContainer(string $url):string
	{
		return "<div class='d-flex justify-content-center' style='padding: 1px 1px 1px 1px;'>
					<img src='$url' width='100px'>
				</div>";
	}
	private function insertObjectIntoCheckContainer(array $checkVariants):string
	{
		$html = "<div class='d-flex' style='justify-content: center; align-items: center; padding: 1px 1px 1px 1px;'>
					<ol>";
		foreach ($checkVariants as $variant)
		{
			$html .= "<li>".$this->htmlTextReplacementByDictionary($variant)."</li>";
		}

			$html .= "</ol>
				</div>";
		return $html;
	}
	private function insertObjectIntoStandartViewContainer(string $object):string
	{
		return "<div class='d-flex' style='justify-content: center; align-items: center; padding: 1px 1px 1px 1px;'>
					$object
				</div>";
	}

}