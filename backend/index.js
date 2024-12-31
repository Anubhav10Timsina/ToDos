const express = require("express")
const cors = require("cors")
const app = express()
const pool = require("./db")


app.use(cors())
app.use(express.json())
const port = 8080

app.get("/todolist", async (req, res) => {

  const listResult = await pool.query(`SELECT * FROM To_do `)
  res.json({
    result: listResult.rows,
  })
})

app.post("/addTodos", async (req, res) => {
    const data = req.body;
    const converted = data.todos; 
  
    console.log(converted)
    const values = converted.map((todo, idx) => `($${idx + 1})`).join(",");
  console.log(values)
    try {
      const result = await pool.query(
        `INSERT INTO To_do(todos) VALUES ${values}`,
        converted
      );
      res.json({
        status: "done",
        inserted: result.rows,
      });
    } catch (error) {
      console.error(error.stack);
      res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  });  
  
  
app.post("/deleteTodos/:id", async (req, res) => {

try{
    const id = req.params.id
    const response = await pool.query(`DELETE FROM To_do WHERE id = ${id}`)
    res.json({
        status: "done",
      })
   
}catch(error){
    console.log(error)
    res.json({
        status: "error",
      })
}
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
