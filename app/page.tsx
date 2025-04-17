
import 'react-calendar/dist/Calendar.css';
import Image from "next/image";
import bannerImage from  '@/public/golf_1.jpg'
import Calendar from './components/calendar';


export default function Home() {

  return (
    <div>
      <div className='text-center'>
        <h1 className={' text-5xl m-4'}>Heritage Women's Golf</h1>
        <h2 className='text-3xl m-4'>@</h2>
        <h2 className='text-3xl'>Heritage Golf Course</h2>
      </div>
      <div className=' my-4 w-full'>
        <div className='flex items-center justify-center'>
          <Image src={bannerImage} alt='' className='rounded-xl w-full  max-w-5xl'/>
        </div>
      </div>
      <div className='my-4 w-full'>
        <div className='flex items-center justify-center '>
          <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&src=NDlkNDk2NDc4NzU5NGNjNDA3MDYyMzAxNDNmZWQ5MWFlZTM3OWE2YzEwYmEzODk4NWRiZWRkMTJlNTEyOTRmNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23B39DDB&color=%237CB342"
            className='w-full rounded-xl max-w-6xl'
            style={{border:"solid 1px #777"}}
            height="600"
            >
          </iframe>
        </div>
      </div>
      <Calendar/>
    </div>
  );
}
