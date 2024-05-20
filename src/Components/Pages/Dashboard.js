import React, { useEffect, useState } from 'react'
import RootLayout from '../Layout/RootLayout'
import BarChart from '../common/BarChart'
import { DiCodeigniter } from "react-icons/di";
import { IoMdMailOpen } from "react-icons/io";
import { IoStopCircle } from "react-icons/io5";
import { getAPI } from "../network/index";



function Dashboard() {

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);
  const [inActive, setInActive] = useState(0);


  useEffect(() => {
    getOpeningsData()
  }, [])


  const getOpeningsData = async () => {
    let Data = await getAPI('/getJobs')
    if (Data) {
     let activeData = 0
     let openData = 0
     let inActiveData = 0
      Data.map((item) => {
        if (item.status === 'Open') {
          openData++
        } else if (item.status === 'Active') {
          activeData++
        } else {
          inActiveData++
        }
      })
      setActive(activeData)
      setOpen(openData)
      setInActive(inActiveData)
    }


  }

  return (
    <RootLayout>
      <h2>Total Openings</h2>

      <div className='flex flex-wrap w-auto text-center mt-3'>

        <div class="max-w-sm rounded overflow-hidden shadow-lg grow m-3 " >

          <div className="flex justify-center m-10 flex-col align-center">
            <div><IoMdMailOpen style={{ color: '#0370c9' }} className="mr-2 cursor-pointer sm:text-xl" /></div>
            <div>
              <h1>
                <b className="text-cyan-700 font-bold p-2">
                  Open Positions
                </b>
              </h1>
            </div>
            <div>{open}</div>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg grow m-3" >
          <div className="flex justify-center m-10 flex-col align-center">
            <div><DiCodeigniter style={{ color: '#0370c9' }} className="mr-2 cursor-pointer sm:text-xl" /></div>
            <div>
              <h1>
                <b className="text-cyan-700 font-bold p-2">
                  Active Positions
                </b>
              </h1>
            </div>
            <div>{active}</div>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg grow m-3" >
          <div className="flex justify-center m-10 flex-col align-center">
            <div><IoStopCircle style={{ color: '#0370c9' }} className="mr-2 cursor-pointer sm:text-xl" /></div>

            <div>
              <h1>
                <b className="text-cyan-700 font-bold p-2">
                  InActive Positions
                </b>
              </h1>
            </div>
            <div>{inActive}</div>
          </div>
        </div>
      </div>
      {/* <BarChart></BarChart> */}
    </RootLayout >
  )
}

export default Dashboard