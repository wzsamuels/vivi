'use client'
import 'react-calendar/dist/Calendar.css';
import Image from "next/image";
import { useState } from 'react';
import Calendar from 'react-calendar';
import bannerImage from  '@/public/golf_1.jpg'


export default function Home() {

  return (
    <div>
      <div className='text-center'>
        <h1 className={' text-5xl m-4'}>Lady Golf Events</h1>
        <h2 className='text-3xl m-4'>@</h2>
        <h2 className='text-3xl'>Heritage Golf Course</h2>
      </div>
      <div className='p-4 m-4 w-full'>
        <div className='flex items-center justify-center'>
        <Image src={bannerImage} alt='' className='rounded-xl'/>
        </div>
      </div>
      <div className='m-4'>
        <div className='relative w-full overflow-hidden pt-[66%]'>
          <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&src=NDlkNDk2NDc4NzU5NGNjNDA3MDYyMzAxNDNmZWQ5MWFlZTM3OWE2YzEwYmEzODk4NWRiZWRkMTJlNTEyOTRmNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23B39DDB&color=%237CB342"
            className='absolute top-0 left-0 bottom-0 right-0 w-full h-full rounded-xl'
            style={{border:"solid 1px #777"}} width="800" height="600" frameBorder="0" scrolling="no">

          </iframe>
        </div>
      </div>
    </div>
  );
}
