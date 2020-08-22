const handleCreatePost = (req, res, db) => {
    console.log("handleCreatePost");
    console.log(req.body);
    const {name, host, invited, location, details, time, duration} = req.body;
    if (!name || !host || !invited || !location || !details || !time || !duration) {
        return res.status(400).json('enough info not provided');
    }
    db('posts')
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
        .catch(err => res.status(400).json('Unable to add post. Check fields: ', err))
};


const handleDeletePost = (req, res, db) => {
    console.log("handleDeletePost");
    console.log(req.body);
    const {id} = req.body;
    if (!id) {
        return res.status(400).json('id not provided');
    }
    db('posts').where({
        id: id,
    })
        .del()
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to delete post: ', err))
};


const handleUpdatePost = (req, res, db) => {
    console.log("handleUpdatePost");
    console.log(req.body);
    const {id, name, host, invited, location, details, time, duration} = req.body;
    if (!id || !name || !host || !invited || !location || !details || !time || !duration) {
        return res.status(400).json('enough info not provided');
    }
    db('posts').where({
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
        .catch(err => res.status(400).json('Unable to delete post: ', err))
};


const handleRetrievePosts = (req, res, db) => {
    console.log("handleRetrievePosts");
    console.log(req.body);
    const { username } = req.body;
    if (!username) {
        return res.status(400).json('username not provided');
    }

    //TODO: Add functionality to only select posts intended to be visible to user

    db.select('*').from('posts')
        .then(entries => {
            if (entries.length) {
                res.json(entries)
            } else {
                res.status(400).json('No posts found')
            }
        })
        .catch(err => res.status(400).json('error retrieving posts'))
};


module.exports = {
    handleCreatePost,
    handleDeletePost,
    handleUpdatePost,
    handleRetrievePosts
};
