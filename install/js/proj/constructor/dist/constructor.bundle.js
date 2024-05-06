/* eslint-disable */
this.BX = this.BX || {};
this.BX.Proj = this.BX.Proj || {};
(function (exports,proj_operators) {
	'use strict';

	var Option = BX.Proj.Independent.Option;
	var Operator = /*#__PURE__*/function (_Option) {
	  babelHelpers.inherits(Operator, _Option);
	  function Operator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, Operator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Operator).call(this, options));
	    if (options.textView === undefined) {
	      _this.textView = 'null';
	    }
	    _this.textView = options.textView;
	    _this.isOperator = true;
	    if (options.isOperator !== undefined) {
	      _this.isOperator = options.isOperator;
	    }
	    _this.isDelitable = true;
	    _this.isPair = false;
	    _this.PairId = null;
	    _this.html = "<span id=\"".concat(_this.id, "\" data-instruction=\"").concat(_this.id, "\" onclick=\"generator.showOption(").concat(_this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(_this.color, ";\">").concat(_this.optionName, "</span>");
	    return _this;
	  }
	  babelHelpers.createClass(Operator, [{
	    key: "render",
	    value: function render(mode) {
	      switch (mode) {
	        case 'text':
	          return "<span id=\"".concat(this.id, "\" data-instruction=\"").concat(this.id, "\" onclick=\"generator.showOption(").concat(this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(this.color, ";\">").concat(this.textView, "</span>");
	        default:
	          return this.html;
	      }
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 c id=".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "<div class=\"form-group col-12\">\n\t\t\t\t\t\u0423 \u044D\u0442\u043E\u0433\u043E \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u043D\u0435\u0442 \u043E\u0441\u043E\u0431\u044B\u0445 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u0434\u043B\u044F \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438\n\t\t\t\t</div>";
	      return html;
	    }
	  }, {
	    key: "getGeneratorData",
	    value: function getGeneratorData() {
	      return this.parameters;
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      return true;
	    }
	  }]);
	  return Operator;
	}(Option);

	var Pointer = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(Pointer, _Operator);
	  function Pointer() {
	    var _this;
	    babelHelpers.classCallCheck(this, Pointer);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Pointer).call(this));
	    _this.optionName = '↑';
	    _this.Type = 'pointer';
	    _this.html = _this.html = "<span id=\"instruction_".concat(_this.id, "\" data-instruction=\"").concat(_this.id, "\" onclick=\"generator.showOption(").concat(_this.id, ")\" \n\t\t\t\t\t\t\t\tstyle=\"color: blue; \n\t\t\t\t\t\t\t\tmax-height: 5%;\n\t\t\t\t\t\t\t\tmargin-top: 25px; \n\t\t\t\t\t\t\t\ttext-decoration: overline blue; \n\t\t\t\t\t\t\t\tpadding: 1%;\n\t\t\t\t\t\t\t\ttext-align: start; \n\t\t\t\t\t\t\t\tbackground:").concat(_this.color, ";\">").concat(_this.optionName, "</span>");
	    _this.isDelitable = false;
	    _this.id = -1;
	    _this.pos = 0;
	    _this.textView = '|<';
	    return _this;
	  }
	  babelHelpers.createClass(Pointer, [{
	    key: "showOption",
	    value: function showOption() {
	      return '';
	    }
	  }]);
	  return Pointer;
	}(Operator);

	var AbsoluteOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(AbsoluteOperator, _Operator);
	  function AbsoluteOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, AbsoluteOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(AbsoluteOperator).call(this, options));
	    _this.isPair = true;
	    _this.PairId = options.PairId;
	    return _this;
	  }
	  babelHelpers.createClass(AbsoluteOperator, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041C\u043E\u0434\u0443\u043B\u044C - \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u0440\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u043E \u0432\u043D\u0443\u0442\u0440\u0438 \u043D\u0435\u0433\u043E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043C\u043E\u0434\u0443\u043B\u044C \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041C\u043E\u0434\u0443\u043B\u044C - \u043F\u0430\u0440\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u044D\u0442\u043E \u0437\u043D\u0430\u0447\u0438\u0442, \u0447\u0442\u043E \u043F\u0440\u0438 \u0435\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E\u043C \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u043C\u043E\u0434\u0443\u043B\u044F, \u0441\u043E\u0437\u0434\u0430\u0434\u0443\u0442\u0441\u044F \u0434\u0432\u0430 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0432 \u043F\u043E\u043B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0439.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0438\u0437 \u043F\u0430\u0440\u043D\u044B\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 - \u0435\u0433\u043E \u043F\u0430\u0440\u0430 \u0442\u0430\u043A\u0436\u0435 \u0443\u0434\u0430\u043B\u044F\u0435\u0442\u0441\u044F!.\n\t\t\t\t\t</span>\n\t\t\t\t</div>");
	      return html;
	    }
	  }]);
	  return AbsoluteOperator;
	}(Operator);

	var BracketOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(BracketOperator, _Operator);
	  function BracketOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, BracketOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(BracketOperator).call(this, options));
	    _this.isPair = true;
	    _this.PairId = options.PairId;
	    return _this;
	  }
	  babelHelpers.createClass(BracketOperator, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0421\u043A\u043E\u0431\u043A\u0438 - \u0432\u044B\u0434\u0435\u043B\u044F\u044E\u0442 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0439, \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u0432\u043D\u0443\u0442\u0440\u0438 \u0441\u043A\u043E\u0431\u043E\u043A - \u0432\u044B\u0448\u0435 \u043F\u043E \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u0443.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u0441\u043A\u043E\u0431\u043A\u0438 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0421\u043A\u043E\u0431\u043A\u0438 - \u043F\u0430\u0440\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u044D\u0442\u043E \u0437\u043D\u0430\u0447\u0438\u0442, \u0447\u0442\u043E \u043F\u0440\u0438 \u0435\u0434\u0438\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E\u043C \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0441\u043A\u043E\u0431\u043E\u043A, \u0441\u043E\u0437\u0434\u0430\u0434\u0443\u0442\u0441\u044F \u0434\u0432\u0430 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0432 \u043F\u043E\u043B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0439.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u043F\u0440\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u0438\u0437 \u043F\u0430\u0440\u043D\u044B\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 - \u0435\u0433\u043E \u043F\u0430\u0440\u0430 \u0442\u0430\u043A\u0436\u0435 \u0443\u0434\u0430\u043B\u044F\u0435\u0442\u0441\u044F!.\n\t\t\t\t\t</span>\n\t\t\t\t</div>");
	      return html;
	    }
	  }]);
	  return BracketOperator;
	}(Operator);

	var DivOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(DivOperator, _Operator);
	  function DivOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, DivOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(DivOperator).call(this, options));
	    _this.DivStyle = ['', 'checked = "true"'];
	    _this.parameters.DivStyle = 'Non-fraction-style';
	    return _this;
	  }
	  babelHelpers.createClass(DivOperator, [{
	    key: "showOption",
	    value: function showOption() {
	      this.updateParameters();
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0414\u0435\u043B\u0435\u043D\u0438\u0435 - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u044C \u043E\u0431\u044A\u0435\u043A\u0442 \u0441\u043B\u0435\u0432\u0430 \u043E\u0442 \u043D\u0435\u0433\u043E \u043D\u0430 \u043E\u0431\u044A\u0435\u043A\u0442 \u0441\u043F\u0440\u0430\u0432\u0430 \u043E\u0442 \u043D\u0435\u0433\u043E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u0434\u0432\u0430 \u0440\u0435\u0436\u0438\u043C\u0430 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044F:\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t1) \u0412\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043E\u0431\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u0434\u0440\u043E\u0431\u044C\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t2) \u0412\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0431\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u0434\u0440\u043E\u0431\u044C, \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043E\u0431\u044B\u0447\u043D\u044B\u043C \u0434\u0435\u043B\u0435\u043D\u0438\u0435\u043C (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E)\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0414\u0435\u043B\u0435\u043D\u0438\u0435 - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0443\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u043F\u043E\u0434\u0440\u044F\u0434 - \u0432\u044B\u0437\u043E\u0432\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0443!\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t<div id=\"settings_").concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430</p>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" value=\"Fraction-style\" name=\"DivStyle\" id=\"DivSetting_1\" role=\"button\" ").concat(this.DivStyle[0], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"DivStyle\">\n\t\t\t\t\t\t\t\u0412\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043E\u0431\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u0434\u0440\u043E\u0431\u044C\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"radio\" value=\"Non-fraction-style\" name=\"DivStyle\" id=\"DivSetting_2\" role=\"button\" ").concat(this.DivStyle[1], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"DivStyle\">\n\t\t\t\t\t\t\t\u0412\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u043E\u0431\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u0434\u0440\u043E\u0431\u044C, \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043E\u0431\u044B\u0447\u043D\u044B\u043C \u0434\u0435\u043B\u0435\u043D\u0438\u0435\u043C (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E)\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "updateParameters",
	    value: function updateParameters() {
	      if (this.parameters.DivStyle === 'Fraction-style') {
	        this.DivStyle = ['checked = "true"', ''];
	      } else {
	        this.DivStyle = ['', 'checked = "true"'];
	      }
	    }
	  }, {
	    key: "save",
	    value: function save() {
	      var styleButtonFraction = document.getElementById("DivSetting_1");
	      var styleButtonNonFraction = document.getElementById("DivSetting_2");
	      if (styleButtonFraction.getAttribute('checked') === 'true' && styleButtonNonFraction.getAttribute('checked') !== 'true') {
	        this.parameters.DivStyle = styleButtonFraction.getAttribute('value');
	      } else if (styleButtonNonFraction.getAttribute('checked') === 'true' && styleButtonFraction.getAttribute('checked') !== 'true') {
	        this.parameters.DivStyle = styleButtonNonFraction.getAttribute('value');
	      } else {
	        this.parameters.DivStyle = 'Non-fraction-style';
	      }
	      this.unregisterEvents();
	      return true;
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
	              if (butt.getAttribute('checked') === 'true') {
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
	  return DivOperator;
	}(Operator);

	var Validator = BX.Proj.Independent.Validator;
	var RandomOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(RandomOperator, _Operator);
	  function RandomOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, RandomOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(RandomOperator).call(this, options));
	    _this.parameters.OperatorsExclude = ['none'];
	    _this.parameters.StandartSymbol = '+';
	    _this.Exclude = [];
	    _this.ExcludeStyle = ['', 'false', '', ''];
	    _this.accessibleOperators = ['+', '-', '*', '/', ':', 'root', 'N', '^'];
	    _this.additionalOperators = ['+', '-', '*', ':'];
	    _this.errors = {
	      OperatorBlackList: false,
	      StandartSymbol: false
	    };
	    _this.errorRender = ['', ''];
	    return _this;
	  }
	  babelHelpers.createClass(RandomOperator, [{
	    key: "save",
	    value: function save() {
	      var excludeArea = document.querySelector("[id^=\"textArea_".concat(this.id, "\"]"));
	      var standartOperator = document.querySelector("[id^=\"textArea_".concat(this.id, "_2\"]"));
	      var excludeButton = document.querySelector(".form-check-input[id=\"RandomOperator\"]");
	      if (excludeButton.getAttribute('checked') === 'true') {
	        if (excludeArea.value !== null && excludeArea.value !== '') {
	          var exclude = excludeArea.value.replace(/\s+/g, '');
	          if (exclude.includes(':') && exclude.includes('/')) {
	            exclude = exclude.replace(/\//g, ':');
	          }
	          if (exclude.includes('N') && exclude.includes('root')) {
	            exclude = exclude.replace(/root/g, 'N');
	          }
	          exclude = exclude.split(',');
	          exclude = babelHelpers.toConsumableArray(new Set(exclude));
	          this.Exclude = exclude;
	          this.parameters.OperatorsExclude = exclude;
	          this.errors['OperatorBlackList'] = Validator.regExpMatch(this.Exclude.join(), /(-|\+|\*|\/|:|root|\^|N)+/, 'Только символы операторов');
	        } else {
	          this.parameters.OperatorsExclude = ['none'];
	          this.Exclude = [];
	        }
	      } else {
	        this.parameters.OperatorsExclude = ['none'];
	      }
	      this.parameters.StandartSymbol = standartOperator.value;
	      this.errors['StandartSymbol'] = Validator.regExpMatch(this.parameters.StandartSymbol, /^[-+*:]$/, 'Только одиночный символ из: +,-,*,:');
	      this.unregisterEvents();
	      return this.errorHandler();
	    }
	  }, {
	    key: "postUpdate",
	    value: function postUpdate() {
	      document.querySelector("[id=\"textArea_".concat(this.id, "\"]")).value = this.Exclude.join(', ');
	      document.querySelector("[id=\"textArea_".concat(this.id, "_2\"]")).value = this.parameters.StandartSymbol;
	    }
	  }, {
	    key: "updateParameters",
	    value: function updateParameters() {
	      if (this.parameters.OperatorsExclude === []) {
	        this.ExcludeStyle = ['', 'false', '', ''];
	      } else {
	        this.ExcludeStyle = ['collapsed', 'true', 'checked="true"', 'show'];
	      }
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      this.updateParameters();
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u043D\u0430\u0443\u0433\u0430\u0434. \u041F\u0440\u0438 \u043A\u0430\u0436\u0434\u043E\u043C \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u043F\u0440\u0438\u043C\u0435\u0440\u0430 - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u0431\u0443\u0434\u0435\u0442 \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u043C.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0433\u043E \u0432\u044B\u0431\u043E\u0440\u0430 \u0441\u0440\u0435\u0434\u0438 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E\u0442 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u043C\u043E\u0436\u043D\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C, \u0437\u0430\u0434\u0430\u0432 \u0435\u043C\u0443 \u0447\u0451\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 (\u0442\u0435\u0445, \u0447\u0442\u043E \u043D\u0435 \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0437\u0430\u0434\u0430\u043D\u0438\u044F)\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u043A \u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0432\u0441\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u044B (\u0441\u043B\u043E\u0436\u0435\u043D\u0438\u0435, \u0432\u044B\u0447\u0438\u0442\u0430\u043D\u0438\u0435, \u0443\u043C\u043D\u043E\u0436\u0435\u043D\u0438\u0435, \u0434\u0435\u043B\u0435\u043D\u0438\u0435, \u043A\u043E\u0440\u0435\u043D\u044C, \u0441\u0442\u0435\u043F\u0435\u043D\u044C)\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0418\u043C\u0435\u0439\u0442\u0435 \u0432 \u0432\u0438\u0434\u0443, \u0447\u0442\u043E \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0437\u0430\u0441\u0447\u0451\u0442 \u044D\u0442\u043E\u0433\u043E \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 - \u0432\u0441\u0435\u0433\u0434\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438!\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0443\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u043F\u043E\u0434\u0440\u044F\u0434 - \u0432\u044B\u0437\u043E\u0432\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0443!\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t<div id=\"settings_").concat(this.id, "\" class=\"d-flex flex-column\" style=\"width: 100%;\">\n\t\t\t\t\t<p>\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430</p>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input ").concat(this.ExcludeStyle[0], "\" type=\"checkbox\" value=\"Blacklist\" id=\"RandomOperator\" role=\"button\" data-bs-toggle=\"collapse\" href=\"#RandomOperatorCollapse\" role=\"button\" aria-expanded=\"").concat(this.ExcludeStyle[1], "\" aria-controls=\"RandomOperatorCollapse\" ").concat(this.ExcludeStyle[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RandomOperator\">\n\t\t\t\t\t\t\t\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0447\u0451\u0440\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"collapse ").concat(this.ExcludeStyle[3], "\" id=\"RandomOperatorCollapse\" style=\"width:100%;\">\n\t\t\t\t\t\t<div class=\"d-flex border\" style=\"width:100%;\">\n\t\t\t\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:100%;\">\n\t\t\t\t\t\t\t\t<a>\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u0441\u043A\u043B\u044E\u0447\u0430\u0435\u043C\u044B\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u044B</a>\n\t\t\t\t\t\t\t\t<div class=\"d-flex flex-column col-12\">\n\t\t\t\t\t\t\t\t\t<div class=\"d-flex\">\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "\" placeholder=\"\u041F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0438\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 \u0437\u0430\u043F\u044F\u0442\u0443\u044E\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[0], "</span>\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\t\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043E\u043F\u0435\u0440\u0430\u043D\u0434\u044B:\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\t\u0421\u043B\u043E\u0436\u0435\u043D\u0438\u0435: <strong>+</strong> ; \u0412\u044B\u0447\u0438\u0442\u0430\u043D\u0438\u0435: <strong>-</strong>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\t\u0423\u043C\u043D\u043E\u0436\u0435\u043D\u0438\u0435: <strong>*</strong> ; \u0421\u0442\u0435\u043F\u0435\u043D\u044C: <strong>^</strong>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\t\u0414\u0435\u043B\u0435\u043D\u0438\u0435  <strong>/</strong>  \u0438\u043B\u0438  <strong>:</strong> \n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t\t<span>\n\t\t\t\t\t\t\t\t\t\t\u041A\u043E\u0440\u0435\u043D\u044C:  <strong>N</strong>  \u0438\u043B\u0438  <strong>root</strong>\n\t\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"d-flex flex-column\">\n\t\t\t\t\t\t<label>\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B \u0434\u043B\u044F \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u0441\u0442\u0435\u043F\u0435\u043D\u0438 \u0438 \u043A\u043E\u0440\u043D\u044F (\u044D\u0442\u043E\u0442 \u0441\u0438\u043C\u0432\u043E\u043B \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u0441\u044F \u0441\u043B\u0435\u0432\u0430 \u043E\u0442 \u043A\u043E\u0440\u043D\u044F \u0438\u043B\u0438 \u0441\u043F\u0440\u0430\u0432\u0430 \u043E\u0442 \u0441\u0442\u0435\u043F\u0435\u043D\u0438 \u0432 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A\u043E\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u043F\u043E\u043F\u0430\u0434\u0451\u0442\u0441\u044F)</label>\n\t\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "_2\" placeholder=\"\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u044B: +, -, *, :\">\n\t\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[1], "</span>\n\t\t\t\t\t\t<span>\u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u043E \u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0441\u043B\u043E\u0436\u0435\u043D\u0438\u0435</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "updateParameters",
	    value: function updateParameters() {
	      if (this.parameters.OperatorsExclude[0] !== 'none') {
	        this.ExcludeStyle = ['collapsed', 'true', 'checked="true"', 'show', ''];
	      } else {
	        this.ExcludeStyle = ['', 'false', '', '', 'checked="true"'];
	      }
	    }
	  }, {
	    key: "registerEvents",
	    value: function registerEvents() {
	      if (this.areEventsRegistered === 0) {
	        this.areEventsRegistered = 1;
	        var excludeButton = document.querySelector(".form-check-input[id=\"RandomOperator\"]");
	        excludeButton.addEventListener('click', function (event) {
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
	        var excludeButton = document.querySelector(".form-check-input[id=\"RandomOperator\"]");
	        excludeButton.removeEventListener('click', function (event) {});
	      }
	    }
	  }]);
	  return RandomOperator;
	}(Operator);

	var MultiplyOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(MultiplyOperator, _Operator);
	  function MultiplyOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, MultiplyOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(MultiplyOperator).call(this, options));
	  }
	  babelHelpers.createClass(MultiplyOperator, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0423\u043C\u043D\u043E\u0436\u0435\u043D\u0438\u0435 - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0443\u043C\u043D\u043E\u0436\u0438\u0442\u044C \u043B\u0435\u0432\u044B\u0439 \u044D\u0435\u043C\u0435\u043D\u0442 \u043D\u0430 \u043F\u0440\u0430\u0432\u044B\u0439.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u0443\u043C\u043D\u043E\u0436\u0435\u043D\u0438\u044F \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0423\u043C\u043D\u043E\u0436\u0435\u043D\u0438\u0435 - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0443\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u043F\u043E\u0434\u0440\u044F\u0434 - \u0432\u044B\u0437\u043E\u0432\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0443!\n\t\t\t\t\t</span>\n\t\t\t\t</div>");
	      return html;
	    }
	  }]);
	  return MultiplyOperator;
	}(Operator);

	var EqualOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(EqualOperator, _Operator);
	  function EqualOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, EqualOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(EqualOperator).call(this, options));
	  }
	  babelHelpers.createClass(EqualOperator, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0420\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u043E - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0432\u0432\u0435\u0441\u0442\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0439 \u0441\u043B\u0435\u0432\u0430 \u0438 \u0441\u043F\u0440\u0430\u0432\u0430 \u043E\u0442 \u043D\u0435\u0433\u043E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0414\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F \u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0432\u0441\u0451 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u043B\u0435\u0432\u0430 \u043E\u0442 \u0440\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u0430 \u0438 \u0432\u0441\u0451 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441\u043F\u0440\u0430\u0432\u0430 \u043E\u0442 \u0440\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u0430.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u0440\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u0430 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C, \u043A \u043F\u0440\u0438\u043C\u0435\u0440\u0443, \u0434\u043B\u044F \u0441\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0439.\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0420\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u043E - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0443\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u043F\u043E\u0434\u0440\u044F\u0434 - \u0432\u044B\u0437\u043E\u0432\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0443!\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u041D\u0430\u043B\u0438\u0447\u0438\u0435 \u0434\u0432\u0443\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u0440\u0430\u0432\u0435\u043D\u0441\u0442\u0432\u0430 \u0432 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0438 - \u043F\u0440\u0438\u0432\u0435\u0434\u0451\u0442 \u043A \u043E\u0448\u0438\u0431\u043A\u0435!\n\t\t\t\t\t</span>\n\t\t\t\t</div>");
	      return html;
	    }
	  }]);
	  return EqualOperator;
	}(Operator);

	var MinusOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(MinusOperator, _Operator);
	  function MinusOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, MinusOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(MinusOperator).call(this, options));
	  }
	  babelHelpers.createClass(MinusOperator, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u044B\u0447\u0438\u0442\u0430\u0435\u043D\u0438\u0435 - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0432\u044B\u0447\u0435\u0441\u0442\u044C \u0438\u0437 \u043B\u0435\u0432\u043E\u0433\u043E \u044D\u0435\u043C\u0435\u043D\u0442\u0430 \u043F\u0440\u0430\u0432\u044B\u0439.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u0432\u044B\u0447\u0438\u0442\u0430\u043D\u0438\u044F \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u044B\u0447\u0438\u0442\u0430\u043D\u0438\u0435 - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0443\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u043F\u043E\u0434\u0440\u044F\u0434 - \u0432\u044B\u0437\u043E\u0432\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0443!\n\t\t\t\t\t</span>\n\t\t\t\t</div>");
	      return html;
	    }
	  }]);
	  return MinusOperator;
	}(Operator);

	var PlusOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(PlusOperator, _Operator);
	  function PlusOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, PlusOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(PlusOperator).call(this, options));
	  }
	  babelHelpers.createClass(PlusOperator, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0421\u043B\u043E\u0436\u0435\u043D\u0438\u0435 - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043F\u0440\u0438\u0431\u0430\u0432\u0438\u0442\u044C \u043A \u043B\u0435\u0432\u043E\u043C\u0443 \u044D\u0435\u043C\u0435\u043D\u0442\u0443 \u043F\u0440\u0430\u0432\u044B\u0439.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u0441\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0421\u043B\u043E\u0436\u0435\u043D\u0438\u0435 - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0443\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u043F\u043E\u0434\u0440\u044F\u0434 - \u0432\u044B\u0437\u043E\u0432\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0443!\n\t\t\t\t\t</span>\n\t\t\t\t</div>");
	      return html;
	    }
	  }]);
	  return PlusOperator;
	}(Operator);

	var Validator$1 = BX.Proj.Independent.Validator;
	var PowerOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(PowerOperator, _Operator);
	  function PowerOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, PowerOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(PowerOperator).call(this, options));
	    _this.DegStyle = ['collapsed', 'true', 'checked="true"', 'show', ''];
	    _this.parameters.DegType = ['Precision', 2];
	    _this.DegExp = 2;
	    _this.errorRender = [''];
	    _this.errors = {
	      degValue: false
	    };
	    return _this;
	  }
	  babelHelpers.createClass(PowerOperator, [{
	    key: "save",
	    value: function save() {
	      var degArea = document.querySelector("[id^=\"textArea_".concat(this.id, "\"]"));
	      var buttonWithText = document.getElementById("DegSetting_1");
	      var buttonWithoutText = document.getElementById("DegSetting_2");
	      if (buttonWithText.getAttribute('checked') === 'true') {
	        if (degArea.value !== null) {
	          this.DegExp = degArea.value;
	          this.parameters.DegType = [buttonWithText.getAttribute('value'), degArea.value];
	        } else {
	          this.DegExp = 2;
	          this.parameters.DegType = [buttonWithText.getAttribute('value'), 2];
	        }
	      }
	      if (buttonWithoutText.getAttribute('checked') === 'true') {
	        this.parameters.DegType = buttonWithoutText.getAttribute('value');
	      }
	      if (buttonWithText.getAttribute('checked') === 'true' && buttonWithoutText.getAttribute('checked') === 'true') {
	        if (degArea.value !== null) {
	          this.DegExp = degArea.value;
	          this.parameters.DegType = [buttonWithText.getAttribute('value'), degArea.value];
	        } else {
	          this.DegExp = 2;
	          this.parameters.DegType = [buttonWithText.getAttribute('value'), 2];
	        }
	      }
	      this.errors['degValue'] = Validator$1.isInteger(this.DegExp);
	      if (this.errors['degValue'] === false) {
	        this.errors['degValue'] = Validator$1.numberBetween(this.DegExp, 0, 10);
	      }
	      this.unregisterEvents();
	      return this.errorHandler();
	    }
	  }, {
	    key: "postUpdate",
	    value: function postUpdate() {
	      document.querySelector("[id^=\"textArea_".concat(this.id, "\"]")).value = this.DegExp;
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      this.updateParameters();
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043E\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0432 \u0441\u0442\u0435\u043F\u0435\u043D\u044C - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0432\u043E\u0437\u0432\u0435\u0441\u0442\u0438 \u0432 \u0441\u0442\u0435\u043F\u0435\u043D\u044C \u043B\u0435\u0432\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u0432\u043E\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0432 \u0441\u0442\u0435\u043F\u0435\u043D\u044C \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u0434\u0432\u0430 \u0440\u0435\u0436\u0438\u043C\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F:\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t1) \u0421\u0442\u0435\u043F\u0435\u043D\u044C \u043F\u0440\u043E\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u0447\u043D\u043E \u0438 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E [2])\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t2) \u0412 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044F \u0441\u0442\u0435\u043F\u0435\u043D\u0438 \u0432\u043E\u0437\u044C\u043C\u0451\u0442\u0441\u044F \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441\u043F\u0440\u0430\u0432\u0430 \u043E\u0442 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043E\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u0432 \u0441\u0442\u0435\u043F\u0435\u043D\u044C - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0443\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u043F\u043E\u0434\u0440\u044F\u0434 - \u0432\u044B\u0437\u043E\u0432\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0443!\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t<div id=\"settings_").concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430</p>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input ").concat(this.DegStyle[0], "\" type=\"checkbox\" value=\"Precision\" id=\"DegSetting_1\" role=\"button\" data-bs-toggle=\"collapse\" href=\"#DegCollapse\" role=\"button\" aria-expanded=\"").concat(this.DegStyle[1], "\" aria-controls=\"DegCollapse\" ").concat(this.DegStyle[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"DegSetting_1\">\n\t\t\t\t\t\t\t\u0421\u0442\u0435\u043F\u0435\u043D\u044C \u043F\u0440\u043E\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u0447\u043D\u043E \u0438 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E)\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"collapse ").concat(this.DegStyle[3], "\" id=\"DegCollapse\" style=\"width:100%;\">\n\t\t\t\t\t\t<div class=\"d-flex border\" style=\"width:100%;\">\n\t\t\t\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:100%;\">\n\t\t\t\t\t\t\t\t<a>\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0442\u0435\u043F\u0435\u043D\u044C</a>\n\t\t\t\t\t\t\t\t<div class=\"d-flex flex-column col-12\">\n\t\t\t\t\t\t\t\t\t<div class=\"d-flex\">\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "\" placeholder=\"\u0424\u043E\u0440\u043C\u0430\u0442: 0<'\u0446\u0435\u043B\u043E\u0435 \u0447\u0438\u0441\u043B\u043E'<10\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[0], "</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"checkbox\" value=\"Deg-right\" id=\"DegSetting_2\" role=\"button\" ").concat(this.DegStyle[4], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"DegSetting_2\">\n\t\t\t\t\t\t\t\u0412 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044F \u0441\u0442\u0435\u043F\u0435\u043D\u0438 \u0432\u043E\u0437\u044C\u043C\u0451\u0442\u0441\u044F \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441\u043F\u0440\u0430\u0432\u0430 \u043E\u0442 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<i>\u041F\u0440\u0438 \u0432\u044B\u0431\u043E\u0440\u0435 \u043E\u0431\u0435\u0438\u0445 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A, \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E!</i>\n\t\t\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "updateParameters",
	    value: function updateParameters() {
	      if (Array.isArray(this.parameters.DegType)) {
	        this.DegStyle = ['collapsed', 'true', 'checked="true"', 'show', ''];
	      } else {
	        this.DegStyle = ['', 'false', '', '', 'checked="true"'];
	      }
	    }
	  }, {
	    key: "registerEvents",
	    value: function registerEvents() {
	      if (this.areEventsRegistered === 0) {
	        this.areEventsRegistered = 1;
	        var buttons = document.querySelectorAll('.form-check-input[type="checkbox"]');
	        buttons.forEach(function (element) {
	          element.addEventListener('click', function (event) {
	            if (event.target.getAttribute('checked') === 'false') {
	              event.target.setAttribute('checked', "true");
	            } else if (event.target.getAttribute('checked') === 'true') {
	              event.target.setAttribute('checked', "false");
	            } else {
	              event.target.setAttribute('checked', "true");
	            }
	          });
	        });
	      }
	    }
	  }, {
	    key: "unregisterEvents",
	    value: function unregisterEvents() {
	      if (this.areEventsRegistered === 1) {
	        this.areEventsRegistered = 0;
	        var buttons = document.querySelectorAll('.form-check-input[type="checkbox"]');
	        buttons.forEach(function (element) {
	          element.removeEventListener('click', function (event) {});
	        });
	      }
	    }
	  }]);
	  return PowerOperator;
	}(Operator);

	var Validator$2 = BX.Proj.Independent.Validator;
	var RootOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(RootOperator, _Operator);
	  function RootOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, RootOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(RootOperator).call(this, options));
	    _this.RootStyle = ['collapsed', 'true', 'checked="true"', 'show', ''];
	    _this.parameters.RootType = ['Precision', 2];
	    _this.RootExp = 2;
	    _this.errors = {
	      RootExp: false
	    };
	    _this.errorRender = [''];
	    return _this;
	  }
	  babelHelpers.createClass(RootOperator, [{
	    key: "save",
	    value: function save() {
	      var rootArea = document.querySelector("[id^=\"textArea_".concat(this.id, "\"]"));
	      var buttonWithText = document.getElementById("RootSetting_1");
	      var buttonWithoutText = document.getElementById("RootSetting_2");
	      if (buttonWithText.getAttribute('checked') === 'true') {
	        if (rootArea.value !== null) {
	          this.RootExp = rootArea.value;
	          this.parameters.RootType = [buttonWithText.getAttribute('value'), rootArea.value];
	        } else {
	          this.RootExp = 2;
	          this.parameters.RootType = [buttonWithText.getAttribute('value'), 2];
	        }
	      }
	      if (buttonWithoutText.getAttribute('checked') === 'true') {
	        this.parameters.RootType = buttonWithoutText.getAttribute('value');
	      }
	      if (buttonWithText.getAttribute('checked') === 'true' && buttonWithoutText.getAttribute('checked') === 'true') {
	        if (rootArea.value !== null) {
	          this.RootExp = rootArea.value;
	          this.parameters.RootType = [buttonWithText.getAttribute('value'), rootArea.value];
	        } else {
	          this.RootExp = 2;
	          this.parameters.RootType = [buttonWithText.getAttribute('value'), 2];
	        }
	      }
	      this.errors['RootExp'] = Validator$2.isInteger(this.RootExp);
	      if (this.errors['RootExp'] === false) {
	        this.errors['RootExp'] = Validator$2.numberBetween(this.RootExp, 0, 10);
	      }
	      this.unregisterEvents();
	      return this.errorHandler();
	    }
	  }, {
	    key: "postUpdate",
	    value: function postUpdate() {
	      document.querySelector("[id^=\"textArea_".concat(this.id, "\"]")).value = this.RootExp;
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      this.updateParameters();
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u0437\u044F\u0442\u0438\u0435 \u043A\u043E\u0440\u043D\u044F - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0432\u0437\u044F\u0442\u044C \u043A\u043E\u0440\u0435\u043D\u044C \u0438\u0437 \u043F\u0440\u0430\u0432\u043E\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044E \u0432\u0437\u044F\u0442\u0438\u044F \u043A\u043E\u0440\u043D\u044F \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u0434\u0432\u0430 \u0440\u0435\u0436\u0438\u043C\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F:\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t1) \u0421\u0442\u0435\u043F\u0435\u043D\u044C \u043A\u043E\u0440\u043D\u044F \u043F\u0440\u043E\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u0447\u043D\u043E \u0438 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E [2])\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t2) \u0412 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u0441\u0442\u0435\u043F\u0435\u043D\u0438 \u043A\u043E\u0440\u043D\u044F - \u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0441\u043B\u0435\u0432\u0430 \u043E\u0442 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u0437\u044F\u0442\u0438\u0435 \u043A\u043E\u0440\u043D\u044F - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0443\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u043F\u043E\u0434\u0440\u044F\u0434 - \u0432\u044B\u0437\u043E\u0432\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0443!\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t<div id=\"settings_").concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430</p>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input ").concat(this.RootStyle[0], "\" type=\"checkbox\" value=\"Precision\" id=\"RootSetting_1\" role=\"button\" data-bs-toggle=\"collapse\" href=\"#DegCollapse\" role=\"button\" aria-expanded=\"").concat(this.RootStyle[1], "\" aria-controls=\"DegCollapse\" ").concat(this.RootStyle[2], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RootSetting_1\">\n\t\t\t\t\t\t\t\u0421\u0442\u0435\u043F\u0435\u043D\u044C \u043F\u0440\u043E\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0442\u043E\u0447\u043D\u043E \u0438 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 (\u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E)\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"collapse ").concat(this.RootStyle[3], "\" id=\"DegCollapse\" style=\"width:100%;\">\n\t\t\t\t\t\t<div class=\"d-flex border\" style=\"width:100%;\">\n\t\t\t\t\t\t\t<div class=\"d-flex flex-column\" style=\"margin-left:2%; width:100%;\">\n\t\t\t\t\t\t\t\t<a>\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0442\u0435\u043F\u0435\u043D\u044C</a>\n\t\t\t\t\t\t\t\t<div class=\"d-flex flex-column col-12\">\n\t\t\t\t\t\t\t\t\t<div class=\"d-flex\">\n\t\t\t\t\t\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "\" placeholder=\"\u0424\u043E\u0440\u043C\u0430\u0442: 0<'\u0446\u0435\u043B\u043E\u0435 \u0447\u0438\u0441\u043B\u043E'<10\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<span style=\"color:orangered\">").concat(this.errorRender[0], "</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-check\">\n\t\t\t\t\t\t<input class=\"form-check-input\" type=\"checkbox\" value=\"Root-left\" id=\"RootSetting_2\" role=\"button\" ").concat(this.RootStyle[4], ">\n\t\t\t\t\t\t<label class=\"form-check-label\" for=\"RootSetting_2\">\n\t\t\t\t\t\t\t\u0412 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u0441\u0442\u0435\u043F\u0435\u043D\u0438 \u043A\u043E\u0440\u043D\u044F - \u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0441\u043B\u0435\u0432\u0430 \u043E\u0442 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<i>\u041F\u0440\u0438 \u0432\u044B\u0431\u043E\u0440\u0435 \u043E\u0431\u0435\u0438\u0445 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043A, \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u0430 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E!</i>\n\t\t\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "updateParameters",
	    value: function updateParameters() {
	      if (Array.isArray(this.parameters.RootType)) {
	        this.RootStyle = ['collapsed', 'true', 'checked="true"', 'show', ''];
	      } else {
	        this.RootStyle = ['', 'false', '', '', 'checked="true"'];
	      }
	    }
	  }, {
	    key: "registerEvents",
	    value: function registerEvents() {
	      if (this.areEventsRegistered === 0) {
	        this.areEventsRegistered = 1;
	        var buttons = document.querySelectorAll('.form-check-input[type="checkbox"]');
	        buttons.forEach(function (element) {
	          element.addEventListener('click', function (event) {
	            if (event.target.getAttribute('checked') === 'false') {
	              event.target.setAttribute('checked', "true");
	            } else if (event.target.getAttribute('checked') === 'true') {
	              event.target.setAttribute('checked', "false");
	            } else {
	              event.target.setAttribute('checked', "true");
	            }
	          });
	        });
	      }
	    }
	  }, {
	    key: "unregisterEvents",
	    value: function unregisterEvents() {
	      if (this.areEventsRegistered === 1) {
	        this.areEventsRegistered = 0;
	        var buttons = document.querySelectorAll('.form-check-input[type="checkbox"]');
	        buttons.forEach(function (element) {
	          element.removeEventListener('click', function (event) {});
	        });
	      }
	    }
	  }]);
	  return RootOperator;
	}(Operator);

	var RandNumberOption = BX.Proj.Independent.RandNumberOption;
	var RandNumberOperator = /*#__PURE__*/function (_RandNumberOption) {
	  babelHelpers.inherits(RandNumberOperator, _RandNumberOption);
	  function RandNumberOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, RandNumberOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(RandNumberOperator).call(this, options));
	    if (options.textView !== undefined) {
	      _this.textView = options.textView;
	    } else {
	      _this.textView = '[X]';
	    }
	    _this.parameters.id = _this.id;
	    _this.parameters.Type = _this.Type;
	    _this.isOperator = false;
	    _this.isDelitable = true;
	    _this.isPair = false;
	    _this.PairId = null;
	    _this.html = "<span id=\"".concat(_this.id, "\" data-instruction=\"").concat(_this.id, "\" onclick=\"generator.showOption(").concat(_this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(_this.color, ";\">").concat(_this.optionName, "</span>");
	    return _this;
	  }
	  babelHelpers.createClass(RandNumberOperator, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = babelHelpers.get(babelHelpers.getPrototypeOf(RandNumberOperator.prototype), "showOption", this).call(this);
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0437\u0430\u0434\u0430\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0433\u043E \u0447\u0438\u0441\u043B\u0430 \u0434\u043B\u044F \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044F.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u0431\u044A\u0435\u043A\u0442, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u0432\u044B\u0447\u0438\u0441\u043B\u044F\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 (\u0447\u0438\u0441\u043B\u043E) \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044E.\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0421\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0420\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0443\u0445 \u0442\u0430\u043A\u0438\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u043F\u043E\u0434\u0440\u044F\u0434 - \u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u0440\u043E\u0441\u0442\u0430\u0432\u0438\u0442 \u043C\u0435\u0436\u0434\u0443 \u043D\u0438\u043C\u0438 \u0437\u043D\u0430\u043A \u0443\u043C\u043D\u043E\u0436\u0435\u043D\u0438\u044F!\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u041E\u0442\u0443\u0442\u0441\u0442\u0432\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u0441\u043B\u0435\u0432\u0430 \u0438\u043B\u0438 \u0441\u043F\u0440\u0430\u0432\u0430 \u043E\u0442 \u044D\u0442\u043E\u0433\u043E \u044D\u0435\u043C\u0435\u043D\u0442\u0430 - \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442 \u0432 \u0442\u043E\u043C \u043C\u0435\u0441\u0442\u0435 \u0437\u043D\u0430\u043A \u0443\u043C\u043D\u043E\u0436\u0435\u043D\u0438\u044F!\n\t\t\t\t\t</span>\n\t\t\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "render",
	    value: function render(mode) {
	      switch (mode) {
	        case 'text':
	          return "<span id=\"instruction_".concat(this.id, "\" data-instruction=\"").concat(this.id, "\" onclick=\"generator.showOption(").concat(this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(this.color, ";\">").concat(this.textView, "</span>");
	        default:
	          return this.html;
	      }
	    }
	  }]);
	  return RandNumberOperator;
	}(RandNumberOption);

	var AnswerOperator = /*#__PURE__*/function (_Operator) {
	  babelHelpers.inherits(AnswerOperator, _Operator);
	  function AnswerOperator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, AnswerOperator);
	    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(AnswerOperator).call(this, options));
	  }
	  babelHelpers.createClass(AnswerOperator, [{
	    key: "showOption",
	    value: function showOption() {
	      var html = "<p class=\"d-flex\">\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u2116".concat(this.id, " \u0422\u0438\u043F:[").concat(this.optionName, "]</p>");
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041E\u0442\u0432\u0435\u0442 - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0437\u0430\u0434\u0430\u0442\u044C \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0439 \u0434\u043B\u044F \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044F. \u0412 \u0441\u043B\u0443\u0447\u0430\u0435, \u0435\u0441\u043B\u0438 \u0438\u0434\u0451\u0442 \u0440\u0430\u0431\u043E\u0442\u0430 \u0441 \u043C\u043D\u043E\u0433\u043E\u0447\u043B\u0435\u043D\u0430\u043C\u0438, \u043A \u043F\u0440\u0438\u043C\u0435\u0440\u0443\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E - \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0449\u0438\u0439 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u043F\u0435\u0440\u0435\u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442\u044C \u043E\u0442\u0432\u0435\u0442 \u0438\u043B\u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u0435\u0433\u043E \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F.\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041E\u0442\u0432\u0435\u0442 - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u043E\u0442\u0432\u0435\u0442\u0430 - \u043E\u043D \u0431\u0443\u0434\u0435\u0442 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u0432 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u044E\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C \u0432\u043D\u0435 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442 \u0442\u043E\u0433\u043E, \u0433\u0434\u0435 \u0440\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D!.\n\t\t\t\t\t</span>\n\t\t\t\t</div>");
	      return html;
	    }
	  }]);
	  return AnswerOperator;
	}(Operator);

	var RandNumberOption$1 = BX.Proj.Independent.RandNumberOption;
	var PolynomOperator = /*#__PURE__*/function (_RandNumberOption) {
	  babelHelpers.inherits(PolynomOperator, _RandNumberOption);
	  function PolynomOperator() {
	    var _this;
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    babelHelpers.classCallCheck(this, PolynomOperator);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(PolynomOperator).call(this, options));
	    _this.parameters.PolynomLitera = '';
	    if (options.textView !== undefined) {
	      _this.textView = options.textView;
	    } else {
	      _this.textView = '{xyz}';
	    }
	    _this.isOperator = false;
	    _this.isDelitable = true;
	    _this.isPair = false;
	    _this.PairId = null;
	    _this.html = "<span id=\"".concat(_this.id, "\" data-instruction=\"").concat(_this.id, "\" onclick=\"generator.showOption(").concat(_this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(_this.color, ";\">").concat(_this.optionName, "</span>");
	    return _this;
	  }
	  babelHelpers.createClass(PolynomOperator, [{
	    key: "save",
	    value: function save() {
	      babelHelpers.get(babelHelpers.getPrototypeOf(PolynomOperator.prototype), "save", this).call(this);
	      var textArea = document.getElementById("textArea_".concat(this.id));
	      if (textArea.value !== null && textArea.value !== '' && textArea.value.length < 2) {
	        this.parameters.PolynomLitera = textArea.value;
	      }
	    }
	  }, {
	    key: "postUpdate",
	    value: function postUpdate() {
	      babelHelpers.get(babelHelpers.getPrototypeOf(PolynomOperator.prototype), "postUpdate", this).call(this);
	      var textArea = document.getElementById("textArea_".concat(this.id));
	      if (this.parameters.PolynomLitera !== undefined) {
	        textArea.value = this.parameters.PolynomLitera;
	      } else {
	        textArea.value = '';
	      }
	    }
	  }, {
	    key: "showOption",
	    value: function showOption() {
	      var html = babelHelpers.get(babelHelpers.getPrototypeOf(PolynomOperator.prototype), "showOption", this).call(this);
	      html += "\n\t\t\t\t<div id=\"description_".concat(this.id, "\" class=\"d-flex flex-column\">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 '").concat(this.optionName, "'\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041F\u043E\u043B\u0438\u043D\u043E\u043C - \u0420\u0435\u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0443\u0435\u0442 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0432 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435. \u041D\u0430\u043B\u0438\u0447\u0438\u0435 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u043F\u043E\u043B\u0438\u043D\u043E\u043C\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043B\u0438 \u043A\u043E\u043D\u0435\u0447\u043D\u043E\u0435 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0443\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435\u043C.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u042D\u0442\u043E\u0442 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u0431\u0443\u043A\u0432\u0435\u043D\u043D\u044B\u0435 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044F. \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0434\u043B\u044F \u0437\u0430\u0434\u0430\u0447 \u043F\u043E\u0434\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043D\u0430\u0437\u043D\u0430\u0447\u0438\u0442\u044C \u0431\u0443\u043A\u0432\u0435\u043D\u043D\u044B\u0439 \u0441\u0438\u043C\u0432\u043E\u043B \u0434\u043B\u044F \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u043E\u0433\u043E \u0447\u0438\u0441\u043B\u0430\n\t\t\t\t\t</span>\n\t\t\t\t\t<p>\n\t\t\t\t\t\t\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432\u043D\u0443\u0442\u0440\u0438 \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430\n\t\t\t\t\t</p>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u041F\u043E\u043B\u0438\u043D\u043E\u043C - \u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0440\u0430\u0441\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0432\u0443\u0445 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432 \u043F\u043E\u043B\u0438\u043D\u043E\u043C\u0430 \u043F\u043E\u0434\u0440\u044F\u0434 - \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u0434\u0435\u043B\u0430\u0442\u044C \u0441\u043B\u043E\u0436\u043D\u043E\u0435 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0445.\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>\n\t\t\t\t\t\t\u0412\u043D\u0438\u043C\u0430\u043D\u0438\u0435: \u0435\u0441\u043B\u0438 \u0434\u0432\u0430 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u043F\u043E\u043B\u0438\u043D\u043E\u043C\u0430 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u044B \u043A \u043E\u0434\u043D\u043E\u0439 \u0431\u0443\u043A\u0432\u0435, \u0442\u043E \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0432\u043E\u0437\u044C\u043C\u0443\u0442\u0441\u044F \u043E\u0442 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0441\u043B\u0435\u0432\u0430 \u0438\u0437 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440\u043E\u0432\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"d-flex\" style=\"width:100%;\">\n\t\t\t\t\t<input class=\"form-control\" id=\"textArea_").concat(this.id, "\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0431\u0443\u043A\u0432\u0443 \u0434\u043B\u044F \u0437\u0430\u043C\u0435\u0449\u0435\u043D\u0438\u044F\">\n\t\t\t\t</div>");
	      return html;
	    }
	  }, {
	    key: "render",
	    value: function render(mode) {
	      switch (mode) {
	        case 'text':
	          return "<span id=\"instruction_".concat(this.id, "\" data-instruction=\"").concat(this.id, "\" onclick=\"generator.showOption(").concat(this.id, ")\" class=\"border btn\" style=\"padding: 1%; margin:1%; background:").concat(this.color, ";\">").concat(this.textView, "</span>");
	        default:
	          return this.html;
	      }
	    }
	  }]);
	  return PolynomOperator;
	}(RandNumberOption$1);

	var OptionList = BX.Proj.Independent.OptionList;
	var OperatorList = /*#__PURE__*/function (_OptionList) {
	  babelHelpers.inherits(OperatorList, _OptionList);
	  function OperatorList() {
	    var _this;
	    babelHelpers.classCallCheck(this, OperatorList);
	    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(OperatorList).call(this));
	    _this.list.push(new Pointer({
	      type: 'pointer',
	      color: 'lightblue'
	    }));
	    _this.addedInstructions = 1;
	    _this.idCounter = 0;
	    _this.pointerPosition = 0;
	    return _this;
	  }
	  babelHelpers.createClass(OperatorList, [{
	    key: "checkPointerPosition",
	    value: function checkPointerPosition(newOperator) {
	      if (this.pointerPosition !== this.addedInstructions - 1) {
	        var listPart = Array.from(this.list);
	        this.list.splice(this.pointerPosition + 1);
	        listPart = listPart.splice(this.pointerPosition + 1);
	        this.list.push(newOperator);
	        this.list = this.list.concat(listPart);
	      } else {
	        this.list.push(newOperator);
	      }
	      this.addedInstructions += 1;
	      this.idCounter += 1;
	    }
	  }, {
	    key: "addInstruction",
	    value: function addInstruction(type, color) {
	      var newOperator = '';
	      switch (type) {
	        case 'ABS':
	          newOperator = new AbsoluteOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '|',
	            PairId: this.idCounter + 1,
	            isOperator: false
	          });
	          this.checkPointerPosition(newOperator);
	          this.movePointer('right');
	          newOperator = new AbsoluteOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '|',
	            PairId: this.idCounter - 1,
	            isOperator: false
	          });
	          break;
	        case 'Bracket':
	          newOperator = new BracketOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '(',
	            PairId: this.idCounter + 1,
	            isOperator: false
	          });
	          this.checkPointerPosition(newOperator);
	          this.movePointer('right');
	          newOperator = new BracketOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: ')',
	            PairId: this.idCounter - 1,
	            isOperator: false
	          });
	          break;
	        case 'Div':
	          newOperator = new DivOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: ':'
	          });
	          break;
	        case 'Equal':
	          newOperator = new EqualOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '='
	          });
	          break;
	        case 'Minus':
	          newOperator = new MinusOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '-'
	          });
	          break;
	        case 'Multiply':
	          newOperator = new MultiplyOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '*'
	          });
	          break;
	        case 'Plus':
	          newOperator = new PlusOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '+'
	          });
	          break;
	        case 'Power':
	          newOperator = new PowerOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '^'
	          });
	          break;
	        case 'rand.Number':
	          newOperator = new RandNumberOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '[X]',
	            isOperator: false
	          });
	          break;
	        case 'Rand.Operation':
	          newOperator = new RandomOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '?¿'
	          });
	          break;
	        case 'Root':
	          newOperator = new RootOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '√¯'
	          });
	          break;
	        case 'Answer':
	          newOperator = new AnswerOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '<==>'
	          });
	          break;
	        case 'Polynom':
	          newOperator = new PolynomOperator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: '{xyz}'
	          });
	          break;
	        default:
	          newOperator = new Operator({
	            id: this.idCounter,
	            type: type,
	            color: color,
	            textView: 'null'
	          });
	          break;
	      }
	      this.checkPointerPosition(newOperator);
	      this.movePointer('right');
	      if (newOperator.isPair) {
	        this.movePointer('left');
	      }
	    }
	  }, {
	    key: "deleteLastInstruction",
	    value: function deleteLastInstruction(container) {
	      var _this2 = this;
	      var check = false;
	      if (this.pointerPosition === 0 || this.addedInstructions === 1) {
	        return;
	      }
	      if (this.list[this.pointerPosition - 1].isPair) {
	        check = this.openedInstruction === this.list[this.pointerPosition - 1].id;
	        var deletedId = this.list[this.pointerPosition - 1].id;
	        var listPart = Array.from(this.list);
	        this.list.splice(this.pointerPosition - 1);
	        listPart = listPart.splice(this.pointerPosition);
	        this.list = this.list.concat(listPart);
	        this.pointerPosition -= 1;
	        this.addedInstructions -= 1;
	        this.list.forEach(function (operator) {
	          if (operator.PairId === deletedId) {
	            var _listPart = Array.from(_this2.list);
	            var pos = _this2.list.indexOf(operator);
	            _this2.list.splice(pos);
	            _listPart = _listPart.splice(pos + 1);
	            _this2.list = _this2.list.concat(_listPart);
	            if (pos < _this2.pointerPosition) {
	              _this2.pointerPosition -= 1;
	            }
	            _this2.addedInstructions -= 1;
	          }
	        });
	      } else {
	        check = this.openedInstruction === this.list[this.pointerPosition - 1].id;
	        var _listPart2 = Array.from(this.list);
	        this.list.splice(this.pointerPosition - 1);
	        _listPart2 = _listPart2.splice(this.pointerPosition);
	        this.list = this.list.concat(_listPart2);
	        this.pointerPosition -= 1;
	        this.addedInstructions -= 1;
	      }
	      if (this.list.length === 1 || check) {
	        this.openedInstruction = -1;
	        container.innerHTML = '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>';
	        container.style.borderColor = "#dee2e6";
	        container.style.borderWidth = "1px";
	      }
	    }
	  }, {
	    key: "showOption",
	    value: function showOption(id, container) {
	      var _this3 = this;
	      if (container.innerHTML === '<i>Щёлкните на любой добавленный элемент в поле инструкции генератора, чтобы изменить его свойства!</i>') {
	        this.openedInstruction = -1;
	      }
	      if (id === this.openedInstruction) {
	        this.saveOpenedInstructionData();
	        this.list.forEach(function (operator) {
	          if (operator.id === id) {
	            container.innerHTML = operator.showOption();
	            _this3.list[_this3.list.indexOf(operator)].registerEvents();
	            _this3.list[_this3.list.indexOf(operator)].postUpdate();
	          }
	        });
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
	      this.list.forEach(function (operator) {
	        if (operator.id === id) {
	          container.innerHTML = operator.showOption();
	          _this3.list[_this3.list.indexOf(operator)].registerEvents();
	          _this3.list[_this3.list.indexOf(operator)].postUpdate();
	        }
	      });
	    }
	  }, {
	    key: "saveOpenedInstructionData",
	    value: function saveOpenedInstructionData() {
	      var _this4 = this;
	      if (this.openedInstruction !== -1) {
	        var operatorToSave;
	        this.list.forEach(function (operator) {
	          if (_this4.openedInstruction === operator.id) {
	            operatorToSave = operator;
	          }
	        });
	        return operatorToSave.save();
	      }
	      return true;
	    }
	  }, {
	    key: "movePointer",
	    value: function movePointer(direction) {
	      if (this.list.length === 1) {
	        return;
	      }
	      var pointer = this.list[this.pointerPosition];
	      switch (direction) {
	        case 'left':
	          if (this.pointerPosition === 0) {
	            return;
	          }
	          var leftElement = this.list[this.pointerPosition - 1];
	          this.list[this.pointerPosition] = leftElement;
	          this.list[this.pointerPosition - 1] = pointer;
	          this.pointerPosition -= 1;
	          leftElement = undefined;
	          pointer = undefined;
	          break;
	        case 'right':
	          if (this.pointerPosition === this.list.length - 1) {
	            return;
	          }
	          var rightElement = this.list[this.pointerPosition + 1];
	          this.list[this.pointerPosition] = rightElement;
	          this.list[this.pointerPosition + 1] = pointer;
	          this.pointerPosition += 1;
	          rightElement = undefined;
	          pointer = undefined;
	          break;
	      }
	    }
	  }, {
	    key: "renderTextView",
	    value: function renderTextView() {
	      var html = '';
	      this.list.forEach(function (instruction) {
	        html += instruction.render('text');
	      });
	      return html;
	    }
	  }, {
	    key: "saveAllData",
	    value: function saveAllData() {
	      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'inside';
	      if (mode === "inside" && !this.saveOpenedInstructionData()) {
	        return false;
	      }
	      var symbolicExpression = '';
	      var generatorInstruction = [];
	      this.list.forEach(function (operator) {
	        if (operator.id === -1) return;
	        symbolicExpression += operator.textView;
	        generatorInstruction.push(operator.getGeneratorData());
	      });
	      generatorInstruction.preview = symbolicExpression;
	      return generatorInstruction;
	    }
	  }]);
	  return OperatorList;
	}(OptionList);

	exports.Operator = Operator;
	exports.OperatorList = OperatorList;

}((this.BX.Proj.Independent = this.BX.Proj.Independent || {}),BX));
