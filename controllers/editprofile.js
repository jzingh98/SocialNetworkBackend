
const handleEditProfile = (req, res, db) => {
    console.log('editProfile: ', req.body);
    const {email, firstname, lastname, username, city, bio} = req.body;
    if (!email || !firstname || !lastname || !username || !city || !bio) {
        return res.status(400).json('Email, name, city, or bio not provided');
    }

    db('users').where('email', '=', email)
        .update({
            firstname: firstname,
            lastname: lastname,
            username: username,
            city: city,
            bio: bio
        })
        .returning('*')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to update profile: ', err))

};


module.exports = {
    handleEditProfile,
};