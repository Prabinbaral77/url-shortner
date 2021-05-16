const mongoose  = require('mongoose')

mongoose.connect(process.env.MONGODB_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//mongodb+srv://urlshortner:<password>@cluster0.4l7af.mongodb.net/test