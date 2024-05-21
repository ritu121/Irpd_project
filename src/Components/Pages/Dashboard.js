import React, { useEffect, useState } from 'react'
import RootLayout from '../Layout/RootLayout'
import BarChart from '../common/BarChart'
import { DiCodeigniter } from "react-icons/di";
import { IoMdMailOpen } from "react-icons/io";
import { IoStopCircle } from "react-icons/io5";
import { getAPI } from "../network/index";
import { TEChart } from "tw-elements-react";
import './index.css'
import CountUp from 'react-countup';




function Dashboard() {

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);
  const [inActive, setInActive] = useState(0);
  const [jobLabels, setJobLabels] = useState([])
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [candidateCount, setCandidateCount] = useState([]);


  useEffect(() => {
    getOpeningsData()
  }, [])


  const getOpeningsData = async () => {
    try {
      let jobsData = await getAPI('/getJobs');
      let candidatesData = await getAPI('/getCandidates');

      if (jobsData) {
        let activeData = 0;
        let openData = 0;
        let inActiveData = 0;

        const labels = jobsData.map((item) => {
          if (item.status === 'Open') {
            openData++;
          } else if (item.status === 'Active') {
            activeData++;
          } else {
            inActiveData++;
          }
          return item.job_title;
        });

        setActive(activeData);
        setOpen(openData);
        setInActive(inActiveData);
        setJobLabels(labels);

        const colors = [
          "rgba(223, 255, 0, 0.5)",
          "rgba(222, 49, 99, 0.5)",
          "rgba(77, 182, 172, 0.5)",
          "rgba(66, 133, 244, 0.5)",
          "rgba(156, 39, 176, 0.5)",
          "rgba(233, 30, 99, 0.5)",
          "rgba(66, 73, 244, 0.4)",
          "rgba(66, 133, 244, 0.2)",
          "rgba(255, 191, 0, 0.3)",
          "rgba(64, 224, 208, 0.3)",
          "rgba(255, 127, 80, 0.3)",
          "rgba(100, 149, 237, 0.3)",
        ];

        const dynamicColors = colors.slice(0, labels.length).concat(
          Array(Math.max(0, labels.length - colors.length)).fill(colors)
        ).flat().slice(0, labels.length);

        setBackgroundColor(dynamicColors);
      }

      if (candidatesData) {
        // Flatten the nested array of candidates
        const flattenedCandidates = candidatesData.flat();

        const candidateCountsMap = new Map();


        flattenedCandidates.forEach((candidate) => {
          const jobId = candidate.job_id;
          if (candidateCountsMap.has(jobId)) {
            candidateCountsMap.set(jobId, candidateCountsMap.get(jobId) + 1);
          } else {
            candidateCountsMap.set(jobId, 1);
          }
        });

        console.log(candidateCountsMap, "candidateCountsMap");

        // Convert the map to an array where each element corresponds to a job's candidate count
        const counts = jobsData.map((job) => candidateCountsMap.get(job.job_id) || 0);
        setCandidateCount(counts);

      }
    } catch (error) {
      console.error("Error fetching job labels:", error);
    }

  }

  console.log(candidateCount, 'candidateCount');

  return (
    <RootLayout>
      <h2>Total Openings</h2>

      <div className='flex flex-wrap w-auto text-center mt-3'>

        <div class="max-w-sm rounded overflow-hidden shadow-lg grow m-3 " >

          <div className="flex justify-center m-10 flex-col items-center">
            <div><IoMdMailOpen style={{ color: '#0370c9' }} className="mr-2 cursor-pointer sm:text-xl" /></div>
            <div>
              <h1>
                <b className="text-cyan-700 font-bold p-2">
                  Open Positions
                </b>
              </h1>
            </div>
            <div>
            <CountUp
                duration={2} className="counter" end={open}
              />
            </div>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg grow m-3" >
          <div className="flex justify-center m-10 flex-col items-center">
            <div><DiCodeigniter style={{ color: '#0370c9' }} className="mr-2 cursor-pointer sm:text-xl" /></div>
            <div>
              <h1>
                <b className="text-cyan-700 font-bold p-2">
                  Active Positions
                </b>
              </h1>
            </div>
            <div>
              <CountUp
                duration={1} className="counter" end={active}
              />
            </div>
          </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg grow m-3" >
          <div className="flex justify-center m-10 flex-col items-center">
            <div><IoStopCircle style={{ color: '#0370c9' }} className="mr-2 cursor-pointer sm:text-xl" /></div>
            <div>
              <h1>
                <b className="text-cyan-700 font-bold p-2">
                  InActive Positions
                </b>
              </h1>
            </div>
            <div>
              <CountUp
                duration={1} className="counter" end={inActive}
              />
            </div>
          </div>
        </div>
      </div>


      <div className='chartContainer text-center'>
        <h2>Total Cadidates Registered Based on Openings</h2>
        <TEChart
          type="doughnut"
          data={{
            labels: jobLabels,
            datasets: [
              {
                label: "Candidates",
                data: candidateCount,
                backgroundColor: backgroundColor,
              },
            ],
          }}
        // style={{ width: '50%', margin: '0 auto', padding: '20px' }} // Example inline styles
        />
      </div>


      {/* <BarChart></BarChart> */}
    </RootLayout >
  )
}

export default Dashboard