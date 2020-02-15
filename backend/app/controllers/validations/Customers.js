module.exports = function (req, res) {

    if (!req.body.company_name)
        throw new Error("field 'company_name' is required.");

    if (!req.body.cnpj)
        throw new Error("field 'cnpj' is required.");

    if (!req.body.address)
        throw new Error("field 'address' is required.")
    else {
        if (!req.body.address.address)
            throw new Error("field 'address.address' is required.");

        if (!req.body.address.number)
            throw new Error("field 'address.number' is required.");

        if (!req.body.address.zip_code)
            throw new Error("field 'address.zip_code' is required.");

        if (!req.body.address.ibge_code) {
            if (!req.body.address.city)
                throw new Error("field 'address.city' is required.");

            if (!req.body.address.state)
                throw new Error("field 'address.state' is required.");
        }
    }

}
