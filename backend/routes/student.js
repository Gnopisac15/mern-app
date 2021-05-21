const router = require('express').Router();

let Student = require('../models/student.models');

//home
router.route('/').get((req, res) =>{
    Student.find()
    .then(student => res.json(student))
    .catch(error => res.status(404).json("Error: "+error))
});


//add student 

router.route('/add').post((req,res) =>{ 
    const fullName = req.body.fullName;
    const email = req.body.email;

    const newStudent= new Student ({fullName, email});

    newStudent.save()
        .then(student => res.json("New student added"))
        .catch(error => res.status(400).json("Error: "+ error))

});

//delete student
router.route('/delete/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(student => res.json('Record was deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//update
  
router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.fullName = req.body.fullName;
            student.email = req.body.email;
            student.save()
                .then(student => res.json("Record was updated."))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// details
router.route('/details/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;