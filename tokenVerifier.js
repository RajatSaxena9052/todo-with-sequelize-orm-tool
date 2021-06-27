
checkToken = (req, res, next) => {

    const bearerToken = req.headers.authorization;

    if (typeof bearerToken !== 'undefined') {

        const token = bearerToken.split(" ")[1];

        req.token = token;

        next();
    }
    else {
        res.status(401).json({
            message: "Access Denied! Unauthorized User as jwt not generated"
        });
    }
}

module.exports = checkToken;