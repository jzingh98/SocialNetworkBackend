const handleRegister = (req, res, db, bcrypt) => {
    console.log('signUp: ', req.body);
    const { email, firstName, lastName, userName, password, city, bio } = req.body;
    if (!email || !firstName || !lastName || !userName || !password || !city || !bio) {
        return res.status(400).json('Incorrect form submission');
    }
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        console.log("AAAAAAAAAAAA");
        trx.insert({
            hash: hash,
            email: email,
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                console.log("BBBBBBBBBBBBBBBBBBB");
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        joined: new Date(),
                        firstname: firstName,
                        lastname: lastName,
                        username: userName,
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


