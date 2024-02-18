import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteItem, deleteTodo, resetDeleteState } from '../features/todoList/todoSlice';
import { MdOutlineDeleteOutline } from "react-icons/md";
import {motion} from 'framer-motion'
import CircularProgress from '@mui/joy/CircularProgress';
const TododCard = ({data}) => {
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
  return (
    <motion.div layout key={data?._id} className="col-12 col-md-6 col-xl-4 ">
          
    <div className="list-wrapper p-4 text-wrap position-relative">
      <div className="delete-icon">
      
        {/* (deleteState.id === val?._id ) ? ( deleteState?.isLoading ? <Loading className="list-delete" /> : (deleteState.id === val?._id ? <FaCircleCheck className="list-delete" /> :null )  ):<MdOutlineDeleteOutline className="list-delete"
          onClick={async () => {
            await dispatch(deleteTodo(val?._id));
            await dispatch(deleteItem())
          }}
        />  */}

        {
            loading ? <div  className="list-delete "><CircularProgress size='sm' color='warning' variant='plain'/></div>  :<MdOutlineDeleteOutline className='list-delete' onClick={async()=>{
            setLoading(true)
            const res= await dispatch(deleteTodo(data?._id))
            if(res?.meta?.requestStatus === "fulfilled"){
              await dispatch(deleteItem())
            await setTimeout(async()=>{
            await dispatch(resetDeleteState())},3000)
            }
            setLoading(false)
        }}
        />
        }
        
      </div>
      <div className="todo-title">{data?.title}</div>
      <div className="todo-desc text-wrap">
        <p className="text-wrap">{data?.description}</p>
      </div>
    </div>
  </motion.div>
  )
}

export default TododCard
