/// <reference path="DefinitelyTyped/node/node.d.ts" />
/**
* Japanese String & Charactor Converter
*
* @module jaco
* @main jaco
*/
var jaco;
(function (jaco) {
    // [!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]
    jaco.SIGN_CHARS = '\\u0020-\\u002F\\u003A-\\u0041\\u005B-\\u0061\\u007B-\\u007E';

    // [0-9]
    jaco.DIGIT_CAHRS = '0-9';

    // [A-Za-z]
    jaco.ALPHA_CHARS = 'A-Za-z';

    // [!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~]
    jaco.ALPHANUMERIC_CHARS_WITH_SIGN = '\\u0020-\\u007E';

    // [！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝～]
    jaco.FULLWIDTH_SING_CHARS = '\\uFF01-\\uFF0F\\uFF1A-\\uFF20\\uFF3B-\\uFF40\\uFF5B-\\uFF5E';

    // [０１２３４５６７８９]
    jaco.FULLWIDTH_DIGIT_CHARS = '\\uFF10-\\uFF19';

    // [ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ]
    jaco.FULLWIDTH_ALPHA_CHARS = '\\uFF21-\\uFF3A\\uFF41-\\uFF5A';

    // [！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～]
    jaco.FULLWIDTH_ALPHANUMERIC_CHARS_WITH_SIGN = '\\uFF01-\\uFF5F';

    // [ぁ-ゖゝ-ゟ]
    jaco.HIRAGANA_CHARS = '\\u3041-\\u3096\\u309D-\\u309F';

    // [ァ-ヺヽ-ヿ]
    jaco.KATAKANA_CHARS = '\\u30A1-\\u30FA\\u30FD\\u30FF';

    // [゛゜(結合文字含む)ー]
    jaco.KANA_COMMON_CAHRS = '\u3099-\u309C\u30FC';

    // [　、。〃〄々〆〇〈〉《》「」『』【】〒〓〔〕〖〗〘〙〚〛〜〝〞〟〠〡〢〣〤〥〦〧〨〩〪〭〮〯〫〬〰〱〲〳〴〵〶・～] ※ 波ダッシュ・全角チルダ問題があるため 全角チルダを含めることとする (http://ja.wikipedia.org/wiki/Unicode#.E6.B3.A2.E3.83.80.E3.83.83.E3.82.B7.E3.83.A5.E3.83.BB.E5.85.A8.E8.A7.92.E3.83.81.E3.83.AB.E3.83.80.E5.95.8F.E9.A1.8C)
    jaco.JAPANESE_SIGN_CHARS = '\u3000-\u3036\u30FB\\uFF5E';

    // [ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ]
    jaco.NARROW_KATAKANA_CHARS = '\\uFF66-\\uFF9F';

    // [｡｢｣､･]
    jaco.NARROW_JAPANESE_SIGN_CHARS = '\\uFF61-\\uFF65';

    // [(スペース相等の文字)]
    jaco.SPACE_LIKE_CHARS = '\\s\\n\\t\\u0009\\u0020\\u00A0\\u2002-\\u200B\\u3000\\uFEFF';

    function hiraganize(str, isCombinate) {
        if (typeof isCombinate === "undefined") { isCombinate = false; }
        return new Jaco(str).toHiragana(isCombinate).toString();
    }
    jaco.hiraganize = hiraganize;

    function katakanize(str, toWide) {
        if (typeof toWide === "undefined") { toWide = true; }
        return new Jaco(str).toKatakana(toWide).toString();
    }
    jaco.katakanize = katakanize;

    /**
    * Jacoクラス
    *
    * @class Jaco
    * @since 0.1.0
    * @uses jaco
    * @conctructor
    * @param {string} [str=''] 対象の文字列
    */
    var Jaco = (function () {
        function Jaco(str) {
            if (typeof str === "undefined") { str = ''; }
            this._str = str;
        }
        /**
        * 明示もしくは暗黙の文字列変換メソッド
        *
        * @method toString
        * @since 0.1.0
        * @override
        * @return {String} 自身が保持する文字列
        */
        Jaco.prototype.toString = function () {
            return this._str;
        };

        /**
        * 暗黙の値変換に呼び出されるメソッド
        *
        * @method valueOf
        * @since 0.1.0
        * @override
        * @return {String} 自身が保持する文字列
        */
        Jaco.prototype.valueOf = function () {
            return this.toString();
        };

        /**
        *
        *
        * @method concat
        * @since 0.2.0
        * @return {Jaco} 自身
        */
        Jaco.prototype.concat = function () {
            var likeStrings = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                likeStrings[_i] = arguments[_i + 0];
            }
            return this;
        };

        /**
        * 文字列をパターンで置換する
        *
        * @method replace
        * @since 0.2.0
        * @private
        * @param {RegExp} pattern  対象のパターン
        * @param {String} replacement 置換する文字列
        * @chainable
        * @return {Jaco} 自身
        */
        Jaco.prototype.replace = function (pattern, replacement) {
            return this;
        };

        /**
        *
        *
        * @method slice
        * @since 0.2.0
        * @return {Jaco} 自身
        */
        Jaco.prototype.slice = function (from, to) {
            return this;
        };

        /**
        *
        *
        * @method substr
        * @since 0.2.0
        * @return {Jaco} 自身
        */
        Jaco.prototype.substr = function () {
            return this;
        };

        /**
        *
        *
        * @method substring
        * @since 0.2.0
        * @return {Jaco} 自身
        */
        Jaco.prototype.substring = function () {
            return this;
        };

        /**
        *
        *
        * @method toLowerCase
        * @since 0.2.0
        * @return {Jaco} 自身
        */
        Jaco.prototype.toLowerCase = function () {
            return this;
        };

        /**
        *
        *
        * @method toUpperCase
        * @since 0.2.0
        * @return {Jaco} 自身
        */
        Jaco.prototype.toUpperCase = function () {
            return this;
        };

        /**
        *
        *
        * @method trim
        * @since 0.2.0
        * @return {Jaco} 自身
        */
        Jaco.prototype.trim = function () {
            return this;
        };

        /**
        *
        *
        * @method size
        * @since 0.2.0
        * @return {number} 文字列数
        */
        Jaco.prototype.size = function () {
            return this._str.length;
        };

        /**
        *
        *
        * @method byteSize
        * @since 0.2.0
        * @return {number} バイト数
        */
        Jaco.prototype.byteSize = function () {
            return this._str.length;
        };

        /**
        *
        *
        * @method isEmpty
        * @since 0.2.0
        * @return {boolean} 自身
        */
        Jaco.prototype.isEmpty = function () {
            return true;
        };

        /**
        *
        *
        * @method clone
        * @since 0.2.0
        * @return {Jaco} コピー
        */
        Jaco.prototype.clone = function () {
            return this;
        };

        /**
        *
        *
        * @method remove
        * @since 0.2.0
        * @return {Jaco} 自身
        */
        Jaco.prototype.remove = function () {
            return this;
        };

        /**
        *
        *
        * @method test
        * @since 0.2.0
        * @return {boolean} 自身
        */
        Jaco.prototype.test = function () {
            return true;
        };

        /**
        *
        *
        * @method prepend
        * @since 0.2.0
        * @return {Jaco} 自身
        */
        Jaco.prototype.prepend = function () {
            return this;
        };

        /**
        *
        *
        * @method append
        * @since 0.2.0
        * @return {Jaco} 自身
        */
        Jaco.prototype.append = function () {
            return this;
        };

        /**
        *
        *
        * @method is
        * @since 0.2.0
        * @return {boolean} 自身
        */
        Jaco.prototype.is = function () {
            return true;
        };

        /**
        *
        *
        * @method isOnly
        * @since 0.2.0
        * @param {string} charactors 文字セット
        * @return {boolean} 自身
        */
        Jaco.prototype.isOnly = function (charactors) {
            return true;
        };

        /**
        *
        *
        * @method toNumber
        * @since 0.2.0
        * @return {number} 自身
        */
        Jaco.prototype.toNumber = function () {
            return 0;
        };

        /**
        *
        *
        * @method toBool
        * @since 0.2.0
        * @return {boolean} 自身
        */
        Jaco.prototype.toBool = function () {
            return true;
        };

        /**
        *
        *
        * @method toArray
        * @since 0.2.0
        * @return {Array} 自身
        */
        Jaco.prototype.toArray = function () {
            return [];
        };

        /**
        *
        *
        * @method isOnlyHiragana
        * @since 0.2.0
        * @return {boolean} 自身
        */
        Jaco.prototype.isOnlyHiragana = function () {
            return true;
        };

        /**
        *
        *
        * @method isOnlyKatakana
        * @since 0.2.0
        * @return {boolean} 自身
        */
        Jaco.prototype.isOnlyKatakana = function () {
            return true;
        };

        /**
        *
        *
        * @method isOnlyAlphabet
        * @since 0.2.0
        * @return {boolean} 自身
        */
        Jaco.prototype.isOnlyAlphabet = function () {
            return true;
        };

        /**
        *
        *
        * @method isUInt
        * @since 0.2.0
        * @return {boolean} 自身
        */
        Jaco.prototype.isUInt = function () {
            return true;
        };

        /**
        * 濁点・半濁点を結合文字に変換
        *
        * @method combinate
        * @since 0.1.0
        * @chainable
        * @return {Jaco} 自身
        */
        Jaco.prototype.combinate = function () {
            // 濁点・半濁点を結合文字に変換
            return this._replaceMap({
                // 濁点
                '\u309B': '\u3099',
                // 半濁点
                '\u309C': '\u309A'
            });
        };

        /**
        * ひらがなに変換する
        *
        * @method toHiragana
        * @since 0.1.0
        * @param {String} str 対象の文字列
        * @param {Boolean} [isCombinate=false] 濁点・半濁点を結合文字にするかどうか
        * @chainable
        * @return {Jaco} 自身
        */
        Jaco.prototype.toHiragana = function (isCombinate) {
            if (typeof isCombinate === "undefined") { isCombinate = false; }
            // 半角カタカナを全角カタカナへ
            this.toWideKatakana();

            // ヷヸヹヺの変換
            this._replaceMap({
                'ヷ': 'わ゛',
                'ヸ': 'ゐ゛',
                'ヹ': 'ゑ゛',
                'ヺ': 'を゛'
            });

            // カタカナをひらがなへ(Unicodeの番号をずらす)
            this._shift(toPattern(jaco.KATAKANA_CHARS), -96);

            // 濁点・半濁点を結合文字に変換
            if (isCombinate) {
                this.combinate();
            }
            return this;
        };

        /**
        * カタカナに変換する
        *
        * @method toKatakana
        * @since 0.1.0
        * @param {String} str 対象の文字列
        * @param {Boolean} [toWide=true] 半角カタカナを全角カタカナへ変換するかどうか
        * @chainable
        * @return {Jaco} 自身
        */
        Jaco.prototype.toKatakana = function (toWide) {
            if (typeof toWide === "undefined") { toWide = true; }
            // 半角カタカナを全角カタカナへ
            if (toWide) {
                this.toWideKatakana();
            }

            // わ゛=> ヷ (濁点3種類対応)
            this.replace(/\u308F(?:\u309B|\u3099|\uFF9E)/g, '\u30F7');

            // ゐ゛=> ヸ (濁点3種類対応)
            this.replace(/\u3090(?:\u309B|\u3099|\uFF9E)/g, '\u30F8');

            // ゑ゛=> ヹ (濁点3種類対応)
            this.replace(/\u3091(?:\u309B|\u3099|\uFF9E)/g, '\u30F9');

            // を゛=> ヺ (濁点3種類対応)
            this.replace(/\u3092(?:\u309B|\u3099|\uFF9E)/g, '\u30FA');

            // ひらがなをカタカナへ(Unicodeの番号をずらす)
            this._shift(toPattern(jaco.HIRAGANA_CHARS), 96);
            return this;
        };

        /**
        * 半角カタカナに変換する
        *
        * @method toNarrowKatakana
        * @since 0.1.0
        * @param {String} str 対象の文字列
        * @chainable
        * @return {Jaco} 自身
        */
        Jaco.prototype.toNarrowKatakana = function () {
            // 濁点の変換 (全角濁点2種類対応)
            this.replace(/\u309B|\u3099/g, '\uFF9E');

            // 半濁点の変換 (全角半濁点2種類対応)
            this.replace(/\u309C|\u309A/g, '\uFF9F');

            // カタカナの変換
            this._replaceMap({
                'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｩ', 'ェ': 'ｪ', 'ォ': 'ｫ', 'ャ': 'ｬ',
                'ュ': 'ｭ', 'ョ': 'ｮ', 'ッ': 'ｯ',
                'ー': 'ｰ',
                'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ',
                'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ',
                'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ',
                'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ',
                'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ',
                'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ',
                'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ',
                'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ',
                'ラ': 'ﾗ', 'リ': 'ﾘ', 'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ',
                'ワ': 'ﾜ', 'ン': 'ﾝ', 'ヰ': 'ｲ', 'ヱ': 'ｴ', 'ヲ': 'ｦ',
                'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ',
                'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ',
                'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ',
                'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ',
                'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ',
                'ヷ': 'ﾜﾞ', 'ヸ': 'ｲﾞ', 'ヹ': 'ｴﾞ', 'ヺ': 'ｦﾞ'
            });
            return this;
        };

        /**
        * 全角カタカナに変換する
        *
        * @method toWideKatakana
        * @since 0.1.0
        * @param {String} str 対象の文字列
        * @chainable
        * @return {Jaco} 自身
        */
        Jaco.prototype.toWideKatakana = function () {
            // カタカナ・濁点・半濁点の変換
            this._replaceMap({
                'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
                'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
                'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
                'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
                'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
                'ﾜﾞ': 'ヷ', 'ｲﾞ': 'ヸ', 'ｳﾞ': 'ヴ', 'ｴﾞ': 'ヹ', 'ｦﾞ': 'ヺ',
                'ﾞ': '゛', 'ﾟ': '゜',
                'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
                'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
                'ｯ': 'ッ', 'ｰ': 'ー',
                'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
                'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
                'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
                'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
                'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
                'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
                'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
                'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
                'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
                'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン'
            });
            return this;
        };

        /**
        * 文字列中のそれぞれのひと文字に対してUnicode番号を指定の数値ずらす
        *
        * @method _shift
        * @since 0.1.0
        * @private
        * @param {RegExp} needle 対象のパターン
        * @param {Number} shiftNum ずらす数値
        * @chainable
        * @return {Jaco} 自身
        */
        Jaco.prototype._shift = function (needle, shiftNum) {
            this._str = this._str.replace(needle, function (char) {
                return String.fromCharCode(char.charCodeAt(0) + shiftNum);
            });
            return this;
        };

        /**
        * 【非推奨】文字列をパターンで置換する
        * 同機能の`replace`メソッドを使う
        *
        * @method _replace
        * @deprecated
        * @since 0.1.0
        * @private
        * @param {RegExp} needle 対象のパターン
        * @param {String} replace 置換する文字列
        * @chainable
        * @return {Jaco} 自身
        */
        Jaco.prototype._replace = function (needle, replace) {
            this._str = this._str.replace(needle, replace);
            return this;
        };

        /**
        * キーがパターン・値が置換文字列のハッシュマップによって置換する
        *
        * @method _replaceMap
        * @since 0.1.0
        * @private
        * @param {Object} convMap キーがパターン・値が置換文字列のハッシュマップ
        * @chainable
        * @return {Jaco} 自身
        */
        Jaco.prototype._replaceMap = function (convMap) {
            var needle;
            var replace;
            for (needle in convMap) {
                replace = convMap[needle];
                this._str = this._str.replace(toRegExp(needle), replace);
            }
            return this;
        };
        return Jaco;
    })();
    jaco.Jaco = Jaco;

    function toPattern(chars) {
        return new RegExp('[' + chars + ']', 'g');
    }

    function toRegExp(str, option) {
        if (typeof option === "undefined") { option = 'igm'; }
        return new RegExp(str, option);
    }
})(jaco || (jaco = {}));

(module).exports = jaco;