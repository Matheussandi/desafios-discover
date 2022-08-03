import { useEffect, useState } from 'react';

import bottomImage from './assets/bottom-image.svg';
import animationData from './assets/animation.json';
import topImage from './assets/top-image.svg';
import rocket from './assets/rocket.svg';

import Lottie from 'react-lottie';
import Modal from 'react-modal';

Modal.setAppElement("#root");

export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventTime, setEventTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    const dateEvent = new Date("15/08/2022 23:59:59");

    const interval = setInterval(() => {
      const now = new Date();

      // comando getTime() converte a data para milissegundos
      const difference = dateEvent.getTime() - now.getTime();

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const d = Math.floor(difference / day)
      const h = Math.floor((difference % day) / hour);
      const m = Math.floor((difference % hour) / minute);
      const s = Math.floor((difference % minute) / second);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setEventTime(true);
        return 0;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <img
        className='w-full'
        src={topImage}
        alt="topImage"
      />

      <div className='grid lg:grid-cols-2'>
        <div className='text-center mt-14'>
          <h1 className="text-purple font-bold text-4xl">Pronto para lançar em...</h1>

          <div className='text-light-grey font-light mt-5 mx-5 space-x-14 '>
            <span>Dias</span>
            <span>Horas</span>
            <span>Minutos</span>
            <span>Segundos</span>
          </div>

          <div className='text-black text-7xl font-normal'>
            {
              eventTime ? (
                <>
                  <span>00:00:00:00</span>
                  <div className='fixed inset-0 flex justify-center items-center pointer-events-none'>
                    <Lottie options={defaultOptions} />
                  </div>
                </>
              ) : (
                <>
                  <span>
                    {String(days).padStart(2, '0')}:
                    {String(hours).padStart(2, '0')}:
                    {String(minutes).padStart(2, '0')}:
                    {String(seconds).padStart(2, '0')}
                  </span>
                </>
              )
            }
          </div>

          <p className='mt-5'>Inscreva-se para saber mais sobre o lançamento</p>

          {
            eventTime ? (
              <>
                <button
                  className='bg-purple opacity-60 text-white rounded-lg px-8 py-2.5 mt-8 cursor-default'
                >
                  Inscreva-se
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openModal}
                  className='bg-purple text-white rounded-lg px-8 py-2.5 mt-8'
                >
                  Inscreva-se
                </button>
              </>
            )
          }

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
          >
            <div>
              <div className="bg-white p-2 rounded">
                <div className="text-right p-1 mr-6">
                  <button
                    onClick={closeModal}
                    className="bg-purple inline-flex justify-center py-0.5 px-2 rounded text-white fixed">X</button>
                </div>


                <form action="">
                  <h1 className="text-center">Formulario</h1>

                  <div className='p-2'>
                    <label className="mr-2">Nome:</label>
                    <input
                      className='w-9/12 p-1'
                      type="text"
                      required />
                  </div>

                  <div className='p-2'>
                    <label className="mr-3">Email:</label>
                    <input
                      className='w-9/12 p-1'
                      type="email"
                      required />
                  </div>

                  <div className='flex justify-center'>
                    <button type="submit" className='bg-purple p-2 rounded text-white mt-2'>
                      Enviar
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </Modal>
        </div>

        <div className='text-center mt-8 lg:mt-0'>
          <img
            className='inline'
            src={rocket} alt="rocket" />
        </div>
      </div>

      <img
        className=' w-full bottom-0 fixed h-36'
        src={bottomImage}
        alt="topImage"
      />
    </>
  )
}