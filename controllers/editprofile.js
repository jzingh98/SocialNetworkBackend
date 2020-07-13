
const handleEditProfile = (req, res, db) => {
    console.log('editProfile: ', req.body);
    const {email, firstName, lastName, userName, city, bio} = req.body;
    if (!email || !firstName || !lastName || !userName || !city || !bio) {
        return res.status(400).json('Email, name, city, or bio not provided');
    }

    db('users').where('email', '=', email)
        .update({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
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