console.log("Notes page loaded");

var age=19;
const add=function(a,b){
    return a+b;
}

//exporting the contents. otherwise the variables cannot be used.
module.exports={
    age,
    add
}