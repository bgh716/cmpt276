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
    console.log("post request for /adduser");
    var id = req.body.id;
    var name = req.body.name;
    var age = req.body.age;
    var weight = req.body.weight;
    var height = req.body.height;
    var type = req.body.type;
    var searchUserQuery=`SELECT * FROM usr WHERE id=`+id+``;
    pool.query(searchUserQuery, (error,result)=>{
        if(error)
            res.end(error);
        else if(result[0] && result[0]['id']==id){
            window.alert('id already taken');
            res.end();
        }
        else{
            res.send(`name: ${name}, age: ${age}, weight: ${weight}, height: ${height}, type: ${type}`);
            var insertUsersQuery=`INSERT INTO usr (id, name, age, weight, height, type) VALUES (`+id+`,`+name+`,`+age+`,`+weight+`,`+height+`,`+type+`)`
            var values=[name,age,weight,height,type];
            pool.query(insertUsersQuery, (error,result)=>{
                if(error)
                    res.end(error);
            })
        }
    })

});


app.get('/users/:id', (req, res) => {
    var uid = req.params.id;
    console.log(req.params.id);
    //search the database using the uid
    res.send("got it!");
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
