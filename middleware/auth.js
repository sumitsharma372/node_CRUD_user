const jwt = require('jsonwebtoken');
const jwtsecret = process.env.JWT_SECRET_KEY ;

const auth = async ( req, res, next ) => {

        const { authorization } = req.headers;
        if(!authorization) {
            return res.status(401).json({ error: "Authorization token required"})
        }
        const token = authorization.split(" ")[1];
        try {
            const decodedData = jwt.verify(token, jwtsecret);
            req.userId = decodedData?.id;
            next();
        } catch (error) {
            return res.status(401).json({ error: 'Request is not authorized' })
        }
            
}

module.exports = auth