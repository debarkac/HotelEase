const notes=require("./notes.js")
var _ = require('lodash');

var age=notes.age;
console.log(age)

console.log(notes.add(age,18))

const arr=["argha","argha","abhrajit",2,2,5,5,"bottle",2,"abhrajit"]
console.log(_.uniq(arr))//printing only the unique elements of the array