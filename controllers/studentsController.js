// Subjects Model
// ===========================================
const Subjects = require('../model/subjectsModel')
// Student Model
// ===========================================
const Student = require('../model/studentModel')
// Bimesters Model
// ===========================================
const FirstBimester = require('../model/firstBimesterModel')
const SecondBimester = require('../model/secondBimesterModel')
const ThirdBimester = require('../model/thirdBimesterModel')
const FourthBimester = require('../model/fourthBimesterModel')

const loadStudentPage = (req,res) => {
    res.status(200)
    res.render('studentPage')
    
}

const findStudentGrade = async (req,res) => {

    let studentCpf = req.body.cpf.trim()

    try {

        // Cheking if have a student with 
        let studentFound = await Student.findOne({cpf:studentCpf})

        if(studentFound){
            // Getting the student ID
            let id = studentFound.id

            let firstBimester = await FirstBimester.findOne({studentId:id})
            let secondBimester = await SecondBimester.findOne({studentId:id})
            let thirdBimester = await ThirdBimester.findOne({studentId:id})
            let fourthBimester = await FourthBimester.findOne({studentId:id})

            res.status(200)
            res.render('studentGradePage',{title:`Name:${studentFound.name}`, subtitle:`Class:${studentFound.classNumber}`, first:firstBimester, second:secondBimester, third:thirdBimester, fourth:fourthBimester, subjects:Subjects})
        }else{
            res.status(400)
            res.render('errorPage',{message:`Don't have a student with the CPF:${studentCpf}`, url:"/"}) 
        }
    } catch (error) {
        res.status(400)
        res.render('errorPage',{message:"Happened a error try again later!", url:"/"})
    }
}


module.exports = {loadStudentPage,findStudentGrade}