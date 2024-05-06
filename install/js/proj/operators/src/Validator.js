export class Validator
{
	static htmlReplacement(value)
	{
		let dictionary = {
			'<' : '&#60',
			'>' : '&#62',
			'/' : '&#47',
			"'" : '&#39',
			'"' : '&#34',
			'&' : '&#38',
		};
		Object.keys(dictionary).forEach(key =>{
			value = value.replace(key, dictionary[key])
		});
		return value;

	}
	static isNumeric(value)
	{
		if (!(/^(-?\d+\.\d+)|^-?\d+$/.test(value)))
		{
			return 'Значение не является числом';
		}
		return false;
	}
	static isInteger(value)
	{
		if (!(/^-?\d+$/.test(value)))
		{
			return 'Значение не является целым числом';
		}
		return false;
	}
	static min(value, min)
	{
		if(Validator.isNumeric(value))
		{
			return 'Значение не является числом';
		}
		if (value < min)
		{
			return `Число меньше допустимого минимума (X &#60 ${min})`;
		}
		return false;
	}
	static max(value, max)
	{
		if(Validator.isNumeric(value))
		{
			return 'Значение не является числом';
		}
		if (value > max)
		{
			return `Число больше допустимого максимума (X &#62 ${max})`;
		}
		return false;
	}
	static numberBetween(value, min, max)
	{
		if(Validator.isNumeric(value))
		{
			return 'Значение не является числом';
		}
		if (value < min || value > max)
		{
			return `Число за пределами допустимых значений (${min} &#60 X &#60 ${max})`;
		}
		return false;
	}

	static regExpMatch(value, regExp, pattern = '')
	{
		if(!regExp.test(value))
		{
			return `Значение не соответствует шаблону ${pattern}`;
		}
		return false;
	}

	static maxStringLen(value, max)
	{
		if (value.length > max)
		{
			return `Строка по символам длиннее положенного (${max})`;
		}
		return false;
	}
}
