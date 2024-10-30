import express from "express";

const app = express();
const port = 3000;
app.use(express.json())

let teaData = [];
let nextId = 1;

//add new tea in array
app.post('/teas',(req,res) => {
    const {name,price} = req.body; //Body is use to get respone from BODY
    const newTea = {id:nextId++ , name,price}
    teaData.push(newTea);
    res.status(201).send(newTea);
})

//get all tea
app.get('/teas',(req,res) => {
    res.status(200).send(teaData);
})

//find spefific tea
app.get('/teas/:id',(req,res) => {
    const tea = teaData.find(t => parseInt(req.params.id) === t.id) //params are used to get information from URL.
    if(!tea){
        return res.status(404).send("The not found");
    }
    res.status(200).send(tea);
})

//updating record
app.put('/teas/:id', (req,res) => {
    const tea = teaData.find(t => parseInt(req.params.id) === t.id) //params are used to get information from URL.
    if(!tea){
        return res.status(404).send("The not found");
    }
    const {name,price} = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea)
})

//delete recored
app.delete('/teas/:id', (req,res)=>{
    const index = teaData.findIndex(t => parseInt(req.params.id) === t.id);
    if(index === -1){
        return res.status(404).send('tea not found');
    }

    teaData.splice(index,1);
    return res.status(204).send('deleted')
})

app.listen(port ,() => {
    console.log(`Server is runing at port ${port}........`);  
})
