/* handle error */
//process.on('uncaughtException', function() {})
//process.on('unhandledRejection', function() {})
/* libraries */

const http = require("http");
const port = 80;
const axios = require('axios');
const fs = require("fs");
path = require("path");
url = require("url");

/* run server */

function formDataToJson(formData) {
    const obj = {};
    formData.forEach((value, key) => { 
        obj[key] = value
    });
    obj = JSON.stringify(obj)
}

const server = http.createServer(function(req,res){
    if (req.url.startsWith("/apitel/") && req.method == "GET"){
        tel_url = req.url.split("/apitel/");
        tel_url.splice("",1);
        tel_url = "https://api.telegram.org/"+tel_url.join("/apitel/");
        axios.get(tel_url).then(function(response){
            res.write(JSON.stringify(response.data));
            res.end();
        }).catch(function (error) {
            if (error.response) {
                res.writeHead(error.response.status);
                res.write(JSON.stringify(error.response.data));
                res.end();
    
            }else{
                res.write("error");
                res.end();
            }
            });
    
    }else if (req.url.startsWith("/apitel/") && req.method == "POST"){
        tel_url = req.url.split("/apitel/");
        tel_url.splice("",1);
        tel_url = "https://api.telegram.org/"+tel_url.join("/apitel/");
        var body = "";
        req.on("data", function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            console.log(JSON.stringify(body)[0]);
            const request_config = {
                method: 'post',
                url: tel_url,
                headers: {}, 
                body: formDataToJson(JSON.stringify(body))
              };
              axios(request_config).then(function(response){
                res.write(JSON.stringify(response.data));
                res.end();
            }).catch(function (error) {
                if (error.response) {
                    res.writeHead(error.response.status);
                    res.write(JSON.stringify(error.response.data));
                    res.end();
        
                }else{
                    res.write("error");
                    res.end();
                }
                });
            })
        

    }else if (req.url == "/"){
        var localpath = path.join(process.cwd(), "/index.html")
        var index = fs.readFileSync(localpath, 'utf-8').toString();
        res.write(index);
        res.end()
    }else{
        console.log(req.url);
        var urlpath = url.parse(req.url).pathname;
        var localpath = path.join(process.cwd(), urlpath)
        
        fs.exists(localpath, function(result) { 
            if (!result){
                res.writeHead(302, {
                    'Location': '/'
                    });
                    res.end();
            }else{
                if (localpath.endsWith(".jpg")){
                    fs.readFile(localpath, function(err, data) {
                          res.writeHead(200, {'Content-Type': 'image/jpeg'});
                          res.end(data);
                    })
                }else if (localpath.endsWith("webserver.js")){
                    res.writeHead(302, {
                        'Location': '/'
                        });
                        res.end();
                }else if (localpath.split("..").length > 1){
                    res.writeHead(302, {
                        'Location': '/'
                        });
                        res.end();
                }else{
                    res.write(fs.readFileSync(localpath, 'utf-8').toString());
                    res.end();
                }
                
            }
        });
    }
    
});

/* listen port */
server.listen(port,function(error){
    if (error){
        console.log("Somthing went wrong, ",error);
    }else{
        console.log("Server Runned on Port",port);
    }
});