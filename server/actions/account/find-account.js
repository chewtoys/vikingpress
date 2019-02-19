const findUser = require('../../helpers/find-user')

module.exports = async (req, res) => {
    /** Extract username from request body. */
    let username = req.body.username
    
    /** Use the given ID to retrieve the user info from the database. */
  let {_id, name, auth} = await findUser([{username: username}, {email: username}], '_id auth.provider name.first', false)
  
  /** If there's no user found, find a dark corner to cry in. */
  if (!_id) {
      return res.status(404).send('User not found. Sad!')
  }
  
  /** Otherwise, send the user information. */
  res.send({_id, name, auth, username})
}