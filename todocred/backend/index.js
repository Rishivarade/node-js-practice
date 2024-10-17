const express = require("express");
//for read and write data
const fs = require("fs");
const uniqid = require("uniqid")

const app = express();
//for parse req.body data middleware
app.use(express.json());
//get data 
app.get("/", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            const todo = JSON.parse(data);
            res.send(todo)
            console.log(todo)
        }
    })
})
//post data
app.post("/addproduct", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            const newdata = JSON.parse(data)
            const id = uniqid()

            newdata.push(
                {
                    id: id,
                    ...req.body
                }

            )
            console.log(newdata)
            // res.send("ok")       
            fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("product posted")
                }

            })
        }
    })

})
//delete data by id
app.delete("/delete/:productid", (req, res) => {
    //get id by req
    const { productid } = req.params
    console.log(req.params)
    //read data from db.json and write
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            let newdata = JSON.parse(data);
            newdata = newdata.filter((el) => el.id != productid) // access product array
            fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("product deleted")
                }
            })
        }
    })
})

//patch data by id
app.patch("/update/:productid", (req, res) => {
    const { productid } = req.params
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            const newdata = JSON.parse(data)
            const index = newdata.findIndex((el) => el.id == productid)
            if (index != -1) {
                newdata[index] = { ...newdata[index], ...req.body }
                console.log(newdata)
                fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("product updated")
                    }
                })
            } else {
                res.send("product not found")
            }


        }
    })

})

app.listen(8008, () => {
    console.log("server is running on port 8008")
})