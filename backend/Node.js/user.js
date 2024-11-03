const users = require('./users.json');
const encrypt = require('./encryption');

const user = (param, query) => {
  const {firstName, lastName, email, password} = query;
  try {
    switch (param) {
      case 'signin':
        const u = users.find(user => user.email === email && encrypt('algo', 'key', user.password) === password);
        if (!!u) {
          const res = {
            'id': u['id'],
            'first name': u['first name'],
            'last name': u['last name'],
            'email': u['email'],
            'bids': u['bids'],
          };
          return res; 
        }
        else {
          return null;
        }
      case 'signout':
        break;
      case 'signup':
        break;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = user;