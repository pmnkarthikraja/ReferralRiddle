const { EmailSchema } = require('../models/MailModel')

const getFriendsEmail = async (req, res) => {
    try {
        const emails = await EmailSchema.find().populate('referees')
        res.status(200).json({ emails })
    } catch (e) {
        res.status(404).json({ message: "no emails found" })
    }
}

const updateEmailWithReferees = async (req, res) => {
    const { from, addresses, referralCode } = req.body
    console.log("body on update sending emails", addresses, referralCode)
    try {
        for (const { address } of addresses) {
            let emailDocument =await EmailSchema.findOne({ address })

            if (!emailDocument) {
                emailDocument = await EmailSchema.create({ address, referees: [] }); // Initialize referees as an empty array
            } else if (!emailDocument.referees) {
                emailDocument.referees = []; // Initialize referees array if it's undefined
            }

            // Check if a referee with the current address already exists
            const existingReferee = emailDocument.referees.find(referee => referee.email === from);

            if (existingReferee) {
                // If referee exists, update the referral code
                existingReferee.referralCode = referralCode;
              } else {
                // If referee doesn't exist, create a new one
                emailDocument.referees.push({ email: from, referralCode });
              }


            //save the document
             await EmailSchema.findOneAndUpdate(
                {
                    address: address,
                },
                {
                    $set: {
                        referees: emailDocument.referees
                    }
                }
            )
        }
        res.status(200).json({ message: 'successfully emails sent..',success:true });
    } catch (e) {
        console.log("error",e)
        res.status(500).json({ message: 'Internal server error',success:false });
    }
}

module.exports = { getFriendsEmail, updateEmailWithReferees }