import { FeedbackFormData } from "../../components/FeedBackForm/FeedBackForm";
import { axiosClient } from "../../config";



class FeedBackEndPoint {
    static async saveFeedBack(userFeedBack: FeedbackFormData) {
        const response = await axiosClient.post("/save-feedback", userFeedBack);
        return response;
    }
}


export default FeedBackEndPoint;