const regex = {
  'email': /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  'password': /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
  'text': /^[a-zA-Z]+$/
}

module.exports = (type, text) => regex[type]?.test(text);