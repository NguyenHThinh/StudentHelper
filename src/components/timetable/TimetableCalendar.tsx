"use client";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { TimetableEntry } from '@/services/timetable';
import { useMemo } from 'react';

interface TimetableCalendarProps {
    entries: TimetableEntry[];
    onDateClick?: (date: Date) => void;
    onEventClick?: (entry: TimetableEntry) => void;
}

export default function TimetableCalendar({ entries, onDateClick, onEventClick }: TimetableCalendarProps) {
    const events = useMemo(() => {
        return entries.map(entry => ({
            id: entry._id,
            title: entry.subject,
            start: entry.startTime,
            end: entry.endTime,
            extendedProps: {
                location: entry.location,
                note: entry.note,
                fullEntry: entry
            },
            backgroundColor: '#6C8EBF', // accent color
            borderColor: '#526EA0', // accent-dark
            textColor: '#ffffff',
        }));
    }, [entries]);

    return (
        <div className="h-[700px] [&_.fc-toolbar]:px-4 [&_.fc-toolbar]:py-4 [&_.fc-toolbar]:border-b [&_.fc-toolbar]:border-slate-200 [&_.fc-toolbar-title]:text-xl [&_.fc-toolbar-title]:font-poppins [&_.fc-toolbar-title]:font-semibold [&_.fc-toolbar-title]:text-primary [&_.fc-button]:rounded-lg [&_.fc-button]:border [&_.fc-button]:border-slate-300 [&_.fc-button]:bg-white [&_.fc-button]:text-slate-700 [&_.fc-button]:px-4 [&_.fc-button]:py-2 [&_.fc-button]:font-medium [&_.fc-button]:text-sm [&_.fc-button]:transition-all [&_.fc-button:hover]:bg-accent/10 [&_.fc-button:hover]:border-accent/30 [&_.fc-button:hover]:text-accent [&_.fc-button-active]:!bg-accent [&_.fc-button-active]:!border-accent [&_.fc-button-active]:!text-white [&_.fc-button-active]:shadow-md [&_.fc-daygrid-day-number]:text-slate-600 [&_.fc-col-header-cell]:bg-slate-50 [&_.fc-col-header-cell]:border-slate-200 [&_.fc-col-header-cell-cushion]:text-slate-700 [&_.fc-col-header-cell-cushion]:font-semibold [&_.fc-col-header-cell-cushion]:text-sm [&_.fc-timegrid-slot]:border-slate-100 [&_.fc-timegrid-now-indicator-line]:border-accent [&_.fc-timegrid-now-indicator-line]:border-2 [&_.fc-event]:cursor-pointer [&_.fc-event:hover]:opacity-90 [&_.fc-event-title]:font-medium [&_.fc-event-time]:font-semibold">
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'today',
                    center: 'title',
                    right: 'prev,next',
                }}
                events={events}
                dateClick={(info) => {
                    onDateClick?.(info.date);
                }}
                eventClick={(info) => {
                    onEventClick?.(info.event.extendedProps.fullEntry);
                }}
                eventContent={(eventInfo) => {
                    return (
                        <div className="flex flex-col h-full p-1 overflow-hidden">
                            <div className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                                {eventInfo.timeText}
                            </div>
                            <div className="text-sm font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis mt-1">
                                {eventInfo.event.title}
                            </div>
                            {eventInfo.event.extendedProps.note && (
                                <div className="text-xs opacity-90 line-clamp-4 text-ellipsis mt-1.5">
                                    {eventInfo.event.extendedProps.note}
                                </div>
                            )}
                            {eventInfo.event.extendedProps.location && (
                                <div className="text-xs opacity-90 line-clamp-2 flex items-center gap-1 mt-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                    {eventInfo.event.extendedProps.location}
                                </div>
                            )}
                        </div>
                    );
                }}
                height="100%"
                slotMinTime="06:00:00"
                slotMaxTime="22:00:00"
                allDaySlot={false}
                nowIndicator={true}
                locale="vi"
                buttonText={{
                    today: 'Hôm nay',
                    prev: '<',
                    next: '>'
                }}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }}
                dayHeaderFormat={{
                    weekday: 'long'
                }}
                weekends={true}
                editable={false}
                selectable={true}
                selectMirror={true}
            />
        </div>
    );
}
