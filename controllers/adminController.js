const AdminUser = require('../model/adminModel')
const jwt = require('jsonwebtoken')
// Student Model
// ===========================================
const Student = require('../model/studentModel')
// Validating student data
// ===========================================
const ValidateStudent = require('../controllers/validateStudent')
// Subject Model
// ===========================================
const Subjects = require('../model/subjectsModel')
// Bimesters Model
// ===========================================
const FirstBimester = require('../model/firstBimesterModel')
const SecondBimester = require('../model/secondBimesterModel')
const ThirdBimester = require('../model/thirdBimesterModel')
const FourthBimester = require('../model/fourthBimesterModel')
// ===========================================
const JWT_SECRET = process.env.JWT_SECRET
// ===========================================

// Admin Page
const loadAdminPage = (req,res) => {
    res.status(200)
    res.render('adminPage')
}

// HOme Page
const loadHomePage = (req,res) => {
    res.status(200)
    res.render('adminHome')
}

// Login on admin area
const login = async (req,res) => {
    let password = req.body.password.trim()
    
    try {

        let validatePassword = await AdminUser.findOne({password:password})

        if(validatePassword){
            let token = jwt.sign({userPassword:password},JWT_SECRET)

            res.cookie('token', token, {maxAge:28800000, httpOnly: true})
            res.status(200)
            res.render('adminHome')
        }else{
            res.status(400)
            res.render('errorPage',{message:'Password incorrect !', url:"/admin/"})
        }
        
    } catch (error) {
        res.status(400)
        res.render('errorPage',{message:'Password incorrect !', url:"/admin/"})
    }

}

// All students
const loadAllStudentsPage = async (req,res) => {
    let allStudents = await Student.find({})

    res.status(200)
    res.render('allStudents', {students:allStudents})
}

// New Student
const loadAddStudentPage = (req,res) => {
    res.status(200)
    res.render('addStudent')
}

const addNewStudent = async (req,res) => {

    const {error} = ValidateStudent(req.body)
    if(error){
        res.status(400)
        res.render('errorPage',{message:'Complete all the inputs correctly!', url:"/admin/home"})
    }else{
        // Receiving the data
        let studentName = req.body.name.trim()
        let studentCpf = req.body.cpf.trim()
        let StudentPhone = req.body.phone.trim()
        let classNumber = req.body.classNumber.trim()

        try {
            // Creating the object
            let student = {
                name: studentName,
                cpf: studentCpf,
                phone: StudentPhone,
                classNumber:classNumber
            }

            // Cheking if have someone with this CPF
            let chekingCpf = await Student.findOne({cpf:studentCpf})

            if(chekingCpf != null){
                res.render('errorPage',{message:"Already have a student with this CPF!", url:"/admin/addstudent"})
            }else{
                // Saving the user
                student = new Student(student)
                await student.save()

                // Adding the bimester for the Student
                let StudentFound = await Student.findOne({cpf:studentCpf})

                let firstBimester = {
                    studentId:StudentFound.id
                }
                
                let secondBimester = {
                    studentId:StudentFound.id
                }
                
                let thirdBimester = {
                    studentId:StudentFound.id
                }
                
                let fourthBimester = {
                    studentId:StudentFound.id
                }
                
                // Sending to Data  Base
                firstBimester = new FirstBimester(firstBimester)
                secondBimester = new SecondBimester(secondBimester)
                thirdBimester = new ThirdBimester(thirdBimester)
                fourthBimester = new FourthBimester(fourthBimester)

                await firstBimester.save()
                await secondBimester.save()
                await thirdBimester.save()
                await fourthBimester.save()

                res.status(200)
                res.redirect('/admin/allstudents')
            }

        } catch (error) {
            res.status(400)
            res.render('errorPage',{message:"Student wasn't save!", url:"/admin/addstudent"})
        }
    }
   
}

  // EDIT Student

  const loadGradesMenu = async  (req,res) => {
    let id = req.params.id
    
    try {
        // Receiving all the Bimester from Data Base
        let firstBimester = await FirstBimester.findOne({studentId:id})
        let secondBimester = await SecondBimester.findOne({studentId:id})
        let thirdBimester = await ThirdBimester.findOne({studentId:id})
        let fourthBimester = await FourthBimester.findOne({studentId:id})

        // Creating a array with the buttons content
        let buttons = [
            {
                message:'First Bimester',
                id:firstBimester.id,
                type:firstBimester.type
            },
            {
                message:'Second Bimester',
                id:secondBimester.id,
                type:secondBimester.type
            },
            {
                message:'Third Bimester',
                id:thirdBimester.id,
                type:thirdBimester.type
            },
            {
                message:'Fourth Bimester',
                id:fourthBimester.id,
                type:fourthBimester.type
            }
        ]
        
        res.status(200)
        res.render('gradesMenu', {buttons:buttons})
    } catch (error) {
        res.status(400)
        res.render('errorPage',{message:"Menu wasn't load", url:"/admin/allstudents"})
    }
}

const loadEditPage = async (req,res) => {
    let id = req.params.id
    let type = req.params.type

    try {
        if(type == 'first'){
            let grade = await FirstBimester.findById(id)
            
            res.status(200)
            res.render('editGradePage', {title:'First Bimester',subjects:Subjects, grades:grade})
        }else if(type == 'second'){
            let grade = await SecondBimester.findById(id)


            res.status(200)
            res.render('editGradePage', {title:'Second Bimester',subjects:Subjects, grades:grade})
        }else if(type == 'third'){
            let grade = await ThirdBimester.findById(id)

            res.status(200)
            res.render('editGradePage', {title:'Third Bimester',subjects:Subjects, grades:grade})
        }else if(type == 'fourth'){
            let grade = await FourthBimester.findById(id)

            res.status(200)
            res.render('editGradePage', {title:'Fourth Bimester',subjects:Subjects, grades:grade})
        }else{
            res.status(400)
            res.render('errorPage',{message:"Page wasn't load", url:"/admin/allstudents"})
        }    
    } catch (error) {
        res.status(400)
        res.render('errorPage',{message:"Page wasn't load", url:"/admin/allstudents"})
    }
}

