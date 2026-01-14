async function testPost (req, decryptedPayload){
    let return_object = {}
    return_object["return"] = decryptedPayload.objectResolverOutput.results;
    return_object["test"] = "It Works";
    return return_object
}

module.exports = {testPost}