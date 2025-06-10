import axios from "axios";

const sendOtpUtil = async (phoneOrEmail: string) => {
    try{
        const response = await axios.post("https://api.shambabot.com/auth/password-less-init",{
            username: phoneOrEmail
        });

        if( response.status = 200 )//response okay
        {
            console.log(`An OTP has been sent to: ${phoneOrEmail}`);
        }
        else{
            console.log(`Could not send OTP to: ${phoneOrEmail}`);
        }
    }
    catch( error )
    {
        console.error(`Failed to send otp to ${phoneOrEmail}`);
    }
};

export default sendOtpUtil;
