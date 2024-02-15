const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)

connection.query("create table if not exists people (id INT AUTO_INCREMENT PRIMARY KEY , name varchar(32) not null ) ");

insertName = () => {
    var words = ['Ronaldo', 'Pele', 'Messi','Cristiano Ronaldo', 'Ronaldinho', 'Neymar','Arrascaeta'];
    var word = words[Math.floor(Math.random() * words.length)];

    let query = `INSERT INTO people (name) VALUES ?;`; 
    let values = [[word]]; 
    connection.query(query, [values]); 
}

// Executing the query 
app.get('/', (req,res) => {
    insertName();

    connection.query("SELECT * FROM people",function (err,result,fields){
        console.log(result)
        resp = '<h1>Full Cycle Rocks!</h1>'
        for(i=0;i<result.length;i++){
            resp += '<li>'+result[i].name +'</li>';
        }
        res.send(resp)
    });
    
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})