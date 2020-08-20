const handleRegister = (req, res, db, bcrypt) => {
    console.log('signUp: ', req.body);
    const { email, firstname, lastname, username, password, city, bio } = req.body;
    if (!email || !firstname || !lastname || !username || !password || !city || !bio) {
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
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
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