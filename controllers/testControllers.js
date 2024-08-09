const testUserController =(req,res)=>{
  try {
    res.status(200).json({
      success:true,
      message:'Test User Data API'
    })
  } catch (error) {
    console.log(`testUserController :: ${error}`)
  }
}

module.exports = {testUserController}

