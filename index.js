const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
var pool;
pool = new Pool({
    connectionString:process.env.DATABASE_URL
})

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/database', (req, res) => {
    var getUsersQuery='SELECT * FROM usr';
    pool.query(getUsersQuery, (error,result)=>{
        if(error)
            res.end(error);
        var results = {'rows':result.rows}
        res.render('pages/db', results);
    })
});

app.post('/adduser', (req, res) => {
    var uid = req.body.uid;
    var name = req.body.name;
    var age = req.body.age;
    var weight = req.body.weight;
    var height = req.body.height;
    var type = req.body.type;
    var values=[uid, name, age, weight, height, type];
    pool.query('SELECT * FROM usr WHERE id=$1', [uid], (error,result)=>{
        if(error)
            res.end(error);
        else if(result.rows[0] && result.rows[0]['id']==uid){
            window.alert('id already taken');
        }
        else{
            var insertUsersQuery=`INSERT INTO usr (id, name, age, weight, height, type) VALUES ($1,$2,$3,$4,$5,$6)`
            pool.query(insertUsersQuery,values, (error,result)=>{
                if(error)
                    res.end(error);
                res.send(`USER ID: ${uid} HAS BEEN SUBMITTED!`);
            })
        }
    })

});

app.post('/deleteuser', (req, res) => {
    var uid = req.body.uid;
    pool.query('DELETE FROM usr WHERE id=$1',[uid], (error,result)=>{
        if(error)
            res.end(error);
        res.send(`USER ID: ${uid} HAS BEEN DELETED!`);
    })
});


app.post('/edituser', (req, res) => {
    var uid = req.body.uid;
    var name = req.body.name;
    var age = req.body.age;
    var weight = req.body.weight;
    var height = req.body.height;
    var type = req.body.type;
    var values=[name, age, weight, height, type];
    var editUsersQuery='UPDATE usr SET name=$1, age=$2, weight=$3, height=$4, type=$5 where id=$6';
    pool.query(editUsersQuery, values, [uid], (error,result)=>{
        if(error)
            res.end(error);
        res.send(`USER ID: ${uid} HAS BEEN EDITED!`);
    })
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
