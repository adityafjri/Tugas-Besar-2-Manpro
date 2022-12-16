import express from 'express';
import mysql from 'mysql'
import path, { resolve } from 'path';

const port = 8080;
const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve('public')));

const pool = mysql.createPool({
    user:'root',
    password:'',
    database:'book',
    host:'localhost',
    dateStrings:true,
    connectionLimit:10
})

const dbConnnect = () =>{
    return new Promise((resolve,rejects)=>{
        pool.getConnection((err,conn)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(conn)
            }
        })
    })
}


app.get('/bar-chart',async(req,res)=>{
    const conn = await dbConnnect();
    const book = await getBook(conn);
    if(req.query.Buku===undefined){
        const top = await getTopTen(conn,0);
        conn.release();
        res.render('bar-chart',{
            book:book,
            topBook:top
        });
    }else{
        const top = await getTopTen(conn,req.query.Buku);
        conn.release();
        res.render('bar-chart',{
            book:book,
            topBook:top
        });
    }
    
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


const getBook = ((conn)=>{
    return new Promise((resolve,rejects)=>{
        conn.query(`SELECT DISTINCT book FROM book_of_trones`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
});

const getTopTen = ((conn,book)=>{
    return new Promise((resolve,rejects)=>{
        conn.query(`SELECT SUM(Weight) as jumlah ,Source FROM book_of_trones WHERE Book LIKE ${book} GROUP BY Source ORDER BY jumlah DESC LIMIT 10`,(err,result)=>{
            if (err) {
                rejects(err);
            } else {
                resolve(result);
            }
        })
    })
});
//on progress

app.get('/',async(req,res)=>{
    res.render('home')
});