const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        res.status(400).json({ status: 0, debug_msg: 'no token' });
    }
    try {
        console.log('Came in try');
        const decodedToken = jwt.verify(token, 'myTokenForValidation');
        console.log('Hii');
        console.log(decodedToken);
        next();
    } catch (err) {
        res.status(500).json({ status: 0, debug_msg: 'Token not validated' });
    }
};
