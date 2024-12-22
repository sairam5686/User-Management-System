const flash = require('express-flash');
const Customers=require('../models/Customers');
const mongoose=require('mongoose');
const { render } = require('ejs');

//for home

exports.homepage=async(req,res)=>{

    const messages = await req.flash('info');
    const locals={
        title:'Home',
        name:'Sairam.J.R',
    }
    try {
       const customers=await Customers.find({}).limit(22);
        res.render('index',{locals,messages,customers});
    } catch (error) {
        console.log(error);
    }  
};



//for forms
exports.addcustomers=async(req,res)=>{
    const locals={
        title:'ADD CUSTOMERS',
        name:'Sairam.J.R',
    }

    res.render('customers/addcustomers',locals);
};





exports.postcustomers=async(req,res)=>{

    console.log(req.body);

    const newcustomers=new Customers({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
});
    try {
        await Customers.create(newcustomers);
        await req.flash('info','New customer has been added');
        res.redirect("/");
        
    } catch (error) {
        console.log(error);
        
    }

};

exports.view = async (req, res) => {
    const locals = {
        title: 'VIEW CUSTOMERS',
        name: 'sairam.j.r',
    };
    try {
        const customer = await Customers.findOne({ _id: req.params.id });
        res.render('customers/view', { locals, customer });
        }
     catch (error) {
        console.log(error);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }};




    exports.edit = async (req, res) => {
        const locals = {
            title: 'EDIT CUSTOMERS',
            name: 'sairam.j.r',
        };
        try {
            const customer = await Customers.findOne({ _id: req.params.id });
            
            res.render('customers/edit', { locals,customer});
            }
         catch (error) {
            console.log(error);
           
        }};




        exports.editpost = async (req, res) => {
            try {
                await Customers.findByIdAndUpdate(req.params.id,{
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    tel: req.body.tel,
                    email: req.body.email,
                    details: req.body.details,  
                    updatedAt: Date.now()

                });
            await res.redirect(`/edit/${req.params.id}`)
                
            } catch (error) {
                console.log(error);
            }
        
        
        };   




        exports.delete= async(req,res)=>{
            try {
                 await Customers.deleteOne({_id: req.params.id});
                 res.redirect('/');
            } catch (error) {
                console.log(error);
                
            }
        }




        exports.searchcustomers = async (req, res) => {
            const locals = {
              title: "Search Customer Data",
              description: "Free NodeJs User Management System",
            };
          
            try {
              let searchTerm = req.body.searchTerm;
              const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
          
              const customers = await Customers.find({
                $or: [
                  { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                  { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                ],
              });
          
              res.render("search", {
                customers,
                locals,
              });
            } catch (error) {
              console.log(error);
            }
          };





          exports.about= async(req,res)=>{
            try {
                res.render('about',);
                 
            } catch (error) {
                console.log(error);
                
            }
        }
