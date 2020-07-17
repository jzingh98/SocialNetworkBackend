
const handleSearchUsers = (req, res, db) => {
    console.log('handleSearchUsers');
    console.log(req.body);
    const { searchTerm } = req.body;
    if (!searchTerm) {
        return res.status(400).json('searchTerm not provided');
    }
    let query = '%'.concat(searchTerm, '%');
    db.select('*').from('users').where('userName', 'like', query)
        .then(user => {
            if (user.length) {
                res.json(user)
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting user'))
};

module.exports = {
    handleSearchUsers
};