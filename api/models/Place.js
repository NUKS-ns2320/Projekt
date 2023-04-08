const mongoose = require('mongoose');

const placeSchema = new  mongoose.Schema({

    // Shema za shranjevanje obrazca o stanovanju/hiši v bazi podatkov
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,


});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;