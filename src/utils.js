/*
const object = {'a' : 1};

identity(object) === object; // => true
*/

function identity(value) {
    return value;
}

// [1, 2, 3, 4] => 4

function last(list) {
    if (Array.isArray(list)) {
        return list.length ? list[list.length - 1] : undefined
    }

    return undefined
}


// [1, 2, 3, 4] => 1

function first(list) {
    if (Array.isArray(list)) {
        return list[0]
    }
    return undefined
}


/*
	* range(4); // => [0, 1, 2, 3]
	* range(-4); // => [0, -1, -2, -3]
	* range(1, 5); // => [1, 2, 3, 4]
	* range(0, 20, 5); // => [0, 5, 10, 15]
	* range(0, -4, -1); // => [0, -1, -2, -3]
	* range(1, 4, 0); // => [1, 1, 1]
	* range(0); // => []
*/

const baseRange = (start, end, step) => {
    let index = -1;
    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
    const result = new Array(length);

    while (length--) {
        result[++index] = start;
        start += step;
    }

    return result;
}

function range(start = 0, end, step) {
    if (end === undefined) {
        end = start;
        start = 0;
    }

    step = step === undefined ? (start < end ? 1 : -1) : step;
    return baseRange(start, end, step);
}


/*
isEmpty(null); // => true
isEmpty(true); // => true
isEmpty(1); // => true
isEmpty([1, 2, 3]); // => false
isEmpty({ 'a': 1 }); // => false
isEmpty('123'); // => false
isEmpty(123); // => true
isEmpty(''); // => true
isEmpty(0); // => true
isEmpty(undefined) // => true
isEmpty(new Map([['1', 'str1'], [1, 'num1'], [true, 'bool1']])) // => false
isEmpty(new Set(['value1', 'value2', 'value3'])) // => false
*/

function isEmpty(value) {
    if (Array.isArray(value) || (value !== null && typeof(value) === 'object')) {
        return false
    }

    if (typeof(value) === 'string' && value.length > 0) {
        return false
    }

    return true;
}
