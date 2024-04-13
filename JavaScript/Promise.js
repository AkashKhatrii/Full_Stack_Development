let p = new Promise(function(resolve){
    resolve('hi there');
})

p.then(function(){
    console.log(p); // logs -> Promise { 'hi there' }
})