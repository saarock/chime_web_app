import ReportReasonItem from "./ReportReasonItem"
import { X } from "lucide-react"
import { ReportReason } from "../../types";

interface ReportModalProps {
  username: string
  reportReasons: ReportReason[]
  selectedReason: string
  setSelectedReason: (val: string) => void
  details: string
  setDetails: (val: string) => void
  onCancel: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

const ReportModal = ({
  username,
  reportReasons,
  selectedReason,
  setSelectedReason,
  details,
  setDetails,
  onCancel,
  onSubmit,
  isSubmitting,
}: ReportModalProps) => {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Report User</h2>
              <p className="text-sm text-gray-600 mt-1">
                Report <span className="font-medium text-gray-900">{username}</span> for inappropriate behavior
              </p>
            </div>
            <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">What's happening?</h3>
              <div className="space-y-2">
                {reportReasons.map((reason) => (
                  <ReportReasonItem
                    key={reason.id}
                    {...reason}
                    selected={selectedReason === reason.id}
                    onSelect={setSelectedReason}
                  />
                ))}
              </div>
            </div>

            {/* Additional Details */}
            {selectedReason && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Additional details (optional)
                </label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide any additional context..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all resize-none"
                  rows={3}
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 mt-1 text-right">{details.length}/500</div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <p className="text-xs text-gray-600">Reports are reviewed by our moderation team</p>
            <div className="flex gap-3">
              <button onClick={onCancel} className="text-sm text-gray-700 hover:text-gray-900">
                Cancel
              </button>
              <button
                onClick={onSubmit}
                disabled={!selectedReason || isSubmitting}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Reporting...</span>
                  </>
                ) : (
                  "Submit Report"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportModal
