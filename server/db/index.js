const mongoose = require('mongoose')
console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).catch(e => {
    console.error('Connection error', e.message)
})

const db = mongoose.connection

module.exports = db