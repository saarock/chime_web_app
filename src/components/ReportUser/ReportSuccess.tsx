const ReportSuccess = () => {
  return (
    <div className="p-8 text-center animate-in zoom-in-95 duration-300">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Submitted</h3>
      <p className="text-sm text-gray-600 mb-6">
        Thank you for helping keep our community safe. We'll review your report and take appropriate action.
      </p>
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div className="bg-green-600 h-1 rounded-full animate-pulse" style={{ width: "100%" }} />
      </div>
    </div>
  )
}

export default ReportSuccess
