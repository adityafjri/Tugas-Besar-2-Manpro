import express from 'express';
import mysql from 'mysql'
import path from 'path';

const port = 8080;
const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve('public')));

app.get('/',async(req,res)=>{
    res.render('home')
});

app.get('/pencarian.ejs',async(req,res)=>{
    res.render('pencarian')
})
app.get('/grafik.ejs',async(req,res)=>{
    res.render('grafik')
})
app.get('/graph.ejs',async(req,res)=>{
    res.render('graph')
})
app.listen(port,()=>{
    console.log('ready!');
});

//on progress