
const handleSearchConnections = (req, res, db) => {
    console.log("handleSearchConnections");
    console.log(req.body);
    const { username } = req.body;
    if (!username) {
        return res.status(400).json('username not provided');
    }
    db.select('*').from('connections').where('fromuser', 'like', username)
        .then(user => {
            if (user.length) {
                res.json(user)
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error searching connections'))
};


const handleConnectionStatus = (req, res, db) => {
    console.log("handleConnectionStatus");
    console.log(req.body);
    const { fromuser, touser } = req.body;
    if (!fromuser || !touser) {
        return res.status(400).json('fromuser or touser not provided');
    }
    db.select('*').from('connections').where({
        fromuser: fromuser,
        touser:  touser
    })
        .then(user => {
            if (user.length) {
                res.json({
                    type: user[0].type
                })
            } else {
                res.json(false)
            }
        })
        .catch(err => res.status(400).json('error getting status'))
};


const handleHighlightConnections = (req, res, db) => {
    console.log("handleHighlightMyConnections");
    console.log(req.body);
    const { searchTerm } = req.body;
    if (!searchTerm) {
        return res.status(400).json('searchTerm not provided');
    }
    let query = '%'.concat(searchTerm, '%');
    db.select('*').from('users').where('username', 'like', query)
        .join('connections', 'users.username', '=', 'connections.touser')
        .select('connections.touser')
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('error getting matches'))
};


module.exports = {
    handleSearchConnections,
    handleConnectionStatus,
    handleHighlightConnections
};
