const mongoose = require('mongoose');

const username = encodeURIComponent('choudhary8055');
const password = encodeURIComponent('choudhary@8055');
const dbName = 'products';

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.thozdwn.mongodb.net/${dbName}?retryWrites=true&w=majority`)
.then(() => {
    console.log("Mongodb succefully connected...")
}).catch((err) => {
    console.log(`Somthing Goes Wrong..Please Check: ${err.message}`);
});