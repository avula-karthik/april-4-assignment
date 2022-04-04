const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticationMiddleware = require('../middlewares/authentication');
const connector = require('../poolconnect');
exports.createTable = function (res, res) {
    const sqlQuery = `CREATE TABLE users(id int PRIMARY KEY AUTO_INCREMENT, name varchar(40), email varchar(40),password varchar(200),age int,dob date )`;
    connector.query(sqlQuery, function (err, results, fields) {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
    });
};

exports.login = function (req, res) {
    let { email, password } = req.body;
    let userCheck = `SELECT * FROM users WHERE email="${email}"`;
    connector.query(userCheck, function (err, results, fields) {
        if (err) {
            res.json(err);
        } else {
            if (results.length === 0) {
                res.json({
                    status: 0,
                    debug_msg: 'No user exists with that email',
                });
            } else {
                const getPassword = `SELECT password FROM users WHERE email = "${email}"`;
                connector.query(getPassword, function (err, results, fields) {
                    if (err) {
                        res.json(err);
                    } else {
                        const hashedPass = results[0]['password'];
                        //res.json(results[0]['password']);
                        const passCorrect = bcrypt.compareSync(
                            password,
                            hashedPass
                        );
                        if (passCorrect === false) {
                            res.json('Invalid credentails');
                        } else {
                            const payload = {
                                user: {
                                    email: email,
                                },
                            };
                            jwt.sign(
                                payload,
                                'myTokenForValidation',
                                { expiresIn: 1200 },
                                (err, token) => {
                                    if (err) {
                                        throw err;
                                        res.json({
                                            status: 0,
                                            debug_data: 'Temp err in beckend',
                                        });
                                    }
                                    res.status(200).json({ token });
                                }
                            );
                        }
                    }
                });
            }
        }
    });
};

exports.addUser = function (req, res) {
    let { name, email, password, age, dob } = req.body;
    let encryptedPassword;
    try {
        let salt = bcrypt.genSaltSync(10);
        console.log(salt);
        encryptedPassword = bcrypt.hashSync(req.body.password, salt);
        console.log(encryptedPassword);
    } catch (err) {
        console.log(err);
    }
    const emailCheck = `SELECT * FROM users WHERE email="${email}"`;
    connector.query(emailCheck, function (err, results, fields) {
        if (err) {
            res.json(err);
        } else {
            if (results.length > 0) {
                res.json({ status: 0, debug_msg: 'email already exists' });
            } else {
                const sqlQuery = `INSERT INTO users(name, email,password,age,dob) VALUES("${name}", "${email}", "${encryptedPassword}","${age}", "${dob}"  );`;
                connector.query(sqlQuery, function (err, results, fields) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(results);
                    }
                });
            }
        }
    });
};
exports.getUsers = [
    authenticationMiddleware,
    function (req, res) {
        const sqlQuery = `SELECT * FROM users ;`;
        connector.query(sqlQuery, function (err, results, fields) {
            if (err) {
                res.json(err);
            } else {
                res.json(results);
            }
        });
    },
];
