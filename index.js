const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
var pool;
pool = new Pool({
    //connectionString:'postgres://postgres:SFU716!!qusrlgus@localhost/users'
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
    var size = req.body.size;
    var height = req.body.height;
    var type = req.body.type;
    var values=[uid, name, age, size, height, type];
    pool.query('SELECT * FROM usr WHERE id=$1', [uid], (error,result)=>{
        if(error)
            res.end(error);
        else if(result&&result.rows[0]){
            res.send(`USER ID is already taken!`);
        }
        else{
            var insertUsersQuery=`INSERT INTO usr (id, name, age, size, height, type) VALUES ($1,$2,$3,$4,$5,$6)`
            pool.query(insertUsersQuery,values, (error,result)=>{
                if(error)
                    res.end(error);
                else{
                    res.send(`USER ID: ${uid} HAS BEEN SUBMITTED!`);
                }
            })
        }
    })

});

app.post('/deleteuser', (req, res) => {
    var uid = req.body.uid;
    pool.query('DELETE FROM usr WHERE id=$1',[uid], (error,result)=>{
        if(error)
            res.end(error);
        else{
            res.send(`USER ID: ${uid} HAS BEEN DELETED!`);
        }
    })
});


app.post('/edituser', (req, res) => {
    var uid = req.body.uid;
    var name = req.body.name;
    var age = req.body.age;
    var size = req.body.size;
    var height = req.body.height;
    var type = req.body.type;
    var values=[name, age, size, height, type, uid];
    var editUsersQuery='UPDATE usr SET name=$1, age=$2, size=$3, height=$4, type=$5 where id=$6';
    pool.query(editUsersQuery, values, (error,result)=>{
        if(error)
            res.end(error);
        else{
            res.send(`USER ID: ${uid} HAS BEEN EDITED!`);
        }
    })
});

app.get('/:uid', (req, res) => {
    var uid = req.params.uid;
    pool.query('SELECT * FROM usr WHERE id=$1', [uid], (error,result)=>{
        if(error)
            res.end(error);
        res.send(result.rows[0]);
    })
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
