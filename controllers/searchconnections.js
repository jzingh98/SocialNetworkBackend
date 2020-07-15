
const handleSearchConnections = (req, res, db) => {
    console.log(req.body);
    const { searchTerm } = req.body;
    if (!searchTerm) {
        return res.status(400).json('From user not provided');
    }

    // let query = '%'.concat(searchTerm, '%');


    db.select('*').from('connections').where('fromuser', 'like', searchTerm)
        .then(user => {
            if (user.length) {
                res.json(user)
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting connections'))
};

module.exports = {
    handleSearchConnections
};