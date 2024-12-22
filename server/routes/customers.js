const express=require('express')
const router=express.Router();
const customerController=require('../controllers/customerController');


//home
router.get('/',customerController.homepage);

router.get('/add',customerController.addcustomers);
router.post('/add',customerController.postcustomers);

router.get('/view/:id',customerController.view);


router.put('/edit/:id',customerController.editpost);
router.get('/edit/:id',customerController.edit);

router.delete('/edit/:id',customerController.delete);

router.post('/search',customerController.searchcustomers);

router.get('/about',customerController.about);



module.exports=router;