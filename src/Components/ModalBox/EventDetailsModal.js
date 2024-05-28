
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { getAPI, patchAPI, deleteAPI } from "../network";
import ConfirmationModal from "../common/ConfirmationModal";

function EventDetailsModal({ isOpen, closeModal, event, onUpdate, onDelete }) {
  const [jobTitle, setJobTitle] = useState("");
  const [title, setTitle] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (isOpen && event) {
      fetchJobTitle(event.job_id);
      setTitle(event.title || "");
      setCandidateName(event.candidate_name || "");
      setStartTime(event.start ? formatDateTimeLocal(event.start) : "");
      setEndTime(event.end ? formatDateTimeLocal(event.end) : "");
    }
  }, [isOpen, event]);

  const formatDateTimeLocal = (dateTime) => {
    const date = new Date(dateTime);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  const fetchJobTitle = async (jobId) => {
    if (!jobId) {
      console.error("Job ID is undefined.");
      return;
    }
    try {
      const jobs = await getAPI(`/getJobs`);
      const job = jobs.find((job) => job.job_id === jobId);
      if (job) {
        setJobTitle(job.job_title);
      }
    } catch (error) {
      console.error("Error fetching job title:", error);
    }
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  const handleUpdate = async () => {
    const updatedEvent = {
      ...event,
      job_id: event.job_id,
      candidate_name: candidateName,
      start: new Date(startTime).toISOString(),
      end: new Date(endTime).toISOString(),
    };

    try {
      // Uncomment and replace with actual API call
      // const response = await patchAPI(`/updateSchedule/${event.schedule_id}`, updatedEvent);
      // console.log("Update response:", response);
      onUpdate(updatedEvent);
      closeModal();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelClick = () => {
    closeModal();
  };

  const handleConfirmDelete = async () => {
    try {
      // await deleteAPI(`/deleteSchedule/${event.schedule_id}`);
      onDelete(event.schedule_id);
      closeModal();
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  if (!isOpen || !event) {
    return null;
  }

  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-auto modal-overlay"
        onClick={handleOutsideClick}
      >
        <div className="flex justify-center min-w-screen p-4 mt-6 h-4/6 sm:w-90 md:w-3/5 lg:w-3/5 overflow-y-auto bg-white rounded-md">
          <div className="w-full border-sky-500 rounded-lg">
            <p className="text-zinc-950 text-2xl p-5 font-extrabold text-base sm:text-sm md:text-base lg:text-lg xl:text-xl text-center">
              Edit Event Details
            </p>
            <div className="grid m-2 p-5">
              <div>
                <label className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">
                  Job Title
                </label>
                <input
                  type="text"
                  className="form-control shadow-md block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base sm:text-sm"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled
                />
              </div>
              <div>
                <label className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control shadow-md block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base sm:text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled
                />
              </div>
              <div>
                <label className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">
                  Candidate Name
                </label>
                <input
                  type="text"
                  className="form-control shadow-md block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base sm:text-sm"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  disabled
                />
              </div>
              <div>
                <label className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  className="form-control shadow-md block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base sm:text-sm"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label inline-block mb-2 text-gray-700 text-base sm:text-sm mt-3">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  className="form-control shadow-md block w-full px-3 py-1.5 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-base sm:text-sm"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap justify-between w-full">
                <div className=" w-1/2  mt-3 " onClick={handleUpdate}>
                  <Button title="Update" type="button" bgColor="#9FE2BF" />
                </div>
                <div className="w-1/2  mt-3" onClick={handleDeleteClick}>
                  <Button title="Delete" type="button" bgColor="#FF5B33" />
                </div>
                
              </div>
              <div className="w-full flex justify-center mt-3" onClick={handleCancelClick}>
                  <Button title="Cancel" type="button" />
                </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        show={showConfirmation}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this event?"
      />
    </div>
  );
}

export default EventDetailsModal;
