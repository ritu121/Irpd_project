import React from 'react'
import RootLayout from '../Layout/RootLayout'
import allSkills from '../../assets/skills.json'
import Button from '../common/Button';

function Skills() {
    return (
        <RootLayout>

            <div className='flex item-center justify-between'>
                <p className='text-zinc-950 text-2xl p-4 mt-4 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl'
                >Skills</p>

                <div >
                    <Button title={'Add Skills'} ></Button>
                </div>
            </div>

            <div className='flex flex-wrap w-auto'>
                {
                    allSkills.map((item) => (

                        <div class="max-w-sm rounded overflow-hidden shadow-lg grow m-3" >
                            <div className="flex">
                                <div>
                                    <h1>
                                        <b className="text-cyan-700 font-bold p-2">
                                            {item.skill_name} 
                                        </b>
                                    </h1>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>

        </RootLayout>
    )
}



export default Skills