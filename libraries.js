var fs=require('fs');
var os=require('os');

var user=os.userInfo();
console.log(user);
console.log(user.username);

fs.appendFile('greetings.txt',"How are you "+user.username,()=>{
    console.log("Text is written");
})