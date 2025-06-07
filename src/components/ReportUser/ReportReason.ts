import { AlertTriangle, Eye, MessageSquare, Volume2, Shield } from "lucide-react"
import { ReportReason } from "../../types"

export const reportReasons: ReportReason[] = [
    { id: "harassment", label: "Harassment or Bullying", description: "Threatening, intimidating, or abusive behavior", icon: AlertTriangle, color: "text-red-500" },
    { id: "inappropriate", label: "Inappropriate Content", description: "Sharing inappropriate or offensive material", icon: Eye, color: "text-orange-500" },
    { id: "spam", label: "Spam or Unwanted Messages", description: "Sending repetitive or unwanted messages", icon: MessageSquare, color: "text-yellow-500" },
    { id: "audio", label: "Audio Disruption", description: "Playing loud music, background noise, or disrupting audio", icon: Volume2, color: "text-blue-500" },
    { id: "impersonation", label: "Impersonation", description: "Pretending to be someone else", icon: Shield, color: "text-purple-500" },
]