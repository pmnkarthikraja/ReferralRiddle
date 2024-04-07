const { EmailSchema, RefereeSchema } = require('../models/MailModel')

const friendsEmails = [
    "one@gmail.com",
    "two@gmail.com",
    "three@gmail.com",
    "four@gmail.com",
    "five@gmail.com"
]

const removeAllEmails = (req, res) => {
    try {
        console.log('delete emails')
        const res = EmailSchema.deleteMany({})
        console.log("res of delete", res)
    } catch (e) {
        res.status(400).json("could not delete emails!")
    }
}

const writeDefaultEmails = async (req, res) => {
    // try{
    //     console.log('write emails')
    //     const emails=await EmailSchema.bulkWrite({email:friendsEmails[0]})
    //     res.status(200).json({emails:emails})
    // }catch(e){
    //     res.json({error:e.message})
    // }
    //bulk save
    try {
        const bulkEmails = await Promise.all(friendsEmails.map(async function (email) {
            let emailResult = await EmailSchema.create({
                email
            })
            return emailResult
        }))
        await EmailSchema.bulkSave(bulkEmails)

        const emails = await EmailSchema.find({})
        res.status(200).json({ emails })

    } catch (e) {
        res.status(400).json({ error: "error on create and get emails" })
    }

}

const getFriendsEmail = async (req, res) => {
    try {
        console.log("get emails called")
        const emails = await EmailSchema.find().populate('referees')
        console.log('get emails', emails)
        res.status(200).json({ emails })
    } catch (e) {
        res.status(404).json({ message: "no emails found" })
    }
}

const updateEmailWithReferees = async (req, res) => {
    const { from, addresses, referralCode } = req.body
    console.log("body", addresses, referralCode)
    try {
        for (const { address } of addresses) {
            console.log("incoming address",address)
            let emailDocument =await EmailSchema.findOne({ address })

            if (!emailDocument) {
                emailDocument = await EmailSchema.create({ address, referees: [] }); // Initialize referees as an empty array
            } else if (!emailDocument.referees) {
                emailDocument.referees = []; // Initialize referees array if it's undefined
            }

            // Check if a referee with the current address already exists

            const existingReferee = emailDocument.referees.find(referee => referee.email === from);

            console.log("existing referee",existingReferee)

            if (existingReferee) {
                // If referee exists, update the referral code
                existingReferee.referralCode = referralCode;
              } else {
                // If referee doesn't exist, create a new one
                emailDocument.referees.push({ email: from, referralCode });
              }


            //save the document
            // await emailDocument.save()
            // console.log("address", address)
            // console.log('referees', emailDocument.referees)
            const result = await EmailSchema.findOneAndUpdate(
                {
                    address: address,
                },
                {
                    $set: {
                        referees: emailDocument.referees
                    }
                }
            )
            console.log("resuklt", result)
        }
        res.status(200).json({ message: 'Emails updated with referees successfully' });
    } catch (e) {
        console.log("error", e)
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { removeAllEmails, writeDefaultEmails, getFriendsEmail, updateEmailWithReferees }