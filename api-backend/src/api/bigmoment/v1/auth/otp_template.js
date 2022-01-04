const subject_mail_verification = "OTP: for email verification";
const subject_mail_forget_pass = "OTP: For reset password";

const Email_Verification_Otp_Template = (otp)=>{
    return `Dear User, \n\n` 
      + 'OTP for your email verification is : \n\n'
      + `${otp}\n\n`
      + 'This is a auto-generated email. Please do not reply to this email.\n\n'
      + 'Regards\n'
      + 'Bigmoment game team\n\n';

}

const Pass_Reset_Otp_Template = (otp)=>{
    return `Dear User, \n\n` 
    + 'OTP for Reset Password is : \n\n'
    + `${otp}\n\n`
    + 'This is a auto-generated email. Please do not reply to this email.\n\n'
    + 'Regards\n'
    + 'Bigmoment game team\n\n'

}

module.exports = {
    subject_mail_verification,
    subject_mail_forget_pass,
    Email_Verification_Otp_Template,
    Pass_Reset_Otp_Template
};