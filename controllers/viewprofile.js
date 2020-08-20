
const handleViewProfile = (req, res, db) => {
    console.log('handleViewProfile');
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
        return res.status(400).json('name not provided');
    }
    db.select('*').from('users').where({name})
        .then(user => {
            if (user.length) {
                res.json(user[0])
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
};


module.exports = {
    handleViewProfile
};
