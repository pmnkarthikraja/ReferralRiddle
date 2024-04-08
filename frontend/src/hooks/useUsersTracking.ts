import { useEffect, useState } from "react";
import { ReferralStatus, ReferralTrack } from "../pages/ReferralTrackingPage";
import { UserDetail } from "../schema/dataStructure";
import { useGetEmails, useGetUsers } from "./hooks";


export const useUsersTracking = (currentUser: UserDetail,refetchInterval?:number) => {
  const { data: userDetails, isLoading: isUsersLoading } = useGetUsers(refetchInterval);
  const { data: emails, isLoading: isEmailsLoading } = useGetEmails(refetchInterval);
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

  return {referralTracks,isUsersLoading,isEmailsLoading};
};