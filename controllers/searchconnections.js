
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
            console.log("data");
            console.log(user);
            if (user.length) {
                res.json(true)
            } else {
                res.json(false)
            }
        })
        .catch(err => res.status(400).json('error getting status'))
};

module.exports = {
    handleSearchConnections,
    handleConnectionStatus
};