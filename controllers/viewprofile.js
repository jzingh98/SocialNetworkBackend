
const handleViewProfile = (req, res, db) => {
    console.log('handleViewProfile');
    console.log(req.body);
    const { username } = req.body;
    if (!username) {
        return res.status(400).json('name not provided');
    }
    db.select('*').from('users').where({username})
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