const updateGrade = async (req,res) => {
    let id = req.params.id
    let type = req.params.type

    // Receiving the grades from body
    let updatedGrades = {
        Portuguese:req.body.Portuguese,
        PE:req.body.PE,
        English:req.body.English,
        Spanish:req.body.Spanish,
        Physic:req.body.Physic,
        Chemistry:req.body.Chemistry,
        Biology:req.body.Biology,
        History:req.body.History,
        Geography:req.body.Geography,
        Philosophy:req.body.Philosophy,
        Sociology:req.body.Sociology,
    }

    // Updating the grades
    try {
        if(type == 'first'){

            await FirstBimester.findByIdAndUpdate(id,updatedGrades)

            res.status(200)
            res.redirect('/admin/allstudents')
        }else if(type == 'second'){

            await SecondBimester.findByIdAndUpdate(id,updatedGrades)

            res.status(200)
            res.redirect('/admin/allstudents')
        }else if(type == 'third'){

            await ThirdBimester.findByIdAndUpdate(id,updatedGrades)

            res.status(200)
            res.redirect('/admin/allstudents')
        }else if(type == 'fourth'){

            await FourthBimester.findByIdAndUpdate(id,updatedGrades)

            res.status(200)
            res.redirect('/admin/allstudents')
        }else{
            res.status(400)
            res.render('errorPage',{message:"Page wasn't load", url:"/admin/allstudents"})
        }   
    } catch (error) {
        res.status(400)
        res.render('errorPage',{message:"Page wasn't load", url:"/admin/allstudents"})
    }
}

 // Deleting the student

 const confirmingDeleteStudent = (req,res) => {
    let id = req.params.id

    res.status(200)
    res.render('confirmationPage', {action:`/admin/${id}?_method=DELETE`, returnUrl:'/admin/allstudents', message:'Do you really want delete this student ?'})
 }

const deleteStudent = async (req,res) => {
    let id = req.params.id

    try {
        await FirstBimester.findOneAndDelete({studentId:id})
        await SecondBimester.findOneAndDelete({studentId:id})
        await ThirdBimester.findOneAndDelete({studentId:id})
        await FourthBimester.findOneAndDelete({studentId:id})

        await Student.findByIdAndDelete(id)

        res.status(200)
        res.redirect('/admin/allstudents')
    } catch (error) {
        res.status(400)
        res.render('errorPage',{message:"Student wasn't delete!", url:"/admin/allstudents"})
    }
}

// Cleaning all the grades

const confirmingCleanGrades = async (req,res) => {

    res.status(200)
    res.render('confirmationPage', {action:`/admin/cleanthegrades`, returnUrl:'/admin/home', message:'Do you really want clean all the grades ?'})
}

const cleanAllGrades = async (req,res) => {
    try {
        let students = await Student.find({})

        if(students.length === 0){
            res.status(400)
            res.render('errorPage',{message:"Don't have students , add one first!", url:"/admin/home"})
        }else{
            // Cleaning the fields
            let grades = {
                Portuguese:0,
                PE:0,
                English:0,
                Spanish:0,
                Physic:0,
                Chemistry:0,
                Biology:0,
                History:0,
                Geography:0,
                Philosophy:0,
                Sociology:0,
            }
    
            students.forEach(async (student) => {
                // getting the student ID
                let id = student.id

                // Filter to find
                let filter = {studentId:id}

                // Cleaning the grades
                await FirstBimester.findOneAndUpdate(filter,grades, {
                    new: true,
                    upsert: true // Make this update into an upsert
                })

                await SecondBimester.findOneAndUpdate(filter,grades, {
                    new: true,
                    upsert: true // Make this update into an upsert
                })

                await ThirdBimester.findOneAndUpdate(filter,grades, {
                    new: true,
                    upsert: true // Make this update into an upsert
                })

                await FourthBimester.findOneAndUpdate(filter,grades, {
                    new: true,
                    upsert: true // Make this update into an upsert
                })
            })
    
            res.status(200)
            res.redirect('/admin/home')
        }
        
    } catch (error) {
        res.status(400)
        res.render('errorPage',{message:"Happened a error!, try again later!", url:"/admin/home"})
    }
   
}
// Searching the student

const searchStudent = async (req,res) => {
    let search = req.body.search.trim()

    try {
        if(search === ''){
            res.status(400)
            res.render('errorPage',{message:"Can't search empty string!", url:"/admin/allstudents"})
        }else{
            let studentsFound = await Student.aggregate([
                {
                  $search: {
                    index: 'default',
                    text: {
                      query: search,
                      path: {
                        'wildcard': '*'
                      }
                    }
                  }
                }
            ])

            if(studentsFound.length === 0){
                res.status(400)
                res.render('errorPage',{message:"Any student found !", url:"/admin/allstudents"})
            }else{
                res.status(200)
                res.render('allStudents',{students:studentsFound})
            }
        }
    } catch (error) {
        res.status(400)
        res.render('errorPage',{message:"Happened a error at search engine!", url:"/admin/allstudents"})
    }
}

module.exports = {loadAdminPage,login,loadAllStudentsPage,loadAddStudentPage,addNewStudent,loadHomePage,loadGradesMenu,loadEditPage,updateGrade,confirmingDeleteStudent,deleteStudent,confirmingCleanGrades,cleanAllGrades,searchStudent}