validate = {
    isString: a => (typeof a === "string"),
    isFilledString: a => validate.isString(a) && (a.trim().length > 0),
    stringMinLength: (text, length) => (validate.isString(text) && text.length >= length),
    stringMaxLength: (text, length) => (validate.isString(text) && text.length <= length),
    isInt: a => (typeof a === "number") && (Math.floor(a) == a),
    intMin: (int, value) => (validate.isInt(int) && int >= value),
    intMax: (int, value) => (validate.isInt(int) && int <= value),

    encrypt: {
        validFormat: a => ["ascii", "base64", "binary", "text"].includes(a)
    }
}