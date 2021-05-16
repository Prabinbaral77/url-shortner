const express = require('express')
require('./db/mongoose')

const ShortUrl = require('./models/shortUrl')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))

const port = process.env.PORT

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
   await res.render('index', { shortUrls })
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({full: req.body.fullurl})
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl})
    if(!shortUrl) {
        return res.status(404).send()
    }
    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(port, () => {
    console.log(`Server is on port ${port}`);
})

