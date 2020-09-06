const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Favors = new Schema({
    ower: {
        type: Schema.Types.ObjectId,
        require: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        require: true
    },
    favor_detail: {
        type: String,
        require: true
    },
    picture_proof_id: {
        type: Schema.Types.ObjectId,
        require: true
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    end_time: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Favors', Favors, 'favors')