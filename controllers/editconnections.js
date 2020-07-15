
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
    const {fromuser} = req.body;
    if (!fromuser) {
        return res.status(400).json('From user not provided');
    }

    db('connections').where('fromuser', '=', fromuser)
        .del()
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to delete connection: ', err))
};



module.exports = {
    handleAddConnection,
    handleDeleteConnection
};