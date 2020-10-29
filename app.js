import express from 'express';
const app = express();
const port = process.env.PORT || 9900;
import bodyParser from 'body-parser';
import cors from 'cors';
import NumberLogic from './src/romanToArabic'


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

app.get('/health',(req,res) => {
    res.status(200).send("Hello Ok");
});

app.get('/',(req,res) => {
    res.render('index.ejs');
});

app.get('/arabictoroman',(req,res) => {
    let arabictoroman = req.query.data;
    let out = new NumberLogic(arabictoroman).convertInRoman
    res.send(out)
})

app.get('/romantoarabic',(req,res) => {
    let romantoarabic = req.query.data;
    romantoarabic= romantoarabic.toString()
    console.log("romantoarabic>>",romantoarabic)
    let out = new NumberLogic(romantoarabic).convertInArabic
    console.log("out>>",out)
    res.json(out)
})


app.listen(port,(err) => {
    console.log(`Server is running on port ${port}`)
})