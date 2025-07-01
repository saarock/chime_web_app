import { axiosClient } from "../../config";
import { Report, UserImpDetails } from "../../types";

class UserEndPoint {
    static async addUserImportantData(userImportandDetails: UserImpDetails) {
        const response = await axiosClient.post("/add-user-important-details", userImportandDetails);
        return response;
    }

    static async report(reportInfo: Report) {
        const response = await axiosClient.post("/like-dislike", reportInfo);
        return response;
    }
}


export default UserEndPoint;