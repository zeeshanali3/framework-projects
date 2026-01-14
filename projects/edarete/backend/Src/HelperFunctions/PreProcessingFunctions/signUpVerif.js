const { OAuth2Client } = require('google-auth-library');
const axios = require("axios")
async function signUpVerif(req, decryptedPayload) {
    const signUp_flag = decryptedPayload["signUp_flag"];
    const idToken = decryptedPayload["idToken"]; 

    switch (signUp_flag) {
        case "Google": {
                const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
                const payload = response.data;

                return {
                    success: true,
                    userId: payload.sub,
                    email: payload.email,
                    name: payload.name,
                    picture: payload.picture,
                    source: "Google"
                };
        }
        case "Facebook":
            return { success: false, error: "Facebook verification not implemented yet" };

        case "Microsoft":
            return { success: false, error: "Microsoft verification not implemented yet" };

        default:
            return { success: false, error: "Unsupported signUp_flag" };
    }
}

module.exports = {signUpVerif}
