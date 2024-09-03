import React from 'react'
import { useState } from 'react'
import SectionWrapper from './SectionWrapper'
import { SCHEMES, WORKOUTS } from '../utils/fitness'
import Button from './Button'

function Header({ index, title, description}) {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2  justify-center'>
                <p className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-400'>{index}</p>
                <h4 className='text-xl sm:text-2xl md:text-3xl'>{title}</h4>
            </div>
            <p className='text-sm sm:text-base mx-auto'>{description}</p>
        </div>
    )
}
export default function Generator({ poison, setPoison, muscles, setMuscles, goal, setGoal, updateWorkout }) {
    const [showModal, setShowModal] = useState(false);
    

    function toggleModal() {
        setShowModal(!showModal)
    }
    function updateMuscle(mName) {
        console.log(muscles.length)
        
        if(muscles.includes(mName)) {
            setMuscles(muscles.filter(val => val !== mName));
            return;
        }

        if(muscles.length > 2) {
            return
        }

        if(poison !== 'individual') {
            setMuscles([mName]);
            setShowModal(false)
            return
        }

        setMuscles([...muscles, mName])
        if (muscles.length === 2) { setShowModal(false) }
    }
    return (
        <SectionWrapper id={'generator'} header={"generate your workout"} title={['Its\'s', 'Huge', 'o\'clock']}>
            <Header index={'01'} title={'Pick your poison'} description={'Select the workout you wish to endure.'} />
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                {Object.keys(WORKOUTS).map((name, index) => {
                    return (
                        <button onClick={() => {
                            setPoison(name)
                            setMuscles([])
                        }} className={'bg-slate-950 border py-3 px-4 duration-200 hover:border-blue-600 rounded-lg ' + ((name === poison) ? ' border-blue-600': ' border-blue-400')} key={index}><p className='capitalize'>{name.replaceAll('_', " ")}</p></button>
                    )
                })}
            </div>

            <Header index={'02'} title={'Lock on targets'} description={'Select the muscles judged for annihilation.'} />

            <div className='flex flex-col bg-slate-950 border border-solid border-blue-400 rounded-lg'>
                <button onClick={toggleModal} className="relative flex p-3 items-center justify-center">
                    <p className='uppercase'>{muscles.length === 0 ? 'Select Muscle Groups' : muscles.join(" | ")}</p>
                    <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
                </button>
                {showModal &&
                    (<div className='flex flex-col px-3 pb-3'>
                        {
                            (poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, index) => {
                               return ( <button onClick={() => {
                                updateMuscle(muscleGroup)
                               }} key={index} className={'duration-200 hover:text-blue-400 ' + (muscles.includes(muscleGroup) ? ' text-blue-400' : ' ')}>
                                    <p className="uppercase">{muscleGroup.replaceAll("_", " ")}</p>
                                </button>)
                            })
                        }
                    </div>)
                }

            </div>
            <Header index={'03'} title={'Become Juggernaut'} description={'Select your ultimate objective.'} />
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {Object.keys(SCHEMES).map((name, index) => {
                    return (
                        <button onClick={() => {
                            setGoal(name)
                        }} className={'bg-slate-950 border border-blue-400 py-3 px-4 duration-200 hover:border-blue-600 rounded-lg ' + ((name === goal) ? ' border-blue-600': ' border-blue-400')} key={index}><p className='capitalize'>{name.replaceAll('_', " ")}</p></button>
                    )
                })}
            </div>

            <Button fun={updateWorkout} title={'Formulate'}/>
        </SectionWrapper>
    )
}
