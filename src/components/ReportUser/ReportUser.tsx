
// Import all the necessary dependencies here
import { useCallback, useEffect, useState } from "react"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import Button from "../Button/Button"
import { Report, Variant } from "../../types"
import { toast } from "react-toastify"
import { useErrorHandlerAtPageAndComponentLevel } from "../../hooks"
import { userService } from "../../services"

const ReportUser = (
  {
    reportedUserId
  }: { reportedUserId: string }
) => {
  // Fall  back errror handler
  const { setErrorMessageFallBack } = useErrorHandlerAtPageAndComponentLevel();
  // Helps to track the loading state
  const [loading, setLoading] = useState<boolean>(false);



  /**
   * Handles click events for Like or Dislike buttons.
   * Uses useCallback to memoize the function for performance.
   */
  const handleClick = useCallback(async (type: "like" | "dislike") => {
    try {
      setLoading(true);
      if (!reportedUserId) {
        toast.error("There is some-thing bug. Pleased while starting another call reload the app and start the random-call");
        return;
      }
      if (!type) {
        toast.info("like or dislike required");
        return;
      }
      const reportInfo: Report = {
        reportedUserId: reportedUserId,
        type
      }
      const data = await userService.reportUser(reportInfo);
      toast.success(data.data.message);

    } catch (err) {
      setErrorMessageFallBack(err);
    } finally {
      setLoading(false);
    }
  }, [ reportedUserId])



  return (
    <div className="flex gap-2 items-center">
      {/* Like Button */}
      <Button
        onClick={() => handleClick("like")}
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}

      >
        <ThumbsUp className="w-4 h-4" />
        Like
      </Button>

      {/* Dislike Button */}
      <Button
        variant={Variant.danger}
        onClick={() => handleClick("dislike")}
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
      >
        <ThumbsDown className="w-4 h-4" />
        Dislike
      </Button>
    </div>
  )
}

export default ReportUser
