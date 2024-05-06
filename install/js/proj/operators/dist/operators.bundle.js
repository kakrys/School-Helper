/* eslint-disable */
this.BX = this.BX || {};
this.BX.Proj = this.BX.Proj || {};
(function (exports,main_core) {
	'use strict';

	var Option = /*#__PURE__*/function () {
	  function Option() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Option);
	    this.parameters = {};
	    this.parameters.id = options.id;
	    this.parameters.Type = options.type;
	    this.id = options.id;
	    this.type = options.type;
	    this.color = options.color;
	    this.areEventsRegistered = 0;
	    this.errors = {};
	    this.errorRender = [''];
	    this.optionName = main_core.Loc.getMessage(options.type);
	    this.html = "<span id=\"instruction_".concat(this.id, "\" data-instruction=\"").concat(this.id, "\" onclick=\"generator.showOption(").concat(this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(this.color, ";\">").concat(this.optionName, "</span>");
	  }
	  babelHelpers.createClass(Option, [{
	    key: "updateParameters",
	    value: function updateParameters() {}
	  }, {
	    key: "render",
	    value: function render() {
	      return this.html;
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      return true;
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      return '';
	    }
	  }, {
	    key: "registerEvents",
	    value: function registerEvents() {
	      this.areEventsRegistered = 1;
	    }
	  }, {
	    key: "unregisterEvents",
	    value: function unregisterEvents() {
	      this.areEventsRegistered = 0;
	    }
	  }, {
	    key: "postUpdate",
	    value: function postUpdate() {}
	  }, {
	    key: "getGeneratorData",
	    value: function getGeneratorData() {
	      return this.parameters;
	    }
	  }, {
	    key: "errorHandler",
	    value: function errorHandler() {
	      if (Object.keys(this.errors).length === 0) return true;
	      var check = 0;
	      var position = 0;
	      for (var key in this.errors) {
	        if (this.errors[key] === false) {
	          this.errorRender[position] = '';
	        } else {
	          this.errorRender[position] = this.errors[key];
	          check += 1;
	        }
	        position++;
	      }
	      if (check > 0) {
	        return false;
	      }
	      return true;
	    }
	  }]);
	  return Option;
	}();

	var Validator = /*#__PURE__*/function () {
	  function Validator() {
	    babelHelpers.classCallCheck(this, Validator);
	  }
	  babelHelpers.createClass(Validator, null, [{
	    key: "htmlReplacement",
	    value: function htmlReplacement(value) {
	      var dictionary = {
	        '<': '&#60',
	        '>': '&#62',
	        '/': '&#47',
	        "'": '&#39',
	        '"': '&#34',
	        '&': '&#38'
	      };
	      Object.keys(dictionary).forEach(function (key) {
	        value = value.replace(key, dictionary[key]);
	      });
	      return value;
	    }
	  }, {
	    key: "isNumeric",
	    value: function isNumeric(value) {
	      if (!/^(-?\d+\.\d+)|^-?\d+$/.test(value)) {
	        return 'Значение не является числом';
	      }
	      return false;
	    }
	  }, {
	    key: "isInteger",
	    value: function isInteger(value) {
	      if (!/^-?\d+$/.test(value)) {
	        return 'Значение не является целым числом';
	      }
	      return false;
	    }
	  }, {
	    key: "min",
	    value: function min(value, _min) {
	      if (Validator.isNumeric(value)) {
	        return 'Значение не является числом';
	      }
	      if (value < _min) {
	        return "\u0427\u0438\u0441\u043B\u043E \u043C\u0435\u043D\u044C\u0448\u0435 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0433\u043E \u043C\u0438\u043D\u0438\u043C\u0443\u043C\u0430 (X &#60 ".concat(_min, ")");
	      }
	      return false;
	    }
	  }, {
	    key: "max",
	    value: function max(value, _max) {
	      if (Validator.isNumeric(value)) {
	        return 'Значение не является числом';
	      }
	      if (value > _max) {
	        return "\u0427\u0438\u0441\u043B\u043E \u0431\u043E\u043B\u044C\u0448\u0435 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0433\u043E \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C\u0430 (X &#62 ".concat(_max, ")");
	      }
	      return false;
	    }
	  }, {
	    key: "numberBetween",
	    value: function numberBetween(value, min, max) {
	      if (Validator.isNumeric(value)) {
	        return 'Значение не является числом';
	      }
	      if (value < min || value > max) {
	        return "\u0427\u0438\u0441\u043B\u043E \u0437\u0430 \u043F\u0440\u0435\u0434\u0435\u043B\u0430\u043C\u0438 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 (".concat(min, " &#60 X &#60 ").concat(max, ")");
	      }
	      return false;
	    }
	  }, {
	    key: "regExpMatch",
	    value: function regExpMatch(value, regExp) {
	      var pattern = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	      if (!regExp.test(value)) {
	        return "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ".concat(pattern);
	      }
	      return false;
	    }
	  }, {
	    key: "maxStringLen",
	    value: function maxStringLen(value, max) {
	      if (value.length > max) {
	        return "\u0421\u0442\u0440\u043E\u043A\u0430 \u043F\u043E \u0441\u0438\u043C\u0432\u043E\u043B\u0430\u043C \u0434\u043B\u0438\u043D\u043D\u0435\u0435 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u043D\u043E\u0433\u043E (".concat(max, ")");
	      }
	      return false;
	    }
	  }]);
	  return Validator;
	}();

	var TextOption = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(TextOption, _Option);
	  function TextOption() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, TextOption);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(TextOption).call(this, options));
	    _this.text = '';
	    _this.parameters.text = '';
	    _this.errors = {
	      maxStringLength: false
	    };
	    _this.errorRender = [''];
	    return _this;
	  }
	  babelHelpers.createClass(TextOption, [{
	    key: "showOption",
	    value: function showOption() {
	      this.updateParameters();
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "<div class=\"form-group col-12\">\n\t\t\t\t\t<textarea class=\"form-control\" id=\"textArea_".concat(this.id, "\" rows=\"3\" placeholder=\"\u0412\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0437\u0430\u0434\u0430\u043D\u0438\u044F (\u043D\u0435 \u0431\u043E\u043B\u0435\u0435 400 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432)\"></textarea>\n\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[0], "</span>\n\t\t\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "updateParameters",
	    value: function updateParameters() {
	      this.text = this.parameters.text;
	    }
	  }, {
	    key: "postUpdate",
	    value: function postUpdate() {
	      document.getElementById("textArea_".concat(this.id)).value = this.text;
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      var textContainer = document.getElementById("textArea_".concat(this.id));
	      this.text = textContainer.value;
	      this.errors['maxStringLength'] = Validator.maxStringLen(this.text, 400);
	      this.parameters.text = this.text;
	      return this.errorHandler();
	    }
	  }]);
	  return TextOption;
	}(Option);

	var RandNumberOption = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(RandNumberOption, _Option);
	  function RandNumberOption() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, RandNumberOption);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(RandNumberOption).call(this, options));
	    _this.FloatDigits = 2;
	    _this.MinNumber = 1;
	    _this.MaxNumber = 100;
	    _this.Exclude = [];
	    _this.parameters = {
	      id: _this.id,
	      Type: _this.type,
	      MinNumber: 1,
	      MaxNumber: 100,
	      Exclude: [],
	      FloatDigits: ['false', 0],
	      Fraction: ['AllTypes', 'AnyNumber', 'AnyShortedType'],
	      Absolute: ['none'],
	      Root: ['none'],
	      integer: 'true',
	      Combination: 'false'
	    };
	    _this.errors = {
	      minNumber: false,
	      maxNumber: false,
	      Exclude: false,
	      FloatDigits: false
	    };
	    _this.viewParameters = [['collapsed', 'false', '', ''], ['collapsed', 'false', '', ''], ['collapsed', 'false', '', ''], ['collapsed', 'false', '', ''], 'checked="true"', ''];
	    _this.errorRender = ['', '', '', ''];
	    _this.FractionType = ['', '', '', 'checked="true"'];
	    _this.FractionNumber = ['', '', 'checked="true"'];
	    _this.FractionView = ['', '', 'checked="true"'];
	    _this.RootType = ['', '', 'checked="true"'];
	    _this.AbsoluteModule = ['', '', 'checked="true"'];
	    return _this;
	  }
	  babelHelpers.createClass(RandNumberOption, [{
	    key: "save",
	    value: function save() {
	      var _this2 = this;
	      this.minNumberContainer = document.querySelector("[id^=\"textArea_".concat(this.id, "_1\"]"));
	      this.maxNumberContainer = document.querySelector("[id^=\"textArea_".concat(this.id, "_2\"]"));
	      this.excludeNumberContainer = document.querySelector("[id^=\"textArea_".concat(this.id, "_3\"]"));
	      this.floatCountContainer = document.querySelector("[id^=\"textArea_".concat(this.id, "_4\"]"));
	      var minNumber = this.minNumberContainer.value;
	      var maxNumber = this.maxNumberContainer.value;
	      this.errors['minNumber'] = Validator.numberBetween(minNumber, -1000000, 1000000);
	      this.errors['maxNumber'] = Validator.numberBetween(maxNumber, -1000000, 1000000);
	      var workString = this.excludeNumberContainer.value.replace(/\s/g, '');
	      if (workString !== '') {
	        this.errors['Exclude'] = Validator.regExpMatch(workString, /^\d+(\.\d+)?(,\d+(\.\d+)?)*$/, '[только числа и запятые с пробелами]');
	      }
	      if (!Validator.isNumeric(minNumber) && !Validator.isNumeric(maxNumber) && Number(minNumber) > Number(maxNumber)) {
	        var _ref = [maxNumber, minNumber];
	        minNumber = _ref[0];
	        maxNumber = _ref[1];
	      }
	      this.parameters = {
	        id: this.id,
	        Type: this.type,
	        MinNumber: minNumber,
	        MaxNumber: maxNumber,
	        Exclude: this.excludeNumberContainer.value.split(/[,\s]+/),
	        FloatDigits: ['false', 0],
	        Fraction: ['none'],
	        Root: ['none'],
	        Absolute: ['none'],
	        integer: 'false',
	        Combination: 'false'
	      };
	      this.checkButtonElements = document.querySelectorAll('.form-check-input[aria-expanded="true"]');
	      this.checkButtonElements.forEach(function (element) {
	        if (element.getAttribute('aria-controls') === "FractionCollapse") {
	          var checkButtons = document.querySelector('[id="FractionCollapse"]').querySelectorAll('.form-check-input[checked="true"]');
	          var properties = [];
	          checkButtons.forEach(function (button) {
	            properties.push(button.getAttribute('value'));
	          });
	          if (properties.length !== 0) {
	            _this2.parameters.Fraction = properties;
	          }
	        }
	        if (element.getAttribute('aria-controls') === "RootCollapse") {
	          var _checkButtons = document.querySelector('[id="RootCollapse"]').querySelectorAll('.form-check-input[checked="true"]');
	          var _properties = [];
	          _checkButtons.forEach(function (button) {
	            _properties.push(button.getAttribute('value'));
	          });
	          if (_properties.length !== 0) {
	            _this2.parameters.Root = _properties;
	          }
	        }
	        if (element.getAttribute('aria-controls') === "AbsCollapse") {
	          var _checkButtons2 = document.querySelector('[id="AbsCollapse"]').querySelectorAll('.form-check-input[checked="true"]');
	          var _properties2 = [];
	          _checkButtons2.forEach(function (button) {
	            _properties2.push(button.getAttribute('value'));
	          });
	          if (_properties2.length !== 0 && _this2.parameters.MinNumber > 0) {
	            _this2.parameters.Absolute = _properties2;
	          }
	        }
	        if (element.getAttribute('aria-controls') === "FloatCollapse") {
	          if (_this2.floatCountContainer.value !== null && _this2.floatCountContainer.value !== '0') {
	            _this2.parameters.FloatDigits = ['true', _this2.floatCountContainer.value];
	          }
	        }
	      });
	      if (this.parameters.MinNumber.toString().includes('.') || this.parameters.MaxNumber.toString().includes('.')) {
	        var _minNumber = 0;
	        var _maxNumber = 0;
	        if (this.parameters.MinNumber.toString().includes('.')) {
	          _minNumber = this.parameters.MinNumber.toString().split('.')[1].length;
	        }
	        if (this.parameters.MaxNumber.toString().includes('.')) {
	          _maxNumber = this.parameters.MaxNumber.toString().split('.')[1].length;
	        }
	        this.parameters.FloatDigits = ['true', Math.max(_minNumber, _maxNumber)];
	      }
	      var integerButton = document.getElementById("IntegerCheckDefault");
	      if (integerButton.getAttribute('checked') === 'true') {
	        this.parameters.integer = 'true';
	      }
	      var typesCount = 0;
	      if (this.parameters.Fraction[0] !== 'none') {
	        typesCount++;
	      }
	      if (this.parameters.Root[0] !== 'none') {
	        typesCount++;
	      }
	      if (this.parameters.Absolute[0] !== 'none') {
	        typesCount++;
	      }
	      if (this.parameters.FloatDigits[0] !== 'false') {
	        typesCount++;
	      }
	      if (this.parameters.integer !== 'false') {
	        typesCount++;
	      }
	      if (typesCount === 0) {
	        this.parameters.integer = 'true';
	      }
	      var combinationButton = document.getElementById("CombinationCheckDefault");
	      if (combinationButton.getAttribute('checked') === 'true') {
	        this.parameters.Combination = 'true';
	      }
	      if (typesCount < 2) {
	        this.parameters.Combination = 'false';
	      }
	      this.errors['FloatDigits'] = Validator.numberBetween(this.parameters.FloatDigits[1], 0, 6);
	      if (!Validator.isInteger(this.parameters.FloatDigits[1])) {
	        this.errors['FloatDigits'] = Validator.isInteger(this.parameters.FloatDigits[1]);
	      }
	      this.unregisterEvents();
	      return this.errorHandler();
	    }
	  }, {
	    key: "updateParameters",
	    value: function updateParameters() {
	      var _this3 = this;
	      this.viewParameters = [['collapsed', 'false', '', ''], ['collapsed', 'false', '', ''], ['collapsed', 'false', '', ''], ['collapsed', 'false', '', ''], '', ''];
	      if ('MinNumber' in this.parameters) {
	        this.MinNumber = this.parameters.MinNumber;
	      }
	      if ('MaxNumber' in this.parameters) {
	        this.MaxNumber = this.parameters.MaxNumber;
	      }
	      if ('FloatDigits' in this.parameters && this.parameters.FloatDigits[0] === 'true') {
	        this.viewParameters[1] = ['', 'true', 'checked="true"', 'show'];
	        this.FloatDigits = this.parameters.FloatDigits[1];
	      }
	      if ('Exclude' in this.parameters) {
	        this.Exclude = this.parameters.Exclude.join(',');
	      }
	      if ('Fraction' in this.parameters && this.parameters.Fraction[0] !== 'none') {
	        this.viewParameters[0] = ['', 'true', 'checked="true"', 'show'];
	        this.FractionType = ['', '', '', ''];
	        this.FractionNumber = ['', '', ''];
	        this.FractionView = ['', '', ''];
	        this.parameters.Fraction.forEach(function (param) {
	          switch (param) {
	            case 'Correct':
	              _this3.FractionType[0] = 'checked="true"';
	              break;
	            case 'Incorrect':
	              _this3.FractionType[1] = 'checked="true"';
	              break;
	            case 'Complex':
	              _this3.FractionType[2] = 'checked="true"';
	              break;
	            case 'AllTypes':
	              _this3.FractionType[3] = 'checked="true"';
	              break;
	            case 'Rational':
	              _this3.FractionNumber[0] = 'checked="true"';
	              break;
	            case 'Irrational':
	              _this3.FractionNumber[1] = 'checked="true"';
	              break;
	            case 'AnyNumber':
	              _this3.FractionNumber[2] = 'checked="true"';
	              break;
	            case 'Not-shortened':
	              _this3.FractionView[0] = 'checked="true"';
	              break;
	            case 'Shortened':
	              _this3.FractionView[1] = 'checked="true"';
	              break;
	            case 'AnyShortedType':
	              _this3.FractionView[2] = 'checked="true"';
	              break;
	          }
	        });
	      }
	      if ('Root' in this.parameters && this.parameters.Root[0] !== 'none') {
	        this.viewParameters[2] = ['', 'true', 'checked="true"', 'show'];
	        this.RootType = ['', '', ''];
	        this.parameters.Root.forEach(function (param) {
	          switch (param) {
	            case 'Irrational':
	              _this3.RootType[0] = 'checked="true"';
	              break;
	            case 'Rational':
	              _this3.RootType[1] = 'checked="true"';
	              break;
	            case 'AnyType':
	              _this3.RootType[2] = 'checked="true"';
	              break;
	          }
	        });
	      }
	      if ('Absolute' in this.parameters && this.parameters.Absolute[0] !== 'none') {
	        this.viewParameters[3] = ['', 'true', 'checked="true"', 'show'];
	        this.AbsoluteModule = ['', '', ''];
	        this.parameters.Absolute.forEach(function (param) {
	          switch (param) {
	            case 'UseModule':
	              _this3.AbsoluteModule[0] = 'checked="true"';
	              break;
	            case 'DontUseModule':
	              _this3.AbsoluteModule[1] = 'checked="true"';
	              break;
	            case 'BothUsingModule':
	              _this3.AbsoluteModule[2] = 'checked="true"';
	              break;
	          }
	        });
	      }
	      if ('integer' in this.parameters && this.parameters.integer === 'true') {
	        this.viewParameters[4] = 'checked="true"';
	      }
	      if ('Combination' in this.parameters && this.parameters.Combination === 'true') {
	        this.viewParameters[5] = 'checked="true"';
	      }
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      this.updateParameters();
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t<p>\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430</p>\n\t\t<div class=\"d-flex flex-column col-12\">\n\t\t\t<label>\u0423\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438. <i>\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u043E\u0442 1 \u0434\u043E 100.</i></label>\n\t\t\t<span>\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u044B\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E</span>\n\t\t\t<div class=\"d-flex col-12\">\n\t\t\t\t<div class=\"d-flex flex-column col-6\">\n\t\t\t\t\t<input class=\"form-control\" id=\"textArea_".concat(this.id, "_1\" placeholder=\"\u041C\u0438\u043D.\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 (\u043D\u0435 \u043C\u0435\u043D\u044C\u0448\u0435 -1000000)\">\n\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[0], "</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"d-flex flex-column col-6\">\n\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "_2\" placeholder=\"\u041C\u0430\u043A\u0441.\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 (\u043D\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 1000000)\">\n\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[1], "</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"d-flex flex-column col-12\">\n\t\t\t<label>\u0418\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0447\u0438\u0441\u0435\u043B. <i>\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0439 \u043D\u0435\u0442</i></label>\n\t\t\t<div class=\"d-flex\">\n\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "_3\" placeholder=\"\u041F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0438\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 \u0437\u0430\u043F\u044F\u0442\u0443\u044E\">\n\t\t\t</div>\n\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[2], "</span>\n\t\t\t<i>\u0418\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0434\u043B\u044F \u0446\u0435\u043B\u044B\u0445 \u0447\u0438\u0441\u0435\u043B, \u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0447\u0438\u0441\u0435\u043B \u0438 \u0434\u0435\u0441\u044F\u0442\u0438\u0447\u043D\u044B\u0445 \u0434\u0440\u043E\u0431\u0435\u0439</i>\n\t\t</div>\n\t\t<a><i>\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0446\u0435\u043B\u044B\u0435 \u0447\u0438\u0441\u043B\u0430 \u0438 \u0434\u0440\u043E\u0431\u0438 \u0431\u0435\u0437 \u0438\u0441\u043A\u043B\u044E\u0447\u0451\u043D\u043D\u044B\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u0438 \u0431\u0435\u0437 \u043A\u043E\u0440\u043D\u0435\u0439</i></a>\n\t\t<p>\u0413\u0438\u0431\u043A\u0430\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430</p>\n\t\t<a>\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u043A \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438</a>\n\t\t<i>\u041F\u0440\u0438 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0438 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u043F\u0443\u043D\u043A\u0442\u043E\u0432. \u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0432\u044B\u0431\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u0446\u0435\u043B\u044B\u0435 \u0447\u0438\u0441\u043B\u0430!</i>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input\" type=\"checkbox\" value=\"Integer\" id=\"IntegerCheckDefault\" ").concat(this.viewParameters[4], ">\n\t\t\t<label class=\"form-check-label\" for=\"IntegerCheckDefault\">\n\t\t\t\t\u0426\u0435\u043B\u044B\u0435 \u0447\u0438\u0441\u043B\u0430\n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input ").concat(this.viewParameters[0][0], "\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\" data-bs-toggle=\"collapse\" href=\"#FractionCollapse\" role=\"button\" aria-expanded=\"").concat(this.viewParameters[0][1], "\" aria-controls=\"FractionCollapse\" ").concat(this.viewParameters[0][2], ">\n\t\t\t<label class=\"form-check-label\" for=\"flexCheckDefault\">\n\t\t\t\t\u0414\u0440\u043E\u0431\u0438 \n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"border collapse ").concat(this.viewParameters[0][3], "\" id=\"FractionCollapse\" style=\"width:100%;\">\n\t\t\t<div class=\"d-flex\" style=\"width:100%;\">\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:33%;\">\n\t\t\t\t\t<a>\u0412\u0438\u0434 \u0434\u0440\u043E\u0431\u0438</a>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionType\" id=\"RadioFractionType1\" value=\"Correct\" ").concat(this.FractionType[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionType1\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionType\" id=\"RadioFractionType2\" value=\"Incorrect\" ").concat(this.FractionType[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionType2\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionType\" id=\"RadioFractionType3\" value=\"Complex\" ").concat(this.FractionType[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionType3\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u0441\u043C\u0435\u0448\u0430\u043D\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionType\" id=\"RadioFractionType4\" value=\"AllTypes\" ").concat(this.FractionType[3], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionType4\">\n\t\t\t\t\t\t\t\u041B\u044E\u0431\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:33%;\">\n\t\t\t\t\t<a>\u0427\u0438\u0441\u043B\u043E\u0432\u044B\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438</a>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionNumber\" id=\"RadioFractionNumber1\" value=\"Rational\" ").concat(this.FractionNumber[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionNumber1\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionNumber\" id=\"RadioFractionNumber2\" value=\"Irrational\" ").concat(this.FractionNumber[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionNumber2\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u0438\u0440\u0440\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionNumber\" id=\"RadioFractionNumber3\" value=\"AnyNumber\" ").concat(this.FractionNumber[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionNumber3\">\n\t\t\t\t\t\t\t\u041B\u044E\u0431\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:33%;\">\n\t\t\t\t\t<a>\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u0440\u043E\u0431\u0438</a>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionView\" id=\"RadioFractionView1\" value=\"Not-shortened\" ").concat(this.FractionView[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionView1\">\n\t\t\t\t\t\t\t\u0422\u0440\u0435\u0431\u0443\u0435\u0442 \u0441\u043E\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u044F\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionView\" id=\"RadioFractionView2\" value=\"Shortened\" ").concat(this.FractionView[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionView2\">\n\t\t\t\t\t\t\t\u041D\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0441\u043E\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u044F\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionView\" id=\"RadioFractionView3\" value=\"AnyShortedType\" ").concat(this.FractionView[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionView3\">\n\t\t\t\t\t\t\t\u041B\u044E\u0431\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input ").concat(this.viewParameters[1][0], "\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\" data-bs-toggle=\"collapse\" href=\"#FloatCollapse\" role=\"button\" aria-expanded=\"").concat(this.viewParameters[1][1], "\" aria-controls=\"FloatCollapse\" ").concat(this.viewParameters[1][2], ">\n\t\t\t<label class=\"form-check-label\" for=\"flexCheckDefault\">\n\t\t\t\t\u0414\u0435\u0441\u044F\u0442\u0438\u0447\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438 (\u0447\u0438\u0441\u043B\u0430 \u0441 \u0437\u0430\u043F\u044F\u0442\u043E\u0439). \u041F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F, \u0435\u0441\u043B\u0438 \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0430\u0445 \u0435\u0441\u0442\u044C \u0434\u0440\u043E\u0431\u0438.\n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"collapse ").concat(this.viewParameters[1][3], "\" id=\"FloatCollapse\" style=\"width:100%;\">\n\t\t\t<div class=\"d-flex border\" style=\"width:100%;\">\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:100%;\">\n\t\t\t\t\t<a>\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0437\u043D\u0430\u043A\u043E\u0432 \u0437\u0430 \u0437\u0430\u043F\u044F\u0442\u043E\u0439 (\u0417\u043D\u0430\u043A\u043E\u0432 \u0437\u0430 \u0437\u0430\u043F\u044F\u0442\u043E\u0439 \u0431\u0443\u0434\u0435\u0442 \u043C\u0435\u043D\u044C\u0448\u0435 \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u043C\u0443 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0443)</a>\n\t\t\t\t\t<div class=\"d-flex flex-column col-12\">\n\t\t\t\t\t\t<div class=\"d-flex\">\n\t\t\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "_4\" placeholder=\"\u0424\u043E\u0440\u043C\u0430\u0442: 0<'\u0446\u0435\u043B\u043E\u0435 \u0447\u0438\u0441\u043B\u043E'<6\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[3], "</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input ").concat(this.viewParameters[2][0], "\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\" data-bs-toggle=\"collapse\" href=\"#RootCollapse\" role=\"button\" aria-expanded=\"").concat(this.viewParameters[2][1], "\" aria-controls=\"RootCollapse\" ").concat(this.viewParameters[2][2], ">\n\t\t\t<label class=\"form-check-label\" for=\"flexCheckDefault\">\n\t\t\t\t\u041A\u043E\u0440\u043D\u0438\n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"collapse ").concat(this.viewParameters[2][3], "\" id=\"RootCollapse\" style=\"width:100%;\">\n\t\t\t<div class=\"d-flex border\" style=\"width:100%;\">\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:100%;\">\n\t\t\t\t\t<a>\u0412\u0438\u0434 \u043A\u043E\u0440\u043D\u0435\u0439</a>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioRootType\" id=\"RadioRootType1\" value=\"Irrational\" ").concat(this.RootType[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioRootType1\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u0438\u0440\u0440\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u0440\u043D\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioRootType\" id=\"RadioRootType2\" value=\"Rational\" ").concat(this.RootType[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioRootType2\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u0440\u043D\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioRootType\" id=\"RadioRootType3\" value=\"AnyType\" ").concat(this.RootType[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioRootType3\">\n\t\t\t\t\t\t\t\u041B\u044E\u0431\u044B\u0435 \u043A\u043E\u0440\u043D\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input ").concat(this.viewParameters[3][0], "\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\"  data-bs-toggle=\"collapse\" href=\"#AbsCollapse\" role=\"button\" aria-expanded=\"").concat(this.viewParameters[3][1], "\" aria-controls=\"AbsCollapse\" ").concat(this.viewParameters[3][2], ">\n\t\t\t<label class=\"form-check-label\" for=\"flexCheckDefault\">\n\t\t\t\t\u041E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0447\u0438\u0441\u043B\u0430 (\u0438\u0433\u043D\u043E\u0440\u0438\u0440\u0443\u0435\u0442\u0441\u044F, \u0435\u0441\u043B\u0438 \u0443\u043A\u0430\u0437\u0430\u043D \u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D)\n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"collapse ").concat(this.viewParameters[3][3], "\" id=\"AbsCollapse\" style=\"width:100%;\">\n\t\t\t<div class=\"d-flex border\" style=\"width:100%;\">\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:100%;\">\n\t\t\t\t\t<a>\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0447\u0438\u0441\u0435\u043B</a>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"AbsVar\" id=\"AbsVar1\" value=\"UseModule\" ").concat(this.AbsoluteModule[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"AbsVar1\">\n\t\t\t\t\t\t\t\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043C\u043E\u0434\u0443\u043B\u044C\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"AbsVar\" id=\"AbsVar2\" value=\"DontUseModule\" ").concat(this.AbsoluteModule[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"AbsVar2\">\n\t\t\t\t\t\t\t\u041D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043C\u043E\u0434\u0443\u043B\u044C\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"AbsVar\" id=\"AbsVar3\" value=\"BothUsingModule\" ").concat(this.AbsoluteModule[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"AbsVar3\">\n\t\t\t\t\t\t\t\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0441\u043B\u0443\u0447\u0430\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input\" type=\"checkbox\" value=\"Combination\" id=\"CombinationCheckDefault\" ").concat(this.viewParameters[5], ">\n\t\t\t<label class=\"form-check-label\" for=\"CombinationCheckDefault\">\n\t\t\t\t\u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0442\u044C \u043A\u043E\u043C\u0431\u0438\u043D\u0430\u0446\u0438\u044E \u0442\u0438\u043F\u043E\u0432 (\"\u0434\u0440\u043E\u0431\u044C \u043F\u043E\u0434 \u043A\u043E\u0440\u043D\u0435\u043C\", \"\u0434\u0435\u0441\u044F\u0442\u0438\u0447\u043D\u0430\u044F \u0434\u0440\u043E\u0431\u044C \u0432 \u043C\u043E\u0434\u0443\u043B\u0435\" \u0438 \u0442\u0430\u043A \u0434\u0430\u043B\u0435\u0435)\n\t\t\t</label>\n\t\t</div>\n\t\t");
	      return html;
	    }
	  }, {
	    key: "postUpdate",
	    value: function postUpdate() {
	      document.querySelector("[id^=\"textArea_".concat(this.id, "_1\"]")).value = this.MinNumber;
	      document.querySelector("[id^=\"textArea_".concat(this.id, "_2\"]")).value = this.MaxNumber;
	      document.querySelector("[id^=\"textArea_".concat(this.id, "_3\"]")).value = this.Exclude;
	      document.querySelector("[id^=\"textArea_".concat(this.id, "_4\"]")).value = this.FloatDigits;
	    }
	  }, {
	    key: "registerEvents",
	    value: function registerEvents() {
	      if (this.areEventsRegistered === 0) {
	        this.areEventsRegistered = 1;
	        this.radioButtons = document.querySelectorAll('.form-check-input[type="radio"]');
	        var but = this.radioButtons;
	        this.radioButtons.forEach(function (element) {
	          element.addEventListener('click', function (event) {
	            but.forEach(function (butt) {
	              if (butt.parentNode.parentNode === event.target.parentNode.parentNode) {
	                butt.removeAttribute('checked');
	              }
	            });
	            event.target.setAttribute('checked', "true");
	          });
	        });
	        var integerButton = document.getElementById("IntegerCheckDefault");
	        integerButton.addEventListener('click', function (event) {
	          if (event.target.getAttribute('checked') === 'true') {
	            event.target.setAttribute('checked', 'false');
	          } else {
	            event.target.setAttribute('checked', 'true');
	          }
	        });
	        var combinationButton = document.getElementById("CombinationCheckDefault");
	        combinationButton.addEventListener('click', function (event) {
	          if (event.target.getAttribute('checked') === 'true') {
	            event.target.setAttribute('checked', 'false');
	          } else {
	            event.target.setAttribute('checked', 'true');
	          }
	        });
	      }
	    }
	  }, {
	    key: "unregisterEvents",
	    value: function unregisterEvents() {
	      if (this.areEventsRegistered === 1) {
	        this.areEventsRegistered = 0;
	        this.radioButtons = document.querySelectorAll('.form-check-input[type="radio"]');
	        this.radioButtons.forEach(function (element) {
	          element.removeEventListener('click', function (event) {});
	        });
	        var integerButton = document.getElementById("IntegerCheckDefault");
	        integerButton.removeEventListener('click', function (event) {});
	        var combinationButton = document.getElementById("CombinationCheckDefault");
	        combinationButton.removeEventListener('click', function (event) {});
	      }
	    }
	  }, {
	    key: "getGeneratorData",
	    value: function getGeneratorData() {
	      return this.parameters;
	    }
	  }]);
	  return RandNumberOption;
	}(Option);

	var ImageOption = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(ImageOption, _Option);
	  function ImageOption() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, ImageOption);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(ImageOption).call(this, options));
	  }
	  babelHelpers.createClass(ImageOption, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += '<div class="mb-3"><label for="formFile" class="form-label">Выберите картинку</label> <input class="form-control" type="file" id="formFile"> </div>';
	      return html;
	    }
	  }]);
	  return ImageOption;
	}(Option);

	var CheckOption = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(CheckOption, _Option);
	  function CheckOption() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, CheckOption);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(CheckOption).call(this, options));
	    _this.text = '';
	    _this.parameters.correctAnswers = 1;
	    _this.parameters.usedPhrases = 4;
	    _this.inputCounter = 0;
	    _this.innerContainer = [];
	    _this.errorRender = [];
	    _this.errors = [];
	    _this.additionErrors = {
	      answerCount: false,
	      correctAnswers: false,
	      usedPhrasesCount: false,
	      usedPhrases: false,
	      answerAndPhrasesCount: false
	    };
	    _this.additionErrorRenders = ['', '', '', '', ''];
	    _this.correctCountError = '';
	    _this.buttons = null;
	    _this.viewParameters = [];
	    return _this;
	  }
	  babelHelpers.createClass(CheckOption, [{
	    key: "postUpdate",
	    value: function postUpdate() {
	      var _this2 = this;
	      var inputs = document.querySelectorAll("[id^=\"form_".concat(this.id, "_\"]"));
	      inputs.forEach(function (element) {
	        element.querySelector("[id^=\"textArea_".concat(_this2.id, "_\"]")).value = _this2.innerContainer[element.id][0];
	      });
	      document.getElementById("textArea_".concat(this.id, "-correct")).value = this.parameters.correctAnswers;
	      document.getElementById("textArea_".concat(this.id, "-all")).value = this.parameters.usedPhrases;
	    }
	  }, {
	    key: "updateParameters",
	    value: function updateParameters() {
	      this.viewParameters = [];
	      var index = 0;
	      for (var element in this.parameters.phrases) {
	        if (this.parameters.phrases[element][1]) {
	          this.viewParameters[index] = 'checked="true"';
	        } else {
	          this.viewParameters[index] = '';
	        }
	        index++;
	      }
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      this.updateParameters();
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t<div>\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432 \u0432\u0435\u0440\u043D\u044B\u0445 \u043E\u0442\u0432\u0435\u0442\u043E\u0432</div>\n\t\t\t<div class=\"d-flex col-12\">\n\t\t\t\t<div class=\"d-flex flex-column col-6\">\n\t\t\t\t\t\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0432\u0435\u0440\u043D\u044B\u0445 \u0444\u0440\u0430\u0437 \u0432 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438\n\t\t\t\t\t<input class=\"form-control\" id=\"textArea_".concat(this.id, "-correct\" placeholder=\"1<X<\u0432\u0435\u0440\u043D\u044B\u0445 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432\">\n\t\t\t\t\t<span style=\"color:orangered\">").concat(this.additionErrorRenders[0], "</span>\n\t\t\t\t\t<span style=\"color:orangered\">").concat(this.additionErrorRenders[1], "</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"d-flex flex-column col-6\">\n\t\t\t\t\t\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0444\u0440\u0430\u0437 \u0437\u0430 \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044E\n\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "-all\" placeholder=\"1<X<\u0432\u0441\u0435\u0433\u043E \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432\">\n\t\t\t\t\t<span style=\"color:orangered\">").concat(this.additionErrorRenders[2], "</span>\n\t\t\t\t\t<span style=\"color:orangered\">").concat(this.additionErrorRenders[3], "</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<span style=\"color:orangered\">").concat(this.additionErrorRenders[4], "</span>\n\t\t\t<label>\u0412\u043F\u0438\u0448\u0438\u0442\u0435 \u0443\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0438 \u043E\u0442\u043C\u0435\u0442\u044C\u0442\u0435 \u0432\u0435\u0440\u043D\u044B\u0435</label>\n\t\t\t<div id=\"inputTextContainer\" style=\"width:95%;\">");
	      if (Object.keys(this.innerContainer) !== 0) {
	        this.errors = [];
	        var renderCount = 0;
	        for (var part in this.innerContainer) {
	          html += "\n\t\t\t\t\t<div class=\"row row-cols-12\" id=\"".concat(part, "\">\n\t\t\t\t\t\t<div class=\"col-10\" style=\"padding: 1%;\">\n\t\t\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "_").concat(renderCount, "\"placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0433\u043E \u0432\u044B\u0431\u043E\u0440\u0430 (\u043C\u0430\u043A\u0441 200 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432)\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"form-check col-2 align-self-center\">\n\t\t\t\t\t\t\t<input class=\"form-check-input\" type=\"checkbox\" value=\"Correct\" id=\"CorrectCheck_").concat(renderCount, "\" ").concat(this.viewParameters[renderCount], ">\n\t\t\t\t\t\t\t<label class=\"form-check-label\" for=\"CorrectCheck_").concat(renderCount, "\">\n\t\t\t\t\t\t\t\t\u0412\u0435\u0440\u043D\u043E\u0435\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[renderCount], "</span>\n\t\t\t\t\t</div>");
	          this.errors.push(false);
	          renderCount++;
	        }
	      }
	      html += "</div>";
	      html += "\n\t\t\t\t<span style=\"color:orangered\">".concat(this.correctCountError, "</span>\n\t\t\t\t<div class=\"d-flex flex-column\">\n\t\t\t\t\t<a>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0444\u0440\u0430\u0437\u0443 (\u043F\u0440\u0435\u0434\u0435\u043B = 20)</a>\n\t\t\t\t\t<a id=\"addButton\" class=\"btn btn-primary\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</a>\n\t\t\t\t\t<span id=\"additiveError\" style=\"color:orangered\"></span>\n\t\t\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      var _this3 = this;
	      this.parameters.correctAnswers = document.getElementById("textArea_".concat(this.id, "-correct")).value;
	      this.parameters.usedPhrases = document.getElementById("textArea_".concat(this.id, "-all")).value;
	      this.additionErrors = {
	        answerCount: false,
	        correctAnswers: false,
	        usedPhrasesCount: false,
	        usedPhrases: false,
	        answerAndPhrasesCount: false
	      };
	      if (this.parameters.correctAnswers > this.parameters.usedPhrases) {
	        this.additionErrors.answerAndPhrasesCount = 'Ошибка соответствия: фраз ответов больше, чем генерируемых';
	      }
	      this.additionErrors.correctAnswers = Validator.isInteger(this.parameters.correctAnswers);
	      this.additionErrors.usedPhrases = Validator.isInteger(this.parameters.usedPhrases);
	      var inputs = document.querySelectorAll("[id^=\"form_".concat(this.id, "_\"]"));
	      var index = 0;
	      inputs.forEach(function (element) {
	        var input = element.querySelector("[id^=\"textArea_".concat(_this3.id, "_\"]"));
	        var check = element.querySelector("[id^=\"CorrectCheck_\"]");
	        if (input.value === '') {
	          delete _this3.innerContainer[element.id];
	          _this3.errorRender.splice(index, 1);
	          _this3.errors.splice(index, 1);
	          _this3.viewParameters.splice(index, 1);
	          element.remove();
	        } else {
	          var checked = !(check.getAttribute("checked") === null);
	          _this3.innerContainer[element.id] = [input.value, checked];
	          _this3.errors[index] = Validator.maxStringLen(input.value, 200);
	        }
	        index++;
	      });
	      var count = 0;
	      for (var element in this.innerContainer) {
	        if (this.innerContainer[element][1] === true) {
	          count++;
	        }
	      }
	      this.correctCountError = '';
	      if (count === 0 && Object.keys(this.innerContainer).length !== 0) {
	        this.correctCountError = 'Нет верных ответов. Задание нерешаемое!';
	      }
	      var phrasesCount = Object.keys(this.innerContainer).length;
	      if (this.parameters.correctAnswers < 1 || this.parameters.correctAnswers > count) {
	        this.additionErrors.answerCount = "\u0423\u043A\u0430\u0437\u0430\u043D\u043E \u043D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0442\u0432\u0435\u0442\u043E\u0432";
	      }
	      this.viewParameters = Array.from(this.viewParameters);
	      this.parameters.phrases = this.innerContainer;
	      this.errors = Array.from(this.errors);
	      this.errorRender = Array.from(this.errorRender);
	      if (phrasesCount < this.parameters.usedPhrases || this.parameters.usedPhrases < 1) {
	        this.additionErrors.usedPhrasesCount = 'Указано неверное количество используемых фраз';
	      }
	      this.unregisterEvents();
	      return this.errorHandler();
	    }
	  }, {
	    key: "registerEvents",
	    value: function registerEvents() {
	      if (this.areEventsRegistered === 0) {
	        this.areEventsRegistered = 1;
	        var self = this;
	        var checkFunction = function checkFunction(event) {
	          if (event.target.getAttribute('checked') === 'true') {
	            event.target.removeAttribute('checked');
	          } else {
	            event.target.setAttribute('checked', 'true');
	          }
	        };
	        var addFunction = function addFunction(event) {
	          if (Object.keys(self.innerContainer).length < 20) {
	            self.inputCounter++;
	            var newMainDiv = document.createElement("div");
	            newMainDiv.classList.add("row");
	            newMainDiv.classList.add("row-cols-12");
	            newMainDiv.id = "form_".concat(self.id, "_").concat(self.inputCounter);
	            var newInputDiv = document.createElement("div");
	            newInputDiv.classList.add("col-10");
	            newInputDiv.style.padding = '1%';
	            var newInput = document.createElement("input");
	            newInput.classList.add("form-control");
	            newInput.id = "textArea_".concat(self.id, "_") + self.inputCounter;
	            newInput.placeholder = "Текст для случайного выбора (макс 200 символов)";
	            newInputDiv.appendChild(newInput);
	            var newFormDiv = document.createElement("div");
	            newFormDiv.classList.add('form-check', "col-2", "align-self-center");
	            var newFormInput = document.createElement("input");
	            newFormInput.classList.add("form-check-input");
	            newFormInput.type = "checkbox";
	            newFormInput.value = "Correct";
	            newFormInput.id = "CorrectCheck_".concat(self.inputCounter);
	            newFormInput.addEventListener('click', checkFunction);
	            newFormDiv.appendChild(newFormInput);
	            var newFormInputLabel = document.createElement("label");
	            newFormInputLabel.classList.add("form-check-label");
	            newFormInputLabel.htmlFor = "CorrectCheck_".concat(self.inputCounter);
	            newFormInputLabel.innerText = 'Верное';
	            newFormDiv.appendChild(newFormInputLabel);
	            newMainDiv.appendChild(newInputDiv);
	            newMainDiv.appendChild(newFormDiv);
	            var mainInputContainer = document.getElementById("inputTextContainer");
	            mainInputContainer.appendChild(newMainDiv);
	            self.innerContainer["form_".concat(self.id, "_") + self.inputCounter] = ['', ''];
	            self.viewParameters.push('');
	            self.errors.push(false);
	            self.errorRender.push('');
	            newInput.focus();
	          } else {
	            document.getElementById('additiveError').innerHTML = 'Достигнуто максимальное количество фраз!';
	          }
	        };
	        var addButton = document.getElementById("addButton");
	        addButton.addEventListener('click', addFunction);
	        var buttons = document.querySelectorAll("[id^=\"CorrectCheck_\"]");
	        buttons.forEach(function (button) {
	          button.addEventListener('click', checkFunction);
	        });
	      }
	    }
	  }, {
	    key: "unregisterEvents",
	    value: function unregisterEvents() {
	      if (this.areEventsRegistered === 1) {
	        this.areEventsRegistered = 0;
	        var addButton = document.getElementById("addButton");
	        addButton.removeEventListener('click', function () {});
	        var buttons = document.querySelectorAll("[id^=\"CorrectCheck_\"]");
	        buttons.forEach(function (button) {
	          button.removeEventListener('click', function () {});
	        });
	      }
	    }
	  }, {
	    key: "errorHandler",
	    value: function errorHandler() {
	      this.errorRender = [];
	      if (this.errors.length === 0) return true;
	      var check = 0;
	      for (var i = 0; i < this.errors.length; i++) {
	        if (this.errors[i] === false) {
	          this.errorRender[i] = '';
	        } else {
	          this.errorRender[i] = this.errors[i];
	          check += 1;
	        }
	      }
	      if (this.correctCountError !== '') {
	        check++;
	      }
	      var position = 0;
	      this.additionErrorRenders = [];
	      for (var key in this.additionErrors) {
	        if (this.additionErrors[key] === false) {
	          this.additionErrorRenders[position] = '';
	        } else {
	          this.additionErrorRenders[position] = this.additionErrors[key];
	          check += 1;
	        }
	        position++;
	      }
	      if (check > 0) {
	        return false;
	      }
	      return true;
	    }
	  }]);
	  return CheckOption;
	}(Option);

	var ExerciseOption = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(ExerciseOption, _Option);
	  function ExerciseOption() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, ExerciseOption);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(ExerciseOption).call(this, options));
	    _this.preview = '';
	    return _this;
	  }
	  babelHelpers.createClass(ExerciseOption, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t<p>\n\t\t\t\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u044D\u0442\u043E \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435\n\t\t</p>\n\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%; width: 95%;\">\n\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.openExerciseMenu(".concat(this.id, ")\" style=\"width: 100%; margin: 1%;\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435</a>\n\t\t</div>");
	      if (this.preview !== '') {
	        html += "\n\t\t<p>\u042D\u0442\u043E \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0440\u0430\u043D\u0435\u0435 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u043E\u0441\u044C</p>\n\t\t<a>\u0421\u0445\u0435\u043C\u0430 \u043D\u0430\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438:</a>\n\t\t<a>".concat(this.preview, "</a>");
	      } else {
	        html += "<a><i>\u042D\u0442\u043E \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0440\u0430\u043D\u0435\u0435 \u043D\u0435 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043B\u043E\u0441\u044C</i></a>\n\t\t\t\t\t<a>\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0441\u0445\u0435\u043C\u0443 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044F</a>";
	      }
	      html += "<p>\u041F\u043E\u0434\u0431\u043E\u0440 \u043E\u0442\u0432\u0435\u0442\u0430</p>\n\t\t<a>\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u043F\u043E\u0434\u0431\u043E\u0440 \u043E\u0442\u0432\u0435\u0442\u0430 \u0434\u043B\u044F \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0435\u043C\u043E\u0433\u043E \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0432 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u043C \u0440\u0435\u0436\u0438\u043C\u0435!</a>";
	      return html;
	    }
	  }]);
	  return ExerciseOption;
	}(Option);

	var RandTextOption = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(RandTextOption, _Option);
	  function RandTextOption() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, RandTextOption);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(RandTextOption).call(this, options));
	    _this.text = '';
	    _this.inputCounter = 0;
	    _this.parameters.areWeightUnlocked = false;
	    _this.innerContainer = [];
	    _this.errorRender = [];
	    _this.errors = [];
	    return _this;
	  }
	  babelHelpers.createClass(RandTextOption, [{
	    key: "postUpdate",
	    value: function postUpdate() {
	      var _this2 = this;
	      var inputs = document.querySelectorAll("[id^=\"form_".concat(this.id, "_\"]"));
	      inputs.forEach(function (element) {
	        element.querySelector("[id^=\"textArea_".concat(_this2.id, "_1_\"]")).value = _this2.innerContainer[element.id][0];
	        element.querySelector("[id^=\"textArea_".concat(_this2.id, "_2_\"]")).value = _this2.innerContainer[element.id][1];
	      });
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t<div class=\"d-flex flex-column\">\n\t\t\t\t<a>\u0421\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443 \u0432\u0435\u0441\u0430 \u0444\u0440\u0430\u0437</a>\n\t\t\t\t<a id=\"unblockButton\" class=\"btn btn-primary\">\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n\t\t\t</div>\n\t\t\t<label>\u0412\u043F\u0438\u0448\u0438\u0442\u0435 \u0447\u0430\u0441\u0442\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0431\u0443\u0434\u0443\u0442 \u0432\u044B\u0431\u0438\u0440\u0430\u0442\u044C\u0441\u044F \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E</label>\n\t\t\t<div id=\"inputTextContainer\" style=\"width:95%;\">";
	      if (Object.keys(this.innerContainer) !== 0) {
	        var addition = 'disabled=""';
	        if (this.parameters.areWeightUnlocked) {
	          addition = '';
	        }
	        this.errors = [];
	        var renderCount = 0;
	        for (var part in this.innerContainer) {
	          html += "\n\t\t\t\t\t<div class=\"row row-cols-12\" id=\"".concat(part, "\">\n\t\t\t\t\t\t<div class=\"col-10\" style=\"padding: 1%;\">\n\t\t\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "_1_").concat(renderCount, "\"placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0433\u043E \u0432\u044B\u0431\u043E\u0440\u0430 (\u043C\u0430\u043A\u0441 200 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432)\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-2\" style=\"padding: 1%;\">\n\t\t\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "_2_").concat(renderCount, "\" placeholder=\"\u0412\u0435\u0441\" ").concat(addition, ">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[renderCount * 2], "</span>\n\t\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[renderCount * 2 + 1], "</span>\n\t\t\t\t\t</div>");
	          this.errors.push(false);
	          this.errors.push(false);
	          renderCount++;
	        }
	      }
	      html += "</div>";
	      html += "\n\t\t\t\t<div class=\"d-flex flex-column\">\n\t\t\t\t\t<a>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u0443\u044E \u0444\u0440\u0430\u0437\u0443 (\u043F\u0440\u0435\u0434\u0435\u043B = 10)</a>\n\t\t\t\t\t<a id=\"addButton\" class=\"btn btn-primary\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</a>\n\t\t\t\t\t<span id=\"additiveError\" style=\"color:orangered\"></span>\n\t\t\t\t</div>";
	      return html;
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      var _this3 = this;
	      var inputs = document.querySelectorAll("[id^=\"form_".concat(this.id, "_\"]"));
	      var index = 0;
	      inputs.forEach(function (element) {
	        var input = element.querySelector("[id^=\"textArea_".concat(_this3.id, "_1_\"]"));
	        var weight = element.querySelector("[id^=\"textArea_".concat(_this3.id, "_2_\"]"));
	        if (input.value === '') {
	          element.remove();
	          var elementId = element.id.split('_')[element.id.split('_').length - 1];
	          delete _this3.innerContainer[element.id];
	          _this3.errorRender.splice(index * 2, 2);
	          _this3.errors.splice(index * 2, 2);
	        } else {
	          _this3.innerContainer[element.id] = [input.value, weight.value];
	          _this3.errors[index * 2] = Validator.maxStringLen(input.value, 200);
	          if (weight.value === '' || weight.disabled === true) {
	            _this3.errors[index * 2 + 1] = false;
	          } else {
	            _this3.errors[index * 2 + 1] = Validator.isInteger(weight.value);
	          }
	        }
	        index++;
	      });
	      this.parameters.phrases = this.innerContainer;
	      this.errors = Array.from(this.errors);
	      this.errorRender = Array.from(this.errorRender);
	      this.unregisterEvents();
	      return this.errorHandler();
	    }
	  }, {
	    key: "registerEvents",
	    value: function registerEvents() {
	      if (this.areEventsRegistered === 0) {
	        this.areEventsRegistered = 1;
	        var self = this;
	        var addFunction = function addFunction(event) {
	          if (Object.keys(self.innerContainer).length < 10) {
	            self.inputCounter++;
	            var newMainDiv = document.createElement("div");
	            newMainDiv.classList.add("row");
	            newMainDiv.classList.add("row-cols-12");
	            newMainDiv.id = "form_".concat(self.id, "_").concat(self.inputCounter);
	            var newInputDiv = document.createElement("div");
	            newInputDiv.classList.add("col-10");
	            newInputDiv.style.padding = '1%';
	            var newInput = document.createElement("input");
	            newInput.classList.add("form-control");
	            newInput.id = "textArea_".concat(self.id, "_1_") + self.inputCounter;
	            newInput.placeholder = "Текст для случайного выбора (макс 200 символов)";
	            newInputDiv.appendChild(newInput);
	            var newWeightDiv = document.createElement("div");
	            newWeightDiv.classList.add("col-2");
	            newWeightDiv.style.padding = '1%';
	            var newWeightInput = document.createElement("input");
	            newWeightInput.classList.add("form-control");
	            newWeightInput.id = "textArea_".concat(self.id, "_2_") + self.inputCounter;
	            newWeightInput.placeholder = "Вес";
	            if (!self.parameters.areWeightUnlocked) {
	              newWeightInput.disabled = true;
	            }
	            newWeightDiv.appendChild(newWeightInput);
	            newMainDiv.appendChild(newInputDiv);
	            newMainDiv.appendChild(newWeightDiv);
	            var mainInputContainer = document.getElementById("inputTextContainer");
	            mainInputContainer.appendChild(newMainDiv);
	            self.innerContainer["form_".concat(self.id, "_") + self.inputCounter] = ['', ''];
	            self.errors.push(false);
	            self.errors.push(false);
	            self.errorRender.push('');
	            self.errorRender.push('');
	            newInput.focus();
	          } else {
	            document.getElementById('additiveError').innerHTML = 'Достигнуто максимальное количество фраз!';
	          }
	        };
	        var unblockFunction = function unblockFunction(event) {
	          var weights = document.querySelectorAll("[id^=\"textArea_".concat(self.id, "_2_\"]"));
	          if (!self.parameters.areWeightUnlocked) {
	            self.parameters.areWeightUnlocked = true;
	            event.target.innerText = 'Заблокировать';
	            weights.forEach(function (element) {
	              element.disabled = false;
	            });
	          } else {
	            self.parameters.areWeightUnlocked = false;
	            event.target.innerText = 'Разблокировать';
	            weights.forEach(function (element) {
	              element.disabled = true;
	            });
	          }
	        };
	        var addButton = document.getElementById("addButton");
	        addButton.addEventListener('click', addFunction);
	        var unblockButton = document.getElementById("unblockButton");
	        unblockButton.addEventListener('click', unblockFunction);
	      }
	    }
	  }, {
	    key: "unregisterEvents",
	    value: function unregisterEvents() {
	      if (this.areEventsRegistered === 1) {
	        this.areEventsRegistered = 0;
	        var addButton = document.getElementById("addButton");
	        addButton.removeEventListener('click', function () {});
	        var unblockButton = document.getElementById("unblockButton");
	        unblockButton.removeEventListener('click', function () {});
	      }
	    }
	  }, {
	    key: "errorHandler",
	    value: function errorHandler() {
	      this.errorRender = [];
	      if (this.errors.length === 0) return true;
	      var check = 0;
	      for (var i = 0; i < this.errors.length; i++) {
	        if (this.errors[i] === false) {
	          this.errorRender[i] = '';
	        } else {
	          this.errorRender[i] = this.errors[i];
	          check += 1;
	        }
	      }
	      if (check > 0) {
	        return false;
	      }
	      return true;
	    }
	  }]);
	  return RandTextOption;
	}(Option);

	var OptionList = /*#__PURE__*/function () {
	  function OptionList() {
	    babelHelpers.classCallCheck(this, OptionList);
	    this.list = [];
	    this.exercisesPreviewList = {};
	    this.addedInstructions = 0;
	    this.openedInstruction = -1;
	  }
	  babelHelpers.createClass(OptionList, [{
	    key: "checkIfExerciseEdited",
	    value: function checkIfExerciseEdited(id) {
	      if (this.list[id].type === 'customEx' && this.exercisesPreviewList[id] !== '') {
	        this.list[id].preview = this.exercisesPreviewList[id];
	      }
	      return false;
	    }
	  }, {
	    key: "addInstruction",
	    value: function addInstruction(type, color) {
	      switch (type) {
	        case 'text':
	          this.list.push(new TextOption({
	            id: this.addedInstructions,
	            type: type,
	            color: color
	          }));
	          this.addedInstructions += 1;
	          break;
	        case 'rand.Number':
	          this.list.push(new RandNumberOption({
	            id: this.addedInstructions,
	            type: type,
	            color: color
	          }));
	          this.addedInstructions += 1;
	          break;
	        case 'image':
	          this.list.push(new ImageOption({
	            id: this.addedInstructions,
	            type: type,
	            color: color
	          }));
	          this.addedInstructions += 1;
	          break;
	        case 'rand.Text':
	          this.list.push(new RandTextOption({
	            id: this.addedInstructions,
	            type: type,
	            color: color
	          }));
	          this.addedInstructions += 1;
	          break;
	        case 'check':
	          this.list.push(new CheckOption({
	            id: this.addedInstructions,
	            type: type,
	            color: color
	          }));
	          this.addedInstructions += 1;
	          break;
	        case 'customEx':
	          this.list.push(new ExerciseOption({
	            id: this.addedInstructions,
	            type: type,
	            color: color
	          }));
	          this.exercisesPreviewList[this.addedInstructions] = '';
	          this.addedInstructions += 1;
	          break;
	        default:
	          this.list.push(new Option({
	            id: this.addedInstructions,
	            type: type,
	            color: color
	          }));
	          this.addedInstructions += 1;
	          break;
	      }
	    }
	  }, {
	    key: "showOption",
	    value: function showOption(id, container) {
	      this.checkIfExerciseEdited(id);
	      if (container.innerHTML === '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>') {
	        this.openedInstruction = -1;
	      }
	      if (id === this.openedInstruction) {
	        this.saveOpenedInstructionData();
	        container.innerHTML = this.list[id].showOption();
	        this.list[id].registerEvents();
	        this.list[id].postUpdate();
	        if (this.saveOpenedInstructionData()) {
	          container.style.borderColor = "#dee2e6";
	          container.style.borderWidth = "1px";
	        }
	        return;
	      }
	      if (!this.saveOpenedInstructionData()) {
	        container.style.borderColor = "red";
	        container.style.borderWidth = "3px";
	        this.showOption(this.openedInstruction, container);
	        return;
	      }
	      container.style.borderColor = "#dee2e6";
	      container.style.borderWidth = "1px";
	      this.openedInstruction = id;
	      container.innerHTML = this.list[id].showOption();
	      this.list[id].registerEvents();
	      this.list[id].postUpdate();
	    }
	  }, {
	    key: "saveOpenedInstructionData",
	    value: function saveOpenedInstructionData() {
	      if (this.openedInstruction !== -1) {
	        return this.list[this.openedInstruction].save();
	      }
	      return true;
	    }
	  }, {
	    key: "saveAllData",
	    value: function saveAllData() {
	      if (!this.saveOpenedInstructionData()) {
	        return false;
	      }
	      var symbolicExpression = [];
	      var generatorInstruction = [];
	      this.list.forEach(function (option) {
	        symbolicExpression.push("".concat(option.type));
	        generatorInstruction.push(option.getGeneratorData());
	      });
	      symbolicExpression = symbolicExpression.join('->');
	      generatorInstruction.preview = symbolicExpression;
	      return generatorInstruction;
	    }
	  }, {
	    key: "deleteLastInstruction",
	    value: function deleteLastInstruction() {
	      if (this.addedInstructions > 0) {
	        if (this.list[this.addedInstructions].Type === 'customEx') {
	          delete this.exercisesPreviewList[this.addedInstructions];
	        }
	        this.list.pop();
	        this.addedInstructions -= 1;
	      }
	    }
	  }, {
	    key: "renderInstructions",
	    value: function renderInstructions() {
	      var html = '';
	      this.list.forEach(function (instruction) {
	        html += instruction.render();
	      });
	      return html;
	    }
	  }]);
	  return OptionList;
	}();

	exports.OptionList = OptionList;
	exports.Option = Option;
	exports.RandNumberOption = RandNumberOption;
	exports.Validator = Validator;

}((this.BX.Proj.Independent = this.BX.Proj.Independent || {}),BX));
