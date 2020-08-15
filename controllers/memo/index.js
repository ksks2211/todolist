

const { Router } = require('express');

const router = Router();


const ctrl=require('./memo.ctrl');

function testMiddleWare(req,res,next){
    console.log("First Middleware");
    next();
}


router.get('/',testMiddleWare,ctrl.get_plans);

router.get('/index',ctrl.get_plans);


router.get('/detail/:id',ctrl.get_plans_detail);



router.get('/write',ctrl.get_plans_write);
router.post('/write',ctrl.post_plans_write);


//delete and update 만들기

router.get('/delete/:id',ctrl.get_plans_delete);


router.get('/edit/:id',ctrl.get_plans_edit)

router.post('/edit/:id',ctrl.post_plans_edit)


module.exports= router;
