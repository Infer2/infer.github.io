! function(e) {
	"object" == typeof exports && "object" == typeof module ? e(require("../../lib/codemirror"), require("../markdown/markdown"), require("../../addon/mode/overlay")) : "function" == typeof define && define.amd ? define(["../../lib/codemirror", "../markdown/markdown", "../../addon/mode/overlay"], e) : e(CodeMirror)
}((function(e) {
	"use strict";
	e.defineMode("gfm", (function(o, n) {
		var r = 0,
			t = {
				startState: function() {
					return {
						code: !1,
						codeBlock: !1,
						ateSpace: !1
					}
				},
				copyState: function(e) {
					return {
						code: e.code,
						codeBlock: e.codeBlock,
						ateSpace: e.ateSpace
					}
				},
				token: function(e, o) {
					if (o.combineTokens = null, o.codeBlock) return e.match(/^```+/) ? (o.codeBlock = !1, null) : (e.skipToEnd(), null);
					if (e.sol() && (o.code = !1), e.sol() && e.match(/^```+/)) return e.skipToEnd(), o.codeBlock = !0, null;
					if ("`" === e.peek()) {
						e.next();
						var t = e.pos;
						e.eatWhile("`");
						var c = 1 + e.pos - t;
						return o.code ? c === r && (o.code = !1) : (r = c, o.code = !0), null
					}
					if (o.code) return e.next(), null;
					if (e.eatSpace()) return o.ateSpace = !0, null;
					if ((e.sol() || o.ateSpace) && (o.ateSpace = !1, !1 !== n.gitHubSpice)) {
						if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?=.{0,6}\d)(?:[a-f0-9]{7,40}\b)/)) return o.combineTokens = !0, "link";
						if (e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) return o.combineTokens = !0, "link"
					}
					return e.next(), null
				},
				blankLine: function(e) {
					return e.code = !1, null
				}
			},
			c = {
				taskLists: !0,
				strikethrough: !0,
				emoji: !0
			};
		for (var a in n) c[a] = n[a];
		return c.name = "markdown", e.overlayMode(e.getMode(o, c), t)
	}), "markdown"), e.defineMIME("text/x-gfm", "gfm")
}));