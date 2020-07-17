
const handleViewProfile = (req, res, db) => {
    console.log('handleViewProfile');
    console.log(req.body);
    const { userName } = req.body;
    if (!userName) {
        return res.status(400).json('userName not provided');
    }
    db.select('*').from('users').where({userName})
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
