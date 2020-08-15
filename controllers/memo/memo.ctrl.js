const models = require('../../models');


exports.get_plans = async (req,res) => {

    const pageNum =  Number(req.query.pageNum) || 1
    const contentSize = 10

    let offset = 0
    if(pageNum > 1){
        offset = contentSize*(pageNum-1)
    }

    const counts = await models.Plans.count()

    const pnSize = Math.ceil(counts/contentSize)
    let pagenator =[]

    for(let i =1; i<=pnSize;i++){
        pagenator.push(i)
    }




    try{
        const plans = await models.Plans.findAll({ order: [['createdAt','DESC']] , offset:offset, limit:contentSize });
        res.render('memo/plans.html',{plans:plans, pagenator:pagenator,pageNum:pageNum,pnSize});
    }catch(err){
        console.log(err);
    }
}


exports.get_plans_detail = async (req,res) =>{
    try{
        const plan= await models.Plans.findByPk(req.params.id);
        res.render('memo/detail.html',{plan});
    }catch(err){
        console.log(err);
    }
}


exports.get_plans_write = (_,res) => {
    res.render('memo/write.html');
}

exports.post_plans_write= async(req,res)=>{
    try{
        await models.Plans.create(req.body);
        res.redirect('/index');
    }catch(err){
        console.log(err);
    }
}


exports.get_plans_delete = async(req,res)=>{
    try{
        await models.Plans.destroy({ where: {id :req.params.id}})
        
    }catch(err){
        console.log(err)
    }
    res.redirect('/index')
}




exports.get_plans_edit = async(req,res)=>{
    try{
        const plan = await models.Plans.findByPk(req.params.id);
        await res.render('memo/write.html',{plan});
    }catch(err){
        console.log(err);
    }
}

exports.post_plans_edit = async(req,res)=>{
    try{
        await models.Plans.update(
            req.body,
            {where: {id:req.params.id}}
        )
    }catch(err){
        console.log(err)
    }
}