import { required } from 'joi';

const mongoose =require('mongoose');
const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['home',"office", 'billing', 'shipping'],
        default: 'home'},

        city:{
            type: String,
            required: true,

        },
        state:{
            type: String,
            required: true,
        },
        country:{
            type: String,
            required: true,

        },
        pincode:{
            type: number,
            maxlength: 6,
            required: true,

        },

        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            }
        }



    });

    const Address = mongoose.model('Address', addressSchema);
    export default Address;