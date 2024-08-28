// function callback(){
//     console.log("Add is completed");
// }

// const add=function(a,b,callback){
//     result=a+b;
//     console.log(result);
//     callback();
// }

// add(2,5,callback); 



const add=function(a,b,func){
    result=a+b;
    console.log(result);
    func();
}
//instead of writing another callback function, the function is being written together
add(2,5,function(){
    console.log("Add completed");
})