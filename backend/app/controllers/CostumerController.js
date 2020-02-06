module.exports = {

    async getVersionCompare(req, res) {
        console.log('chegou em "controller>ClientController.getVersionCompare"');

        const { cnpj } = req.params

        console.log('CNPJ ' + cnpj);
        //Verificar na clasula where se a empresa esta ativa para atualização posteriormente

        //retornar versoes vazias para cada modulo se não possui retorno do banco

        // passando formato de retorno fixo para teste
        return res.json({
            lbcpdv: {
                version: '35.70',
                path: 'http://192.168.2.161/lastversion.zip'
            },
            lbcaut: {
                version: '',
                path: ''
            },
            lbcmed: {
                version: '',
                path: ''
            },
            lbcsyncpdv: {
                version: '',
                path: ''
            },
            lbcsyncmed: {
                version: '',
                path: ''
            }
        });
    }
};