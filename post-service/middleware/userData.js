const axios = require('axios')

const userData = async(req, res, next) => {
    try {
        const userServiceUrl = 'http://user-service:3000/users/getprofile';
        const headers = {
          'Authorization': req.header('Authorization')
        };
        const response = await axios.get(`${userServiceUrl}`, { headers });
        if(!response || (response && !response.data)) {
          return res.json({
            meta: { msg: "Something went wrong", status: false }
          })
        }
        if(!response.data.meta.status) {
          return res.json({
            meta: { msg: "User data not found", status: false }
          })
        }
        const user = response.data? response.data.data: {};
        req.user = user;
        next();
    } catch(e) {
        return res.json({
            meta: { msg: e.message, status: false }
        })
    }
};

module.exports = userData;