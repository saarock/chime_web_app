import { UserEndPoint } from "../apis";
import { UserImpDetails } from "../types";
import { errorhandler } from "../utils";

class UserService {
    async addUserImportantData(userImportandDetails: UserImpDetails): Promise<{data: UserImpDetails} | null> {
        try {
            const response = await UserEndPoint.addUserImportantData(userImportandDetails);
            return response.data;
        } catch (error) {
            throw errorhandler(error);
        }
    }
}

const userService = new UserService();
export default userService;