/**
 * Analyse string for printing by keyboard for the presence a special symbols
 *
 * @private
 *
 * @param {string} str              String for analizing
 * @returns {Array}                 Array with symbols for printing
 */
function analyzeBeforePrint (str) {
    let arr = [],
        ready = [];
    let spec_list_str = '';
    let preg_total = '';

    for (let key in spec_key) {
        spec_list_str += key + '|';
    }

    preg_total = new RegExp('([#@%]{1}(?:' + spec_list_str + '\\[.+?\\]\\([0-9,]+?\\))[#@%]{1})', 'g');
    arr = str.split(preg_total);

    for (let i = 0, max = arr.length; i < max; i++) {
        if (preg_total.test(arr[i])) {
            ready = ready.concat(parseGenStringCommand(arr[i]));
        } else if (arr[i] !== '') {
            ready = ready.concat(arr[i].split(''));
        }
    }

    return ready;
}

/**
 * Parses string and generates symbols for printing in according to the <br />
 * specified rules
 *
 * @private
 *
 * @param {string} str              String with generation rules as @[0-9a-z#$%](x,y)@
 * @returns {Array}                 Generated symbols list
 */
function parseGenStringCommand (str) {
    let result = [];

    if (/[@]{1}(.*)[@]{1}/.test(str)) {
        let parts = /@\[(.+?)\]\(([0-9,]+?)\)@/.exec(str),
            set,
            count;

        if (/,/.test(parts[2])) {
            let count_limits = /(\d+)[ ]?,[ ]?(\d+)/.exec(parts[2]);
            count = getRandomInt(count_limits[1], count_limits[2]);
        } else {
            count = +parts[2];
        }

        if (/(.+)\-(.+)/.test(parts[1])) {
            let range_arr = parts[1].split('');
            let char_code_arr = [];

            for (let i = 0, last = range_arr.length; i < last; i++) {
                if (range_arr[i + 1] !== '-' || typeof range_arr[i + 2] === 'undefined') {
                    char_code_arr.push(range_arr[i].charCodeAt(0));
                    continue;
                }

                let begin = range_arr[i].charCodeAt(0),
                    end = range_arr[i + 2].charCodeAt(0);

                for (; begin <= end; begin++) {
                    char_code_arr.push(begin);
                }

                i += 2;
            }

            set = char_code_arr.map(function (item, i, arr) {
                return String.fromCharCode(item);
            });
        } else {
            set = parts[1].split('');
        }

        for (let z = count, size = set.length - 1; z--;) {
            let index = Math.floor(Math.random() * size);
            result.push(set[index]);
        }
    } else {
        result = [str];
    }

    return result;
}