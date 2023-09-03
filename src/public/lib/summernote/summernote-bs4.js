/*! Summernote v0.8.11 | (c) 2013- Alan Hong and other contributors | MIT license */

! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], e) : e(t.jQuery)
}(this, function(k) {
	"use strict";
	k = k && k.hasOwnProperty("default") ? k.default : k;
	var i = function() {
			function t(t, e, o, n) {
				this.markup = t, this.children = e, this.options = o, this.callback = n
			}
			return t.prototype.render = function(t) {
				var o = k(this.markup);
				if (this.options && this.options.contents && o.html(this.options.contents), this.options && this.options.className && o.addClass(this.options.className), this.options && this.options.data && k.each(this.options.data, function(t, e) {
						o.attr("data-" + t, e)
					}), this.options && this.options.click && o.on("click", this.options.click), this.children) {
					var e = o.find(".note-children-container");
					this.children.forEach(function(t) {
						t.render(e.length ? e : o)
					})
				}
				return this.callback && this.callback(o, this.options), this.options && this.options.callback && this.options.callback(o), t && t.append(o), o
			}, t
		}(),
		o = function(o, n) {
			return function() {
				var t = "object" == typeof arguments[1] ? arguments[1] : arguments[0],
					e = k.isArray(arguments[0]) ? arguments[0] : [];
				return t && t.children && (e = t.children), new i(o, e, t, n)
			}
		},
		t = o('<div class="note-editor note-frame card"/>'),
		e = o('<div class="note-toolbar card-header" role="toolbar"></div>'),
		n = o('<div class="note-editing-area"/>'),
		r = o('<textarea class="note-codable" role="textbox" aria-multiline="true"/>'),
		s = o('<div class="note-editable card-block" contentEditable="true" role="textbox" aria-multiline="true"/>'),
		a = o(['<output class="note-status-output" aria-live="polite"/>', '<div class="note-statusbar" role="status">', '  <output class="note-status-output" aria-live="polite"></output>', '  <div class="note-resizebar" role="seperator" aria-orientation="horizontal" aria-label="Resize">', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', '    <div class="note-icon-bar"/>', "  </div>", "</div>"].join("")),
		l = o('<div class="note-editor"/>'),
		c = o(['<div class="note-editable" contentEditable="true" role="textbox" aria-multiline="true"/>', '<output class="note-status-output" aria-live="polite"/>'].join("")),
		d = o('<div class="note-btn-group btn-group">'),
		u = o('<div class="dropdown-menu" role="list">', function(t, i) {
			var e = k.isArray(i.items) ? i.items.map(function(t) {
				var e = "string" == typeof t ? t : t.value || "",
					o = i.template ? i.template(t) : t,
					n = "object" == typeof t ? t.option : void 0;
				return '<a class="dropdown-item" href="#" ' + ('data-value="' + e + '"' + (void 0 !== n ? ' data-option="' + n + '"' : "")) + ' role="listitem" aria-label="' + t + '">' + o + "</a>"
			}).join("") : i.items;
			t.html(e).attr({
				"aria-label": i.title
			})
		}),
		h = o('<div class="dropdown-menu note-check" role="list">', function(t, n) {
			var e = k.isArray(n.items) ? n.items.map(function(t) {
				var e = "string" == typeof t ? t : t.value || "",
					o = n.template ? n.template(t) : t;
				return '<a class="dropdown-item" href="#" data-value="' + e + '" role="listitem" aria-label="' + t + '">' + v(n.checkClassName) + " " + o + "</a>"
			}).join("") : n.items;
			t.html(e).attr({
				"aria-label": n.title
			})
		}),
		p = o('<div class="note-color-palette"/>', function(t, e) {
			for (var o = [], n = 0, i = e.colors.length; n < i; n++) {
				for (var r = e.eventName, s = e.colors[n], a = e.colorsName[n], l = [], c = 0, d = s.length; c < d; c++) {
					var u = s[c],
						h = a[c];
					l.push(['<button type="button" class="note-color-btn"', 'style="background-color:', u, '" ', 'data-event="', r, '" ', 'data-value="', u, '" ', 'title="', h, '" ', 'aria-label="', h, '" ', 'data-toggle="button" tabindex="-1"></button>'].join(""))
				}
				o.push('<div class="note-color-row">' + l.join("") + "</div>")
			}
			t.html(o.join("")), e.tooltip && t.find(".note-color-btn").tooltip({
				container: e.container,
				trigger: "hover",
				placement: "bottom"
			})
		}),
		f = o('<div class="modal" aria-hidden="false" tabindex="-1" role="dialog"/>', function(t, e) {
			e.fade && t.addClass("fade"), t.attr({
				"aria-label": e.title
			}), t.html(['<div class="modal-dialog">', '  <div class="modal-content">', e.title ? '    <div class="modal-header">      <h4 class="modal-title">' + e.title + '</h4>      <button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true">&times;</button>    </div>' : "", '    <div class="modal-body">' + e.body + "</div>", e.footer ? '    <div class="modal-footer">' + e.footer + "</div>" : "", "  </div>", "</div>"].join(""))
		}),
		m = o(['<div class="note-popover popover in">', '  <div class="arrow"/>', '  <div class="popover-content note-children-container"/>', "</div>"].join(""), function(t, e) {
			var o = void 0 !== e.direction ? e.direction : "bottom";
			t.addClass(o), e.hideArrow && t.find(".arrow").hide()
		}),
		g = o('<div class="form-check"></div>', function(t, e) {
			t.html(['<label class="form-check-label"' + (e.id ? ' for="' + e.id + '"' : "") + ">", ' <input role="checkbox" type="checkbox" class="form-check-input"' + (e.id ? ' id="' + e.id + '"' : ""), e.checked ? " checked" : "", ' aria-label="' + (e.text ? e.text : "") + '"', ' aria-checked="' + (e.checked ? "true" : "false") + '"/>', " " + (e.text ? e.text : "") + "</label>"].join(""))
		}),
		v = function(t, e) {
			return "<" + (e = e || "i") + ' class="' + t + '"/>'
		},
		b = {
			editor: t,
			toolbar: e,
			editingArea: n,
			codable: r,
			editable: s,
			statusbar: a,
			airEditor: l,
			airEditable: c,
			buttonGroup: d,
			dropdown: u,
			dropdownButtonContents: function(t) {
				return t
			},
			dropdownCheck: h,
			palette: p,
			dialog: f,
			popover: m,
			icon: v,
			checkbox: g,
			options: {},
			button: function(t, e) {
				return o('<button type="button" class="note-btn btn btn-light btn-sm" role="button" tabindex="-1">', function(t, e) {
					e && e.tooltip && t.attr({
						title: e.tooltip,
						"aria-label": e.tooltip
					}).tooltip({
						container: void 0 !== e.container ? e.container : "body",
						trigger: "hover",
						placement: "bottom"
					})
				})(t, e)
			},
			toggleBtn: function(t, e) {
				t.toggleClass("disabled", !e), t.attr("disabled", !e)
			},
			toggleBtnActive: function(t, e) {
				t.toggleClass("active", e)
			},
			onDialogShown: function(t, e) {
				t.one("shown.bs.modal", e)
			},
			onDialogHidden: function(t, e) {
				t.one("hidden.bs.modal", e)
			},
			showDialog: function(t) {
				t.modal("show")
			},
			hideDialog: function(t) {
				t.modal("hide")
			},
			createLayout: function(t, e) {
				var o = (e.airMode ? b.airEditor([b.editingArea([b.airEditable()])]) : b.editor([b.toolbar(), b.editingArea([b.codable(), b.editable()]), b.statusbar()])).render();
				return o.insertAfter(t), {
					note: t,
					editor: o,
					toolbar: o.find(".note-toolbar"),
					editingArea: o.find(".note-editing-area"),
					editable: o.find(".note-editable"),
					codable: o.find(".note-codable"),
					statusbar: o.find(".note-statusbar")
				}
			},
			removeLayout: function(t, e) {
				t.html(e.editable.html()), e.editor.remove(), t.show()
			}
		};
	var y = 0;
	var C = {
		eq: function(e) {
			return function(t) {
				return e === t
			}
		},
		eq2: function(t, e) {
			return t === e
		},
		peq2: function(o) {
			return function(t, e) {
				return t[o] === e[o]
			}
		},
		ok: function() {
			return !0
		},
		fail: function() {
			return !1
		},
		self: function(t) {
			return t
		},
		not: function(t) {
			return function() {
				return !t.apply(t, arguments)
			}
		},
		and: function(e, o) {
			return function(t) {
				return e(t) && o(t)
			}
		},
		invoke: function(t, e) {
			return function() {
				return t[e].apply(t, arguments)
			}
		},
		uniqueId: function(t) {
			var e = ++y + "";
			return t ? t + e : e
		},
		rect2bnd: function(t) {
			var e = $(document);
			return {
				top: t.top + e.scrollTop(),
				left: t.left + e.scrollLeft(),
				width: t.right - t.left,
				height: t.bottom - t.top
			}
		},
		invertObject: function(t) {
			var e = {};
			for (var o in t) t.hasOwnProperty(o) && (e[t[o]] = o);
			return e
		},
		namespaceToCamel: function(t, e) {
			return (e = e || "") + t.split(".").map(function(t) {
				return t.substring(0, 1).toUpperCase() + t.substring(1)
			}).join("")
		},
		debounce: function(n, i, r) {
			var s;
			return function() {
				var t = this,
					e = arguments,
					o = r && !s;
				clearTimeout(s), s = setTimeout(function() {
					s = null, r || n.apply(t, e)
				}, i), o && n.apply(t, e)
			}
		}
	};

	function w(t) {
		return t[0]
	}

	function x(t) {
		return t[t.length - 1]
	}

	function S(t) {
		return t.slice(1)
	}

	function T(t, e) {
		return k.inArray(e, t)
	}

	function I(t, e) {
		return -1 !== T(t, e)
	}
	var N = {
			head: w,
			last: x,
			initial: function(t) {
				return t.slice(0, t.length - 1)
			},
			tail: S,
			prev: function(t, e) {
				var o = T(t, e);
				return -1 === o ? null : t[o - 1]
			},
			next: function(t, e) {
				var o = T(t, e);
				return -1 === o ? null : t[o + 1]
			},
			find: function(t, e) {
				for (var o = 0, n = t.length; o < n; o++) {
					var i = t[o];
					if (e(i)) return i
				}
			},
			contains: I,
			all: function(t, e) {
				for (var o = 0, n = t.length; o < n; o++)
					if (!e(t[o])) return !1;
				return !0
			},
			sum: function(t, o) {
				return o = o || C.self, t.reduce(function(t, e) {
					return t + o(e)
				}, 0)
			},
			from: function(t) {
				for (var e = [], o = t.length, n = -1; ++n < o;) e[n] = t[n];
				return e
			},
			isEmpty: function(t) {
				return !t || !t.length
			},
			clusterBy: function(t, n) {
				return t.length ? S(t).reduce(function(t, e) {
					var o = x(t);
					return n(x(o), e) ? o[o.length] = e : t[t.length] = [e], t
				}, [
					[w(t)]
				]) : []
			},
			compact: function(t) {
				for (var e = [], o = 0, n = t.length; o < n; o++) t[o] && e.push(t[o]);
				return e
			},
			unique: function(t) {
				for (var e = [], o = 0, n = t.length; o < n; o++) I(e, t[o]) || e.push(t[o]);
				return e
			}
		},
		E = "function" == typeof define && define.amd;
	var A, R = navigator.userAgent,
		F = /MSIE|Trident/i.test(R);
	if (F) {
		var P = /MSIE (\d+[.]\d+)/.exec(R);
		P && (A = parseFloat(P[1])), (P = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(R)) && (A = parseFloat(P[1]))
	}
	var L = /Edge\/\d+/.test(R),
		H = !!window.CodeMirror;
	if (!H && E)
		if ("function" == typeof __webpack_require__) try {
			require.resolve("codemirror"), H = !0
		} catch (t) {} else if ("undefined" != typeof require)
			if (void 0 !== require.resolve) try {
				require.resolve("codemirror"), H = !0
			} catch (t) {} else void 0 !== require.specified && (H = require.specified("codemirror"));
	var D = "ontouchstart" in window || 0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints,
		B = F || L ? "DOMCharacterDataModified DOMSubtreeModified DOMNodeInserted" : "input",
		z = {
			isMac: -1 < navigator.appVersion.indexOf("Mac"),
			isMSIE: F,
			isEdge: L,
			isFF: !L && /firefox/i.test(R),
			isPhantom: /PhantomJS/i.test(R),
			isWebkit: !L && /webkit/i.test(R),
			isChrome: !L && /chrome/i.test(R),
			isSafari: !L && /safari/i.test(R),
			browserVersion: A,
			jqueryVersion: parseFloat(k.fn.jquery),
			isSupportAmd: E,
			isSupportTouch: D,
			hasCodeMirror: H,
			isFontInstalled: function(t) {
				var e = "Comic Sans MS" === t ? "Courier New" : "Comic Sans MS",
					o = k("<div>").css({
						position: "absolute",
						left: "-9999px",
						top: "-9999px",
						fontSize: "200px"
					}).text("mmmmmmmmmwwwwwww").appendTo(document.body),
					n = o.css("fontFamily", e).width(),
					i = o.css("fontFamily", t + "," + e).width();
				return o.remove(), n !== i
			},
			isW3CRangeSupport: !!document.createRange,
			inputEventName: B
		},
		M = String.fromCharCode(160);

	function O(t) {
		return t && k(t).hasClass("note-editable")
	}

	function U(e) {
		return e = e.toUpperCase(),
			function(t) {
				return t && t.nodeName.toUpperCase() === e
			}
	}

	function j(t) {
		return t && 3 === t.nodeType
	}

	function q(t) {
		return t && /^BR|^IMG|^HR|^IFRAME|^BUTTON|^INPUT|^VIDEO|^EMBED/.test(t.nodeName.toUpperCase())
	}

	function K(t) {
		return !O(t) && (t && /^DIV|^P|^LI|^H[1-7]/.test(t.nodeName.toUpperCase()))
	}
	var V = U("PRE"),
		W = U("LI");
	var _ = U("TABLE"),
		G = U("DATA");

	function Z(t) {
		return !(tt(t) || Y(t) || Q(t) || K(t) || _(t) || X(t) || G(t))
	}

	function Y(t) {
		return t && /^UL|^OL/.test(t.nodeName.toUpperCase())
	}
	var Q = U("HR");

	function J(t) {
		return t && /^TD|^TH/.test(t.nodeName.toUpperCase())
	}
	var X = U("BLOCKQUOTE");

	function tt(t) {
		return J(t) || X(t) || O(t)
	}
	var et = U("A");
	var ot = U("BODY");
	var nt = z.isMSIE && z.browserVersion < 11 ? "&nbsp;" : "<br>";

	function it(t) {
		return j(t) ? t.nodeValue.length : t ? t.childNodes.length : 0
	}

	function rt(t) {
		var e = it(t);
		return 0 === e || (!j(t) && 1 === e && t.innerHTML === nt || !(!N.all(t.childNodes, j) || "" !== t.innerHTML))
	}

	function st(t) {
		q(t) || it(t) || (t.innerHTML = nt)
	}

	function at(t, e) {
		for (; t;) {
			if (e(t)) return t;
			if (O(t)) break;
			t = t.parentNode
		}
		return null
	}

	function lt(t, e) {
		e = e || C.fail;
		var o = [];
		return at(t, function(t) {
			return O(t) || o.push(t), e(t)
		}), o
	}

	function ct(t, e) {
		e = e || C.fail;
		for (var o = []; t && !e(t);) o.push(t), t = t.nextSibling;
		return o
	}

	function dt(t, e) {
		var o = e.nextSibling,
			n = e.parentNode;
		return o ? n.insertBefore(t, o) : n.appendChild(t), t
	}

	function ut(o, t) {
		return k.each(t, function(t, e) {
			o.appendChild(e)
		}), o
	}

	function ht(t) {
		return 0 === t.offset
	}

	function pt(t) {
		return t.offset === it(t.node)
	}

	function ft(t) {
		return ht(t) || pt(t)
	}

	function mt(t, e) {
		for (; t && t !== e;) {
			if (0 !== vt(t)) return !1;
			t = t.parentNode
		}
		return !0
	}

	function gt(t, e) {
		if (!e) return !1;
		for (; t && t !== e;) {
			if (vt(t) !== it(t.parentNode) - 1) return !1;
			t = t.parentNode
		}
		return !0
	}

	function vt(t) {
		for (var e = 0; t = t.previousSibling;) e += 1;
		return e
	}

	function bt(t) {
		return !!(t && t.childNodes && t.childNodes.length)
	}

	function yt(t, e) {
		var o, n;
		if (0 === t.offset) {
			if (O(t.node)) return null;
			o = t.node.parentNode, n = vt(t.node)
		} else n = bt(t.node) ? it(o = t.node.childNodes[t.offset - 1]) : (o = t.node, e ? 0 : t.offset - 1);
		return {
			node: o,
			offset: n
		}
	}

	function kt(t, e) {
		var o, n;
		if (it(t.node) === t.offset) {
			if (O(t.node)) return null;
			o = t.node.parentNode, n = vt(t.node) + 1
		} else n = bt(t.node) ? (o = t.node.childNodes[t.offset], 0) : (o = t.node, e ? it(t.node) : t.offset + 1);
		return {
			node: o,
			offset: n
		}
	}

	function Ct(t, e) {
		return t.node === e.node && t.offset === e.offset
	}

	function wt(t, e) {
		var o = e && e.isSkipPaddingBlankHTML,
			n = e && e.isNotSplitEdgePoint,
			i = e && e.isDiscardEmptySplits;
		if (i && (o = !0), ft(t) && (j(t.node) || n)) {
			if (ht(t)) return t.node;
			if (pt(t)) return t.node.nextSibling
		}
		if (j(t.node)) return t.node.splitText(t.offset);
		var r = t.node.childNodes[t.offset],
			s = dt(t.node.cloneNode(!1), t.node);
		return ut(s, ct(r)), o || (st(t.node), st(s)), i && (rt(t.node) && Tt(t.node), rt(s)) ? (Tt(s), t.node.nextSibling) : s
	}

	function xt(t, o, n) {
		var e = lt(o.node, C.eq(t));
		return e.length ? 1 === e.length ? wt(o, n) : e.reduce(function(t, e) {
			return t === o.node && (t = wt(o, n)), wt({
				node: e,
				offset: t ? vt(t) : it(e)
			}, n)
		}) : null
	}

	function St(t) {
		return document.createElement(t)
	}

	function Tt(t, e) {
		if (t && t.parentNode) {
			if (t.removeNode) return t.removeNode(e);
			var o = t.parentNode;
			if (!e) {
				for (var n = [], i = 0, r = t.childNodes.length; i < r; i++) n.push(t.childNodes[i]);
				for (i = 0, r = n.length; i < r; i++) o.insertBefore(n[i], t)
			}
			o.removeChild(t)
		}
	}
	var It = U("TEXTAREA");

	function $t(t, e) {
		var o = It(t[0]) ? t.val() : t.html();
		return e ? o.replace(/[\n\r]/g, "") : o
	}
	var Nt = {
		NBSP_CHAR: M,
		ZERO_WIDTH_NBSP_CHAR: "\ufeff",
		blank: nt,
		emptyPara: "<p>" + nt + "</p>",
		makePredByNodeName: U,
		isEditable: O,
		isControlSizing: function(t) {
			return t && k(t).hasClass("note-control-sizing")
		},
		isText: j,
		isElement: function(t) {
			return t && 1 === t.nodeType
		},
		isVoid: q,
		isPara: K,
		isPurePara: function(t) {
			return K(t) && !W(t)
		},
		isHeading: function(t) {
			return t && /^H[1-7]/.test(t.nodeName.toUpperCase())
		},
		isInline: Z,
		isBlock: C.not(Z),
		isBodyInline: function(t) {
			return Z(t) && !at(t, K)
		},
		isBody: ot,
		isParaInline: function(t) {
			return Z(t) && !!at(t, K)
		},
		isPre: V,
		isList: Y,
		isTable: _,
		isData: G,
		isCell: J,
		isBlockquote: X,
		isBodyContainer: tt,
		isAnchor: et,
		isDiv: U("DIV"),
		isLi: W,
		isBR: U("BR"),
		isSpan: U("SPAN"),
		isB: U("B"),
		isU: U("U"),
		isS: U("S"),
		isI: U("I"),
		isImg: U("IMG"),
		isTextarea: It,
		isEmpty: rt,
		isEmptyAnchor: C.and(et, rt),
		isClosestSibling: function(t, e) {
			return t.nextSibling === e || t.previousSibling === e
		},
		withClosestSiblings: function(t, e) {
			e = e || C.ok;
			var o = [];
			return t.previousSibling && e(t.previousSibling) && o.push(t.previousSibling), o.push(t), t.nextSibling && e(t.nextSibling) && o.push(t.nextSibling), o
		},
		nodeLength: it,
		isLeftEdgePoint: ht,
		isRightEdgePoint: pt,
		isEdgePoint: ft,
		isLeftEdgeOf: mt,
		isRightEdgeOf: gt,
		isLeftEdgePointOf: function(t, e) {
			return ht(t) && mt(t.node, e)
		},
		isRightEdgePointOf: function(t, e) {
			return pt(t) && gt(t.node, e)
		},
		prevPoint: yt,
		nextPoint: kt,
		isSamePoint: Ct,
		isVisiblePoint: function(t) {
			if (j(t.node) || !bt(t.node) || rt(t.node)) return !0;
			var e = t.node.childNodes[t.offset - 1],
				o = t.node.childNodes[t.offset];
			return !(e && !q(e) || o && !q(o))
		},
		prevPointUntil: function(t, e) {
			for (; t;) {
				if (e(t)) return t;
				t = yt(t)
			}
			return null
		},
		nextPointUntil: function(t, e) {
			for (; t;) {
				if (e(t)) return t;
				t = kt(t)
			}
			return null
		},
		isCharPoint: function(t) {
			if (!j(t.node)) return !1;
			var e = t.node.nodeValue.charAt(t.offset - 1);
			return e && " " !== e && e !== M
		},
		walkPoint: function(t, e, o, n) {
			for (var i = t; i && (o(i), !Ct(i, e));) i = kt(i, n && t.node !== i.node && e.node !== i.node)
		},
		ancestor: at,
		singleChildAncestor: function(t, e) {
			for (t = t.parentNode; t && 1 === it(t);) {
				if (e(t)) return t;
				if (O(t)) break;
				t = t.parentNode
			}
			return null
		},
		listAncestor: lt,
		lastAncestor: function(t, e) {
			var o = lt(t);
			return N.last(o.filter(e))
		},
		listNext: ct,
		listPrev: function(t, e) {
			e = e || C.fail;
			for (var o = []; t && !e(t);) o.push(t), t = t.previousSibling;
			return o
		},
		listDescendant: function(i, r) {
			var s = [];
			return r = r || C.ok,
				function t(e) {
					i !== e && r(e) && s.push(e);
					for (var o = 0, n = e.childNodes.length; o < n; o++) t(e.childNodes[o])
				}(i), s
		},
		commonAncestor: function(t, e) {
			for (var o = lt(t), n = e; n; n = n.parentNode)
				if (-1 < k.inArray(n, o)) return n;
			return null
		},
		wrap: function(t, e) {
			var o = t.parentNode,
				n = k("<" + e + ">")[0];
			return o.insertBefore(n, t), n.appendChild(t), n
		},
		insertAfter: dt,
		appendChildNodes: ut,
		position: vt,
		hasChildren: bt,
		makeOffsetPath: function(t, e) {
			return lt(e, C.eq(t)).map(vt).reverse()
		},
		fromOffsetPath: function(t, e) {
			for (var o = t, n = 0, i = e.length; n < i; n++) o = o.childNodes.length <= e[n] ? o.childNodes[o.childNodes.length - 1] : o.childNodes[e[n]];
			return o
		},
		splitTree: xt,
		splitPoint: function(t, e) {
			var o, n, i = e ? K : tt,
				r = lt(t.node, i),
				s = N.last(r) || t.node;
			n = i(s) ? (o = r[r.length - 2], s) : (o = s).parentNode;
			var a = o && xt(o, t, {
				isSkipPaddingBlankHTML: e,
				isNotSplitEdgePoint: e
			});
			return a || n !== t.node || (a = t.node.childNodes[t.offset]), {
				rightNode: a,
				container: n
			}
		},
		create: St,
		createText: function(t) {
			return document.createTextNode(t)
		},
		remove: Tt,
		removeWhile: function(t, e) {
			for (; t && !O(t) && e(t);) {
				var o = t.parentNode;
				Tt(t), t = o
			}
		},
		replace: function(t, e) {
			if (t.nodeName.toUpperCase() === e.toUpperCase()) return t;
			var o = St(e);
			return t.style.cssText && (o.style.cssText = t.style.cssText), ut(o, N.from(t.childNodes)), dt(o, t), Tt(t), o
		},
		html: function(t, e) {
			var o = $t(t);
			e && (o = o.replace(/<(\/?)(\b(?!!)[^>\s]*)(.*?)(\s*\/?>)/g, function(t, e, o) {
				o = o.toUpperCase();
				var n = /^DIV|^TD|^TH|^P|^LI|^H[1-7]/.test(o) && !!e,
					i = /^BLOCKQUOTE|^TABLE|^TBODY|^TR|^HR|^UL|^OL/.test(o);
				return t + (n || i ? "\n" : "")
			}), o = k.trim(o));
			return o
		},
		value: $t,
		posFromPlaceholder: function(t) {
			var e = k(t),
				o = e.offset(),
				n = e.outerHeight(!0);
			return {
				left: o.left,
				top: o.top + n
			}
		},
		attachEvents: function(e, o) {
			Object.keys(o).forEach(function(t) {
				e.on(t, o[t])
			})
		},
		detachEvents: function(e, o) {
			Object.keys(o).forEach(function(t) {
				e.off(t, o[t])
			})
		},
		isCustomStyleTag: function(t) {
			return t && !j(t) && N.contains(t.classList, "note-styletag")
		}
	};

	function Et(t, e) {
		var o, n, i = t.parentElement(),
			r = document.body.createTextRange(),
			s = N.from(i.childNodes);
		for (o = 0; o < s.length; o++)
			if (!Nt.isText(s[o])) {
				if (r.moveToElementText(s[o]), 0 <= r.compareEndPoints("StartToStart", t)) break;
				n = s[o]
			} if (0 !== o && Nt.isText(s[o - 1])) {
			var a = document.body.createTextRange(),
				l = null;
			a.moveToElementText(n || i), a.collapse(!n), l = n ? n.nextSibling : i.firstChild;
			var c = t.duplicate();
			c.setEndPoint("StartToStart", a);
			for (var d = c.text.replace(/[\r\n]/g, "").length; d > l.nodeValue.length && l.nextSibling;) d -= l.nodeValue.length, l = l.nextSibling;
			l.nodeValue;
			e && l.nextSibling && Nt.isText(l.nextSibling) && d === l.nodeValue.length && (d -= l.nodeValue.length, l = l.nextSibling), i = l, o = d
		}
		return {
			cont: i,
			offset: o
		}
	}

	function At(t) {
		var s = function(t, e) {
				var o, n;
				if (Nt.isText(t)) {
					var i = Nt.listPrev(t, C.not(Nt.isText)),
						r = N.last(i).previousSibling;
					o = r || t.parentNode, e += N.sum(N.tail(i), Nt.nodeLength), n = !r
				} else {
					if (o = t.childNodes[e] || t, Nt.isText(o)) return s(o, 0);
					e = 0, n = !1
				}
				return {
					node: o,
					collapseToStart: n,
					offset: e
				}
			},
			e = document.body.createTextRange(),
			o = s(t.node, t.offset);
		return e.moveToElementText(o.node), e.collapse(o.collapseToStart), e.moveStart("character", o.offset), e
	}
	var Rt = function() {
			function r(t, e, o, n) {
				this.sc = t, this.so = e, this.ec = o, this.eo = n, this.isOnEditable = this.makeIsOn(Nt.isEditable), this.isOnList = this.makeIsOn(Nt.isList), this.isOnAnchor = this.makeIsOn(Nt.isAnchor), this.isOnCell = this.makeIsOn(Nt.isCell), this.isOnData = this.makeIsOn(Nt.isData)
			}
			return r.prototype.nativeRange = function() {
				if (z.isW3CRangeSupport) {
					var t = document.createRange();
					return t.setStart(this.sc, this.so), t.setEnd(this.ec, this.eo), t
				}
				var e = At({
					node: this.sc,
					offset: this.so
				});
				return e.setEndPoint("EndToEnd", At({
					node: this.ec,
					offset: this.eo
				})), e
			}, r.prototype.getPoints = function() {
				return {
					sc: this.sc,
					so: this.so,
					ec: this.ec,
					eo: this.eo
				}
			}, r.prototype.getStartPoint = function() {
				return {
					node: this.sc,
					offset: this.so
				}
			}, r.prototype.getEndPoint = function() {
				return {
					node: this.ec,
					offset: this.eo
				}
			}, r.prototype.select = function() {
				var t = this.nativeRange();
				if (z.isW3CRangeSupport) {
					var e = document.getSelection();
					0 < e.rangeCount && e.removeAllRanges(), e.addRange(t)
				} else t.select();
				return this
			}, r.prototype.scrollIntoView = function(t) {
				var e = k(t).height();
				return t.scrollTop + e < this.sc.offsetTop && (t.scrollTop += Math.abs(t.scrollTop + e - this.sc.offsetTop)), this
			}, r.prototype.normalize = function() {
				var t = function(t, e) {
						if (Nt.isVisiblePoint(t) && !Nt.isEdgePoint(t) || Nt.isVisiblePoint(t) && Nt.isRightEdgePoint(t) && !e || Nt.isVisiblePoint(t) && Nt.isLeftEdgePoint(t) && e || Nt.isVisiblePoint(t) && Nt.isBlock(t.node) && Nt.isEmpty(t.node)) return t;
						var o = Nt.ancestor(t.node, Nt.isBlock);
						if ((Nt.isLeftEdgePointOf(t, o) || Nt.isVoid(Nt.prevPoint(t).node)) && !e || (Nt.isRightEdgePointOf(t, o) || Nt.isVoid(Nt.nextPoint(t).node)) && e) {
							if (Nt.isVisiblePoint(t)) return t;
							e = !e
						}
						return (e ? Nt.nextPointUntil(Nt.nextPoint(t), Nt.isVisiblePoint) : Nt.prevPointUntil(Nt.prevPoint(t), Nt.isVisiblePoint)) || t
					},
					e = t(this.getEndPoint(), !1),
					o = this.isCollapsed() ? e : t(this.getStartPoint(), !0);
				return new r(o.node, o.offset, e.node, e.offset)
			}, r.prototype.nodes = function(o, t) {
				o = o || C.ok;
				var n = t && t.includeAncestor,
					i = t && t.fullyContains,
					e = this.getStartPoint(),
					r = this.getEndPoint(),
					s = [],
					a = [];
				return Nt.walkPoint(e, r, function(t) {
					var e;
					Nt.isEditable(t.node) || (i ? (Nt.isLeftEdgePoint(t) && a.push(t.node), Nt.isRightEdgePoint(t) && N.contains(a, t.node) && (e = t.node)) : e = n ? Nt.ancestor(t.node, o) : t.node, e && o(e) && s.push(e))
				}, !0), N.unique(s)
			}, r.prototype.commonAncestor = function() {
				return Nt.commonAncestor(this.sc, this.ec)
			}, r.prototype.expand = function(t) {
				var e = Nt.ancestor(this.sc, t),
					o = Nt.ancestor(this.ec, t);
				if (!e && !o) return new r(this.sc, this.so, this.ec, this.eo);
				var n = this.getPoints();
				return e && (n.sc = e, n.so = 0), o && (n.ec = o, n.eo = Nt.nodeLength(o)), new r(n.sc, n.so, n.ec, n.eo)
			}, r.prototype.collapse = function(t) {
				return t ? new r(this.sc, this.so, this.sc, this.so) : new r(this.ec, this.eo, this.ec, this.eo)
			}, r.prototype.splitText = function() {
				var t = this.sc === this.ec,
					e = this.getPoints();
				return Nt.isText(this.ec) && !Nt.isEdgePoint(this.getEndPoint()) && this.ec.splitText(this.eo), Nt.isText(this.sc) && !Nt.isEdgePoint(this.getStartPoint()) && (e.sc = this.sc.splitText(this.so), e.so = 0, t && (e.ec = e.sc, e.eo = this.eo - this.so)), new r(e.sc, e.so, e.ec, e.eo)
			}, r.prototype.deleteContents = function() {
				if (this.isCollapsed()) return this;
				var t = this.splitText(),
					e = t.nodes(null, {
						fullyContains: !0
					}),
					n = Nt.prevPointUntil(t.getStartPoint(), function(t) {
						return !N.contains(e, t.node)
					}),
					i = [];
				return k.each(e, function(t, e) {
					var o = e.parentNode;
					n.node !== o && 1 === Nt.nodeLength(o) && i.push(o), Nt.remove(e, !1)
				}), k.each(i, function(t, e) {
					Nt.remove(e, !1)
				}), new r(n.node, n.offset, n.node, n.offset).normalize()
			}, r.prototype.makeIsOn = function(e) {
				return function() {
					var t = Nt.ancestor(this.sc, e);
					return !!t && t === Nt.ancestor(this.ec, e)
				}
			}, r.prototype.isLeftEdgeOf = function(t) {
				if (!Nt.isLeftEdgePoint(this.getStartPoint())) return !1;
				var e = Nt.ancestor(this.sc, t);
				return e && Nt.isLeftEdgeOf(this.sc, e)
			}, r.prototype.isCollapsed = function() {
				return this.sc === this.ec && this.so === this.eo
			}, r.prototype.wrapBodyInlineWithPara = function() {
				if (Nt.isBodyContainer(this.sc) && Nt.isEmpty(this.sc)) return this.sc.innerHTML = Nt.emptyPara, new r(this.sc.firstChild, 0, this.sc.firstChild, 0);
				var t, e = this.normalize();
				if (Nt.isParaInline(this.sc) || Nt.isPara(this.sc)) return e;
				if (Nt.isInline(e.sc)) {
					var o = Nt.listAncestor(e.sc, C.not(Nt.isInline));
					t = N.last(o), Nt.isInline(t) || (t = o[o.length - 2] || e.sc.childNodes[e.so])
				} else t = e.sc.childNodes[0 < e.so ? e.so - 1 : 0];
				var n = Nt.listPrev(t, Nt.isParaInline).reverse();
				if ((n = n.concat(Nt.listNext(t.nextSibling, Nt.isParaInline))).length) {
					var i = Nt.wrap(N.head(n), "p");
					Nt.appendChildNodes(i, N.tail(n))
				}
				return this.normalize()
			}, r.prototype.insertNode = function(t) {
				var e = this.wrapBodyInlineWithPara().deleteContents(),
					o = Nt.splitPoint(e.getStartPoint(), Nt.isInline(t));
				return o.rightNode ? o.rightNode.parentNode.insertBefore(t, o.rightNode) : o.container.appendChild(t), t
			}, r.prototype.pasteHTML = function(t) {
				var e = k("<div></div>").html(t)[0],
					o = N.from(e.childNodes),
					n = this.wrapBodyInlineWithPara().deleteContents();
				return 0 < n.so && (o = o.reverse()), o = o.map(function(t) {
					return n.insertNode(t)
				}), 0 < n.so && (o = o.reverse()), o
			}, r.prototype.toString = function() {
				var t = this.nativeRange();
				return z.isW3CRangeSupport ? t.toString() : t.text
			}, r.prototype.getWordRange = function(t) {
				var e = this.getEndPoint();
				if (!Nt.isCharPoint(e)) return this;
				var o = Nt.prevPointUntil(e, function(t) {
					return !Nt.isCharPoint(t)
				});
				return t && (e = Nt.nextPointUntil(e, function(t) {
					return !Nt.isCharPoint(t)
				})), new r(o.node, o.offset, e.node, e.offset)
			}, r.prototype.bookmark = function(t) {
				return {
					s: {
						path: Nt.makeOffsetPath(t, this.sc),
						offset: this.so
					},
					e: {
						path: Nt.makeOffsetPath(t, this.ec),
						offset: this.eo
					}
				}
			}, r.prototype.paraBookmark = function(t) {
				return {
					s: {
						path: N.tail(Nt.makeOffsetPath(N.head(t), this.sc)),
						offset: this.so
					},
					e: {
						path: N.tail(Nt.makeOffsetPath(N.last(t), this.ec)),
						offset: this.eo
					}
				}
			}, r.prototype.getClientRects = function() {
				return this.nativeRange().getClientRects()
			}, r
		}(),
		Ft = {
			create: function(t, e, o, n) {
				if (4 === arguments.length) return new Rt(t, e, o, n);
				if (2 === arguments.length) return new Rt(o = t, n = e, o, n);
				var i = this.createFromSelection();
				return i || 1 !== arguments.length ? i : (i = this.createFromNode(t)).collapse(Nt.emptyPara === t.innerHTML)
			},
			createFromSelection: function() {
				var t, e, o, n;
				if (z.isW3CRangeSupport) {
					var i = document.getSelection();
					if (!i || 0 === i.rangeCount) return null;
					if (Nt.isBody(i.anchorNode)) return null;
					var r = i.getRangeAt(0);
					t = r.startContainer, e = r.startOffset, o = r.endContainer, n = r.endOffset
				} else {
					var s = document.selection.createRange(),
						a = s.duplicate();
					a.collapse(!1);
					var l = s;
					l.collapse(!0);
					var c = Et(l, !0),
						d = Et(a, !1);
					Nt.isText(c.node) && Nt.isLeftEdgePoint(c) && Nt.isTextNode(d.node) && Nt.isRightEdgePoint(d) && d.node.nextSibling === c.node && (c = d), t = c.cont, e = c.offset, o = d.cont, n = d.offset
				}
				return new Rt(t, e, o, n)
			},
			createFromNode: function(t) {
				var e = t,
					o = 0,
					n = t,
					i = Nt.nodeLength(n);
				return Nt.isVoid(e) && (o = Nt.listPrev(e).length - 1, e = e.parentNode), Nt.isBR(n) ? (i = Nt.listPrev(n).length - 1, n = n.parentNode) : Nt.isVoid(n) && (i = Nt.listPrev(n).length, n = n.parentNode), this.create(e, o, n, i)
			},
			createFromNodeBefore: function(t) {
				return this.createFromNode(t).collapse(!0)
			},
			createFromNodeAfter: function(t) {
				return this.createFromNode(t).collapse()
			},
			createFromBookmark: function(t, e) {
				var o = Nt.fromOffsetPath(t, e.s.path),
					n = e.s.offset,
					i = Nt.fromOffsetPath(t, e.e.path),
					r = e.e.offset;
				return new Rt(o, n, i, r)
			},
			createFromParaBookmark: function(t, e) {
				var o = t.s.offset,
					n = t.e.offset,
					i = Nt.fromOffsetPath(N.head(e), t.s.path),
					r = Nt.fromOffsetPath(N.last(e), t.e.path);
				return new Rt(i, o, r, n)
			}
		};
	k.summernote = k.summernote || {
		lang: {}
	}, k.extend(k.summernote.lang, {
		"en-US": {
			font: {
				bold: "Negrita",
				italic: "Italica",
				underline: "Subrayado",
				clear: "Remover Fuente y Estilo",
				height: "Altura de la línea",
				name: "Tipo de Fuente",
				strikethrough: "Tachar",
				subscript: "Subíndice",
				superscript: "Sobrescribir",
				size: "Tamaño de fuente"
			},
			image: {
				image: "Imagen",
				insert: "Insertar Imagen",
				resizeFull: "Redimensionar completo",
				resizeHalf: "Redimensionar la mitad",
				resizeQuarter: "Redimensionar a un cuarto",
				floatLeft: "Flotador izquierdo",
				floatRight: "Flotador derecho",
				floatNone: "No Flotar",
				shapeRounded: "Redondeada",
				shapeCircle: "Circular",
				shapeThumbnail: "Miniatura",
				shapeNone: "Forma: Ninguna",
				dragImageHere: "Arrastra la imagen o el texto aquí",
				dropImage: "Soltar imagen o texto",
				selectFromFiles: "Seleccionar ",
				maximumFileSize: "Tamaño máximo de archivo",
				maximumFileSizeError: "Se excedió el tamaño máximo de archivo.",
				url: "Imagen URL",
				remove: "Eliminar Imagen",
				original: "Original"
			},
			video: {
				video: "Video",
				videoLink: "Video Link",
				insert: "Insertar Video",
				url: "Video URL",
				providers: "(YouTube, Vimeo, Vine, Instagram, DailyMotion or Youku)"
			},
			link: {
				link: "Link",
				insert: "Insertar Link",
				unlink: "Desvincular",
				edit: "Editar",
				textToDisplay: "Texto para mostrar",
				url: "¿A qué URL debe ir este enlace?",
				openInNewWindow: "Abrir en Nueva ventana"
			},
			table: {
				table: "Tabla",
				addRowAbove: "Agregar Fila ↑ Arriba",
				addRowBelow: "Agregar Fila ↓ Abajo",
				addColLeft: "Agregar Columna ← Izquierda",
				addColRight: "Agregar Columna → Derecha",
				delRow: "Eliminar Fila",
				delCol: "Eliminar Columna",
				delTable: "Eliminar Tabla"
			},
			hr: {
				insert: "Insertar linea horizontal"
			},
			style: {
				style: "Estilo",
				p: "Normal",
				blockquote: "Quote",
				pre: "Code",
				h1: "Titulo 1",
				h2: "Titulo 2",
				h3: "Titulo 3",
				h4: "Titulo 4",
				h5: "Titulo 5",
				h6: "Titulo 6"
			},
			lists: {
				unordered: "Lista Desordenada",
				ordered: "Lista Ordenada"
			},
			options: {
				help: "Ayuda",
				fullscreen: "Ampliar",
				codeview: "Ver Código"
			},
			paragraph: {
				paragraph: "Párrafo",
				outdent: "← Anular sangría",
				indent: "→ Aumenrar Sangria",
				left: "Alinear Izquierda",
				center: "Alinear Centrado",
				right: "Alinear Dzquierda",
				justify: "Justificar"
			},
			color: {
				recent: "Resaltar Color",
				more: "Más Colores",
				background: "Resaltar en Color",
				foreground: "Color del Texto",
				transparent: "Transparente",
				setTransparent: "Set transparent",
				reset: "Reset",
				resetToDefault: "Resetear Color",
				cpSelect: "Selecionar"
			},
			shortcut: {
				shortcuts: "Atajos de teclado",
				close: "Cerrar",
				textFormatting: "Formatear Texto",
				action: "Acción",
				paragraphFormatting: "Formato de párrafo",
				documentStyle: "Estilo de documento",
				extraKeys: "Llaves adicionales"
			},
			help: {
				insertParagraph: "Insertar Parrafo",
				undo: "Deshacer",
				redo: "Rehacer",
				tab: "Tabular",
				untab: "Destabular",
				bold: "Establecer Estilo",
				italic: "Cursiva",
				underline: "Subrayado",
				strikethrough: "Tachado",
				removeFormat: "Limpiar Estilo",
				justifyLeft: "Alinear Izquierda",
				justifyCenter: "Alinear Centrado",
				justifyRight: "Alinear Derecha",
				justifyFull: "Alinear Completo",
				insertUnorderedList: "Alternar Lista Desordenada",
				insertOrderedList: "Alternar Lista Ordenada",
				outdent: "Eliminar Sangria Parrafo Actual",
				indent: "→ Sangria Parrafo Actual",
				formatPara: "Cambiar el formato del bloque actual como un párrafo (etiqueta P)",
				formatH1: "Cambiar el formato del bloque actual como H1",
				formatH2: "Cambiar el formato del bloque actual como H2",
				formatH3: "Cambiar el formato del bloque actual como H3",
				formatH4: "Cambiar el formato del bloque actual como H4",
				formatH5: "Cambiar el formato del bloque actual como H5",
				formatH6: "Cambiar el formato del bloque actual como H6",
				insertHorizontalRule: "Insert horizontal rule",
				"linkDialog.show": "Show Link Dialog"
			},
			history: {
				undo: "Deshacer",
				redo: "Re hacer"
			},
			specialChar: {
				specialChar: "CARACTERES ESPECIALES",
				select: "Seleccionar Caracteres especiales"
			}
		}
	});
	var Pt = {
			BACKSPACE: 8,
			TAB: 9,
			ENTER: 13,
			SPACE: 32,
			DELETE: 46,
			LEFT: 37,
			UP: 38,
			RIGHT: 39,
			DOWN: 40,
			NUM0: 48,
			NUM1: 49,
			NUM2: 50,
			NUM3: 51,
			NUM4: 52,
			NUM5: 53,
			NUM6: 54,
			NUM7: 55,
			NUM8: 56,
			B: 66,
			E: 69,
			I: 73,
			J: 74,
			K: 75,
			L: 76,
			R: 82,
			S: 83,
			U: 85,
			V: 86,
			Y: 89,
			Z: 90,
			SLASH: 191,
			LEFTBRACKET: 219,
			BACKSLASH: 220,
			RIGHTBRACKET: 221
		},
		Lt = {
			isEdit: function(t) {
				return N.contains([Pt.BACKSPACE, Pt.TAB, Pt.ENTER, Pt.SPACE, Pt.DELETE], t)
			},
			isMove: function(t) {
				return N.contains([Pt.LEFT, Pt.UP, Pt.RIGHT, Pt.DOWN], t)
			},
			nameFromCode: C.invertObject(Pt),
			code: Pt
		};
	var Ht = function() {
			function t(t) {
				this.stack = [], this.stackOffset = -1, this.$editable = t, this.editable = t[0]
			}
			return t.prototype.makeSnapshot = function() {
				var t = Ft.create(this.editable);
				return {
					contents: this.$editable.html(),
					bookmark: t ? t.bookmark(this.editable) : {
						s: {
							path: [],
							offset: 0
						},
						e: {
							path: [],
							offset: 0
						}
					}
				}
			}, t.prototype.applySnapshot = function(t) {
				null !== t.contents && this.$editable.html(t.contents), null !== t.bookmark && Ft.createFromBookmark(this.editable, t.bookmark).select()
			}, t.prototype.rewind = function() {
				this.$editable.html() !== this.stack[this.stackOffset].contents && this.recordUndo(), this.stackOffset = 0, this.applySnapshot(this.stack[this.stackOffset])
			}, t.prototype.commit = function() {
				this.stack = [], this.stackOffset = -1, this.recordUndo()
			}, t.prototype.reset = function() {
				this.stack = [], this.stackOffset = -1, this.$editable.html(""), this.recordUndo()
			}, t.prototype.undo = function() {
				this.$editable.html() !== this.stack[this.stackOffset].contents && this.recordUndo(), 0 < this.stackOffset && (this.stackOffset--, this.applySnapshot(this.stack[this.stackOffset]))
			}, t.prototype.redo = function() {
				this.stack.length - 1 > this.stackOffset && (this.stackOffset++, this.applySnapshot(this.stack[this.stackOffset]))
			}, t.prototype.recordUndo = function() {
				this.stackOffset++, this.stack.length > this.stackOffset && (this.stack = this.stack.slice(0, this.stackOffset)), this.stack.push(this.makeSnapshot())
			}, t
		}(),
		Dt = function() {
			function t() {}
			return t.prototype.jQueryCSS = function(o, t) {
				if (z.jqueryVersion < 1.9) {
					var n = {};
					return k.each(t, function(t, e) {
						n[e] = o.css(e)
					}), n
				}
				return o.css(t)
			}, t.prototype.fromNode = function(t) {
				var e = this.jQueryCSS(t, ["font-family", "font-size", "text-align", "list-style-type", "line-height"]) || {};
				return e["font-size"] = parseInt(e["font-size"], 10), e
			}, t.prototype.stylePara = function(t, o) {
				k.each(t.nodes(Nt.isPara, {
					includeAncestor: !0
				}), function(t, e) {
					k(e).css(o)
				})
			}, t.prototype.styleNodes = function(t, e) {
				t = t.splitText();
				var o = e && e.nodeName || "SPAN",
					n = !(!e || !e.expandClosestSibling),
					i = !(!e || !e.onlyPartialContains);
				if (t.isCollapsed()) return [t.insertNode(Nt.create(o))];
				var r = Nt.makePredByNodeName(o),
					s = t.nodes(Nt.isText, {
						fullyContains: !0
					}).map(function(t) {
						return Nt.singleChildAncestor(t, r) || Nt.wrap(t, o)
					});
				if (n) {
					if (i) {
						var a = t.nodes();
						r = C.and(r, function(t) {
							return N.contains(a, t)
						})
					}
					return s.map(function(t) {
						var e = Nt.withClosestSiblings(t, r),
							o = N.head(e),
							n = N.tail(e);
						return k.each(n, function(t, e) {
							Nt.appendChildNodes(o, e.childNodes), Nt.remove(e)
						}), N.head(e)
					})
				}
				return s
			}, t.prototype.current = function(t) {
				var e = k(Nt.isElement(t.sc) ? t.sc : t.sc.parentNode),
					o = this.fromNode(e);
				try {
					o = k.extend(o, {
						"font-bold": document.queryCommandState("bold") ? "bold" : "normal",
						"font-italic": document.queryCommandState("italic") ? "italic" : "normal",
						"font-underline": document.queryCommandState("underline") ? "underline" : "normal",
						"font-subscript": document.queryCommandState("subscript") ? "subscript" : "normal",
						"font-superscript": document.queryCommandState("superscript") ? "superscript" : "normal",
						"font-strikethrough": document.queryCommandState("strikethrough") ? "strikethrough" : "normal",
						"font-family": document.queryCommandValue("fontname") || o["font-family"]
					})
				} catch (t) {}
				if (t.isOnList()) {
					var n = -1 < k.inArray(o["list-style-type"], ["circle", "disc", "disc-leading-zero", "square"]);
					o["list-style"] = n ? "unordered" : "ordered"
				} else o["list-style"] = "none";
				var i = Nt.ancestor(t.sc, Nt.isPara);
				if (i && i.style["line-height"]) o["line-height"] = i.style.lineHeight;
				else {
					var r = parseInt(o["line-height"], 10) / parseInt(o["font-size"], 10);
					o["line-height"] = r.toFixed(1)
				}
				return o.anchor = t.isOnAnchor() && Nt.ancestor(t.sc, Nt.isAnchor), o.ancestors = Nt.listAncestor(t.sc, Nt.isEditable), o.range = t, o
			}, t
		}(),
		Bt = function() {
			function t() {}
			return t.prototype.insertOrderedList = function(t) {
				this.toggleList("OL", t)
			}, t.prototype.insertUnorderedList = function(t) {
				this.toggleList("UL", t)
			}, t.prototype.indent = function(t) {
				var i = this,
					e = Ft.create(t).wrapBodyInlineWithPara(),
					o = e.nodes(Nt.isPara, {
						includeAncestor: !0
					}),
					n = N.clusterBy(o, C.peq2("parentNode"));
				k.each(n, function(t, e) {
					var o = N.head(e);
					if (Nt.isLi(o)) {
						var n = i.findList(o.previousSibling);
						n ? e.map(function(t) {
							return n.appendChild(t)
						}) : (i.wrapList(e, o.parentNode.nodeName), e.map(function(t) {
							return t.parentNode
						}).map(function(t) {
							return i.appendToPrevious(t)
						}))
					} else k.each(e, function(t, e) {
						k(e).css("marginLeft", function(t, e) {
							return (parseInt(e, 10) || 0) + 25
						})
					})
				}), e.select()
			}, t.prototype.outdent = function(t) {
				var n = this,
					e = Ft.create(t).wrapBodyInlineWithPara(),
					o = e.nodes(Nt.isPara, {
						includeAncestor: !0
					}),
					i = N.clusterBy(o, C.peq2("parentNode"));
				k.each(i, function(t, e) {
					var o = N.head(e);
					Nt.isLi(o) ? n.releaseList([e]) : k.each(e, function(t, e) {
						k(e).css("marginLeft", function(t, e) {
							return 25 < (e = parseInt(e, 10) || 0) ? e - 25 : ""
						})
					})
				}), e.select()
			}, t.prototype.toggleList = function(o, t) {
				var n = this,
					e = Ft.create(t).wrapBodyInlineWithPara(),
					i = e.nodes(Nt.isPara, {
						includeAncestor: !0
					}),
					r = e.paraBookmark(i),
					s = N.clusterBy(i, C.peq2("parentNode"));
				if (N.find(i, Nt.isPurePara)) {
					var a = [];
					k.each(s, function(t, e) {
						a = a.concat(n.wrapList(e, o))
					}), i = a
				} else {
					var l = e.nodes(Nt.isList, {
						includeAncestor: !0
					}).filter(function(t) {
						return !k.nodeName(t, o)
					});
					l.length ? k.each(l, function(t, e) {
						Nt.replace(e, o)
					}) : i = this.releaseList(s, !0)
				}
				Ft.createFromParaBookmark(r, i).select()
			}, t.prototype.wrapList = function(t, e) {
				var o = N.head(t),
					n = N.last(t),
					i = Nt.isList(o.previousSibling) && o.previousSibling,
					r = Nt.isList(n.nextSibling) && n.nextSibling,
					s = i || Nt.insertAfter(Nt.create(e || "UL"), n);
				return t = t.map(function(t) {
					return Nt.isPurePara(t) ? Nt.replace(t, "LI") : t
				}), Nt.appendChildNodes(s, t), r && (Nt.appendChildNodes(s, N.from(r.childNodes)), Nt.remove(r)), t
			}, t.prototype.releaseList = function(t, c) {
				var d = this,
					u = [];
				return k.each(t, function(t, e) {
					var o = N.head(e),
						n = N.last(e),
						i = c ? Nt.lastAncestor(o, Nt.isList) : o.parentNode,
						r = i.parentNode;
					if ("LI" === i.parentNode.nodeName) e.map(function(t) {
						var e = d.findNextSiblings(t);
						r.nextSibling ? r.parentNode.insertBefore(t, r.nextSibling) : r.parentNode.appendChild(t), e.length && (d.wrapList(e, i.nodeName), t.appendChild(e[0].parentNode))
					}), 0 === i.children.length && r.removeChild(i), 0 === r.childNodes.length && r.parentNode.removeChild(r);
					else {
						var s = 1 < i.childNodes.length ? Nt.splitTree(i, {
								node: n.parentNode,
								offset: Nt.position(n) + 1
							}, {
								isSkipPaddingBlankHTML: !0
							}) : null,
							a = Nt.splitTree(i, {
								node: o.parentNode,
								offset: Nt.position(o)
							}, {
								isSkipPaddingBlankHTML: !0
							});
						e = c ? Nt.listDescendant(a, Nt.isLi) : N.from(a.childNodes).filter(Nt.isLi), !c && Nt.isList(i.parentNode) || (e = e.map(function(t) {
							return Nt.replace(t, "P")
						})), k.each(N.from(e).reverse(), function(t, e) {
							Nt.insertAfter(e, i)
						});
						var l = N.compact([i, a, s]);
						k.each(l, function(t, e) {
							var o = [e].concat(Nt.listDescendant(e, Nt.isList));
							k.each(o.reverse(), function(t, e) {
								Nt.nodeLength(e) || Nt.remove(e, !0)
							})
						})
					}
					u = u.concat(e)
				}), u
			}, t.prototype.appendToPrevious = function(t) {
				return t.previousSibling ? Nt.appendChildNodes(t.previousSibling, [t]) : this.wrapList([t], "LI")
			}, t.prototype.findList = function(t) {
				return t ? N.find(t.children, function(t) {
					return -1 < ["OL", "UL"].indexOf(t.nodeName)
				}) : null
			}, t.prototype.findNextSiblings = function(t) {
				for (var e = []; t.nextSibling;) e.push(t.nextSibling), t = t.nextSibling;
				return e
			}, t
		}(),
		zt = function() {
			function t(t) {
				this.bullet = new Bt, this.options = t.options
			}
			return t.prototype.insertTab = function(t, e) {
				var o = Nt.createText(new Array(e + 1).join(Nt.NBSP_CHAR));
				(t = t.deleteContents()).insertNode(o, !0), (t = Ft.create(o, e)).select()
			}, t.prototype.insertParagraph = function(t, e) {
				e = (e = (e = e || Ft.create(t)).deleteContents()).wrapBodyInlineWithPara();
				var o, n = Nt.ancestor(e.sc, Nt.isPara);
				if (n) {
					if (Nt.isEmpty(n) && Nt.isLi(n)) return void this.bullet.toggleList(n.parentNode.nodeName);
					var i = null;
					if (1 === this.options.blockquoteBreakingLevel ? i = Nt.ancestor(n, Nt.isBlockquote) : 2 === this.options.blockquoteBreakingLevel && (i = Nt.lastAncestor(n, Nt.isBlockquote)), i) {
						o = k(Nt.emptyPara)[0], Nt.isRightEdgePoint(e.getStartPoint()) && Nt.isBR(e.sc.nextSibling) && k(e.sc.nextSibling).remove();
						var r = Nt.splitTree(i, e.getStartPoint(), {
							isDiscardEmptySplits: !0
						});
						r ? r.parentNode.insertBefore(o, r) : Nt.insertAfter(o, i)
					} else {
						o = Nt.splitTree(n, e.getStartPoint());
						var s = Nt.listDescendant(n, Nt.isEmptyAnchor);
						s = s.concat(Nt.listDescendant(o, Nt.isEmptyAnchor)), k.each(s, function(t, e) {
							Nt.remove(e)
						}), (Nt.isHeading(o) || Nt.isPre(o) || Nt.isCustomStyleTag(o)) && Nt.isEmpty(o) && (o = Nt.replace(o, "p"))
					}
				} else {
					var a = e.sc.childNodes[e.so];
					o = k(Nt.emptyPara)[0], a ? e.sc.insertBefore(o, a) : e.sc.appendChild(o)
				}
				Ft.create(o, 0).normalize().select().scrollIntoView(t)
			}, t
		}(),
		Mt = function(t, h, p, i) {
			var f = {
					colPos: 0,
					rowPos: 0
				},
				m = [],
				g = [];

			function v(t, e, o, n, i, r, s) {
				var a = {
					baseRow: o,
					baseCell: n,
					isRowSpan: i,
					isColSpan: r,
					isVirtual: s
				};
				m[t] || (m[t] = []), m[t][e] = a
			}

			function b(t, e) {
				if (!m[t]) return e;
				if (!m[t][e]) return e;
				for (var o = e; m[t][o];)
					if (o++, !m[t][o]) return o
			}

			function r(t, e) {
				var o = b(t.rowIndex, e.cellIndex),
					n = 1 < e.colSpan,
					i = 1 < e.rowSpan,
					r = t.rowIndex === f.rowPos && e.cellIndex === f.colPos;
				v(t.rowIndex, o, t, e, i, n, !1);
				var s = e.attributes.rowSpan ? parseInt(e.attributes.rowSpan.value, 10) : 0;
				if (1 < s)
					for (var a = 1; a < s; a++) {
						var l = t.rowIndex + a;
						y(l, o, e, r), v(l, o, t, e, !0, n, !0)
					}
				var c = e.attributes.colSpan ? parseInt(e.attributes.colSpan.value, 10) : 0;
				if (1 < c)
					for (var d = 1; d < c; d++) {
						var u = b(t.rowIndex, o + d);
						y(t.rowIndex, u, e, r), v(t.rowIndex, u, t, e, i, !0, !0)
					}
			}

			function y(t, e, o, n) {
				t === f.rowPos && f.colPos >= o.cellIndex && o.cellIndex <= e && !n && f.colPos++
			}

			function k(t) {
				switch (h) {
					case Mt.where.Column:
						if (t.isColSpan) return Mt.resultAction.SubtractSpanCount;
						break;
					case Mt.where.Row:
						if (!t.isVirtual && t.isRowSpan) return Mt.resultAction.AddCell;
						if (t.isRowSpan) return Mt.resultAction.SubtractSpanCount
				}
				return Mt.resultAction.RemoveCell
			}

			function C(t) {
				switch (h) {
					case Mt.where.Column:
						if (t.isColSpan) return Mt.resultAction.SumSpanCount;
						if (t.isRowSpan && t.isVirtual) return Mt.resultAction.Ignore;
						break;
					case Mt.where.Row:
						if (t.isRowSpan) return Mt.resultAction.SumSpanCount;
						if (t.isColSpan && t.isVirtual) return Mt.resultAction.Ignore
				}
				return Mt.resultAction.AddCell
			}
			this.getActionList = function() {
					for (var t, e, o, n = h === Mt.where.Row ? f.rowPos : -1, i = h === Mt.where.Column ? f.colPos : -1, r = 0, s = !0; s;) {
						var a = 0 <= n ? n : r,
							l = 0 <= i ? i : r,
							c = m[a];
						if (!c) return s = !1, g;
						var d = c[l];
						if (!d) return s = !1, g;
						var u = Mt.resultAction.Ignore;
						switch (p) {
							case Mt.requestAction.Add:
								u = C(d);
								break;
							case Mt.requestAction.Delete:
								u = k(d)
						}
						g.push((t = u, e = a, o = l, {
							baseCell: d.baseCell,
							action: t,
							virtualTable: {
								rowIndex: e,
								cellIndex: o
							}
						})), r++
					}
					return g
				}, t && t.tagName && ("td" === t.tagName.toLowerCase() || "th" === t.tagName.toLowerCase()) ? (f.colPos = t.cellIndex, t.parentElement && t.parentElement.tagName && "tr" === t.parentElement.tagName.toLowerCase() ? f.rowPos = t.parentElement.rowIndex : console.error("Impossible to identify start Row point.", t)) : console.error("Impossible to identify start Cell point.", t),
				function() {
					for (var t = i.rows, e = 0; e < t.length; e++)
						for (var o = t[e].cells, n = 0; n < o.length; n++) r(t[e], o[n])
				}()
		};
	Mt.where = {
		Row: 0,
		Column: 1
	}, Mt.requestAction = {
		Add: 0,
		Delete: 1
	}, Mt.resultAction = {
		Ignore: 0,
		SubtractSpanCount: 1,
		RemoveCell: 2,
		AddCell: 3,
		SumSpanCount: 4
	};
	var Ot, Ut = function() {
			function t() {}
			return t.prototype.tab = function(t, e) {
				var o = Nt.ancestor(t.commonAncestor(), Nt.isCell),
					n = Nt.ancestor(o, Nt.isTable),
					i = Nt.listDescendant(n, Nt.isCell),
					r = N[e ? "prev" : "next"](i, o);
				r && Ft.create(r, 0).select()
			}, t.prototype.addRow = function(t, e) {
				for (var o = Nt.ancestor(t.commonAncestor(), Nt.isCell), n = k(o).closest("tr"), i = this.recoverAttributes(n), r = k("<tr" + i + "></tr>"), s = new Mt(o, Mt.where.Row, Mt.requestAction.Add, k(n).closest("table")[0]).getActionList(), a = 0; a < s.length; a++) {
					var l = s[a],
						c = this.recoverAttributes(l.baseCell);
					switch (l.action) {
						case Mt.resultAction.AddCell:
							r.append("<td" + c + ">" + Nt.blank + "</td>");
							break;
						case Mt.resultAction.SumSpanCount:
							if ("top" === e)
								if ((l.baseCell.parent ? l.baseCell.closest("tr").rowIndex : 0) <= n[0].rowIndex) {
									var d = k("<div></div>").append(k("<td" + c + ">" + Nt.blank + "</td>").removeAttr("rowspan")).html();
									r.append(d);
									break
								} var u = parseInt(l.baseCell.rowSpan, 10);
							u++, l.baseCell.setAttribute("rowSpan", u)
					}
				}
				if ("top" === e) n.before(r);
				else {
					if (1 < o.rowSpan) {
						var h = n[0].rowIndex + (o.rowSpan - 2);
						return void k(k(n).parent().find("tr")[h]).after(k(r))
					}
					n.after(r)
				}
			}, t.prototype.addCol = function(t, e) {
				var o = Nt.ancestor(t.commonAncestor(), Nt.isCell),
					n = k(o).closest("tr");
				k(n).siblings().push(n);
				for (var i = new Mt(o, Mt.where.Column, Mt.requestAction.Add, k(n).closest("table")[0]).getActionList(), r = 0; r < i.length; r++) {
					var s = i[r],
						a = this.recoverAttributes(s.baseCell);
					switch (s.action) {
						case Mt.resultAction.AddCell:
							"right" === e ? k(s.baseCell).after("<td" + a + ">" + Nt.blank + "</td>") : k(s.baseCell).before("<td" + a + ">" + Nt.blank + "</td>");
							break;
						case Mt.resultAction.SumSpanCount:
							if ("right" === e) {
								var l = parseInt(s.baseCell.colSpan, 10);
								l++, s.baseCell.setAttribute("colSpan", l)
							} else k(s.baseCell).before("<td" + a + ">" + Nt.blank + "</td>")
					}
				}
			}, t.prototype.recoverAttributes = function(t) {
				var e = "";
				if (!t) return e;
				for (var o = t.attributes || [], n = 0; n < o.length; n++) "id" !== o[n].name.toLowerCase() && o[n].specified && (e += " " + o[n].name + "='" + o[n].value + "'");
				return e
			}, t.prototype.deleteRow = function(t) {
				for (var e = Nt.ancestor(t.commonAncestor(), Nt.isCell), o = k(e).closest("tr"), n = o.children("td, th").index(k(e)), i = o[0].rowIndex, r = new Mt(e, Mt.where.Row, Mt.requestAction.Delete, k(o).closest("table")[0]).getActionList(), s = 0; s < r.length; s++)
					if (r[s]) {
						var a = r[s].baseCell,
							l = r[s].virtualTable,
							c = a.rowSpan && 1 < a.rowSpan,
							d = c ? parseInt(a.rowSpan, 10) : 0;
						switch (r[s].action) {
							case Mt.resultAction.Ignore:
								continue;
							case Mt.resultAction.AddCell:
								var u = o.next("tr")[0];
								if (!u) continue;
								var h = o[0].cells[n];
								c && (2 < d ? (d--, u.insertBefore(h, u.cells[n]), u.cells[n].setAttribute("rowSpan", d), u.cells[n].innerHTML = "") : 2 === d && (u.insertBefore(h, u.cells[n]), u.cells[n].removeAttribute("rowSpan"), u.cells[n].innerHTML = ""));
								continue;
							case Mt.resultAction.SubtractSpanCount:
								c && (2 < d ? (d--, a.setAttribute("rowSpan", d), l.rowIndex !== i && a.cellIndex === n && (a.innerHTML = "")) : 2 === d && (a.removeAttribute("rowSpan"), l.rowIndex !== i && a.cellIndex === n && (a.innerHTML = "")));
								continue;
							case Mt.resultAction.RemoveCell:
								continue
						}
					} o.remove()
			}, t.prototype.deleteCol = function(t) {
				for (var e = Nt.ancestor(t.commonAncestor(), Nt.isCell), o = k(e).closest("tr"), n = o.children("td, th").index(k(e)), i = new Mt(e, Mt.where.Column, Mt.requestAction.Delete, k(o).closest("table")[0]).getActionList(), r = 0; r < i.length; r++)
					if (i[r]) switch (i[r].action) {
						case Mt.resultAction.Ignore:
							continue;
						case Mt.resultAction.SubtractSpanCount:
							var s = i[r].baseCell;
							if (s.colSpan && 1 < s.colSpan) {
								var a = s.colSpan ? parseInt(s.colSpan, 10) : 0;
								2 < a ? (a--, s.setAttribute("colSpan", a), s.cellIndex === n && (s.innerHTML = "")) : 2 === a && (s.removeAttribute("colSpan"), s.cellIndex === n && (s.innerHTML = ""))
							}
							continue;
						case Mt.resultAction.RemoveCell:
							Nt.remove(i[r].baseCell, !0);
							continue
					}
			}, t.prototype.createTable = function(t, e, o) {
				for (var n, i = [], r = 0; r < t; r++) i.push("<td>" + Nt.blank + "</td>");
				n = i.join("");
				for (var s, a = [], l = 0; l < e; l++) a.push("<tr>" + n + "</tr>");
				s = a.join("");
				var c = k("<table>" + s + "</table>");
				return o && o.tableClassName && c.addClass(o.tableClassName), c[0]
			}, t.prototype.deleteTable = function(t) {
				var e = Nt.ancestor(t.commonAncestor(), Nt.isCell);
				k(e).closest("table").remove()
			}, t
		}(),
		jt = function() {
			function t(t) {
				var u = this;
				this.context = t, this.$note = t.layoutInfo.note, this.$editor = t.layoutInfo.editor, this.$editable = t.layoutInfo.editable, this.options = t.options, this.lang = this.options.langInfo, this.editable = this.$editable[0], this.lastRange = null, this.style = new Dt, this.table = new Ut, this.typing = new zt(t), this.bullet = new Bt, this.history = new Ht(this.$editable), this.context.memo("help.undo", this.lang.help.undo), this.context.memo("help.redo", this.lang.help.redo), this.context.memo("help.tab", this.lang.help.tab), this.context.memo("help.untab", this.lang.help.untab), this.context.memo("help.insertParagraph", this.lang.help.insertParagraph), this.context.memo("help.insertOrderedList", this.lang.help.insertOrderedList), this.context.memo("help.insertUnorderedList", this.lang.help.insertUnorderedList), this.context.memo("help.indent", this.lang.help.indent), this.context.memo("help.outdent", this.lang.help.outdent), this.context.memo("help.formatPara", this.lang.help.formatPara), this.context.memo("help.insertHorizontalRule", this.lang.help.insertHorizontalRule), this.context.memo("help.fontName", this.lang.help.fontName);
				for (var e = ["bold", "italic", "underline", "strikethrough", "superscript", "subscript", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "formatBlock", "removeFormat", "backColor"], o = 0, n = e.length; o < n; o++) this[e[o]] = function(e) {
					return function(t) {
						u.beforeCommand(), document.execCommand(e, !1, t), u.afterCommand(!0)
					}
				}(e[o]), this.context.memo("help." + e[o], this.lang.help[e[o]]);
				this.fontName = this.wrapCommand(function(t) {
					return u.fontStyling("font-family", "'" + t + "'")
				}), this.fontSize = this.wrapCommand(function(t) {
					return u.fontStyling("font-size", t + "px")
				});
				for (o = 1; o <= 6; o++) this["formatH" + o] = function(t) {
					return function() {
						u.formatBlock("H" + t)
					}
				}(o), this.context.memo("help.formatH" + o, this.lang.help["formatH" + o]);
				this.insertParagraph = this.wrapCommand(function() {
					u.typing.insertParagraph(u.editable)
				}), this.insertOrderedList = this.wrapCommand(function() {
					u.bullet.insertOrderedList(u.editable)
				}), this.insertUnorderedList = this.wrapCommand(function() {
					u.bullet.insertUnorderedList(u.editable)
				}), this.indent = this.wrapCommand(function() {
					u.bullet.indent(u.editable)
				}), this.outdent = this.wrapCommand(function() {
					u.bullet.outdent(u.editable)
				}), this.insertNode = this.wrapCommand(function(t) {
					u.isLimited(k(t).text().length) || (u.createRange().insertNode(t), Ft.createFromNodeAfter(t).select())
				}), this.insertText = this.wrapCommand(function(t) {
					if (!u.isLimited(t.length)) {
						var e = u.createRange().insertNode(Nt.createText(t));
						Ft.create(e, Nt.nodeLength(e)).select()
					}
				}), this.pasteHTML = this.wrapCommand(function(t) {
					if (!u.isLimited(t.length)) {
						var e = u.createRange().pasteHTML(t);
						Ft.createFromNodeAfter(N.last(e)).select()
					}
				}), this.formatBlock = this.wrapCommand(function(t, e) {
					var o = u.options.callbacks.onApplyCustomStyle;
					o ? o.call(u, e, u.context, u.onFormatBlock) : u.onFormatBlock(t, e)
				}), this.insertHorizontalRule = this.wrapCommand(function() {
					var t = u.createRange().insertNode(Nt.create("HR"));
					t.nextSibling && Ft.create(t.nextSibling, 0).normalize().select()
				}), this.lineHeight = this.wrapCommand(function(t) {
					u.style.stylePara(u.createRange(), {
						lineHeight: t
					})
				}), this.createLink = this.wrapCommand(function(t) {
					var o = t.url,
						e = t.text,
						n = t.isNewWindow,
						i = t.range || u.createRange(),
						r = e.length - i.toString().length;
					if (!(0 < r && u.isLimited(r))) {
						var s = i.toString() !== e;
						"string" == typeof o && (o = o.trim()), u.options.onCreateLink ? o = u.options.onCreateLink(o) : /^\.?\/(.*)/.test(o) || (o = /^[A-Za-z][A-Za-z0-9+-.]*\:[\/\/]?/.test(o) ? o : "http://" + o);
						var a = [];
						if (s) {
							var l = (i = i.deleteContents()).insertNode(k("<A>" + e + "</A>")[0]);
							a.push(l)
						} else a = u.style.styleNodes(i, {
							nodeName: "A",
							expandClosestSibling: !0,
							onlyPartialContains: !0
						});
						k.each(a, function(t, e) {
							k(e).attr("href", o), n ? k(e).attr("target", "_blank") : k(e).removeAttr("target")
						});
						var c = Ft.createFromNodeBefore(N.head(a)).getStartPoint(),
							d = Ft.createFromNodeAfter(N.last(a)).getEndPoint();
						Ft.create(c.node, c.offset, d.node, d.offset).select()
					}
				}), this.color = this.wrapCommand(function(t) {
					var e = t.foreColor,
						o = t.backColor;
					e && document.execCommand("foreColor", !1, e), o && document.execCommand("backColor", !1, o)
				}), this.foreColor = this.wrapCommand(function(t) {
					document.execCommand("styleWithCSS", !1, !0), document.execCommand("foreColor", !1, t)
				}), this.insertTable = this.wrapCommand(function(t) {
					var e = t.split("x");
					u.createRange().deleteContents().insertNode(u.table.createTable(e[0], e[1], u.options))
				}), this.removeMedia = this.wrapCommand(function() {
					var t = k(u.restoreTarget()).parent();
					t.parent("figure").length ? t.parent("figure").remove() : t = k(u.restoreTarget()).detach(), u.context.triggerEvent("media.delete", t, u.$editable)
				}), this.floatMe = this.wrapCommand(function(t) {
					var e = k(u.restoreTarget());
					e.toggleClass("note-float-left", "left" === t), e.toggleClass("note-float-right", "right" === t), e.css("float", t)
				}), this.resize = this.wrapCommand(function(t) {
					k(u.restoreTarget()).css({
						width: 100 * t + "%",
						height: ""
					})
				})
			}
			return t.prototype.initialize = function() {
				var e = this;
				this.$editable.on("keydown", function(t) {
					if (t.keyCode === Lt.code.ENTER && e.context.triggerEvent("enter", t), e.context.triggerEvent("keydown", t), t.isDefaultPrevented() || (e.options.shortcuts ? e.handleKeyMap(t) : e.preventDefaultEditableShortCuts(t)), e.isLimited(1, t)) return !1
				}).on("keyup", function(t) {
					e.context.triggerEvent("keyup", t)
				}).on("focus", function(t) {
					e.context.triggerEvent("focus", t)
				}).on("blur", function(t) {
					e.context.triggerEvent("blur", t)
				}).on("mousedown", function(t) {
					e.context.triggerEvent("mousedown", t)
				}).on("mouseup", function(t) {
					e.context.triggerEvent("mouseup", t)
				}).on("scroll", function(t) {
					e.context.triggerEvent("scroll", t)
				}).on("paste", function(t) {
					e.context.triggerEvent("paste", t)
				}), this.$editable.html(Nt.html(this.$note) || Nt.emptyPara), this.$editable.on(z.inputEventName, C.debounce(function() {
					e.context.triggerEvent("change", e.$editable.html())
				}, 10)), this.$editor.on("focusin", function(t) {
					e.context.triggerEvent("focusin", t)
				}).on("focusout", function(t) {
					e.context.triggerEvent("focusout", t)
				}), this.options.airMode || (this.options.width && this.$editor.outerWidth(this.options.width), this.options.height && this.$editable.outerHeight(this.options.height), this.options.maxHeight && this.$editable.css("max-height", this.options.maxHeight), this.options.minHeight && this.$editable.css("min-height", this.options.minHeight)), this.history.recordUndo()
			}, t.prototype.destroy = function() {
				this.$editable.off()
			}, t.prototype.handleKeyMap = function(t) {
				var e = this.options.keyMap[z.isMac ? "mac" : "pc"],
					o = [];
				t.metaKey && o.push("CMD"), t.ctrlKey && !t.altKey && o.push("CTRL"), t.shiftKey && o.push("SHIFT");
				var n = Lt.nameFromCode[t.keyCode];
				n && o.push(n);
				var i = e[o.join("+")];
				i ? !1 !== this.context.invoke(i) && t.preventDefault() : Lt.isEdit(t.keyCode) && this.afterCommand()
			}, t.prototype.preventDefaultEditableShortCuts = function(t) {
				(t.ctrlKey || t.metaKey) && N.contains([66, 73, 85], t.keyCode) && t.preventDefault()
			}, t.prototype.isLimited = function(t, e) {
				return t = t || 0, (void 0 === e || !(Lt.isMove(e.keyCode) || e.ctrlKey || e.metaKey || N.contains([Lt.code.BACKSPACE, Lt.code.DELETE], e.keyCode))) && (0 < this.options.maxTextLength && this.$editable.text().length + t >= this.options.maxTextLength)
			}, t.prototype.createRange = function() {
				return this.focus(), Ft.create(this.editable)
			}, t.prototype.saveRange = function(t) {
				this.lastRange = this.createRange(), t && this.lastRange.collapse().select()
			}, t.prototype.restoreRange = function() {
				this.lastRange && (this.lastRange.select(), this.focus())
			}, t.prototype.saveTarget = function(t) {
				this.$editable.data("target", t)
			}, t.prototype.clearTarget = function() {
				this.$editable.removeData("target")
			}, t.prototype.restoreTarget = function() {
				return this.$editable.data("target")
			}, t.prototype.currentStyle = function() {
				var t = Ft.create();
				return t && (t = t.normalize()), t ? this.style.current(t) : this.style.fromNode(this.$editable)
			}, t.prototype.styleFromNode = function(t) {
				return this.style.fromNode(t)
			}, t.prototype.undo = function() {
				this.context.triggerEvent("before.command", this.$editable.html()), this.history.undo(), this.context.triggerEvent("change", this.$editable.html())
			}, t.prototype.commit = function() {
				this.context.triggerEvent("before.command", this.$editable.html()), this.history.commit(), this.context.triggerEvent("change", this.$editable.html())
			}, t.prototype.redo = function() {
				this.context.triggerEvent("before.command", this.$editable.html()), this.history.redo(), this.context.triggerEvent("change", this.$editable.html())
			}, t.prototype.beforeCommand = function() {
				this.context.triggerEvent("before.command", this.$editable.html()), this.focus()
			}, t.prototype.afterCommand = function(t) {
				this.normalizeContent(), this.history.recordUndo(), t || this.context.triggerEvent("change", this.$editable.html())
			}, t.prototype.tab = function() {
				var t = this.createRange();
				if (t.isCollapsed() && t.isOnCell()) this.table.tab(t);
				else {
					if (0 === this.options.tabSize) return !1;
					this.isLimited(this.options.tabSize) || (this.beforeCommand(), this.typing.insertTab(t, this.options.tabSize), this.afterCommand())
				}
			}, t.prototype.untab = function() {
				var t = this.createRange();
				if (t.isCollapsed() && t.isOnCell()) this.table.tab(t, !0);
				else if (0 === this.options.tabSize) return !1
			}, t.prototype.wrapCommand = function(t) {
				return function() {
					this.beforeCommand(), t.apply(this, arguments), this.afterCommand()
				}
			}, t.prototype.insertImage = function(t, e) {
				var o, n = this;
				return (o = t, k.Deferred(function(t) {
					var e = k("<img>");
					e.one("load", function() {
						e.off("error abort"), t.resolve(e)
					}).one("error abort", function() {
						e.off("load").detach(), t.reject(e)
					}).css({
						display: "none"
					}).appendTo(document.body).attr("src", o)
				}).promise()).then(function(t) {
					n.beforeCommand(), "function" == typeof e ? e(t) : ("string" == typeof e && t.attr("data-filename", e), t.css("width", Math.min(n.$editable.width(), t.width()))), t.show(), Ft.create(n.editable).insertNode(t[0]), Ft.createFromNodeAfter(t[0]).select(), n.afterCommand()
				}).fail(function(t) {
					n.context.triggerEvent("image.upload.error", t)
				})
			}, t.prototype.insertImagesAsDataURL = function(t) {
				var i = this;
				k.each(t, function(t, e) {
					var n, o = e.name;
					i.options.maximumImageFileSize && i.options.maximumImageFileSize < e.size ? i.context.triggerEvent("image.upload.error", i.lang.image.maximumFileSizeError) : (n = e, k.Deferred(function(o) {
						k.extend(new FileReader, {
							onload: function(t) {
								var e = t.target.result;
								o.resolve(e)
							},
							onerror: function(t) {
								o.reject(t)
							}
						}).readAsDataURL(n)
					}).promise()).then(function(t) {
						return i.insertImage(t, o)
					}).fail(function() {
						i.context.triggerEvent("image.upload.error")
					})
				})
			}, t.prototype.getSelectedText = function() {
				var t = this.createRange();
				return t.isOnAnchor() && (t = Ft.createFromNode(Nt.ancestor(t.sc, Nt.isAnchor))), t.toString()
			}, t.prototype.onFormatBlock = function(t, e) {
				if (t = z.isMSIE ? "<" + t + ">" : t, document.execCommand("FormatBlock", !1, t), e && e.length) {
					var o = e[0].className || "";
					if (o) {
						var n = this.createRange();
						k([n.sc, n.ec]).closest(t).addClass(o)
					}
				}
			}, t.prototype.formatPara = function() {
				this.formatBlock("P")
			}, t.prototype.fontStyling = function(t, e) {
				var o = this.createRange();
				if (o) {
					var n = this.style.styleNodes(o);
					if (k(n).css(t, e), o.isCollapsed()) {
						var i = N.head(n);
						i && !Nt.nodeLength(i) && (i.innerHTML = Nt.ZERO_WIDTH_NBSP_CHAR, Ft.createFromNodeAfter(i.firstChild).select(), this.$editable.data("bogus", i))
					}
				}
			}, t.prototype.unlink = function() {
				var t = this.createRange();
				if (t.isOnAnchor()) {
					var e = Nt.ancestor(t.sc, Nt.isAnchor);
					(t = Ft.createFromNode(e)).select(), this.beforeCommand(), document.execCommand("unlink"), this.afterCommand()
				}
			}, t.prototype.getLinkInfo = function() {
				var t = this.createRange().expand(Nt.isAnchor),
					e = k(N.head(t.nodes(Nt.isAnchor))),
					o = {
						range: t,
						text: t.toString(),
						url: e.length ? e.attr("href") : ""
					};
				return e.length && (o.isNewWindow = "_blank" === e.attr("target")), o
			}, t.prototype.addRow = function(t) {
				var e = this.createRange(this.$editable);
				e.isCollapsed() && e.isOnCell() && (this.beforeCommand(), this.table.addRow(e, t), this.afterCommand())
			}, t.prototype.addCol = function(t) {
				var e = this.createRange(this.$editable);
				e.isCollapsed() && e.isOnCell() && (this.beforeCommand(), this.table.addCol(e, t), this.afterCommand())
			}, t.prototype.deleteRow = function() {
				var t = this.createRange(this.$editable);
				t.isCollapsed() && t.isOnCell() && (this.beforeCommand(), this.table.deleteRow(t), this.afterCommand())
			}, t.prototype.deleteCol = function() {
				var t = this.createRange(this.$editable);
				t.isCollapsed() && t.isOnCell() && (this.beforeCommand(), this.table.deleteCol(t), this.afterCommand())
			}, t.prototype.deleteTable = function() {
				var t = this.createRange(this.$editable);
				t.isCollapsed() && t.isOnCell() && (this.beforeCommand(), this.table.deleteTable(t), this.afterCommand())
			}, t.prototype.resizeTo = function(t, e, o) {
				var n;
				if (o) {
					var i = t.y / t.x,
						r = e.data("ratio");
					n = {
						width: i < r ? t.x : t.y / r,
						height: i < r ? t.x * r : t.y
					}
				} else n = {
					width: t.x,
					height: t.y
				};
				e.css(n)
			}, t.prototype.hasFocus = function() {
				return this.$editable.is(":focus")
			}, t.prototype.focus = function() {
				this.hasFocus() || this.$editable.focus()
			}, t.prototype.isEmpty = function() {
				return Nt.isEmpty(this.$editable[0]) || Nt.emptyPara === this.$editable.html()
			}, t.prototype.empty = function() {
				this.context.invoke("code", Nt.emptyPara)
			}, t.prototype.normalizeContent = function() {
				this.$editable[0].normalize()
			}, t
		}(),
		qt = function() {
			function t(t) {
				this.context = t, this.$editable = t.layoutInfo.editable
			}
			return t.prototype.initialize = function() {
				this.$editable.on("paste", this.pasteByEvent.bind(this))
			}, t.prototype.pasteByEvent = function(t) {
				var e = t.originalEvent.clipboardData;
				if (e && e.items && e.items.length) {
					var o = 1 < e.items.length ? e.items[1] : N.head(e.items);
					"file" === o.kind && -1 !== o.type.indexOf("image/") && this.context.invoke("editor.insertImagesOrCallback", [o.getAsFile()]), this.context.invoke("editor.afterCommand")
				}
			}, t
		}(),
		Kt = function() {
			function t(t) {
				this.context = t, this.$eventListener = k(document), this.$editor = t.layoutInfo.editor, this.$editable = t.layoutInfo.editable, this.options = t.options, this.lang = this.options.langInfo, this.documentEventHandlers = {}, this.$dropzone = k(['<div class="note-dropzone">', '  <div class="note-dropzone-message"/>', "</div>"].join("")).prependTo(this.$editor)
			}
			return t.prototype.initialize = function() {
				this.options.disableDragAndDrop ? (this.documentEventHandlers.onDrop = function(t) {
					t.preventDefault()
				}, this.$eventListener = this.$dropzone, this.$eventListener.on("drop", this.documentEventHandlers.onDrop)) : this.attachDragAndDropEvent()
			}, t.prototype.attachDragAndDropEvent = function() {
				var i = this,
					n = k(),
					r = this.$dropzone.find(".note-dropzone-message");
				this.documentEventHandlers.onDragenter = function(t) {
					var e = i.context.invoke("codeview.isActivated"),
						o = 0 < i.$editor.width() && 0 < i.$editor.height();
					e || n.length || !o || (i.$editor.addClass("dragover"), i.$dropzone.width(i.$editor.width()), i.$dropzone.height(i.$editor.height()), r.text(i.lang.image.dragImageHere)), n = n.add(t.target)
				}, this.documentEventHandlers.onDragleave = function(t) {
					(n = n.not(t.target)).length || i.$editor.removeClass("dragover")
				}, this.documentEventHandlers.onDrop = function() {
					n = k(), i.$editor.removeClass("dragover")
				}, this.$eventListener.on("dragenter", this.documentEventHandlers.onDragenter).on("dragleave", this.documentEventHandlers.onDragleave).on("drop", this.documentEventHandlers.onDrop), this.$dropzone.on("dragenter", function() {
					i.$dropzone.addClass("hover"), r.text(i.lang.image.dropImage)
				}).on("dragleave", function() {
					i.$dropzone.removeClass("hover"), r.text(i.lang.image.dragImageHere)
				}), this.$dropzone.on("drop", function(t) {
					var n = t.originalEvent.dataTransfer;
					t.preventDefault(), n && n.files && n.files.length ? (i.$editable.focus(), i.context.invoke("editor.insertImagesOrCallback", n.files)) : k.each(n.types, function(t, e) {
						var o = n.getData(e); - 1 < e.toLowerCase().indexOf("text") ? i.context.invoke("editor.pasteHTML", o) : k(o).each(function(t, e) {
							i.context.invoke("editor.insertNode", e)
						})
					})
				}).on("dragover", !1)
			}, t.prototype.destroy = function() {
				var e = this;
				Object.keys(this.documentEventHandlers).forEach(function(t) {
					e.$eventListener.off(t.substr(2).toLowerCase(), e.documentEventHandlers[t])
				}), this.documentEventHandlers = {}
			}, t
		}();
	z.hasCodeMirror && (z.isSupportAmd ? require(["codemirror"], function(t) {
		Ot = t
	}) : Ot = window.CodeMirror);
	var Vt = function() {
			function t(t) {
				this.context = t, this.$editor = t.layoutInfo.editor, this.$editable = t.layoutInfo.editable, this.$codable = t.layoutInfo.codable, this.options = t.options
			}
			return t.prototype.sync = function() {
				this.isActivated() && z.hasCodeMirror && this.$codable.data("cmEditor").save()
			}, t.prototype.isActivated = function() {
				return this.$editor.hasClass("codeview")
			}, t.prototype.toggle = function() {
				this.isActivated() ? this.deactivate() : this.activate(), this.context.triggerEvent("codeview.toggled")
			}, t.prototype.activate = function() {
				var e = this;
				if (this.$codable.val(Nt.html(this.$editable, this.options.prettifyHtml)), this.$codable.height(this.$editable.height()), this.context.invoke("toolbar.updateCodeview", !0), this.$editor.addClass("codeview"), this.$codable.focus(), z.hasCodeMirror) {
					var o = Ot.fromTextArea(this.$codable[0], this.options.codemirror);
					if (this.options.codemirror.tern) {
						var n = new Ot.TernServer(this.options.codemirror.tern);
						o.ternServer = n, o.on("cursorActivity", function(t) {
							n.updateArgHints(t)
						})
					}
					o.on("blur", function(t) {
						e.context.triggerEvent("blur.codeview", o.getValue(), t)
					}), o.setSize(null, this.$editable.outerHeight()), this.$codable.data("cmEditor", o)
				} else this.$codable.on("blur", function(t) {
					e.context.triggerEvent("blur.codeview", e.$codable.val(), t)
				})
			}, t.prototype.deactivate = function() {
				if (z.hasCodeMirror) {
					var t = this.$codable.data("cmEditor");
					this.$codable.val(t.getValue()), t.toTextArea()
				}
				var e = Nt.value(this.$codable, this.options.prettifyHtml) || Nt.emptyPara,
					o = this.$editable.html() !== e;
				this.$editable.html(e), this.$editable.height(this.options.height ? this.$codable.height() : "auto"), this.$editor.removeClass("codeview"), o && this.context.triggerEvent("change", this.$editable.html(), this.$editable), this.$editable.focus(), this.context.invoke("toolbar.updateCodeview", !1)
			}, t.prototype.destroy = function() {
				this.isActivated() && this.deactivate()
			}, t
		}(),
		Wt = function() {
			function t(t) {
				this.$document = k(document), this.$statusbar = t.layoutInfo.statusbar, this.$editable = t.layoutInfo.editable, this.options = t.options
			}
			return t.prototype.initialize = function() {
				var n = this;
				this.options.airMode || this.options.disableResizeEditor ? this.destroy() : this.$statusbar.on("mousedown", function(t) {
					t.preventDefault(), t.stopPropagation();
					var o = n.$editable.offset().top - n.$document.scrollTop(),
						e = function(t) {
							var e = t.clientY - (o + 24);
							e = 0 < n.options.minheight ? Math.max(e, n.options.minheight) : e, e = 0 < n.options.maxHeight ? Math.min(e, n.options.maxHeight) : e, n.$editable.height(e)
						};
					n.$document.on("mousemove", e).one("mouseup", function() {
						n.$document.off("mousemove", e)
					})
				})
			}, t.prototype.destroy = function() {
				this.$statusbar.off(), this.$statusbar.addClass("locked")
			}, t
		}(),
		_t = function() {
			function t(t) {
				var e = this;
				this.context = t, this.$editor = t.layoutInfo.editor, this.$toolbar = t.layoutInfo.toolbar, this.$editable = t.layoutInfo.editable, this.$codable = t.layoutInfo.codable, this.$window = k(window), this.$scrollbar = k("html, body"), this.onResize = function() {
					e.resizeTo({
						h: e.$window.height() - e.$toolbar.outerHeight()
					})
				}
			}
			return t.prototype.resizeTo = function(t) {
				this.$editable.css("height", t.h), this.$codable.css("height", t.h), this.$codable.data("cmeditor") && this.$codable.data("cmeditor").setsize(null, t.h)
			}, t.prototype.toggle = function() {
				this.$editor.toggleClass("fullscreen"), this.isFullscreen() ? (this.$editable.data("orgHeight", this.$editable.css("height")), this.$editable.data("orgMaxHeight", this.$editable.css("maxHeight")), this.$editable.css("maxHeight", ""), this.$window.on("resize", this.onResize).trigger("resize"), this.$scrollbar.css("overflow", "hidden")) : (this.$window.off("resize", this.onResize), this.resizeTo({
					h: this.$editable.data("orgHeight")
				}), this.$editable.css("maxHeight", this.$editable.css("orgMaxHeight")), this.$scrollbar.css("overflow", "visible")), this.context.invoke("toolbar.updateFullscreen", this.isFullscreen())
			}, t.prototype.isFullscreen = function() {
				return this.$editor.hasClass("fullscreen")
			}, t
		}(),
		Gt = function() {
			function t(t) {
				var o = this;
				this.context = t, this.$document = k(document), this.$editingArea = t.layoutInfo.editingArea, this.options = t.options, this.lang = this.options.langInfo, this.events = {
					"summernote.mousedown": function(t, e) {
						o.update(e.target) && e.preventDefault()
					},
					"summernote.keyup summernote.scroll summernote.change summernote.dialog.shown": function() {
						o.update()
					},
					"summernote.disable": function() {
						o.hide()
					},
					"summernote.codeview.toggled": function() {
						o.update()
					}
				}
			}
			return t.prototype.initialize = function() {
				var r = this;
				this.$handle = k(['<div class="note-handle">', '<div class="note-control-selection">', '<div class="note-control-selection-bg"></div>', '<div class="note-control-holder note-control-nw"></div>', '<div class="note-control-holder note-control-ne"></div>', '<div class="note-control-holder note-control-sw"></div>', '<div class="', this.options.disableResizeImage ? "note-control-holder" : "note-control-sizing", ' note-control-se"></div>', this.options.disableResizeImage ? "" : '<div class="note-control-selection-info"></div>', "</div>", "</div>"].join("")).prependTo(this.$editingArea), this.$handle.on("mousedown", function(t) {
					if (Nt.isControlSizing(t.target)) {
						t.preventDefault(), t.stopPropagation();
						var e = r.$handle.find(".note-control-selection").data("target"),
							o = e.offset(),
							n = r.$document.scrollTop(),
							i = function(t) {
								r.context.invoke("editor.resizeTo", {
									x: t.clientX - o.left,
									y: t.clientY - (o.top - n)
								}, e, !t.shiftKey), r.update(e[0])
							};
						r.$document.on("mousemove", i).one("mouseup", function(t) {
							t.preventDefault(), r.$document.off("mousemove", i), r.context.invoke("editor.afterCommand")
						}), e.data("ratio") || e.data("ratio", e.height() / e.width())
					}
				}), this.$handle.on("wheel", function(t) {
					t.preventDefault(), r.update()
				})
			}, t.prototype.destroy = function() {
				this.$handle.remove()
			}, t.prototype.update = function(t) {
				if (this.context.isDisabled()) return !1;
				var e = Nt.isImg(t),
					o = this.$handle.find(".note-control-selection");
				if (this.context.invoke("imagePopover.update", t), e) {
					var n = k(t),
						i = n.position(),
						r = {
							left: i.left + parseInt(n.css("marginLeft"), 10),
							top: i.top + parseInt(n.css("marginTop"), 10)
						},
						s = {
							w: n.outerWidth(!1),
							h: n.outerHeight(!1)
						};
					o.css({
						display: "block",
						left: r.left,
						top: r.top,
						width: s.w,
						height: s.h
					}).data("target", n);
					var a = new Image;
					a.src = n.attr("src");
					var l = s.w + "x" + s.h + " (" + this.lang.image.original + ": " + a.width + "x" + a.height + ")";
					o.find(".note-control-selection-info").text(l), this.context.invoke("editor.saveTarget", t)
				} else this.hide();
				return e
			}, t.prototype.hide = function() {
				this.context.invoke("editor.clearTarget"), this.$handle.children().hide()
			}, t
		}(),
		Zt = /^([A-Za-z][A-Za-z0-9+-.]*\:[\/]{2}|mailto:[A-Z0-9._%+-]+@)?(www\.)?(.+)$/i,
		Yt = function() {
			function t(t) {
				var o = this;
				this.context = t, this.events = {
					"summernote.keyup": function(t, e) {
						e.isDefaultPrevented() || o.handleKeyup(e)
					},
					"summernote.keydown": function(t, e) {
						o.handleKeydown(e)
					}
				}
			}
			return t.prototype.initialize = function() {
				this.lastWordRange = null
			}, t.prototype.destroy = function() {
				this.lastWordRange = null
			}, t.prototype.replace = function() {
				if (this.lastWordRange) {
					var t = this.lastWordRange.toString(),
						e = t.match(Zt);
					if (e && (e[1] || e[2])) {
						var o = e[1] ? t : "http://" + t,
							n = k("<a />").html(t).attr("href", o)[0];
						this.context.options.linkTargetBlank && k(n).attr("target", "_blank"), this.lastWordRange.insertNode(n), this.lastWordRange = null, this.context.invoke("editor.focus")
					}
				}
			}, t.prototype.handleKeydown = function(t) {
				if (N.contains([Lt.code.ENTER, Lt.code.SPACE], t.keyCode)) {
					var e = this.context.invoke("editor.createRange").getWordRange();
					this.lastWordRange = e
				}
			}, t.prototype.handleKeyup = function(t) {
				N.contains([Lt.code.ENTER, Lt.code.SPACE], t.keyCode) && this.replace()
			}, t
		}(),
		Qt = function() {
			function t(t) {
				var e = this;
				this.$note = t.layoutInfo.note, this.events = {
					"summernote.change": function() {
						e.$note.val(t.invoke("code"))
					}
				}
			}
			return t.prototype.shouldInitialize = function() {
				return Nt.isTextarea(this.$note[0])
			}, t
		}(),
		Jt = function() {
			function t(t) {
				var e = this;
				this.context = t, this.$editingArea = t.layoutInfo.editingArea, this.options = t.options, this.events = {
					"summernote.init summernote.change": function() {
						e.update()
					},
					"summernote.codeview.toggled": function() {
						e.update()
					}
				}
			}
			return t.prototype.shouldInitialize = function() {
				return !!this.options.placeholder
			}, t.prototype.initialize = function() {
				var t = this;
				this.$placeholder = k('<div class="note-placeholder">'), this.$placeholder.on("click", function() {
					t.context.invoke("focus")
				}).html(this.options.placeholder).prependTo(this.$editingArea), this.update()
			}, t.prototype.destroy = function() {
				this.$placeholder.remove()
			}, t.prototype.update = function() {
				var t = !this.context.invoke("codeview.isActivated") && this.context.invoke("editor.isEmpty");
				this.$placeholder.toggle(t)
			}, t
		}(),
		Xt = function() {
			function t(t) {
				this.ui = k.summernote.ui, this.context = t, this.$toolbar = t.layoutInfo.toolbar, this.options = t.options, this.lang = this.options.langInfo, this.invertedKeyMap = C.invertObject(this.options.keyMap[z.isMac ? "mac" : "pc"])
			}
			return t.prototype.representShortcut = function(t) {
				var e = this.invertedKeyMap[t];
				return this.options.shortcuts && e ? (z.isMac && (e = e.replace("CMD", "⌘").replace("SHIFT", "⇧")), " (" + (e = e.replace("BACKSLASH", "\\").replace("SLASH", "/").replace("LEFTBRACKET", "[").replace("RIGHTBRACKET", "]")) + ")") : ""
			}, t.prototype.button = function(t) {
				return !this.options.tooltip && t.tooltip && delete t.tooltip, t.container = this.options.container, this.ui.button(t)
			}, t.prototype.initialize = function() {
				this.addToolbarButtons(), this.addImagePopoverButtons(), this.addLinkPopoverButtons(), this.addTablePopoverButtons(), this.fontInstalledMap = {}
			}, t.prototype.destroy = function() {
				delete this.fontInstalledMap
			}, t.prototype.isFontInstalled = function(t) {
				return this.fontInstalledMap.hasOwnProperty(t) || (this.fontInstalledMap[t] = z.isFontInstalled(t) || N.contains(this.options.fontNamesIgnoreCheck, t)), this.fontInstalledMap[t]
			}, t.prototype.isFontDeservedToAdd = function(t) {
				return "" !== (t = t.toLowerCase()) && this.isFontInstalled(t) && -1 === k.inArray(t, ["sans-serif", "serif", "monospace", "cursive", "fantasy"])
			}, t.prototype.colorPalette = function(h, t, o, n) {
				var p = this;
				return this.ui.buttonGroup({
					className: "note-color " + h,
					children: [this.button({
						className: "note-current-color-button",
						contents: this.ui.icon(this.options.icons.font + " note-recent-color"),
						tooltip: t,
						click: function(t) {
							var e = k(t.currentTarget);
							o && n ? p.context.invoke("editor.color", {
								backColor: e.attr("data-backColor"),
								foreColor: e.attr("data-foreColor")
							}) : o ? p.context.invoke("editor.color", {
								backColor: e.attr("data-backColor")
							}) : n && p.context.invoke("editor.color", {
								foreColor: e.attr("data-foreColor")
							})
						},
						callback: function(t) {
							var e = t.find(".note-recent-color");
							o && (e.css("background-color", "#F7DC6F"), t.attr("data-backColor", "#F7DC6F")), n || e.css("color", "transparent")
						},
					}), this.button({
						className: "dropdown-toggle",
						contents: this.ui.dropdownButtonContents("", this.options),
						tooltip: this.lang.color.more,
						data: {
							toggle: "dropdown"
						}
					}), this.ui.dropdown({
						items: (o ? ['<div class="note-palette">', '  <div class="note-palette-title">' + this.lang.color.background + "</div>", "  <div>", '    <button type="button" class="note-color-reset btn btn-light" data-event="backColor" data-value="inherit">', this.lang.color.transparent, "    </button>", "  </div>", '  <div class="note-holder" data-event="backColor"/>', "  <div>", '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="backColorPicker">', this.lang.color.cpSelect, "    </button>", '    <input type="color" id="backColorPicker" class="note-btn note-color-select-btn" value="#F7DC6F" data-event="backColorPalette">', "  </div>", '  <div class="note-holder-custom" id="backColorPalette" data-event="backColor"/>', "</div>"].join("") : "") + (n ? ['<div class="note-palette">', '  <div class="note-palette-title">' + this.lang.color.foreground + "</div>", "  <div>", '    <button type="button" class="note-color-reset btn btn-light" data-event="removeFormat" data-value="foreColor">', this.lang.color.resetToDefault, "    </button>", "  </div>", '  <div class="note-holder" data-event="foreColor"/>', "  <div>", '    <button type="button" class="note-color-select btn" data-event="openPalette" data-value="foreColorPicker">', this.lang.color.cpSelect, "    </button>", '    <input type="color" id="foreColorPicker" class="note-btn note-color-select-btn" value="#000000" data-event="foreColorPalette">', '  <div class="note-holder-custom" id="foreColorPalette" data-event="foreColor"/>', "</div>"].join("") : ""),
						callback: function(o) {
							o.find(".note-holder").each(function(t, e) {
								var o = k(e);
								o.append(p.ui.palette({
									colors: p.options.colors,
									colorsName: p.options.colorsName,
									eventName: o.data("event"),
									container: p.options.container,
									tooltip: p.options.tooltip
								}).render())
							});
							var n = [
								["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]
							];
							o.find(".note-holder-custom").each(function(t, e) {
								var o = k(e);
								o.append(p.ui.palette({
									colors: n,
									colorsName: n,
									eventName: o.data("event"),
									container: p.options.container,
									tooltip: p.options.tooltip
								}).render())
							}), o.find("input[type=color]").each(function(t, e) {
								k(e).change(function() {
									var t = o.find("#" + k(this).data("event")).find(".note-color-btn").first(),
										e = this.value.toUpperCase();
									t.css("background-color", e).attr("aria-label", e).attr("data-value", e).attr("data-original-title", e), t.click()
								})
							})
						},
						click: function(t) {
							t.stopPropagation();
							var e = k("." + h),
								o = k(t.target),
								n = o.data("event"),
								i = o.attr("data-value");
							if ("openPalette" === n) {
								var r = e.find("#" + i),
									s = k(e.find("#" + r.data("event")).find(".note-color-row")[0]),
									a = s.find(".note-color-btn").last().detach(),
									l = r.val();
								a.css("background-color", l).attr("aria-label", l).attr("data-value", l).attr("data-original-title", l), s.prepend(a), r.click()
							} else if (N.contains(["backColor", "foreColor"], n)) {
								var c = "backColor" === n ? "background-color" : "color",
									d = o.closest(".note-color").find(".note-recent-color"),
									u = o.closest(".note-color").find(".note-current-color-button");
								d.css(c, i), u.attr("data-" + n, i), p.context.invoke("editor." + n, i)
							}
						}
					})]
				}).render()
			}, t.prototype.addToolbarButtons = function() {
				var n = this;
				this.context.memo("button.style", function() {
					return n.ui.buttonGroup([n.button({
						className: "dropdown-toggle",
						contents: n.ui.dropdownButtonContents(n.ui.icon(n.options.icons.magic), n.options),
						tooltip: n.lang.style.style,
						data: {
							toggle: "dropdown"
						}
					}), n.ui.dropdown({
						className: "dropdown-style",
						items: n.options.styleTags,
						title: n.lang.style.style,
						template: function(t) {
							"string" == typeof t && (t = {
								tag: t,
								title: n.lang.style.hasOwnProperty(t) ? n.lang.style[t] : t
							});
							var e = t.tag,
								o = t.title;
							return "<" + e + (t.style ? ' style="' + t.style + '" ' : "") + (t.className ? ' class="' + t.className + '"' : "") + ">" + o + "</" + e + ">"
						},
						click: n.context.createInvokeHandler("editor.formatBlock")
					})]).render()
				});
				for (var t = function(t, e) {
						var o = i.options.styleTags[t];
						i.context.memo("button.style." + o, function() {
							return n.button({
								className: "note-btn-style-" + o,
								contents: '<div data-value="' + o + '">' + o.toUpperCase() + "</div>",
								tooltip: n.lang.style[o],
								click: n.context.createInvokeHandler("editor.formatBlock")
							}).render()
						})
					}, i = this, e = 0, o = this.options.styleTags.length; e < o; e++) t(e);
				this.context.memo("button.bold", function() {
					return n.button({
						className: "note-btn-bold",
						contents: n.ui.icon(n.options.icons.bold),
						tooltip: n.lang.font.bold + n.representShortcut("bold"),
						click: n.context.createInvokeHandlerAndUpdateState("editor.bold")
					}).render()
				}), this.context.memo("button.italic", function() {
					return n.button({
						className: "note-btn-italic",
						contents: n.ui.icon(n.options.icons.italic),
						tooltip: n.lang.font.italic + n.representShortcut("italic"),
						click: n.context.createInvokeHandlerAndUpdateState("editor.italic")
					}).render()
				}), this.context.memo("button.underline", function() {
					return n.button({
						className: "note-btn-underline",
						contents: n.ui.icon(n.options.icons.underline),
						tooltip: n.lang.font.underline + n.representShortcut("underline"),
						click: n.context.createInvokeHandlerAndUpdateState("editor.underline")
					}).render()
				}), this.context.memo("button.clear", function() {
					return n.button({
						contents: n.ui.icon(n.options.icons.eraser),
						tooltip: n.lang.font.clear + n.representShortcut("removeFormat"),
						click: n.context.createInvokeHandler("editor.removeFormat")
					}).render()
				}), this.context.memo("button.strikethrough", function() {
					return n.button({
						className: "note-btn-strikethrough",
						contents: n.ui.icon(n.options.icons.strikethrough),
						tooltip: n.lang.font.strikethrough + n.representShortcut("strikethrough"),
						click: n.context.createInvokeHandlerAndUpdateState("editor.strikethrough")
					}).render()
				}), this.context.memo("button.superscript", function() {
					return n.button({
						className: "note-btn-superscript",
						contents: n.ui.icon(n.options.icons.superscript),
						tooltip: n.lang.font.superscript,
						click: n.context.createInvokeHandlerAndUpdateState("editor.superscript")
					}).render()
				}), this.context.memo("button.subscript", function() {
					return n.button({
						className: "note-btn-subscript",
						contents: n.ui.icon(n.options.icons.subscript),
						tooltip: n.lang.font.subscript,
						click: n.context.createInvokeHandlerAndUpdateState("editor.subscript")
					}).render()
				}), this.context.memo("button.fontname", function() {
					var t = n.context.invoke("editor.currentStyle");
					return k.each(t["font-family"].split(","), function(t, e) {
						e = e.trim().replace(/['"]+/g, ""), n.isFontDeservedToAdd(e) && -1 === k.inArray(e, n.options.fontNames) && n.options.fontNames.push(e)
					}), n.ui.buttonGroup([n.button({
						className: "dropdown-toggle",
						contents: n.ui.dropdownButtonContents('<span class="note-current-fontname"/>', n.options),
						tooltip: n.lang.font.name,
						data: {
							toggle: "dropdown"
						}
					}), n.ui.dropdownCheck({
						className: "dropdown-fontname",
						checkClassName: n.options.icons.menuCheck,
						items: n.options.fontNames.filter(n.isFontInstalled.bind(n)),
						title: n.lang.font.name,
						template: function(t) {
							return "<span style=\"font-family: '" + t + "'\">" + t + "</span>"
						},
						click: n.context.createInvokeHandlerAndUpdateState("editor.fontName")
					})]).render()
				}), this.context.memo("button.fontsize", function() {
					return n.ui.buttonGroup([n.button({
						className: "dropdown-toggle",
						contents: n.ui.dropdownButtonContents('<span class="note-current-fontsize"/>', n.options),
						tooltip: n.lang.font.size,
						data: {
							toggle: "dropdown"
						}
					}), n.ui.dropdownCheck({
						className: "dropdown-fontsize",
						checkClassName: n.options.icons.menuCheck,
						items: n.options.fontSizes,
						title: n.lang.font.size,
						click: n.context.createInvokeHandlerAndUpdateState("editor.fontSize")
					})]).render()
				}), this.context.memo("button.color", function() {
					return n.colorPalette("note-color-all", n.lang.color.recent, !0, !0)
				}), this.context.memo("button.forecolor", function() {
					return n.colorPalette("note-color-fore", n.lang.color.foreground, !1, !0)
				}), this.context.memo("button.backcolor", function() {
					return n.colorPalette("note-color-back", n.lang.color.background, !0, !1)
				}), this.context.memo("button.ul", function() {
					return n.button({
						contents: n.ui.icon(n.options.icons.unorderedlist),
						tooltip: n.lang.lists.unordered + n.representShortcut("insertUnorderedList"),
						click: n.context.createInvokeHandler("editor.insertUnorderedList")
					}).render()
				}), this.context.memo("button.ol", function() {
					return n.button({
						contents: n.ui.icon(n.options.icons.orderedlist),
						tooltip: n.lang.lists.ordered + n.representShortcut("insertOrderedList"),
						click: n.context.createInvokeHandler("editor.insertOrderedList")
					}).render()
				});
				var r = this.button({
						contents: this.ui.icon(this.options.icons.alignLeft),
						tooltip: this.lang.paragraph.left + this.representShortcut("justifyLeft"),
						click: this.context.createInvokeHandler("editor.justifyLeft")
					}),
					s = this.button({
						contents: this.ui.icon(this.options.icons.alignCenter),
						tooltip: this.lang.paragraph.center + this.representShortcut("justifyCenter"),
						click: this.context.createInvokeHandler("editor.justifyCenter")
					}),
					a = this.button({
						contents: this.ui.icon(this.options.icons.alignRight),
						tooltip: this.lang.paragraph.right + this.representShortcut("justifyRight"),
						click: this.context.createInvokeHandler("editor.justifyRight")
					}),
					l = this.button({
						contents: this.ui.icon(this.options.icons.alignJustify),
						tooltip: this.lang.paragraph.justify + this.representShortcut("justifyFull"),
						click: this.context.createInvokeHandler("editor.justifyFull")
					}),
					c = this.button({
						contents: this.ui.icon(this.options.icons.outdent),
						tooltip: this.lang.paragraph.outdent + this.representShortcut("outdent"),
						click: this.context.createInvokeHandler("editor.outdent")
					}),
					d = this.button({
						contents: this.ui.icon(this.options.icons.indent),
						tooltip: this.lang.paragraph.indent + this.representShortcut("indent"),
						click: this.context.createInvokeHandler("editor.indent")
					});
				this.context.memo("button.justifyLeft", C.invoke(r, "render")), this.context.memo("button.justifyCenter", C.invoke(s, "render")), this.context.memo("button.justifyRight", C.invoke(a, "render")), this.context.memo("button.justifyFull", C.invoke(l, "render")), this.context.memo("button.outdent", C.invoke(c, "render")), this.context.memo("button.indent", C.invoke(d, "render")), this.context.memo("button.paragraph", function() {
					return n.ui.buttonGroup([n.button({
						className: "dropdown-toggle",
						contents: n.ui.dropdownButtonContents(n.ui.icon(n.options.icons.alignLeft), n.options),
						tooltip: n.lang.paragraph.paragraph,
						data: {
							toggle: "dropdown"
						}
					}), n.ui.dropdown([n.ui.buttonGroup({
						className: "note-align",
						children: [r, s, a, l]
					}), n.ui.buttonGroup({
						className: "note-list",
						children: [c, d]
					})])]).render()
				}), this.context.memo("button.height", function() {
					return n.ui.buttonGroup([n.button({
						className: "dropdown-toggle",
						contents: n.ui.dropdownButtonContents(n.ui.icon(n.options.icons.textHeight), n.options),
						tooltip: n.lang.font.height,
						data: {
							toggle: "dropdown"
						}
					}), n.ui.dropdownCheck({
						items: n.options.lineHeights,
						checkClassName: n.options.icons.menuCheck,
						className: "dropdown-line-height",
						title: n.lang.font.height,
						click: n.context.createInvokeHandler("editor.lineHeight")
					})]).render()
				}), this.context.memo("button.table", function() {
					return n.ui.buttonGroup([n.button({
						className: "dropdown-toggle",
						contents: n.ui.dropdownButtonContents(n.ui.icon(n.options.icons.table), n.options),
						tooltip: n.lang.table.table,
						data: {
							toggle: "dropdown"
						}
					}), n.ui.dropdown({
						title: n.lang.table.table,
						className: "note-table",
						items: ['<div class="note-dimension-picker">', '  <div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"/>', '  <div class="note-dimension-picker-highlighted"/>', '  <div class="note-dimension-picker-unhighlighted"/>', "</div>", '<div class="note-dimension-display">1 x 1</div>'].join("")
					})], {
						callback: function(t) {
							t.find(".note-dimension-picker-mousecatcher").css({
								width: n.options.insertTableMaxSize.col + "em",
								height: n.options.insertTableMaxSize.row + "em"
							}).mousedown(n.context.createInvokeHandler("editor.insertTable")).on("mousemove", n.tableMoveHandler.bind(n))
						}
					}).render()
				}), this.context.memo("button.link", function() {
					return n.button({
						contents: n.ui.icon(n.options.icons.link),
						tooltip: n.lang.link.link + n.representShortcut("linkDialog.show"),
						click: n.context.createInvokeHandler("linkDialog.show")
					}).render()
				}), this.context.memo("button.picture", function() {
					return n.button({
						contents: n.ui.icon(n.options.icons.picture),
						tooltip: n.lang.image.image,
						click: n.context.createInvokeHandler("imageDialog.show")
					}).render()
				}), this.context.memo("button.video", function() {
					return n.button({
						contents: n.ui.icon(n.options.icons.video),
						tooltip: n.lang.video.video,
						click: n.context.createInvokeHandler("videoDialog.show")
					}).render()
				}), this.context.memo("button.hr", function() {
					return n.button({
						contents: n.ui.icon(n.options.icons.minus),
						tooltip: n.lang.hr.insert + n.representShortcut("insertHorizontalRule"),
						click: n.context.createInvokeHandler("editor.insertHorizontalRule")
					}).render()
				}), this.context.memo("button.fullscreen", function() {
					return n.button({
						className: "btn-fullscreen",
						contents: n.ui.icon(n.options.icons.arrowsAlt),
						tooltip: n.lang.options.fullscreen,
						click: n.context.createInvokeHandler("fullscreen.toggle")
					}).render()
				}), this.context.memo("button.codeview", function() {
					return n.button({
						className: "btn-codeview",
						contents: n.ui.icon(n.options.icons.code),
						tooltip: n.lang.options.codeview,
						click: n.context.createInvokeHandler("codeview.toggle")
					}).render()
				}), this.context.memo("button.redo", function() {
					return n.button({
						contents: n.ui.icon(n.options.icons.redo),
						tooltip: n.lang.history.redo + n.representShortcut("redo"),
						click: n.context.createInvokeHandler("editor.redo")
					}).render()
				}), this.context.memo("button.undo", function() {
					return n.button({
						contents: n.ui.icon(n.options.icons.undo),
						tooltip: n.lang.history.undo + n.representShortcut("undo"),
						click: n.context.createInvokeHandler("editor.undo")
					}).render()
				}), this.context.memo("button.help", function() {
					return n.button({
						contents: n.ui.icon(n.options.icons.question),
						tooltip: n.lang.options.help,
						click: n.context.createInvokeHandler("helpDialog.show")
					}).render()
				})
			}, t.prototype.addImagePopoverButtons = function() {
				var t = this;
				this.context.memo("button.imageSize100", function() {
					return t.button({
						contents: '<span class="note-fontsize-10">100%</span>',
						tooltip: t.lang.image.resizeFull,
						click: t.context.createInvokeHandler("editor.resize", "1")
					}).render()
				}), this.context.memo("button.imageSize50", function() {
					return t.button({
						contents: '<span class="note-fontsize-10">50%</span>',
						tooltip: t.lang.image.resizeHalf,
						click: t.context.createInvokeHandler("editor.resize", "0.5")
					}).render()
				}), this.context.memo("button.imageSize25", function() {
					return t.button({
						contents: '<span class="note-fontsize-10">25%</span>',
						tooltip: t.lang.image.resizeQuarter,
						click: t.context.createInvokeHandler("editor.resize", "0.25")
					}).render()
				}), this.context.memo("button.floatLeft", function() {
					return t.button({
						contents: t.ui.icon(t.options.icons.alignLeft),
						tooltip: t.lang.image.floatLeft,
						click: t.context.createInvokeHandler("editor.floatMe", "left")
					}).render()
				}), this.context.memo("button.floatRight", function() {
					return t.button({
						contents: t.ui.icon(t.options.icons.alignRight),
						tooltip: t.lang.image.floatRight,
						click: t.context.createInvokeHandler("editor.floatMe", "right")
					}).render()
				}), this.context.memo("button.floatNone", function() {
					return t.button({
						contents: t.ui.icon(t.options.icons.alignJustify),
						tooltip: t.lang.image.floatNone,
						click: t.context.createInvokeHandler("editor.floatMe", "none")
					}).render()
				}), this.context.memo("button.removeMedia", function() {
					return t.button({
						contents: t.ui.icon(t.options.icons.trash),
						tooltip: t.lang.image.remove,
						click: t.context.createInvokeHandler("editor.removeMedia")
					}).render()
				})
			}, t.prototype.addLinkPopoverButtons = function() {
				var t = this;
				this.context.memo("button.linkDialogShow", function() {
					return t.button({
						contents: t.ui.icon(t.options.icons.link),
						tooltip: t.lang.link.edit,
						click: t.context.createInvokeHandler("linkDialog.show")
					}).render()
				}), this.context.memo("button.unlink", function() {
					return t.button({
						contents: t.ui.icon(t.options.icons.unlink),
						tooltip: t.lang.link.unlink,
						click: t.context.createInvokeHandler("editor.unlink")
					}).render()
				})
			}, t.prototype.addTablePopoverButtons = function() {
				var t = this;
				this.context.memo("button.addRowUp", function() {
					return t.button({
						className: "btn-md",
						contents: t.ui.icon(t.options.icons.rowAbove),
						tooltip: t.lang.table.addRowAbove,
						click: t.context.createInvokeHandler("editor.addRow", "top")
					}).render()
				}), this.context.memo("button.addRowDown", function() {
					return t.button({
						className: "btn-md",
						contents: t.ui.icon(t.options.icons.rowBelow),
						tooltip: t.lang.table.addRowBelow,
						click: t.context.createInvokeHandler("editor.addRow", "bottom")
					}).render()
				}), this.context.memo("button.addColLeft", function() {
					return t.button({
						className: "btn-md",
						contents: t.ui.icon(t.options.icons.colBefore),
						tooltip: t.lang.table.addColLeft,
						click: t.context.createInvokeHandler("editor.addCol", "left")
					}).render()
				}), this.context.memo("button.addColRight", function() {
					return t.button({
						className: "btn-md",
						contents: t.ui.icon(t.options.icons.colAfter),
						tooltip: t.lang.table.addColRight,
						click: t.context.createInvokeHandler("editor.addCol", "right")
					}).render()
				}), this.context.memo("button.deleteRow", function() {
					return t.button({
						className: "btn-md",
						contents: t.ui.icon(t.options.icons.rowRemove),
						tooltip: t.lang.table.delRow,
						click: t.context.createInvokeHandler("editor.deleteRow")
					}).render()
				}), this.context.memo("button.deleteCol", function() {
					return t.button({
						className: "btn-md",
						contents: t.ui.icon(t.options.icons.colRemove),
						tooltip: t.lang.table.delCol,
						click: t.context.createInvokeHandler("editor.deleteCol")
					}).render()
				}), this.context.memo("button.deleteTable", function() {
					return t.button({
						className: "btn-md",
						contents: t.ui.icon(t.options.icons.trash),
						tooltip: t.lang.table.delTable,
						click: t.context.createInvokeHandler("editor.deleteTable")
					}).render()
				})
			}, t.prototype.build = function(t, e) {
				for (var o = 0, n = e.length; o < n; o++) {
					for (var i = e[o], r = k.isArray(i) ? i[0] : i, s = k.isArray(i) ? 1 === i.length ? [i[0]] : i[1] : [i], a = this.ui.buttonGroup({
							className: "note-" + r
						}).render(), l = 0, c = s.length; l < c; l++) {
						var d = this.context.memo("button." + s[l]);
						d && a.append("function" == typeof d ? d(this.context) : d)
					}
					a.appendTo(t)
				}
			}, t.prototype.updateCurrentStyle = function(t) {
				var n = this,
					e = t || this.$toolbar,
					o = this.context.invoke("editor.currentStyle");
				if (this.updateBtnStates(e, {
						".note-btn-bold": function() {
							return "bold" === o["font-bold"]
						},
						".note-btn-italic": function() {
							return "italic" === o["font-italic"]
						},
						".note-btn-underline": function() {
							return "underline" === o["font-underline"]
						},
						".note-btn-subscript": function() {
							return "subscript" === o["font-subscript"]
						},
						".note-btn-superscript": function() {
							return "superscript" === o["font-superscript"]
						},
						".note-btn-strikethrough": function() {
							return "strikethrough" === o["font-strikethrough"]
						}
					}), o["font-family"]) {
					var i = o["font-family"].split(",").map(function(t) {
							return t.replace(/[\'\"]/g, "").replace(/\s+$/, "").replace(/^\s+/, "")
						}),
						r = N.find(i, this.isFontInstalled.bind(this));
					e.find(".dropdown-fontname a").each(function(t, e) {
						var o = k(e),
							n = o.data("value") + "" == r + "";
						o.toggleClass("checked", n)
					}), e.find(".note-current-fontname").text(r).css("font-family", r)
				}
				if (o["font-size"]) {
					var s = o["font-size"];
					e.find(".dropdown-fontsize a").each(function(t, e) {
						var o = k(e),
							n = o.data("value") + "" == s + "";
						o.toggleClass("checked", n)
					}), e.find(".note-current-fontsize").text(s)
				}
				if (o["line-height"]) {
					var a = o["line-height"];
					e.find(".dropdown-line-height li a").each(function(t, e) {
						var o = k(e).data("value") + "" == a + "";
						n.className = o ? "checked" : ""
					})
				}
			}, t.prototype.updateBtnStates = function(o, t) {
				var n = this;
				k.each(t, function(t, e) {
					n.ui.toggleBtnActive(o.find(t), e())
				})
			}, t.prototype.tableMoveHandler = function(t) {
				var e, o = k(t.target.parentNode),
					n = o.next(),
					i = o.find(".note-dimension-picker-mousecatcher"),
					r = o.find(".note-dimension-picker-highlighted"),
					s = o.find(".note-dimension-picker-unhighlighted");
				if (void 0 === t.offsetX) {
					var a = k(t.target).offset();
					e = {
						x: t.pageX - a.left,
						y: t.pageY - a.top
					}
				} else e = {
					x: t.offsetX,
					y: t.offsetY
				};
				var l = Math.ceil(e.x / 18) || 1,
					c = Math.ceil(e.y / 18) || 1;
				r.css({
					width: l + "em",
					height: c + "em"
				}), i.data("value", l + "x" + c), 3 < l && l < this.options.insertTableMaxSize.col && s.css({
					width: l + 1 + "em"
				}), 3 < c && c < this.options.insertTableMaxSize.row && s.css({
					height: c + 1 + "em"
				}), n.html(l + " x " + c)
			}, t
		}(),
		te = function() {
			function t(t) {
				this.context = t, this.$window = k(window), this.$document = k(document), this.ui = k.summernote.ui, this.$note = t.layoutInfo.note, this.$editor = t.layoutInfo.editor, this.$toolbar = t.layoutInfo.toolbar, this.options = t.options, this.followScroll = this.followScroll.bind(this)
			}
			return t.prototype.shouldInitialize = function() {
				return !this.options.airMode
			}, t.prototype.initialize = function() {
				var t = this;
				this.options.toolbar = this.options.toolbar || [], this.options.toolbar.length ? this.context.invoke("buttons.build", this.$toolbar, this.options.toolbar) : this.$toolbar.hide(), this.options.toolbarContainer && this.$toolbar.appendTo(this.options.toolbarContainer), this.changeContainer(!1), this.$note.on("summernote.keyup summernote.mouseup summernote.change", function() {
					t.context.invoke("buttons.updateCurrentStyle")
				}), this.context.invoke("buttons.updateCurrentStyle"), this.options.followingToolbar && this.$window.on("scroll resize", this.followScroll)
			}, t.prototype.destroy = function() {
				this.$toolbar.children().remove(), this.options.followingToolbar && this.$window.off("scroll resize", this.followScroll)
			}, t.prototype.followScroll = function() {
				if (this.$editor.hasClass("fullscreen")) return !1;
				var t = this.$toolbar.parent(".note-toolbar-wrapper"),
					e = this.$editor.outerHeight(),
					o = this.$editor.width(),
					n = this.$toolbar.height();
				t.css({
					height: n
				});
				var i = 0;
				this.options.otherStaticBar && (i = k(this.options.otherStaticBar).outerHeight());
				var r = this.$document.scrollTop(),
					s = this.$editor.offset().top;
				s - i < r && r < s + e - i - n ? this.$toolbar.css({
					position: "fixed",
					top: i,
					width: o
				}) : this.$toolbar.css({
					position: "relative",
					top: 0,
					width: "100%"
				})
			}, t.prototype.changeContainer = function(t) {
				t ? this.$toolbar.prependTo(this.$editor) : this.options.toolbarContainer && this.$toolbar.appendTo(this.options.toolbarContainer)
			}, t.prototype.updateFullscreen = function(t) {
				this.ui.toggleBtnActive(this.$toolbar.find(".btn-fullscreen"), t), this.changeContainer(t)
			}, t.prototype.updateCodeview = function(t) {
				this.ui.toggleBtnActive(this.$toolbar.find(".btn-codeview"), t), t ? this.deactivate() : this.activate()
			}, t.prototype.activate = function(t) {
				var e = this.$toolbar.find("button");
				t || (e = e.not(".btn-codeview")), this.ui.toggleBtn(e, !0)
			}, t.prototype.deactivate = function(t) {
				var e = this.$toolbar.find("button");
				t || (e = e.not(".btn-codeview")), this.ui.toggleBtn(e, !1)
			}, t
		}(),
		ee = function() {
			function t(t) {
				this.context = t, this.ui = k.summernote.ui, this.$body = k(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo, t.memo("help.linkDialog.show", this.options.langInfo.help["linkDialog.show"])
			}
			return t.prototype.initialize = function() {
				var t = this.options.dialogsInBody ? this.$body : this.$editor,
					e = ['<div class="form-group note-form-group">', '<label class="note-form-label">' + this.lang.link.textToDisplay + "</label>", '<input class="note-link-text form-control note-form-control note-input" type="text" />', "</div>", '<div class="form-group note-form-group">', '<label class="note-form-label">' + this.lang.link.url + "</label>", '<input class="note-link-url form-control note-form-control note-input" type="text" value="http://" />', "</div>", this.options.disableLinkTarget ? "" : k("<div/>").append(this.ui.checkbox({
						className: "sn-checkbox-open-in-new-window",
						text: this.lang.link.openInNewWindow,
						checked: !0
					}).render()).html()].join(""),
					o = '<input type="button" href="#" class="btn btn-primary note-btn note-btn-primary note-link-btn" value="' + this.lang.link.insert + '" disabled>';
				this.$dialog = this.ui.dialog({
					className: "link-dialog",
					title: this.lang.link.insert,
					fade: this.options.dialogsFade,
					body: e,
					footer: o
				}).render().appendTo(t)
			}, t.prototype.destroy = function() {
				this.ui.hideDialog(this.$dialog), this.$dialog.remove()
			}, t.prototype.bindEnterKey = function(t, e) {
				t.on("keypress", function(t) {
					t.keyCode === Lt.code.ENTER && (t.preventDefault(), e.trigger("click"))
				})
			}, t.prototype.toggleLinkBtn = function(t, e, o) {
				this.ui.toggleBtn(t, e.val() && o.val())
			}, t.prototype.showLinkDialog = function(l) {
				var c = this;
				return k.Deferred(function(n) {
					var i = c.$dialog.find(".note-link-text"),
						r = c.$dialog.find(".note-link-url"),
						s = c.$dialog.find(".note-link-btn"),
						a = c.$dialog.find(".sn-checkbox-open-in-new-window input[type=checkbox]");
					c.ui.onDialogShown(c.$dialog, function() {
						c.context.triggerEvent("dialog.shown"), l.url || (l.url = l.text), i.val(l.text);
						var t = function() {
							c.toggleLinkBtn(s, i, r), l.text = i.val()
						};
						i.on("input", t).on("paste", function() {
							setTimeout(t, 0)
						});
						var e = function() {
							c.toggleLinkBtn(s, i, r), l.text || i.val(r.val())
						};
						r.on("input", e).on("paste", function() {
							setTimeout(e, 0)
						}).val(l.url), z.isSupportTouch || r.trigger("focus"), c.toggleLinkBtn(s, i, r), c.bindEnterKey(r, s), c.bindEnterKey(i, s);
						var o = void 0 !== l.isNewWindow ? l.isNewWindow : c.context.options.linkTargetBlank;
						a.prop("checked", o), s.one("click", function(t) {
							t.preventDefault(), n.resolve({
								range: l.range,
								url: r.val(),
								text: i.val(),
								isNewWindow: a.is(":checked")
							}), c.ui.hideDialog(c.$dialog)
						})
					}), c.ui.onDialogHidden(c.$dialog, function() {
						i.off("input paste keypress"), r.off("input paste keypress"), s.off("click"), "pending" === n.state() && n.reject()
					}), c.ui.showDialog(c.$dialog)
				}).promise()
			}, t.prototype.show = function() {
				var e = this,
					t = this.context.invoke("editor.getLinkInfo");
				this.context.invoke("editor.saveRange"), this.showLinkDialog(t).then(function(t) {
					e.context.invoke("editor.restoreRange"), e.context.invoke("editor.createLink", t)
				}).fail(function() {
					e.context.invoke("editor.restoreRange")
				})
			}, t
		}(),
		oe = function() {
			function t(t) {
				var e = this;
				this.context = t, this.ui = k.summernote.ui, this.options = t.options, this.events = {
					"summernote.keyup summernote.mouseup summernote.change summernote.scroll": function() {
						e.update()
					},
					"summernote.disable summernote.dialog.shown": function() {
						e.hide()
					}
				}
			}
			return t.prototype.shouldInitialize = function() {
				return !N.isEmpty(this.options.popover.link)
			}, t.prototype.initialize = function() {
				this.$popover = this.ui.popover({
					className: "note-link-popover",
					callback: function(t) {
						t.find(".popover-content,.note-popover-content").prepend('<span><a target="_blank"></a>&nbsp;</span>')
					}
				}).render().appendTo(this.options.container);
				var t = this.$popover.find(".popover-content,.note-popover-content");
				this.context.invoke("buttons.build", t, this.options.popover.link)
			}, t.prototype.destroy = function() {
				this.$popover.remove()
			}, t.prototype.update = function() {
				if (this.context.invoke("editor.hasFocus")) {
					var t = this.context.invoke("editor.createRange");
					if (t.isCollapsed() && t.isOnAnchor()) {
						var e = Nt.ancestor(t.sc, Nt.isAnchor),
							o = k(e).attr("href");
						this.$popover.find("a").attr("href", o).html(o);
						var n = Nt.posFromPlaceholder(e);
						this.$popover.css({
							display: "block",
							left: n.left,
							top: n.top
						})
					} else this.hide()
				} else this.hide()
			}, t.prototype.hide = function() {
				this.$popover.hide()
			}, t
		}(),
		ne = function() {
			function t(t) {
				this.context = t, this.ui = k.summernote.ui, this.$body = k(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo
			}
			return t.prototype.initialize = function() {
				var t = this.options.dialogsInBody ? this.$body : this.$editor,
					e = "";
				if (this.options.maximumImageFileSize) {
					var o = Math.floor(Math.log(this.options.maximumImageFileSize) / Math.log(1024)),
						n = 1 * (this.options.maximumImageFileSize / Math.pow(1024, o)).toFixed(2) + " " + " KMGTP" [o] + "B";
					e = "<small>" + this.lang.image.maximumFileSize + " : " + n + "</small>"
				}
				var i = ['<div class="form-group note-form-group note-group-select-from-files">', '<label class="note-form-label">' + this.lang.image.selectFromFiles + "</label>", '<input class="note-image-input note-form-control note-input" ', ' type="file" name="files" accept="image/*" multiple="multiple" />', e, "</div>", '<div class="form-group note-group-image-url" style="overflow:auto;">', '<label class="note-form-label">' + this.lang.image.url + "</label>", '<input class="note-image-url form-control note-form-control note-input ', ' col-md-12" type="text" />', "</div>"].join(""),
					r = '<input type="button" href="#" class="btn btn-primary note-btn note-btn-primary note-image-btn" value="' + this.lang.image.insert + '" disabled>';
				this.$dialog = this.ui.dialog({
					title: this.lang.image.insert,
					fade: this.options.dialogsFade,
					body: i,
					footer: r
				}).render().appendTo(t)
			}, t.prototype.destroy = function() {
				this.ui.hideDialog(this.$dialog), this.$dialog.remove()
			}, t.prototype.bindEnterKey = function(t, e) {
				t.on("keypress", function(t) {
					t.keyCode === Lt.code.ENTER && (t.preventDefault(), e.trigger("click"))
				})
			}, t.prototype.show = function() {
				var e = this;
				this.context.invoke("editor.saveRange"), this.showImageDialog().then(function(t) {
					e.ui.hideDialog(e.$dialog), e.context.invoke("editor.restoreRange"), "string" == typeof t ? e.options.callbacks.onImageLinkInsert ? e.context.triggerEvent("image.link.insert", t) : e.context.invoke("editor.insertImage", t) : e.options.callbacks.onImageUpload ? e.context.triggerEvent("image.upload", t) : e.context.invoke("editor.insertImagesAsDataURL", t)
				}).fail(function() {
					e.context.invoke("editor.restoreRange")
				})
			}, t.prototype.showImageDialog = function() {
				var i = this;
				return k.Deferred(function(e) {
					var t = i.$dialog.find(".note-image-input"),
						o = i.$dialog.find(".note-image-url"),
						n = i.$dialog.find(".note-image-btn");
					i.ui.onDialogShown(i.$dialog, function() {
						i.context.triggerEvent("dialog.shown"), t.replaceWith(t.clone().on("change", function(t) {
							e.resolve(t.target.files || t.target.value)
						}).val("")), n.click(function(t) {
							t.preventDefault(), e.resolve(o.val())
						}), o.on("keyup paste", function() {
							var t = o.val();
							i.ui.toggleBtn(n, t)
						}).val(""), z.isSupportTouch || o.trigger("focus"), i.bindEnterKey(o, n)
					}), i.ui.onDialogHidden(i.$dialog, function() {
						t.off("change"), o.off("keyup paste keypress"), n.off("click"), "pending" === e.state() && e.reject()
					}), i.ui.showDialog(i.$dialog)
				})
			}, t
		}(),
		ie = function() {
			function t(t) {
				var e = this;
				this.context = t, this.ui = k.summernote.ui, this.editable = t.layoutInfo.editable[0], this.options = t.options, this.events = {
					"summernote.disable": function() {
						e.hide()
					}
				}
			}
			return t.prototype.shouldInitialize = function() {
				return !N.isEmpty(this.options.popover.image)
			}, t.prototype.initialize = function() {
				this.$popover = this.ui.popover({
					className: "note-image-popover"
				}).render().appendTo(this.options.container);
				var t = this.$popover.find(".popover-content,.note-popover-content");
				this.context.invoke("buttons.build", t, this.options.popover.image)
			}, t.prototype.destroy = function() {
				this.$popover.remove()
			}, t.prototype.update = function(t) {
				if (Nt.isImg(t)) {
					var e = Nt.posFromPlaceholder(t),
						o = Nt.posFromPlaceholder(this.editable);
					this.$popover.css({
						display: "block",
						left: this.options.popatmouse ? event.pageX - 20 : e.left,
						top: this.options.popatmouse ? event.pageY : Math.min(e.top, o.top)
					})
				} else this.hide()
			}, t.prototype.hide = function() {
				this.$popover.hide()
			}, t
		}(),
		re = function() {
			function t(t) {
				var o = this;
				this.context = t, this.ui = k.summernote.ui, this.options = t.options, this.events = {
					"summernote.mousedown": function(t, e) {
						o.update(e.target)
					},
					"summernote.keyup summernote.scroll summernote.change": function() {
						o.update()
					},
					"summernote.disable": function() {
						o.hide()
					}
				}
			}
			return t.prototype.shouldInitialize = function() {
				return !N.isEmpty(this.options.popover.table)
			}, t.prototype.initialize = function() {
				this.$popover = this.ui.popover({
					className: "note-table-popover"
				}).render().appendTo(this.options.container);
				var t = this.$popover.find(".popover-content,.note-popover-content");
				this.context.invoke("buttons.build", t, this.options.popover.table), z.isFF && document.execCommand("enableInlineTableEditing", !1, !1)
			}, t.prototype.destroy = function() {
				this.$popover.remove()
			}, t.prototype.update = function(t) {
				if (this.context.isDisabled()) return !1;
				var e = Nt.isCell(t);
				if (e) {
					var o = Nt.posFromPlaceholder(t);
					this.$popover.css({
						display: "block",
						left: o.left,
						top: o.top
					})
				} else this.hide();
				return e
			}, t.prototype.hide = function() {
				this.$popover.hide()
			}, t
		}(),
		se = function() {
			function t(t) {
				this.context = t, this.ui = k.summernote.ui, this.$body = k(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo
			}
			return t.prototype.initialize = function() {
				var t = this.options.dialogsInBody ? this.$body : this.$editor,
					e = ['<div class="form-group note-form-group row-fluid">', '<label class="note-form-label">' + this.lang.video.url + ' <small class="text-muted">' + this.lang.video.providers + "</small></label>", '<input class="note-video-url form-control note-form-control note-input" type="text" />', "</div>"].join(""),
					o = '<input type="button" href="#" class="btn btn-primary note-btn note-btn-primary note-video-btn" value="' + this.lang.video.insert + '" disabled>';
				this.$dialog = this.ui.dialog({
					title: this.lang.video.insert,
					fade: this.options.dialogsFade,
					body: e,
					footer: o
				}).render().appendTo(t)
			}, t.prototype.destroy = function() {
				this.ui.hideDialog(this.$dialog), this.$dialog.remove()
			}, t.prototype.bindEnterKey = function(t, e) {
				t.on("keypress", function(t) {
					t.keyCode === Lt.code.ENTER && (t.preventDefault(), e.trigger("click"))
				})
			}, t.prototype.createVideoNode = function(t) {
				var e, o = t.match(/\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?$/),
					n = t.match(/(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/),
					i = t.match(/\/\/vine\.co\/v\/([a-zA-Z0-9]+)/),
					r = t.match(/\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/),
					s = t.match(/.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/),
					a = t.match(/\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/),
					l = t.match(/\/\/v\.qq\.com.*?vid=(.+)/),
					c = t.match(/\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/),
					d = t.match(/^.+.(mp4|m4v)$/),
					u = t.match(/^.+.(ogg|ogv)$/),
					h = t.match(/^.+.(webm)$/);
				if (o && 11 === o[1].length) {
					var p = o[1],
						f = 0;
					if (void 0 !== o[2]) {
						var m = o[2].match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
						if (m)
							for (var g = [3600, 60, 1], v = 0, b = g.length; v < b; v++) f += void 0 !== m[v + 1] ? g[v] * parseInt(m[v + 1], 10) : 0
					}
					e = k("<iframe>").attr("frameborder", 0).attr("src", "//www.youtube.com/embed/" + p + (0 < f ? "?start=" + f : "")).attr("width", "640").attr("height", "360")
				} else if (n && n[0].length) e = k("<iframe>").attr("frameborder", 0).attr("src", "https://instagram.com/p/" + n[1] + "/embed/").attr("width", "612").attr("height", "710").attr("scrolling", "no").attr("allowtransparency", "true");
				else if (i && i[0].length) e = k("<iframe>").attr("frameborder", 0).attr("src", i[0] + "/embed/simple").attr("width", "600").attr("height", "600").attr("class", "vine-embed");
				else if (r && r[3].length) e = k("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("src", "//player.vimeo.com/video/" + r[3]).attr("width", "640").attr("height", "360");
				else if (s && s[2].length) e = k("<iframe>").attr("frameborder", 0).attr("src", "//www.dailymotion.com/embed/video/" + s[2]).attr("width", "640").attr("height", "360");
				else if (a && a[1].length) e = k("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("height", "498").attr("width", "510").attr("src", "//player.youku.com/embed/" + a[1]);
				else if (l && l[1].length || c && c[2].length) {
					var y = l && l[1].length ? l[1] : c[2];
					e = k("<iframe webkitallowfullscreen mozallowfullscreen allowfullscreen>").attr("frameborder", 0).attr("height", "310").attr("width", "500").attr("src", "http://v.qq.com/iframe/player.html?vid=" + y + "&amp;auto=0")
				} else {
					if (!(d || u || h)) return !1;
					e = k("<video controls>").attr("src", t).attr("width", "640").attr("height", "360")
				}
				return e.addClass("note-video-clip"), e[0]
			}, t.prototype.show = function() {
				var o = this,
					t = this.context.invoke("editor.getSelectedText");
				this.context.invoke("editor.saveRange"), this.showVideoDialog(t).then(function(t) {
					o.ui.hideDialog(o.$dialog), o.context.invoke("editor.restoreRange");
					var e = o.createVideoNode(t);
					e && o.context.invoke("editor.insertNode", e)
				}).fail(function() {
					o.context.invoke("editor.restoreRange")
				})
			}, t.prototype.showVideoDialog = function(n) {
				var i = this;
				return k.Deferred(function(e) {
					var o = i.$dialog.find(".note-video-url"),
						t = i.$dialog.find(".note-video-btn");
					i.ui.onDialogShown(i.$dialog, function() {
						i.context.triggerEvent("dialog.shown"), o.val(n).on("input", function() {
							i.ui.toggleBtn(t, o.val())
						}), z.isSupportTouch || o.trigger("focus"), t.click(function(t) {
							t.preventDefault(), e.resolve(o.val())
						}), i.bindEnterKey(o, t)
					}), i.ui.onDialogHidden(i.$dialog, function() {
						o.off("input"), t.off("click"), "pending" === e.state() && e.reject()
					}), i.ui.showDialog(i.$dialog)
				})
			}, t
		}(),
		ae = function() {
			function t(t) {
				this.context = t, this.ui = k.summernote.ui, this.$body = k(document.body), this.$editor = t.layoutInfo.editor, this.options = t.options, this.lang = this.options.langInfo
			}
			return t.prototype.initialize = function() {
				var t = this.options.dialogsInBody ? this.$body : this.$editor,
					e = ['<p class="text-center">', '<a href="http://summernote.org/" target="_blank">Summernote 0.8.11</a> · ', '<a href="https://github.com/summernote/summernote" target="_blank">Project</a> · ', '<a href="https://github.com/summernote/summernote/issues" target="_blank">Issues</a>', "</p>"].join("");
				this.$dialog = this.ui.dialog({
					title: this.lang.options.help,
					fade: this.options.dialogsFade,
					body: this.createShortcutList(),
					footer: e,
					callback: function(t) {
						t.find(".modal-body,.note-modal-body").css({
							"max-height": 300,
							overflow: "scroll"
						})
					}
				}).render().appendTo(t)
			}, t.prototype.destroy = function() {
				this.ui.hideDialog(this.$dialog), this.$dialog.remove()
			}, t.prototype.createShortcutList = function() {
				var n = this,
					i = this.options.keyMap[z.isMac ? "mac" : "pc"];
				return Object.keys(i).map(function(t) {
					var e = i[t],
						o = k('<div><div class="help-list-item"/></div>');
					return o.append(k("<label><kbd>" + t + "</kdb></label>").css({
						width: 180,
						"margin-right": 10
					})).append(k("<span/>").html(n.context.memo("help." + e) || e)), o.html()
				}).join("")
			}, t.prototype.showHelpDialog = function() {
				var e = this;
				return k.Deferred(function(t) {
					e.ui.onDialogShown(e.$dialog, function() {
						e.context.triggerEvent("dialog.shown"), t.resolve()
					}), e.ui.showDialog(e.$dialog)
				}).promise()
			}, t.prototype.show = function() {
				var t = this;
				this.context.invoke("editor.saveRange"), this.showHelpDialog().then(function() {
					t.context.invoke("editor.restoreRange")
				})
			}, t
		}(),
		le = function() {
			function t(t) {
				var o = this;
				this.context = t, this.ui = k.summernote.ui, this.options = t.options, this.events = {
					"summernote.keyup summernote.mouseup summernote.scroll": function() {
						o.update()
					},
					"summernote.disable summernote.change summernote.dialog.shown": function() {
						o.hide()
					},
					"summernote.focusout": function(t, e) {
						z.isFF || e.relatedTarget && Nt.ancestor(e.relatedTarget, C.eq(o.$popover[0])) || o.hide()
					}
				}
			}
			return t.prototype.shouldInitialize = function() {
				return this.options.airMode && !N.isEmpty(this.options.popover.air)
			}, t.prototype.initialize = function() {
				this.$popover = this.ui.popover({
					className: "note-air-popover"
				}).render().appendTo(this.options.container);
				var t = this.$popover.find(".popover-content");
				this.context.invoke("buttons.build", t, this.options.popover.air)
			}, t.prototype.destroy = function() {
				this.$popover.remove()
			}, t.prototype.update = function() {
				var t = this.context.invoke("editor.currentStyle");
				if (t.range && !t.range.isCollapsed()) {
					var e = N.last(t.range.getClientRects());
					if (e) {
						var o = C.rect2bnd(e);
						this.$popover.css({
							display: "block",
							left: Math.max(o.left + o.width / 2, 0) - 20,
							top: o.top + o.height
						}), this.context.invoke("buttons.updateCurrentStyle", this.$popover)
					}
				} else this.hide()
			}, t.prototype.hide = function() {
				this.$popover.hide()
			}, t
		}(),
		ce = function() {
			function t(t) {
				var o = this;
				this.context = t, this.ui = k.summernote.ui, this.$editable = t.layoutInfo.editable, this.options = t.options, this.hint = this.options.hint || [], this.direction = this.options.hintDirection || "bottom", this.hints = k.isArray(this.hint) ? this.hint : [this.hint], this.events = {
					"summernote.keyup": function(t, e) {
						e.isDefaultPrevented() || o.handleKeyup(e)
					},
					"summernote.keydown": function(t, e) {
						o.handleKeydown(e)
					},
					"summernote.disable summernote.dialog.shown": function() {
						o.hide()
					}
				}
			}
			return t.prototype.shouldInitialize = function() {
				return 0 < this.hints.length
			}, t.prototype.initialize = function() {
				var e = this;
				this.lastWordRange = null, this.$popover = this.ui.popover({
					className: "note-hint-popover",
					hideArrow: !0,
					direction: ""
				}).render().appendTo(this.options.container), this.$popover.hide(), this.$content = this.$popover.find(".popover-content,.note-popover-content"), this.$content.on("click", ".note-hint-item", function(t) {
					e.$content.find(".active").removeClass("active"), k(t.currentTarget).addClass("active"), e.replace()
				})
			}, t.prototype.destroy = function() {
				this.$popover.remove()
			}, t.prototype.selectItem = function(t) {
				this.$content.find(".active").removeClass("active"), t.addClass("active"), this.$content[0].scrollTop = t[0].offsetTop - this.$content.innerHeight() / 2
			}, t.prototype.moveDown = function() {
				var t = this.$content.find(".note-hint-item.active"),
					e = t.next();
				if (e.length) this.selectItem(e);
				else {
					var o = t.parent().next();
					o.length || (o = this.$content.find(".note-hint-group").first()), this.selectItem(o.find(".note-hint-item").first())
				}
			}, t.prototype.moveUp = function() {
				var t = this.$content.find(".note-hint-item.active"),
					e = t.prev();
				if (e.length) this.selectItem(e);
				else {
					var o = t.parent().prev();
					o.length || (o = this.$content.find(".note-hint-group").last()), this.selectItem(o.find(".note-hint-item").last())
				}
			}, t.prototype.replace = function() {
				var t = this.$content.find(".note-hint-item.active");
				if (t.length) {
					var e = this.nodeFromItem(t);
					this.lastWordRange.insertNode(e), Ft.createFromNode(e).collapse().select(), this.lastWordRange = null, this.hide(), this.context.triggerEvent("change", this.$editable.html(), this.$editable[0]), this.context.invoke("editor.focus")
				}
			}, t.prototype.nodeFromItem = function(t) {
				var e = this.hints[t.data("index")],
					o = t.data("item"),
					n = e.content ? e.content(o) : o;
				return "string" == typeof n && (n = Nt.createText(n)), n
			}, t.prototype.createItemTemplates = function(n, t) {
				var i = this.hints[n];
				return t.map(function(t, e) {
					var o = k('<div class="note-hint-item"/>');
					return o.append(i.template ? i.template(t) : t + ""), o.data({
						index: n,
						item: t
					}), o
				})
			}, t.prototype.handleKeydown = function(t) {
				this.$popover.is(":visible") && (t.keyCode === Lt.code.ENTER ? (t.preventDefault(), this.replace()) : t.keyCode === Lt.code.UP ? (t.preventDefault(), this.moveUp()) : t.keyCode === Lt.code.DOWN && (t.preventDefault(), this.moveDown()))
			}, t.prototype.searchKeyword = function(t, e, o) {
				var n = this.hints[t];
				if (n && n.match.test(e) && n.search) {
					var i = n.match.exec(e);
					n.search(i[1], o)
				} else o()
			}, t.prototype.createGroup = function(e, t) {
				var o = this,
					n = k('<div class="note-hint-group note-hint-group-' + e + '"/>');
				return this.searchKeyword(e, t, function(t) {
					(t = t || []).length && (n.html(o.createItemTemplates(e, t)), o.show())
				}), n
			}, t.prototype.handleKeyup = function(t) {
				var o = this;
				if (!N.contains([Lt.code.ENTER, Lt.code.UP, Lt.code.DOWN], t.keyCode)) {
					var e = this.context.invoke("editor.createRange").getWordRange(),
						n = e.toString();
					if (this.hints.length && n) {
						this.$content.empty();
						var i = C.rect2bnd(N.last(e.getClientRects()));
						i && (this.$popover.hide(), this.lastWordRange = e, this.hints.forEach(function(t, e) {
							t.match.test(n) && o.createGroup(e, n).appendTo(o.$content)
						}), this.$content.find(".note-hint-item:first").addClass("active"), "top" === this.direction ? this.$popover.css({
							left: i.left,
							top: i.top - this.$popover.outerHeight() - 5
						}) : this.$popover.css({
							left: i.left,
							top: i.top + i.height + 5
						}))
					} else this.hide()
				}
			}, t.prototype.show = function() {
				this.$popover.show()
			}, t.prototype.hide = function() {
				this.$popover.hide()
			}, t
		}(),
		de = function() {
			function t(t, e) {
				this.ui = k.summernote.ui, this.$note = t, this.memos = {}, this.modules = {}, this.layoutInfo = {}, this.options = e, this.initialize()
			}
			return t.prototype.initialize = function() {
				return this.layoutInfo = this.ui.createLayout(this.$note, this.options), this._initialize(), this.$note.hide(), this
			}, t.prototype.destroy = function() {
				this._destroy(), this.$note.removeData("summernote"), this.ui.removeLayout(this.$note, this.layoutInfo)
			}, t.prototype.reset = function() {
				var t = this.isDisabled();
				this.code(Nt.emptyPara), this._destroy(), this._initialize(), t && this.disable()
			}, t.prototype._initialize = function() {
				var e = this,
					o = k.extend({}, this.options.buttons);
				Object.keys(o).forEach(function(t) {
					e.memo("button." + t, o[t])
				});
				var n = k.extend({}, this.options.modules, k.summernote.plugins || {});
				Object.keys(n).forEach(function(t) {
					e.module(t, n[t], !0)
				}), Object.keys(this.modules).forEach(function(t) {
					e.initializeModule(t)
				})
			}, t.prototype._destroy = function() {
				var e = this;
				Object.keys(this.modules).reverse().forEach(function(t) {
					e.removeModule(t)
				}), Object.keys(this.memos).forEach(function(t) {
					e.removeMemo(t)
				}), this.triggerEvent("destroy", this)
			}, t.prototype.code = function(t) {
				var e = this.invoke("codeview.isActivated");
				if (void 0 === t) return this.invoke("codeview.sync"), e ? this.layoutInfo.codable.val() : this.layoutInfo.editable.html();
				e ? this.layoutInfo.codable.val(t) : this.layoutInfo.editable.html(t), this.$note.val(t), this.triggerEvent("change", t)
			}, t.prototype.isDisabled = function() {
				return "false" === this.layoutInfo.editable.attr("contenteditable")
			}, t.prototype.enable = function() {
				this.layoutInfo.editable.attr("contenteditable", !0), this.invoke("toolbar.activate", !0), this.triggerEvent("disable", !1)
			}, t.prototype.disable = function() {
				this.invoke("codeview.isActivated") && this.invoke("codeview.deactivate"), this.layoutInfo.editable.attr("contenteditable", !1), this.invoke("toolbar.deactivate", !0), this.triggerEvent("disable", !0)
			}, t.prototype.triggerEvent = function() {
				var t = N.head(arguments),
					e = N.tail(N.from(arguments)),
					o = this.options.callbacks[C.namespaceToCamel(t, "on")];
				o && o.apply(this.$note[0], e), this.$note.trigger("summernote." + t, e)
			}, t.prototype.initializeModule = function(t) {
				var e = this.modules[t];
				e.shouldInitialize = e.shouldInitialize || C.ok, e.shouldInitialize() && (e.initialize && e.initialize(), e.events && Nt.attachEvents(this.$note, e.events))
			}, t.prototype.module = function(t, e, o) {
				if (1 === arguments.length) return this.modules[t];
				this.modules[t] = new e(this), o || this.initializeModule(t)
			}, t.prototype.removeModule = function(t) {
				var e = this.modules[t];
				e.shouldInitialize() && (e.events && Nt.detachEvents(this.$note, e.events), e.destroy && e.destroy()), delete this.modules[t]
			}, t.prototype.memo = function(t, e) {
				if (1 === arguments.length) return this.memos[t];
				this.memos[t] = e
			}, t.prototype.removeMemo = function(t) {
				this.memos[t] && this.memos[t].destroy && this.memos[t].destroy(), delete this.memos[t]
			}, t.prototype.createInvokeHandlerAndUpdateState = function(e, o) {
				var n = this;
				return function(t) {
					n.createInvokeHandler(e, o)(t), n.invoke("buttons.updateCurrentStyle")
				}
			}, t.prototype.createInvokeHandler = function(o, n) {
				var i = this;
				return function(t) {
					t.preventDefault();
					var e = k(t.target);
					i.invoke(o, n || e.closest("[data-value]").data("value"), e)
				}
			}, t.prototype.invoke = function() {
				var t = N.head(arguments),
					e = N.tail(N.from(arguments)),
					o = t.split("."),
					n = 1 < o.length,
					i = n && N.head(o),
					r = n ? N.last(o) : N.head(o),
					s = this.modules[i || "editor"];
				return !i && this[r] ? this[r].apply(this, e) : s && s[r] && s.shouldInitialize() ? s[r].apply(s, e) : void 0
			}, t
		}();
	k.fn.extend({
		summernote: function() {
			var t = k.type(N.head(arguments)),
				e = "string" === t,
				o = "object" === t,
				i = k.extend({}, k.summernote.options, o ? N.head(arguments) : {});
			i.langInfo = k.extend(!0, {}, k.summernote.lang["en-US"], k.summernote.lang[i.lang]), i.icons = k.extend(!0, {}, k.summernote.options.icons, i.icons), i.tooltip = "auto" === i.tooltip ? !z.isSupportTouch : i.tooltip, this.each(function(t, e) {
				var o = k(e);
				if (!o.data("summernote")) {
					var n = new de(o, i);
					o.data("summernote", n), o.data("summernote").triggerEvent("init", n.layoutInfo)
				}
			});
			var n = this.first();
			if (n.length) {
				var r = n.data("summernote");
				if (e) return r.invoke.apply(r, N.from(arguments));
				i.focus && r.invoke("editor.focus")
			}
			return this
		}
	}), k.summernote = k.extend(k.summernote, {
		version: "0.8.11",
		ui: b,
		dom: Nt,
		range: Ft,
		plugins: {},
		options: {
			modules: {
				editor: jt,
				clipboard: qt,
				dropzone: Kt,
				codeview: Vt,
				statusbar: Wt,
				fullscreen: _t,
				handle: Gt,
				hintPopover: ce,
				autoLink: Yt,
				autoSync: Qt,
				placeholder: Jt,
				buttons: Xt,
				toolbar: te,
				linkDialog: ee,
				linkPopover: oe,
				imageDialog: ne,
				imagePopover: ie,
				tablePopover: re,
				videoDialog: se,
				helpDialog: ae,
				airPopover: le
			},
			buttons: {},
			lang: "en-US",
			followingToolbar: !0,
			otherStaticBar: "",
			toolbar: [
				["style", ["style"]],
				["font", ["bold", "underline", "clear"]],
				["fontname", ["fontname"]],
				["color", ["color"]],
				["para", ["ul", "ol", "paragraph"]],
				["table", ["table"]],
				["insert", [/* "link", */ "picture"/* , "video" */]],
				["view", ["fullscreen"/* , "codeview", "help" */]]
			],
			popatmouse: !0,
			popover: {
				image: [
					["imagesize", ["imageSize100", "imageSize50", "imageSize25"]],
					["float", ["floatLeft", "floatRight", "floatNone"]],
					["remove", ["removeMedia"]]
				],
				link: [
					["link", ["linkDialogShow", "unlink"]]
				],
				table: [
					["add", ["addRowDown", "addRowUp", "addColLeft", "addColRight"]],
					["delete", ["deleteRow", "deleteCol", "deleteTable"]]
				],
				air: [
					["color", ["color"]],
					["font", ["bold", "underline", "clear"]],
					["para", ["ul", "paragraph"]],
					["table", ["table"]],
					["insert", ["link", "picture"]]
				]
			},
			airMode: !1,
			width: null,
			height: null,
			linkTargetBlank: !0,
			focus: !1,
			tabSize: 4,
			styleWithSpan: !0,
			shortcuts: !0,
			textareaAutoSync: !0,
			hintDirection: "bottom",
			tooltip: "auto",
			container: "body",
			maxTextLength: 0,
			styleTags: ["p", {
				title: "Cita",
				tag: "blockquote",
				className: "blockquote",
				value: "blockquote"
			}, "h1", "h2", "h3", "h4", "h5", "h6"],
			fontNames: ["Arial", "Arial Black", "Comic Sans MS", "Courier New", "Helvetica Neue", "Helvetica", "Impact", "Lucida Grande", "Tahoma", "Times New Roman", "Verdana"],
			fontSizes: ["8", "9", "10", "11", "12", "14", "18", "24", "36"],
			colors: [
				["#000000", "#424242", "#636363", "#9C9C94", "#CEC6CE", "#EFEFEF", "#F7F7F7", "#FFFFFF"],
				["#FF0000", "#FF9C00", "#000", "#00FF00", "#00FFFF", "#0000FF", "#9C00FF", "#FF00FF"],
				["#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE"],
				["#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD"],
				["#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5"],
				["#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#3984C6", "#634AA5", "#A54A7B"],
				["#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842"],
				["#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]
			],
			colorsName: [
				["Black", "Tundora", "Dove Gray", "Star Dust", "Pale Slate", "Gallery", "Alabaster", "White"],
				["Red", "Orange Peel", "Yellow", "Green", "Cyan", "Blue", "Electric Violet", "Magenta"],
				["Azalea", "Karry", "Egg White", "Zanah", "Botticelli", "Tropical Blue", "Mischka", "Twilight"],
				["Tonys Pink", "Peach Orange", "Cream Brulee", "Sprout", "Casper", "Perano", "Cold Purple", "Careys Pink"],
				["Mandy", "Rajah", "Dandelion", "Olivine", "Gulf Stream", "Viking", "Blue Marguerite", "Puce"],
				["Guardsman Red", "Fire Bush", "Golden Dream", "Chelsea Cucumber", "Smalt Blue", "Boston Blue", "Butterfly Bush", "Cadillac"],
				["Sangria", "Mai Tai", "Buddha Gold", "Forest Green", "Eden", "Venice Blue", "Meteorite", "Claret"],
				["Rosewood", "Cinnamon", "Olive", "Parsley", "Tiber", "Midnight Blue", "Valentino", "Loulou"]
			],
			lineHeights: ["1.0", "1.2", "1.4", "1.5", "1.6", "1.8", "2.0", "3.0"],
			tableClassName: "table table-bordered",
			insertTableMaxSize: {
				col: 10,
				row: 10
			},
			dialogsInBody: !1,
			dialogsFade: !1,
			maximumImageFileSize: null,
			callbacks: {
				onInit: null,
				onFocus: null,
				onBlur: null,
				onBlurCodeview: null,
				onEnter: null,
				onKeyup: null,
				onKeydown: null,
				onImageUpload: null,
				onImageUploadError: null,
				onImageLinkInsert: null
			},
			codemirror: {
				mode: "text/html",
				htmlMode: !0,
				lineNumbers: !0
			},
			keyMap: {
				pc: {
					ENTER: "insertParagraph",
					"CTRL+Z": "undo",
					"CTRL+Y": "redo",
					TAB: "tab",
					"SHIFT+TAB": "untab",
					"CTRL+B": "bold",
					"CTRL+I": "italic",
					"CTRL+U": "underline",
					"CTRL+SHIFT+S": "strikethrough",
					"CTRL+BACKSLASH": "removeFormat",
					"CTRL+SHIFT+L": "justifyLeft",
					"CTRL+SHIFT+E": "justifyCenter",
					"CTRL+SHIFT+R": "justifyRight",
					"CTRL+SHIFT+J": "justifyFull",
					"CTRL+SHIFT+NUM7": "insertUnorderedList",
					"CTRL+SHIFT+NUM8": "insertOrderedList",
					"CTRL+LEFTBRACKET": "outdent",
					"CTRL+RIGHTBRACKET": "indent",
					"CTRL+NUM0": "formatPara",
					"CTRL+NUM1": "formatH1",
					"CTRL+NUM2": "formatH2",
					"CTRL+NUM3": "formatH3",
					"CTRL+NUM4": "formatH4",
					"CTRL+NUM5": "formatH5",
					"CTRL+NUM6": "formatH6",
					"CTRL+ENTER": "insertHorizontalRule",
					"CTRL+K": "linkDialog.show"
				},
				mac: {
					ENTER: "insertParagraph",
					"CMD+Z": "undo",
					"CMD+SHIFT+Z": "redo",
					TAB: "tab",
					"SHIFT+TAB": "untab",
					"CMD+B": "bold",
					"CMD+I": "italic",
					"CMD+U": "underline",
					"CMD+SHIFT+S": "strikethrough",
					"CMD+BACKSLASH": "removeFormat",
					"CMD+SHIFT+L": "justifyLeft",
					"CMD+SHIFT+E": "justifyCenter",
					"CMD+SHIFT+R": "justifyRight",
					"CMD+SHIFT+J": "justifyFull",
					"CMD+SHIFT+NUM7": "insertUnorderedList",
					"CMD+SHIFT+NUM8": "insertOrderedList",
					"CMD+LEFTBRACKET": "outdent",
					"CMD+RIGHTBRACKET": "indent",
					"CMD+NUM0": "formatPara",
					"CMD+NUM1": "formatH1",
					"CMD+NUM2": "formatH2",
					"CMD+NUM3": "formatH3",
					"CMD+NUM4": "formatH4",
					"CMD+NUM5": "formatH5",
					"CMD+NUM6": "formatH6",
					"CMD+ENTER": "insertHorizontalRule",
					"CMD+K": "linkDialog.show"
				}
			},
			icons: {
				align: "note-icon-align",
				alignCenter: "note-icon-align-center",
				alignJustify: "note-icon-align-justify",
				alignLeft: "note-icon-align-left",
				alignRight: "note-icon-align-right",
				rowBelow: "note-icon-row-below",
				colBefore: "note-icon-col-before",
				colAfter: "note-icon-col-after",
				rowAbove: "note-icon-row-above",
				rowRemove: "note-icon-row-remove",
				colRemove: "note-icon-col-remove",
				indent: "note-icon-align-indent",
				outdent: "note-icon-align-outdent",
				arrowsAlt: "note-icon-arrows-alt",
				bold: "note-icon-bold",
				caret: "note-icon-caret",
				circle: "note-icon-circle",
				close: "note-icon-close",
				code: "note-icon-code",
				eraser: "note-icon-eraser",
				font: "note-icon-font",
				frame: "note-icon-frame",
				italic: "note-icon-italic",
				link: "note-icon-link",
				unlink: "note-icon-chain-broken",
				magic: "note-icon-magic",
				menuCheck: "note-icon-menu-check",
				minus: "note-icon-minus",
				orderedlist: "note-icon-orderedlist",
				pencil: "note-icon-pencil",
				picture: "note-icon-picture",
				question: "note-icon-question",
				redo: "note-icon-redo",
				square: "note-icon-square",
				strikethrough: "note-icon-strikethrough",
				subscript: "note-icon-subscript",
				superscript: "note-icon-superscript",
				table: "note-icon-table",
				textHeight: "note-icon-text-height",
				trash: "note-icon-trash",
				underline: "note-icon-underline",
				undo: "note-icon-undo",
				unorderedlist: "note-icon-unorderedlist",
				video: "note-icon-video"
			}
		}
	})
});