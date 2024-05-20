import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import Datetime from "react-datetime";
import { getAPI } from "../network";
// import { CgLogIn } from "react-icons/cg";

function AddEventModal({ isOpen, closeModal, onEventAdded }) {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [candidatesByJobId, setCandidatesByJobId] = useState([]); // Fixed typo here

  const [value, setValue] = useState({
    candidate_id: "",
    candidate_name: "",
    job_id: "",
    title: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    fetchCandidates();
    fetchCandidatesByJobId();
    fetchJobs();
  }, []);

  const fetchCandidates = async () => {
    let Data = await getAPI(`/getCandidates`);
    if (Data) {
      setCandidates(Data);
    }
  };

  const fetchCandidatesByJobId = async (jobId) => {
    try {
      let Data = await getAPI(`/getCandidateByJob/${jobId}`);
      if (Data) {
        setCandidatesByJobId(Data.data);
      } else {
        setCandidatesByJobId([]);
      }
    } catch (error) {
      console.error("Error fetching candidates by job ID:", error);
      // Handle error state here if needed
      setCandidatesByJobId([]);
    }
  };

  const fetchJobs = async () => {
    let Data = await getAPI(`/getJobs`);
    if (Data) {
      setJobs(Data);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onEventAdded({
      candidate_id: value.candidate_id,
      candidate_name: value.candidate_name,
      job_id: value.job_id,
      title: value.title,
      start,
      end,
    });
    closeModal();
  };

  const handleCancelClick = () => {
    closeModal();
  };

  const handleInputChange = async (e) => {
    // console.log(e.target.value,'vzmkkm');
    const { name, value, type } = e.target;

    setValue((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));

    if (name === "job_id") {
      if (!value) {
        fetchCandidates();
      } else {
        fetchCandidatesByJobId(value);
      }
    }
  };

  const handleinputChange = (event) => {
    const { name, value, selectedOptions } = event.target;
    const candidateName = selectedOptions[0].getAttribute(
      "data-candidate-name"
    );

    console.log("Selected candidate ID:", value);
    console.log("Selected candidate name:", candidateName);

    // Use the selected candidate ID and name as needed
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
      candidate_name: candidateName,
    }));
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-auto modal-overlay"
      onClick={handleOutsideClick}
    >
      <div className="flex justify-center min-w-screen p-4 mt-6 h-4/6 sm:w-90 md:w-3/5 lg:w-3/5 overflow-y-auto bg-white rounded-md">
        <form
          className="w-full border-sky-500 rounded-lg"
          onSubmit={handleSubmit}
        >
          <p className="text-zinc-950 text-2xl p-5 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl text-center">
            Add Event
          </p>
          <div className="grid m-2 p-5">
            <div>
              <label
                htmlFor="jobId"
                className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3"
              >
                Job title
              </label>
              <select
                className="form-select shadow-md block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base sm:text-sm"
                name="job_id"
                onChange={handleInputChange}
                value={value.job_id}
                required
              >
                <option value="" disabled>
                  Select job
                </option>
                {jobs.map((job) => (
                  <option key={job.job_id} value={job.job_id}>
                    {`${job.job_title} `}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="title"
                className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3"
              >
                Title
              </label>
              <input
                type="text"
                className="form-control shadow-md block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base sm:text-sm"
                name="title"
                onChange={handleInputChange}
                value={value.title}
                placeholder="Title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="candidateId"
                className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3"
              >
                Candidate
              </label>
              <select
                className="form-select shadow-md block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base sm:text-sm"
                name="candidate_id"
                onChange={handleinputChange}
                value={value.candidate_id}
                required
              >
                <option value="" disabled>
                  Select Candidate
                </option>
                {candidatesByJobId.map((candidate) => (
                  <option
                    key={candidate.candidate_id}
                    value={candidate.candidate_id}
                    data-candidate-name={`${candidate.first_name} ${candidate.last_name}`}
                  >
                    {`${candidate.first_name} ${candidate.last_name}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="startDate"
                className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3"
              >
                Start date/time
              </label>
              <Datetime
                value={start}
                onChange={(date) => setStart(date)}
                className="form-control shadow-md block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="endDate"
                className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3"
              >
                End date/time
              </label>
              <Datetime
                value={end}
                onChange={(date) => setEnd(date)}
                className="form-control shadow-md block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base sm:text-sm"
              />
            </div>
            <div className="flex justify-center mt-3">
              <Button title={"Add Event"} type="submit" />
            </div>
            <div
              className="flex justify-center mt-3"
              onClick={handleCancelClick}
            >
              <Button title={"Cancel"} type="button" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventModal;
