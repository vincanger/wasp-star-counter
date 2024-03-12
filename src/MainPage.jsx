import './Main.css';
import SlotCounter from 'react-slot-counter';
import daBoi from './da-boi.png';
import { useEffect, useMemo, useState, useRef } from 'react';

export function MainPage() {
  const [starCount, setStarCount] = useState(['0', '0', '0', '0']);

  const prevArrayState = useRef(JSON.stringify(starCount));

  const counterRef = useRef(null);

  const starCountArray = useMemo(() => {
    return starCount.map((digit, index) => {
      return <span className='item'>{digit}</span>;
    });
  }, [starCount]);

  useEffect(() => {
    fetchStarCount(setStarCount);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => await fetchStarCount(setStarCount), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counterRef.current) {
      console.log(prevArrayState.current, JSON.stringify(starCount));
      if (prevArrayState.current !== JSON.stringify(starCount)) {
        prevArrayState.current = JSON.stringify(starCount);
        counterRef.current?.startAnimation();
      }
    }
  }, [starCountArray]);

  return (
    <div
      style={{
        backgroundImage: `url(${daBoi})`,
        backgroundSize: 'contain',
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backgroundBlendMode: 'overlay',
      }}
      className='w-full h-screen flex flex-col gap-10 mx-auto p-8 w-full items-center justify-center'
    >
      <h1 className='text-4xl font-semibold text-gray-800 text-center'>⭐️Wasp 10k, 11k, & 12k Countdown⭐️</h1>
      <SlotCounter
        autoAnimationStart={false}
        ref={counterRef}
        value={starCountArray}
        duration={1.75}
        dummyCharacters={[
          <img src={daBoi} className='boi-image' />,
          <img src={daBoi} className='boi-image' />,
          <img src={daBoi} className='boi-image' />,
          <img src={daBoi} className='boi-image' />,
          <img src={daBoi} className='boi-image' />,
        ]}
        charClassName='bg-gradient-to-br from-gray-200 to-gray-400 text-gray-900 mx-2 border-4 border-black border-opacity-50 rounded'
      />
      <div className='flex flex-col items-start gap-3 m-3 '>
        <div className='flex flex-col gap-3 m-3 '>
          <p className='mb-3 font-semibold'>Enter to win cool prizes:</p>
          <ol className='list-decimal flex flex-col gap-1'>
            <li>Da Boi Plushies</li>
            <li>Wasp Swag</li>
          </ol>
        </div>
        <div className='flex flex-col gap-3 m-3 '>
          <p className='mb-3 font-semibold'>How to Win:</p>
          <ol className='list-decimal flex flex-col gap-1'>
            <li>3 winners will be announced at 10k, 11k, 12k stars!</li>
            <li>
              Follow{' '}
              <a href='https://twitter.com/wasplang' className='underline' target='_blank'>
                @WaspLang on Twitter
              </a>
            </li>
            <li>
              Star the{' '}
              <a href='https://github.com/wasp-lang/wasp' className='underline' target='_blank'>
                Wasp GitHub Repo
              </a>
            </li>
            <li>
              Quote/Retweet this tweet:
              <a
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                href={`https://twitter.com/WaspLang/status/1765372276671762885`}
                data-size='large'
                target='_blank'
              >
                Tweet
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

async function fetchStarCount(setStarCount) {
  try {
    const result = await fetch('https://api.github.com/repos/wasp-lang/wasp');
    console.log('Rate limit remaining', result.headers.get('X-RateLimit-Remaining'));
    if (!result.ok) {
      throw new Error('Network response was not ok');
    }
    const json = await result.json();

    const starCount = json.stargazers_count;

    const starCountArray = starCount.toString().split('');
    setStarCount(starCountArray);
    // setStarCount(['1', '0', '0', '0', '0']);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}
