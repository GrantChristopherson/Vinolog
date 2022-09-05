import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentThunk } from '../../store/discussion';
import './createCommentForm.css';



const CreateCommentForm = ({ lovedTasting }) => {

  const dispatch = useDispatch();
  const user = useSelector(state => state?.session?.user)
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState([]);



  return (
    null
  );
};

export default CreateCommentForm;