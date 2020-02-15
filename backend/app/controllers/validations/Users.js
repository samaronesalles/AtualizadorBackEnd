module.exports = function (req, res) {

    if (!req.body.name)
        throw new Error("field 'name' is required.");

    if (!req.body.email)
        throw new Error("field 'email' is required.");

    if (!req.body.password)
        throw new Error("field 'password' is required.");

}
