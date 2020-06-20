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
    pool.query('SELECT * FROM usr WHERE id=$1 returning *', [uid], (error,result)=>{
        if(error)
            res.end(error);
        else if(result.rows[0] && result.rows[0]['id']==uid){
            window.alert('id already taken');
        }
        else{
            var insertUsersQuery=`INSERT INTO usr (id, name, age, weight, height, type) VALUES (`+uid+`,`+name+`,`+age+`,`+weight+`,`+height+`,`+type+`)`
            pool.query(insertUsersQuery, (error,result)=>{
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


app.get('/users/:id', (req, res) => {
    var uid = req.params.id;
    console.log(req.params.id);
    //search the database using the uid
    res.send("got it!");
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
