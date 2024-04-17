/* eslint-disable */
this.Proj = this.Proj || {};
(function (exports,main_core) {
	'use strict';

	var Generator = /*#__PURE__*/function () {
	  function Generator() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
	      name: 'Generator'
	    };
	    babelHelpers.classCallCheck(this, Generator);
	    this.name = options.name;
	  }
	  babelHelpers.createClass(Generator, [{
	    key: "setName",
	    value: function setName(name) {
	      if (main_core.Type.isString(name)) {
	        this.name = name;
	      }
	    }
	  }, {
	    key: "getName",
	    value: function getName() {
	      return this.name;
	    }
	  }]);
	  return Generator;
	}();

	exports.Generator = Generator;

}((this.Proj.Independent = this.Proj.Independent || {}),BX));
