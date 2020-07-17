
const handleAddConnection = (req, res, db) => {
    console.log('editConnections Add: ', req.body);
    const {fromuser, touser, type} = req.body;
    if (!fromuser || !touser || !type) {
        return res.status(400).json('From, to, or type not provided');
    }

    db('connections')
        .insert({
            fromuser: fromuser,
            touser: touser,
            type: type,
            established: new Date()
        })
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to add connection: ', err))
};


const handleDeleteConnection = (req, res, db) => {
    console.log('editConnections Delete: ', req.body);
    const {fromuser, touser} = req.body;
    if (!fromuser || !touser) {
        return res.status(400).json('From user or to user not provided');
    }

    db('connections').where({
        fromuser: fromuser,
        touser:  touser
    })
        .del()
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to delete connection: ', err))
};


const handleUpdateConnectionType = (req, res, db) => {
    console.log('editConnections Update Type: ', req.body);
    const {fromuser, touser, type} = req.body;
    if (!fromuser || !touser || !type) {
        return res.status(400).json('Type, from user, or to user not provided');
    }

    db('connections').where({
        fromuser: fromuser,
        touser:  touser
    })
        .update({
            type: type,
        })
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to delete connection: ', err))
};





module.exports = {
    handleAddConnection,
    handleDeleteConnection,
    handleUpdateConnectionType

};