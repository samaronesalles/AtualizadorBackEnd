module.exports = function (req, res) {

    if (!req.body.number)
        throw new Error("field 'number' is required.");

    if (!req.body.letter)
        throw new Error("field 'letter' is required.");

    if (!req.body.module)
        throw new Error("field 'module' is required.");

}
