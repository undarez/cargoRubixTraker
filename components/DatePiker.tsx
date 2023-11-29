// DatePiker.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { CalendarRange, CalendarRangeIcon } from 'lucide-react';
import clsx from 'clsx';
import { buttonVariants } from './ui/button';
import { useRouter } from 'next/navigation'; // Importez useRouter

interface DatePikerProps {
  onSelectDate?: (selectedDate: Date) => void;
}

const DatePiker: React.FC<DatePikerProps> = ({ onSelectDate = () => {} }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const router = useRouter(); // Utilisez useRouter ici

  useEffect(() => {
    if (selectedDate) {
      onSelectDate(selectedDate);
      const formattedDate = selectedDate.toString().split('T')[0];
      router.push(`/page/reception?selectedDate=${formattedDate}`);
    }
  }, [selectedDate, onSelectDate, router]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <div className="py-8 w-1/2 items-center divide-y divide-accent divide-blue-200 ">
      <Popover>
        <PopoverTrigger className={clsx(buttonVariants({ variant: 'MyGhost' }))}>
          <CalendarRangeIcon />
        </PopoverTrigger>
        <PopoverContent>
          <Calendar mode="single" selected={selectedDate} onSelect={handleDateSelect} initialFocus />
        </PopoverContent>
      </Popover>
      <a href="/page/reception"></a>
    </div>
  );
};

export default DatePiker;
