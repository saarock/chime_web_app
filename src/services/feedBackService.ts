import { FeedBackEndPoint } from "../apis";
import { FeedbackFormData } from "../components/FeedBackForm/FeedBackForm";
import { errorhandler } from "../utils";



class FeedBackService {
    async saveFeedBack(userFeedBack: FeedbackFormData): Promise<{
isFeedbackSaved: boolean
}> {
        try {
            const response = await FeedBackEndPoint.saveFeedBack(userFeedBack);
            return response.data.data;
        } catch (error) {
            throw errorhandler(error);
        }
    }
}

const feedBackService = new FeedBackService();
export default feedBackService;