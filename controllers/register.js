const handleRegister = (req, res, db, bcrypt) => {
    const { email, firstName, lastName, userName, password, city, bio } = req.body;
    if (!email || !firstName || !lastName || !userName || !password || !city || !bio) {
        return res.status(400).json('Incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email,
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        joined: new Date(),
                        firstName: firstName,
                        lastName: lastName,
                        userName: userName,
                        city: city,
                        bio: bio
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('Unable to register: ', err))



}

module.exports = {
    handleRegister: handleRegister
};


