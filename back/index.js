let https = require('https');
let express = require('express');
let {Client} = require("pg");
let bodyParser = require('body-parser');
let cors = require('cors');
let fs = require('fs');
//HTTPS CERTIFICATE
const key = fs.readFileSync('./key.key');
const cert = fs.readFileSync('./cert.cert');
//
let app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

const port = 6309;
const server = https.createServer({key:key,cert:cert},app);


//PUT YOU DATA HERE
let client = new Client({
    host:"localhost",
    database:"powa",
    port:"5432",
    user:"postgres",
    password:"1234"
})



try {
    client.connect().then(() => console.log('Connected successfully'))
}
catch (e) {
    console.log(e)
}
let pageSize = 5 ;
let responseArray = (array , pagesize, page) =>{
    let resArray = []
        for(let i = (page-1) * pagesize ;i<(page-1) * pagesize + pagesize ;i++) {
            if (array[i]) {
                resArray.push(array[i])
            }
        }
        return resArray
};

app.get('/servers/:page',async (req,res)=>{
    try {
        let Servers = await client.query("select ps.hostname , ps.alias, ps.id from powa_servers ps order by alias");
        let pages = Math.ceil(Servers.rows.length / pageSize) ;
        res.setHeader("content-type", "application/json");
        res.send(JSON.stringify(
            {data:responseArray(Servers.rows , pageSize , req.params.page),
                lastPage:pages}
                ));
        res.end();
    }
    catch (e) {
        console.log(e)
    }
})

app.get('/server/databases/:id/:page',async(req,res)=>{
    try {
        let DBs = await client.query("select d.datname , d.oid from powa_databases d where d.srvid = $1 and d.dropped is null order by datname", [req.params.id])
        let pages = Math.ceil(DBs.rows.length / pageSize) ;
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify({
            data:responseArray(DBs.rows , pageSize , req.params.page),
            lastPage:pages}));
        res.end();
    }
    catch (e) {
        console.log(e)
    }
})

app.get('/server/database/pgBadger/:id',async(req,res)=>{
    try {
        let pgBadgers = await client.query("select pr.id , ps.alias , d.datname ,pr.filename, pr.btimestamp as \"Begin_time\" , pr.etimestamp as \"End_time\", pr.status from powa_rpgbadger pr join powa_servers ps on ps.id = pr.srvid left join powa_databases d on d.\"oid\" = pr.dbid where ps.id = $1 order by ps.alias, d.datname", [req.params.id])
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(pgBadgers.rows));
        res.end();
    }
    catch (e) {
        console.log(e)
    }
})

app.put('/PutDataForNewpgBadger',async (req,res)=>{
    if(req.body.dbid === "all") {
        try {
            client.query("INSERT INTO public.powa_rpgbadger (srvid, btimestamp, etimestamp) VALUES($1 , $2 ,  $3);", [req.body.srvid, req.body.firstdate, req.body.lastdate]);
            let pgBadgers = await client.query("select ps.alias , d.datname , pr.btimestamp as \"Begin_time\" , pr.etimestamp as \"End_time\", pr.status from powa_rpgbadger pr join powa_servers ps on ps.id = pr.srvid left join powa_databases d on d.\"oid\" = pr.dbid where ps.id = $1 order by ps.alias, d.datname", [req.body.srvid])
            res.setHeader("content-type", "application/json")
            res.send(JSON.stringify(pgBadgers.rows));
            res.end();
        }catch (e) {
            console.log(e)
        }
    }
    else {
        console.log(req.body)
        try {
            console.log(req.body)
            client.query("INSERT INTO public.powa_rpgbadger (srvid, dbid, btimestamp, etimestamp) VALUES($1 , $2 ,  $3 , $4);", [req.body.srvid, req.body.dbid, req.body.firstdate, req.body.lastdate])
            let pgBadgers = await client.query("select ps.alias , d.datname , pr.btimestamp as \"Begin_time\" , pr.etimestamp as \"End_time\", pr.status from powa_rpgbadger pr join powa_servers ps on ps.id = pr.srvid left join powa_databases d on d.\"oid\" = pr.dbid where ps.id = $1 order by ps.alias, d.datname", [req.body.srvid])
            res.setHeader("content-type", "application/json")
            res.send(JSON.stringify(pgBadgers.rows));
            res.end();
        }catch (e) {
            console.log(e)
        }
    }
});


app.get('/getfile/:id',async(req,res)=> {
    try {
        let file = await client.query("SELECT report , filename FROM powa_rpgbadger WHERE id = $1;",[req.params.id]);
        fs.writeFile(`report.gz`,file.rows[0].report,'binary',(err)=>{
            console.log(err);
            res.download('E:/Projects/vuepgback/report.gz',file.rows[0].filename,(err)=>{
                console.log(err);
                fs.unlink('E:/Projects/vuepgback/report.gz',(err)=>{
                    console.log(err);
                    res.end
                })
            })
        })


    }catch (e) {
        console.log(e)
    }
})

server.listen(port,()=>{console.log(`Successfully launched on port:${port}`)});
