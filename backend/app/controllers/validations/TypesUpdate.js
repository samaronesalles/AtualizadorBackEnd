function ValidParam(req, res) {
    const { type_id } = req.params;

    if (!type_id)
        throw new Error("Type of update index is required.");
}

function ValidBody(req, res) {

    if (!req.body.description)
        throw new Error("field 'description' is required.");

}

module.exports = { ValidParam, ValidBody };