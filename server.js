var PORT = process.env.PORT || 5000;
const express = require("express");
const morgan = require("morgan");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const mailer = require("./Public/assets/js/mailer");
var fs = require('fs');

app.listen(PORT, () => {
    console.log("listening at http://localhost:5000")
});
app.use(express.static('Public'));
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

// app.set('views' , './views');

// app.set('view engine' , 'ejs');

app.get('/',(req, res) => {
    res.sendFile('index.html', {root: __dirname })
});

app.get('/contact', (req, res) => {
res.render('contact');
});

app.post('/thanks', (req, res) => {
res.render('thanks', { contact: req.body })
});

app.post('/submit', (req, res) => {
    console.log(req.body);
mailer(req);
res.sendFile('index.html', {root: __dirname });
});

const assets = 'Public/assets';
const videoName = 'motidashVid'; // without extension

router.get('/', (req, res) => {

    fs.access(assets+'/images/'+videoName+'.png', fs.F_OK, (err) => {
        
        if (err) {
            exec(`bin/ffmpeg -i ${assets}/${videoName}.mp4 -ss 00:00:04.00 -r 1 -an -vframes 1 -f mjpeg ${assets}/images/${videoName}.jpg`, (error, stdout, stderr) => {
                if (error) {
                    return;
                }
    
                res.render('index', {
                    image: `/assets/images/${videoName}.jpg`
                });
            });
        }

        if(err === null) {
            res.render('index', {
                image: `/assets/images/${videoName}.jpg`
            });
        }
    });
});


router.get('/video', (req, res) => {

    const path = 'Public/assets/motidashVid.mp4';

    fs.stat(path, (err, stat) => {

        // Handle file not found
        if (err !== null && err.code === 'ENOENT') {
            res.sendStatus(404);
        }

        const fileSize = stat.size
        const range = req.headers.range

        if (range) {

            const parts = range.replace(/bytes=/, "").split("-");

            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
            
            const chunksize = (end-start)+1;
            const file = fs.createReadStream(path, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
    });
});

app.use(router);    
