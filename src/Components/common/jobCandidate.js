import { React, useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import { useEffect } from 'react';

function JobCandidate({ candidate }) {
    const [candidateStatus, setCandidateStatus] = useState(candidate?.status);
    const [candidateComment, setCandidateComment] = useState(candidate?.comments);
    const [candidateId, setCandidateId] = useState(candidate?.candidate_id);
    const [candidateInfo, setCandidateInfo] = useState([])

    const allcandidate = useSelector((state) => state.candidateReducer);
    const dispatch = useDispatch()
    const {update_candidates} = bindActionCreators(actionCreators,dispatch)

    const handleStatus = async(e) =>{
        setCandidateStatus(e.target.value)
        setCandidateId(e.target.id);
        const tempObj ={
            "candidate_id":e.target.id,
            "status":e.target.value,
            "comments":candidateComment
        }
        update_candidates(tempObj)
    }
    const handleComment = async(e) =>{
        setCandidateComment(e.target.value)
        setCandidateId(e.target.id);
        const tempObj ={
            "candidate_id":e.target.id,
            "status":candidateStatus,
            "comments":e.target.value
        }
        update_candidates(tempObj)
    }


    return (
        <>
            <tr key={candidate.candidate_id} className='border-2 border-amber-900 '>
                <td className='border-2 border-black p-2 m-2 w-1/5 text-center'>{candidate.first_name} {candidate.last_name}</td>
                <td className='border-2 border-black p-2 m-10 w-1/6 text-center' style={{ color: candidate.status === 'Selected' ? 'Green' : candidate.status === 'Rejected' ? 'Red' : 'blue', fontSize: '16px' }}>
                    <select className="form-control block text-base sm:text-sm w-full px-3  shadow-md text-base py-1.5  text-gray-700 bg-white bg-clip-padding border border-solid 
                                       border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Status"
                        name='status'
                        value={candidateStatus|| ""}
                        id={candidate.candidate_id}
                        onChange={e => handleStatus(e)} 
                    // onChange={e => handleChangeCandidate(e, i)}
                    >
                        <option value='' disabled>Select option</option>
                        <option>Selected</option>
                        <option>Rejected</option>
                        <option>Onhold</option>
                        <option>Not Interviewd</option>
                    </select>
                </td>
                <td className='border-2 border-black p-2 m-2 w-1/2' style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>

                    {/* {candidate.comments} */}
                    <textarea class="caret-pink-500 ..." className="form-control shadow-md block  w-full px-3 py-1.5  
                        text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                        ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                        text-base sm:text-sm " placeholder="Please Enter Comments"
                        name="comments"
                        value={candidateComment || ""}
                        id={candidate.candidate_id}
                        onChange={e => handleComment(e)}
                    // onChange={e => handleChangeCandidate(e, i)}
                    ></textarea>

                </td>
            </tr>
        </>
    )
}

export default JobCandidate