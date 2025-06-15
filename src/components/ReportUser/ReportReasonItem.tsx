import { LucideIcon } from "lucide-react"

interface ReportReasonItemProps {
  id: string
  label: string
  description: string
  icon: LucideIcon
  color: string
  selected: boolean
  onSelect: (id: string) => void
}

const ReportReasonItem = ({
  id,
  label,
  description,
  icon: Icon,
  color,
  selected,
  onSelect,
}: ReportReasonItemProps) => {
  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        selected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
      }`}
    >
      <input
        type="radio"
        name="reason"
        value={id}
        checked={selected}
        onChange={() => onSelect(id)}
        className="sr-only"
      />
      <Icon className={`w-5 h-5 mt-0.5 ${color}`} />
      <div className="flex-1">
        <div className="font-medium text-gray-900 text-sm">{label}</div>
        <div className="text-xs text-gray-600 mt-1">{description}</div>
      </div>
    </label>
  )
}

export default ReportReasonItem
