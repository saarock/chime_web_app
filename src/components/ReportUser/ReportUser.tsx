"use client"

import { useState } from "react"
import { Flag } from "lucide-react"
import ReportModal from "./ReportModal"
import ReportSuccess from "./ReportSuccess"
import { Variant } from "../../types"
import Button from "../Button/Button"
import { reportReasons } from "./ReportReason"

interface ReportUserProps {
  onReport: (reason: string, details?: string) => void
  username: string
}

const ReportUser = ({ onReport, username }: ReportUserProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedReason, setSelectedReason] = useState("")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)



  const handleSubmit = async () => {
    if (!selectedReason) return
    setIsSubmitting(true)
    await new Promise((res) => setTimeout(res, 1500))
    onReport(selectedReason, details)
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsSubmitted(false)
      setSelectedReason("")
      setDetails("")
    }, 2000)
  }

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant={Variant.ternary}
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 hover:text-red-700 text-xs font-medium rounded-full border border-red-500/20 hover:border-red-500/30 transition-all"
      >
        <Flag className="w-3 h-3" />
        <span className="hidden sm:inline">Report</span>
      </Button>

      {isOpen && (
        isSubmitted ? (
          <ReportSuccess />
        ) : (
          <ReportModal
            username={username}
            reportReasons={reportReasons}
            selectedReason={selectedReason}
            setSelectedReason={setSelectedReason}
            details={details}
            setDetails={setDetails}
            onCancel={() => {
              setIsOpen(false)
              setSelectedReason("")
              setDetails("")
              setIsSubmitted(false)
            }}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )
      )}
    </>
  )
}

export default ReportUser
