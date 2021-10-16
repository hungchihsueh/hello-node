const fs = require("fs");



function readFilePromise () {
    return new Promise ((resolve,reject)=>{
        fs.readFile("foo.txt", "utf-8", (err,data)=>{
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}


readFilePromise()
.then(
    (data)=>{console.log("讀檔成功",data)})
.catch(
    (err)=>{console.error("讀檔失敗",err)}
);
    

// readFile("input.txt", (err, data) => {
//   if (err) {
//     console.error("發生錯誤", err);
//   } else {
//     console.log("正確讀到", data);
//   }
// });
