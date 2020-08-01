const handleCreateEvent = (req, res, db) => {
    console.log("handleAddEvent");
    console.log(req.body);
    const {name, host, invited, location, details, time, duration} = req.body;
    if (!name || !host || !invited || !location || !details || !time || !duration) {
        return res.status(400).json('enough info not provided');
    }
    db('events')
        .insert({
            name: name,
            host: host,
            invited: invited,
            location: location,
            details: details,
            time: new Date(),
            duration: duration,
            created: new Date()
        })
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to add event: ', err))
};


const handleDeleteEvent = (req, res, db) => {
    console.log("handleDeleteEvent");
    console.log(req.body);
    const {id} = req.body;
    if (!id) {
        return res.status(400).json('id not provided');
    }
    db('events').where({
        id: id,
    })
        .del()
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to delete event: ', err))
};


const handleUpdateEvent = (req, res, db) => {
    console.log("handleUpdateEvent");
    console.log(req.body);
    const {id, name, host, invited, location, details, time, duration} = req.body;
    if (!id || !name || !host || !invited || !location || !details || !time || !duration) {
        return res.status(400).json('enough info not provided');
    }
    db('events').where({
        id: id,
    })
        .update({
            name: name,
            host: host,
            invited: invited,
            location: location,
            details: details,
            time: time,
            duration: duration,
        })
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to delete event: ', err))
};


const handleRetrieveEvents = (req, res, db) => {
    console.log("handleRetrieveEvents");
    console.log(req.body);
    const { userName } = req.body;
    if (!userName) {
        return res.status(400).json('username not provided');
    }

    //TODO: Add functionality to only select events intended to be visible to user

    db.select('*').from('events')
        .then(entries => {
            if (entries.length) {
                res.json(entries)
            } else {
                res.status(400).json('No events found')
            }
        })
        .catch(err => res.status(400).json('error retrieving events'))
};


module.exports = {
    handleCreateEvent,
    handleDeleteEvent,
    handleUpdateEvent,
    handleRetrieveEvents
};
