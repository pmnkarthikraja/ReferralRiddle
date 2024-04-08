import { useEffect, useState } from "react";
import { ReferralStatus, ReferralTrack } from "./ReferralTracking"
import { UserDetail } from "./dataStructure"
import { useEmail } from "./useEmail"
import { useGetEmails, useGetUsers } from "./hooks";

// export const useUsersTracking = (currentUser: UserDetail, userDetails: UserDetail[]): ReferralTrack[] => {
//     const emails = useEmail()
//     const refereeEmails = emails.emails.filter(mail => mail.referees.find(r => r.email === currentUser.email))

//     const referralTracks: ReferralTrack[] = refereeEmails.map(refereeEmail => {
//         if (!!userDetails || userDetails !== undefined) {
//             let status: ReferralStatus = 'Pending'
//             const gotUser = userDetails.find(us => refereeEmail.address === us.email)
//             if (!!gotUser) {
//                 status = 'Failed'
//                 status = gotUser.opReferralCode === currentUser.ownReferralCode ? 'Success' : status
//             }
//             return {
//                 email: refereeEmail.address,
//                 status: status
//             }
//         }
//         return {
//             email: refereeEmail.address,
//             status: 'Pending'
//         }
//     })
//     return referralTracks
// }


export const useUsersTracking = (currentUser: UserDetail) => {
    const { data: userDetails, isLoading: isUsersLoading } = useGetUsers();
    const { data: emails, isLoading: isEmailsLoading } = useGetEmails();
    const [referralTracks, setReferralTracks] = useState<ReferralTrack[]>([]);
  
    useEffect(() => {
      if (!isUsersLoading && !isEmailsLoading && userDetails && emails) {
        const refereeEmails = emails.filter((email) =>
          email.referees.find((r) => r.email === currentUser.email)
        );
  
        const tracks = refereeEmails.map((refereeEmail) => {
          let status: ReferralStatus = 'Pending';
          const gotUser = userDetails.find((us) => refereeEmail.address === us.email);
          if (gotUser) {
            status = 'Failed';
            status = gotUser.opReferralCode === currentUser.ownReferralCode ? 'Success' : status;
          }
          return {
            email: refereeEmail.address,
            status: status,
          };
        });
        setReferralTracks(tracks);
      }
    }, [currentUser, isUsersLoading, isEmailsLoading, userDetails, emails]);
  
    return referralTracks;
  };