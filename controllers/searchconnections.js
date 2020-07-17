
const handleSearchConnections = (req, res, db) => {
    console.log("handleSearchConnections");
    console.log(req.body);
    const { userName } = req.body;
    if (!userName) {
        return res.status(400).json('From user not provided');
    }

    // let query = '%'.concat(searchTerm, '%');

    db.select('*').from('connections').where('fromuser', 'like', userName)
        .then(user => {
            if (user.length) {
                res.json(user)
            } else {
                res.status(400).json('Not found')
            }
        })
        .catch(err => res.status(400).json('error getting connections'))
};


const handleConnectionStatus = (req, res, db) => {
    console.log("handleConnectionStatus");
    console.log(req.body);
    const { fromuser, touser } = req.body;
    if (!fromuser || !touser) {
        console.log("FUK");
        return res.status(400).json('From user or to user not provided');
    }

    db.select('*').from('connections').where({
        fromuser: fromuser,
        touser:  touser
    })
        .then(user => {
            console.log("XXXXXXXXXXXXXXXXXXXXXXX");
            console.log(user);
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


const handleHighlightMyConnections = (req, res, db) => {
    console.log("handleHighlightMyConnections");
    console.log(req.body);

    const { searchTerm } = req.body;
    if (!searchTerm) {
        return res.status(400).json('From user not provided');
    }

    let query = '%'.concat(searchTerm, '%');

    db.select('*').from('users').where('userName', 'like', query)
        .join('connections', 'users.userName', '=', 'connections.touser')
        .select('connections.touser')
        .then(data => {
            console.log("Matches: ");
            console.log(data);
            res.json(data);
        })
        .catch(err => res.status(400).json('error getting matches'))

};




module.exports = {
    handleSearchConnections,
    handleConnectionStatus,
    handleHighlightMyConnections
};