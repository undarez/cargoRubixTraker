// MaPage.tsx

import React from 'react';
import DatePiker from '@/components/DatePiker';
import { getAuthSession } from '@/lib/auth';
// import { useRouter } from 'next/navigation'; // Assurez-vous que cette ligne est présente

const Page = async () => {
  const session = await getAuthSession();
  // const router = useRouter();
  // const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // const handleDateSelect = (date: Date) => {
  //   setSelectedDate(date);
  //   const formattedDate = date.toString().split('T')[0];
  //   router.push(`/page/reception?selectedDate=${formattedDate}`);
  // };

  return (
    <div className='mt-20'>
      <h1>
        hello cest mon titre
      </h1>
      <DatePiker />
    </div>
  );
};

export default Page;
