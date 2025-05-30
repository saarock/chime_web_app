import { axiosClient } from "../../config";
import { UserImpDetails } from "../../types";

class UserEndPoint {
    static async addUserImportantData(userImportandDetails: UserImpDetails) {
        const response = await axiosClient.post("/add-user-important-details", userImportandDetails);
        return response;
    }
}


export default UserEndPoint;