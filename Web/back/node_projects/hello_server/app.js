import express from 'express'

import fs from 'fs'

const app = express()

// Puerto, para direccionar a un proceso especifico
const port = 3000

// Software que atraves de app.use los pasa primero atraves de un interprete de texto
app.use(express.json()) 

app.get('/', (req, res)=> {
    fs.readFile('./html/home.html', 'utf8', (err, html) => {
        if(err) {
            res.status(500).send('There was an error: ' + err)
            return
        }
        console.log("Sending page...")
        res.send(html)
        console.log("Page sent!")
    }
    )
})

// Pide algo al servidor
app.get('/person', (req, res)=> 
{
    console.log("hello server")

    const person = {
        name: "Valentina",
        email: "a01028209@tec.mx",
        message: "Hello world from server"
    }

    res.json(person)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})