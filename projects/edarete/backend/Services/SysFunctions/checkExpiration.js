const verifyToken=require("./auth")
const generatePayload=require("./generatePayload")
const nearExpiry=require('./nearExpiry')

async function checkExpiration(token,sendResponse=1){
try{
    let decodedToken=null;
    decodedToken = await verifyToken( token,sendResponse);
    if(decodedToken)
  {
    const userId = decodedToken.id;
    const payload = await generatePayload(userId);
    decodedToken = await nearExpiry( decodedToken, payload);
    return decodedToken;
}
}catch(err)
    {
        return;
    }
}
module.exports=checkExpiration;