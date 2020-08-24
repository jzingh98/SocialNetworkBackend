const handleCreatePost = (req, res, db) => {
    console.log("handleCreatePost");
    console.log(req.body);
    const {poster, title, details} = req.body;
    if ( !poster || !title || !details) {
        return res.status(400).json('enough info not provided');
    }
    db('posts')
        .insert({
            poster: poster,
            title: title,
            details: details,
        })
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to add post. Check fields: ', err))
};


const handleRetrievePosts = (req, res, db) => {
    console.log("handleRetrievePosts");
    console.log(req.body);
    const { username } = req.body;
    if (!username) {
        return res.status(400).json('username not provided');
    }

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
    handleRetrievePosts
};
