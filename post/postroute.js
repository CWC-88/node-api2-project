const express = require("express")
const blogposts = require('../data/db')
const router = express.Router()

//create post//

router.post('/',(req,res,next)=>{
    blogposts.insert(req.body)
    .then(newPost=>{
        res.status(201).json(newPost)
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            message:'failure to create new post'
        })
    })
})



//create comment for post//
router.post('/:id/comments',(req,res)=>{
    blogposts.findCommentById(req.params.id)
    .then(s=>{
        if(s){

            blogposts.insertComment(req.body)
            .then(s2=>{
                res.status(201).json(s2)
            })
        }
        else{
            console.log('fail')
        }
    })
})


//get posts//
router.get("/", (req,res,next)=>{
blogposts.find()
.then(got =>{
    res.status(200).json(got)
})
.catch(error=>{
    console.log(error)
    res.status(500).json({
        message:'failure to get'
    })
})
})


//get posts by id//
router.get("/:id", (req,res,next)=>{
    blogposts.findById(req.params.id)
    .then(gotbyid =>{
        if (gotbyid){
            res.status(200).json(gotbyid)
        } 
        else
        {
            res.status(200).json({message:'no post for u'})
        }
    })
    .catch(error=>{
        console.log(error)
        res.status(500).json({
            message:'failure to get posts by id'
        })
    })
    })

  //get comments by id//
  router.get('/:id/comments', (req,res)=>{
      blogposts.findCommentById(req.params.id)
      .then(success=>{
          if(success){
              res.status(200).json(success)
          }
          else{
              res.status(404).json({
                  message:"post not found"
              })
          }
      })
      .catch(error=>{
        console.log(error)
        res.status(500).json({
            message:'failure to get comments by id'
        })
    })

  })

//update
router.put('/:id',(req,res)=>{
    blogposts.update(req.params.id,req.body)
    .then(uppost=>{
        if(uppost===1){
            res.status(200).json(req.body)
        }
        else{
            res.status(404).json({
                message: "id and post dont exist."
            })
            .catch(err => {
                console.log({err})
                res.status(500).json({
                    error: "post cannot be updated."
                })
            })
        }
    })
})


  //delete//
  router.delete('/:id',(req,res)=>{
      blogposts.remove(req.params.id)
      .then((postrem)=>{
          if(postrem){
              res.status(200).json(postrem)
          }
          else{
              res.status(404).json({
                  message:"id/post does not exist"
              })
          }
      })
      .catch(error=>{
        console.log(error)
        res.status(500).json({
            message:'failure to remove'
        })
    })


  })




module.exports = router 