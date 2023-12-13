module.exports = (err)=>
{
    return err.errors.map(ob=>{
        return{feild:ob.path,message:ob.message}
    })
}