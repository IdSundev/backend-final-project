const authModel = require('../models/Auth')
const jwt = require('../lib/jwt')



exports.login = async (req, res) => {
    let data = {
        username: req.body.username,
        password: req.body.password
    }

    console.log('ini datanya', data)

    authModel.login(data)

        .then((result) => {
            // console.log(result)
            if (result.length > 0) {
                let data = {
                    id_admin: result[0].id_admin,
                    username: result[0].username,
                    id_warehouse: result[0].id_warehouse
                }
                res.json({
                    status: 'ok',
                    login: true,
                    token: jwt.createJWTToken(data),
                    id_warehouse: result[0].id_warehouse
                })
            } else {
                res.json({
                    status: 'ok',
                    login: false
                })
            }
        })
        .catch((err) => {
            res.json({
                status: 'error',
                error_message: err.message
            })
        })
}