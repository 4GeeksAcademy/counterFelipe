import React, { useState, useEffect } from 'react';

const Counter = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [alertTime, setAlertTime] = useState(null);
    const [isCountdown, setIsCountdown] = useState(false);

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prev) => {
                    if (isCountdown) {
                        return prev > 0 ? prev - 1 : 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRunning, isCountdown]);

    useEffect(() => {
        if (alertTime !== null && time === alertTime) {
          alert(`¡Tiempo alcanzado: ${alertTime} segundos!`);
        }
      }, [time, alertTime]);

    const controlSetCountdown = (event) => {
        setTime(Number(event.target.value));
        setIsCountdown(true);
        setIsRunning(true);
    };

    const controlStart = () => setIsRunning(true);
    const controlStop = () => setIsRunning(false);
    const controlReset = () => {
        setTime(0);
        setIsRunning(false);
        setIsCountdown(false);
    };

    const controlSetAlertTime = (event) => setAlertTime(Number(event.target.value));

    return (
        <div className='text-center'>
            <div className='counter-display text-light'>
                {String(time).padStart(6, '0')}
            </div>
            <div className='counter-controls'>
                <button onClick={controlStart}>Iniciar</button>
                <button onClick={controlStop}>Parar</button>
                <button onClick={controlReset}>Reset</button>
            </div>
            <input
                type='number'
                placeholder='Indicar alerta'
                onChange={controlSetAlertTime}
            />
            <input
                type='number'
                placeholder='Inicia cuenta atrás'
                onChange={controlSetCountdown}
            />
        </div>
    )

}

export default Counter;