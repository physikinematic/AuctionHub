const regex = {
  'email': /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  'password': /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
  'text': /^[a-zA-Z]+$/,
  'date': /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/,
}

module.exports = (type, text) => regex[type]?.test(text);