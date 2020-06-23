const adminSchema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', adminSchema);


