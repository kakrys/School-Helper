/* eslint-disable */
this.BX = this.BX || {};
this.BX.Proj = this.BX.Proj || {};
(function (exports,main_core) {
	'use strict';

	var Option = /*#__PURE__*/function () {
	  function Option() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Option);
	    this.id = options.id;
	    this.type = options.type;
	    this.color = options.color;
	    this.areEventsRegistered = 0;
	    this.optionName = main_core.Loc.getMessage(options.type);
	    this.html = "<span id=\"instruction_".concat(this.id, "\" data-instruction=\"").concat(this.id, "\" onclick=\"generator.showOption(").concat(this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(this.color, ";\">").concat(this.optionName, "</span>");
	  }
	  babelHelpers.createClass(Option, [{
	    key: "render",
	    value: function render() {
	      return this.html;
	    }
	  }, {
	    key: "save",
	    value: function save() {}
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
	    key: "postUpdate",
	    value: function postUpdate() {}
	  }]);
	  return Option;
	}();

	var TextOption = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(TextOption, _Option);
	  function TextOption() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, TextOption);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(TextOption).call(this, options));
	    _this.text = '';
	    return _this;
	  }
	  babelHelpers.createClass(TextOption, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "<div class=\"form-group col-12\">\n\t\t\t\t\t<textarea class=\"form-control\" id=\"textArea_".concat(this.id, "\" rows=\"3\" placeholder=\"\u0412\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0437\u0430\u0434\u0430\u043D\u0438\u044F\">").concat(this.text, "</textarea>\n\t\t\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "save",
	    value: function save() {}
	  }, {
	    key: "registerEvents",
	    value: function registerEvents() {
	      if (this.areEventsRegistered === 0) {
	        this.textElement = document.getElementById("textArea_".concat(this.id));
	        var self = this;
	        this.textElement.addEventListener('input', function () {
	          if (self.textElement.value !== null) {
	            self.text = self.textElement.value;
	          }
	        });
	      }
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
	    _this.parameters = {};
	    _this.MinNumber = '';
	    _this.MaxNumber = '';
	    _this.Exclude = '';
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
	      this.parameters = {
	        OptionId: this.id
	      };
	      if (this.minNumberContainer.value !== null) {
	        this.parameters.MinNumber = this.minNumberContainer.value;
	      }
	      if (this.maxNumberContainer.value !== null) {
	        this.parameters.MaxNumber = this.maxNumberContainer.value;
	      }
	      if (this.excludeNumberContainer.value !== null) {
	        this.parameters.Exclude = this.excludeNumberContainer.value.split(/[,\s]+/);
	      }
	      this.checkButtonElements = document.querySelectorAll('.form-check-input[aria-expanded="true"]');
	      this.checkButtonElements.forEach(function (element) {
	        if (element.getAttribute('aria-controls') === "FractionCollapse") {
	          var checkButtons = document.querySelector('[id="FractionCollapse"]').querySelectorAll('.form-check-input[checked="true"]');
	          var properties = [];
	          checkButtons.forEach(function (button) {
	            properties.push(button.getAttribute('value'));
	          });
	          if (properties !== []) {
	            _this2.parameters.Fraction = properties;
	          }
	        }
	        if (element.getAttribute('aria-controls') === "RootCollapse") {
	          var _checkButtons = document.querySelector('[id="RootCollapse"]').querySelectorAll('.form-check-input[checked="true"]');
	          var _properties = [];
	          _checkButtons.forEach(function (button) {
	            _properties.push(button.getAttribute('value'));
	          });
	          if (_properties !== []) {
	            _this2.parameters.Root = _properties;
	          }
	        }
	        if (element.getAttribute('aria-controls') === "AbsCollapse") {
	          var _checkButtons2 = document.querySelector('[id="AbsCollapse"]').querySelectorAll('.form-check-input[checked="true"]');
	          var _properties2 = [];
	          _checkButtons2.forEach(function (button) {
	            _properties2.push(button.getAttribute('value'));
	          });
	          if (_properties2 !== []) {
	            _this2.parameters.Absolute = _properties2;
	          }
	        }
	      });
	      this.unregisterEvents();
	    }
	  }, {
	    key: "updateParameters",
	    value: function updateParameters() {
	      var _this3 = this;
	      console.log(this.parameters);
	      if ('MinNumber' in this.parameters) {
	        this.MinNumber = this.parameters.MinNumber;
	      }
	      if ('MaxNumber' in this.parameters) {
	        this.MaxNumber = this.parameters.MaxNumber;
	      }
	      if ('Exclude' in this.parameters) {
	        this.Exclude = this.parameters.Exclude.join(',');
	      }
	      if ('Fraction' in this.parameters) {
	        this.FractionType = ['', '', '', ''];
	        this.FractionNumber = ['', '', ''];
	        this.FractionView = ['', '', ''];
	        this.parameters.Fraction.forEach(function (param) {
	          console.log(param);
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
	      if ('Root' in this.parameters) {
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
	      if ('Absolute' in this.parameters) {
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
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      this.updateParameters();
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t<p>\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430</p>\n\t\t<div class=\"d-flex flex-column col-12\">\n\t\t\t<label>\u0423\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438</label>\n\t\t\t<div class=\"d-flex\">\n\t\t\t\t<input class=\"form-control\" id=\"textArea_".concat(this.id, "_1\" placeholder=\"\u041C\u0438\u043D.\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435\">\n\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "_2\" placeholder=\"\u041C\u0430\u043A\u0441.\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435\">\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"d-flex flex-column col-12\">\n\t\t\t<label>\u0418\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0447\u0438\u0441\u0435\u043B</label>\n\t\t\t<div class=\"d-flex\">\n\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "_3\" placeholder=\"\u041F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0438\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 \u0437\u0430\u043F\u044F\u0442\u0443\u044E\">\n\t\t\t</div>\n\t\t</div>\n\t\t<a><i>\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0446\u0435\u043B\u044B\u0435 \u0447\u0438\u0441\u043B\u0430 \u0438 \u0434\u0440\u043E\u0431\u0438 \u0431\u0435\u0437 \u0438\u0441\u043A\u043B\u044E\u0447\u0451\u043D\u043D\u044B\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u0438 \u0431\u0435\u0437 \u043A\u043E\u0440\u043D\u0435\u0439</i></a>\n\t\t<p>\u0413\u0438\u0431\u043A\u0430\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430</p>\n\t\t<a>\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u043A \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438</a>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\" data-bs-toggle=\"collapse\" href=\"#FractionCollapse\" role=\"button\" aria-expanded=\"false\" aria-controls=\"FractionCollapse\">\n\t\t\t<label class=\"form-check-label\" for=\"flexCheckDefault\">\n\t\t\t\t\u0414\u0440\u043E\u0431\u0438 \n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"collapse\" id=\"FractionCollapse\" style=\"width:100%;\">\n\t\t\t<div class=\"d-flex border\" style=\"width:100%;\">\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:33%;\">\n\t\t\t\t\t<a>\u0412\u0438\u0434 \u0434\u0440\u043E\u0431\u0438</a>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionType\" id=\"RadioFractionType1\" value=\"Correct\" ").concat(this.FractionType[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionType1\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionType\" id=\"RadioFractionType2\" value=\"Incorrect\" ").concat(this.FractionType[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionType2\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionType\" id=\"RadioFractionType3\" value=\"Complex\" ").concat(this.FractionType[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionType3\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u0441\u043C\u0435\u0448\u0430\u043D\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionType\" id=\"RadioFractionType4\" value=\"AllTypes\" ").concat(this.FractionType[3], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionType4\">\n\t\t\t\t\t\t\t\u041B\u044E\u0431\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:33%;\">\n\t\t\t\t\t<a>\u0427\u0438\u0441\u043B\u043E\u0432\u044B\u0435 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438</a>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionNumber\" id=\"RadioFractionNumber1\" value=\"Rational\" ").concat(this.FractionNumber[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionNumber1\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionNumber\" id=\"RadioFractionNumber2\" value=\"Irrational\" ").concat(this.FractionNumber[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionNumber2\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u0438\u0440\u0440\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionNumber\" id=\"RadioFractionNumber3\" value=\"AnyNumber\" ").concat(this.FractionNumber[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionNumber3\">\n\t\t\t\t\t\t\t\u041B\u044E\u0431\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:33%;\">\n\t\t\t\t\t<a>\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0434\u0440\u043E\u0431\u0438</a>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionView\" id=\"RadioFractionView1\" value=\"Not-shortened\" ").concat(this.FractionView[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionView1\">\n\t\t\t\t\t\t\t\u0422\u0440\u0435\u0431\u0443\u0435\u0442 \u0441\u043E\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u044F\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionView\" id=\"RadioFractionView2\" value=\"Shortened\" ").concat(this.FractionView[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionView2\">\n\t\t\t\t\t\t\t\u041D\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0441\u043E\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u044F\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioFractionView\" id=\"RadioFractionView3\" value=\"AnyShortedType\" ").concat(this.FractionView[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioFractionView3\">\n\t\t\t\t\t\t\t\u041B\u044E\u0431\u044B\u0435 \u0434\u0440\u043E\u0431\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\" data-bs-toggle=\"collapse\" href=\"#RootCollapse\" role=\"button\" aria-expanded=\"false\" aria-controls=\"RootCollapse\">\n\t\t\t<label class=\"form-check-label\" for=\"flexCheckDefault\">\n\t\t\t\t\u041A\u043E\u0440\u043D\u0438\n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"collapse\" id=\"RootCollapse\" style=\"width:100%;\">\n\t\t\t<div class=\"d-flex border\" style=\"width:100%;\">\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:33%;\">\n\t\t\t\t\t<a>\u0412\u0438\u0434 \u043A\u043E\u0440\u043D\u0435\u0439</a>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioRootType\" id=\"RadioRootType1\" value=\"Irrational\" ").concat(this.RootType[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioRootType1\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u0438\u0440\u0440\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u0440\u043D\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioRootType\" id=\"RadioRootType2\" value=\"Rational\" ").concat(this.RootType[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioRootType2\">\n\t\t\t\t\t\t\t\u0422\u043E\u043B\u044C\u043A\u043E \u0440\u0430\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u0440\u043D\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"RadioRootType\" id=\"RadioRootType3\" value=\"AnyType\" ").concat(this.RootType[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RadioRootType3\">\n\t\t\t\t\t\t\t\u041B\u044E\u0431\u044B\u0435 \u043A\u043E\u0440\u043D\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input\" type=\"checkbox\" value=\"\" id=\"flexCheckDefault\"  data-bs-toggle=\"collapse\" href=\"#AbsCollapse\" role=\"button\" aria-expanded=\"false\" aria-controls=\"AbsCollapse\">\n\t\t\t<label class=\"form-check-label\" for=\"flexCheckDefault\">\n\t\t\t\t\u041E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0447\u0438\u0441\u043B\u0430 (\u0438\u0433\u043D\u043E\u0440\u0438\u0440\u0443\u0435\u0442\u0441\u044F, \u0435\u0441\u043B\u0438 \u0443\u043A\u0430\u0437\u0430\u043D \u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D)\n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"collapse\" id=\"AbsCollapse\" style=\"width:100%;\">\n\t\t\t<div class=\"d-flex border\" style=\"width:100%;\">\n\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:33%;\">\n\t\t\t\t\t<a>\u041F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u0442\u0440\u0438\u0446\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0447\u0438\u0441\u0435\u043B</a>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"AbsVar\" id=\"AbsVar1\" value=\"UseModule\" ").concat(this.AbsoluteModule[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"AbsVar1\">\n\t\t\t\t\t\t\t\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043C\u043E\u0434\u0443\u043B\u044C\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"AbsVar\" id=\"AbsVar2\" value=\"DontUseModule\" ").concat(this.AbsoluteModule[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"AbsVar2\">\n\t\t\t\t\t\t\t\u041D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043C\u043E\u0434\u0443\u043B\u044C\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" name=\"AbsVar\" id=\"AbsVar3\" value=\"BothUsingModule\" ").concat(this.AbsoluteModule[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"AbsVar3\">\n\t\t\t\t\t\t\t\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0435 \u0441\u043B\u0443\u0447\u0430\u0438\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "postUpdate",
	    value: function postUpdate() {
	      document.querySelector("[id^=\"textArea_".concat(this.id, "_1\"]")).value = this.MinNumber;
	      document.querySelector("[id^=\"textArea_".concat(this.id, "_2\"]")).value = this.MaxNumber;
	      document.querySelector("[id^=\"textArea_".concat(this.id, "_3\"]")).value = this.Exclude;
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
	      }
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
	    return _this;
	  }
	  babelHelpers.createClass(CheckOption, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "<div class=\"form-group col-12\">\n\t\t\t\t\t<textarea class=\"form-control\" id=\"textArea_".concat(this.id, "\" rows=\"3\" placeholder=\"\u0412\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0437\u0430\u0434\u0430\u043D\u0438\u044F\">").concat(this.text, "</textarea>\n\t\t\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      this.textElement = document.getElementById("textArea_".concat(this.id));
	      var self = this;
	      this.textElement.addEventListener('input', function () {
	        if (self.textElement.value !== null) {
	          self.text = self.textElement.value;
	        }
	      });
	      this.textElement.removeEventListener('input', function () {});
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
	    _this.text = '';
	    return _this;
	  }
	  babelHelpers.createClass(ExerciseOption, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t<p>\n\t\t\t\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u044D\u0442\u043E \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435\n\t\t</p>\n\t\t<div class=\"col d-flex justify-content-center\" style=\"padding: 1%;\">\n\t\t\t<a class=\"btn btn-secondary\" onclick=\"generator.openExerciseMenu(".concat(this.id, ")\" style=\"width: 100%; margin: 1%;\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435</a>\n\t\t</div>\n\t\t<p>\u041F\u043E\u0434\u0431\u043E\u0440 \u043E\u0442\u0432\u0435\u0442\u0430</p>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input\" type=\"checkbox\" value=\"true\" id=\"RadioAnswer\" data-bs-toggle=\"collapse\" href=\"#AnswerCollapse\" role=\"button\" aria-expanded=\"false\" aria-controls=\"AnswerCollapse\">\n\t\t\t<label class=\"form-check-label\" for=\"RadioAnswer\">\n\t\t\t\t\u0423\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0442\u0432\u0435\u0442 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \n\t\t\t</label>\n\t\t</div>\n\t\t<div class=\"collapse\" id=\"AnswerCollapse\" style=\"width:100%;\">\n\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "_3\" placeholder=\"\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435\">\n\t\t</div>\n\t\t<div class=\"form-check\">\n\t\t\t<input class=\"form-check-input\" type=\"checkbox\" name=\"RadioAnswer\" id=\"RadioAnswer2\" checked>\n\t\t\t<label class=\"form-check-label\" for=\"RadioAnswer2\">\n\t\t\t\t\u041F\u043E\u043F\u044B\u0442\u0430\u0442\u044C\u0441\u044F \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u0442\u0432\u0435\u0442 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 (\u0432 \u0441\u043B\u0443\u0447\u0430\u0435 \u043D\u0435\u0443\u0434\u0430\u0447\u0438 \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0438 \u043E\u0442\u0432\u0435\u0442 \u043D\u0435 \u0431\u0443\u0434\u0443\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B)\n\t\t\t</label>\n\t\t</div>\n\t\t<a>\u0415\u0441\u043B\u0438 \u0432\u044B\u0431\u0440\u0430\u043D\u044B \u043E\u0431\u0430 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u0430 \u043F\u043E\u0434\u0431\u043E\u0440\u0430 \u043E\u0442\u0432\u0435\u0442\u0430 - \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u043E\u0442\u0434\u0430\u0451\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u043C\u0443 \u043F\u043E\u0434\u0431\u043E\u0440\u0443.</a>");
	      return html;
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      this.textElement = document.getElementById("textArea_".concat(this.id));
	      var self = this;
	      if (this.textElement !== null) {
	        this.textElement.addEventListener('input', function () {
	          if (self.textElement.value !== null) {
	            self.text = self.textElement.value;
	          }
	        });
	        this.textElement.removeEventListener('input', function () {});
	      }
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
	    _this.inputCounter = 1;
	    _this.innerContainer = {
	      0: "\n\t\t\t\t<div class=\"row row-cols-12\">\n\t\t\t\t\t<div class=\"col-10\" style=\"padding:1%;\">\n\t\t\t\t\t\t<input class=\"form-control\" id=\"textArea_".concat(_this.id, "_1_0\" placeholder=\"\u0422\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0433\u043E \u0432\u044B\u0431\u043E\u0440\u0430\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-2\" style=\"padding:1%;\">\n\t\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(_this.id, "_2_0\" placeholder=\"\u0412\u0435\u0441\" disabled>\n\t\t\t\t\t</div>\n\t\t\t\t</div>")
	    };
	    return _this;
	  }
	  babelHelpers.createClass(RandTextOption, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t<div class=\"d-flex\">\n\t\t\t\t<a>\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443 \u0432\u0435\u0441\u0430 \u0444\u0440\u0430\u0437</a>\n\t\t\t\t<a class=\"btn btn-primary\">\u0420\u0430\u0437\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C</a>\n\t\t\t</div>\n\t\t\t<label>\u0412\u043F\u0438\u0448\u0438\u0442\u0435 \u0447\u0430\u0441\u0442\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0431\u0443\u0434\u0443\u0442 \u0432\u044B\u0431\u0438\u0440\u0430\u0442\u044C\u0441\u044F \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E</label>\n\t\t\t<div id=\"inputTextContainer\" style=\"width:100%;\">";
	      for (var part in this.innerContainer) {
	        html += this.innerContainer[part];
	      }
	      html += "</div>";
	      return html;
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      var _this2 = this;
	      var inputs = document.querySelectorAll("[id^=\"textArea_".concat(this.id, "_1_\"]"));
	      console.log(inputs);
	      inputs.forEach(function (element) {
	        if (element.value === '') {
	          element.parentElement.parentElement.remove();
	          var index = element.id.split('_').length - 1;
	          _this2.innerContainer["".concat(index)] = '';
	        }
	      });
	      return;
	      this.textElement = document.getElementById("textArea_".concat(this.id));
	      var self = this;
	      this.textElement.addEventListener('input', function () {
	        if (self.textElement.value !== null) {
	          self.text = self.textElement.value;
	        }
	      });
	      this.textElement.removeEventListener('input', function () {});
	    }
	  }, {
	    key: "registerEvents",
	    value: function registerEvents() {
	      if (this.areEventsRegistered === 0) {
	        this.areEventsRegistered = 1;
	        var self = this;
	        var eventFunction = function eventFunction(event) {
	          if (event.key === 'Enter') {
	            self.inputCounter++;
	            var newMainDiv = document.createElement("div");
	            newMainDiv.classList.add("row");
	            newMainDiv.classList.add("row-cols-12");
	            var newInputDiv = document.createElement("div");
	            newInputDiv.classList.add("col-10");
	            newInputDiv.style.padding = '1%';
	            var newInput = document.createElement("input");
	            newInput.classList.add("form-control");
	            newInput.id = "textArea_".concat(self.id, "_1_") + self.inputCounter;
	            newInput.placeholder = "Текст для случайного выбора";
	            newInput.addEventListener('keydown', eventFunction);
	            newInputDiv.appendChild(newInput);
	            var newWeightDiv = document.createElement("div");
	            newWeightDiv.classList.add("col-2");
	            newWeightDiv.style.padding = '1%';
	            var newWeightInput = document.createElement("input");
	            newWeightInput.classList.add("form-control");
	            newWeightInput.id = "textArea_".concat(self.id, "_2_") + self.inputCounter;
	            newWeightInput.placeholder = "Вес";
	            newWeightInput.disabled = true;
	            newWeightDiv.appendChild(newWeightInput);
	            newMainDiv.appendChild(newInputDiv);
	            newMainDiv.appendChild(newWeightDiv);
	            var mainInputContainer = document.getElementById("inputTextContainer");
	            mainInputContainer.appendChild(newMainDiv);
	            self.innerContainer[self.inputCounter] = mainInputContainer.innerHTML;
	            newInput.focus();
	          }
	        };
	        var element = document.getElementById("textArea_".concat(this.id, "_1_0"));
	        element.addEventListener('keydown', eventFunction);
	      }
	    }
	  }]);
	  return RandTextOption;
	}(Option);

	var OptionList = /*#__PURE__*/function () {
	  function OptionList() {
	    babelHelpers.classCallCheck(this, OptionList);
	    this.list = [];
	    this.addedInstructions = 0;
	    this.openedInstruction = -1;
	  }
	  babelHelpers.createClass(OptionList, [{
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
	      if (container.innerHTML === '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>') {
	        this.openedInstruction = -1;
	      }
	      if (id === this.openedInstruction) return;
	      this.saveOpenedInstructionData();
	      this.openedInstruction = id;
	      container.innerHTML = this.list[id].showOption();
	      this.list[id].registerEvents();
	      this.list[id].postUpdate();
	    }
	  }, {
	    key: "saveOpenedInstructionData",
	    value: function saveOpenedInstructionData() {
	      if (this.openedInstruction !== -1) {
	        this.list[this.openedInstruction].save();
	      }
	    }
	  }, {
	    key: "saveAllData",
	    value: function saveAllData() {}
	  }, {
	    key: "deleteLastInstruction",
	    value: function deleteLastInstruction() {
	      if (this.addedInstructions > 0) {
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

}((this.BX.Proj.Independent = this.BX.Proj.Independent || {}),BX));
