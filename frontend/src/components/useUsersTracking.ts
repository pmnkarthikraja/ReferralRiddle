import { ReferralStatus, ReferralTrack } from "./ReferralTracking"
import { UserDetail } from "./dataStructure"
import { useEmail } from "./useEmail"

export const useUsersTracking = (currentUser: UserDetail, userDetails: UserDetail[]): ReferralTrack[] => {
    const emails = useEmail()
    const refereeEmails = emails.emails.filter(mail => mail.referees.find(r => r.email === currentUser.email))

    const referralTracks: ReferralTrack[] = refereeEmails.map(refereeEmail => {
        if (!!userDetails || userDetails !== undefined) {
            let status: ReferralStatus = 'Pending'
            const gotUser = userDetails.find(us => refereeEmail.address === us.email)
            if (!!gotUser) {
                status = 'Failed'
                status = gotUser.opReferralCode === currentUser.ownReferralCode ? 'Success' : status
            }
            return {
                email: refereeEmail.address,
                status: status
            }
        }
        return {
            email: refereeEmail.address,
            status: 'Pending'
        }
    })
    return referralTracks
}
