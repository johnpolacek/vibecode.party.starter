"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  label?: string
  className?: string
}

export function DatePicker({ date, setDate, label = "Pick a date", className }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  )
}

export function DateRangePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  startLabel = "Start date",
  endLabel = "End date",
  className,
}: {
  startDate: Date | undefined
  endDate: Date | undefined
  setStartDate: (date: Date | undefined) => void
  setEndDate: (date: Date | undefined) => void
  startLabel?: string
  endLabel?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0", className)}>
      <DatePicker date={startDate} setDate={setStartDate} label={startLabel} className="flex-1" />
      <DatePicker date={endDate} setDate={setEndDate} label={endLabel} className="flex-1" />
    </div>
  )
}
