import { useHistory } from 'react-router-dom';

import { useRef, useState, useEffect } from 'react';

import classes from './StudentForm.module.css';

const StudentForm = () => {

  const [student, setStudent] = useState();
  const nameRef = useRef('');
  const mathsRef = useRef('');
  const engRef = useRef('');
  const comRef = useRef('');

  const history = useHistory();

  function submitHandler(event) {
    event.preventDefault();

    const TotalMarks = (maths,eng,com) =>{
      return parseInt(maths) + parseInt(eng) + parseInt(com);
    }
  
    const Average = (maths,eng,com) =>{
      return (parseInt(maths) + parseInt(eng) + parseInt(com)/3);
    }
  
    const Result = (maths,eng,com) =>{
      if(parseInt(maths) + parseInt(eng) + parseInt(com)/3 > 35){
        return 'pass';
      }else{
        return 'fail';
      }
    }

    const studentData = {
      name: nameRef.current.value,
      maths: mathsRef.current.value,
      eng: engRef.current.value,
      com: comRef.current.value,
      TotalMarks: TotalMarks(mathsRef.current.value,engRef.current.value,comRef.current.value),
      Average: Average(mathsRef.current.value,engRef.current.value,comRef.current.value),
      result: Result(mathsRef.current.value,engRef.current.value,comRef.current.value),
    };

    setStudent(studentData); 
  }



  async function addMovieHandler(student) {
    const response = await fetch('https://studentdata-db2af-default-rtdb.firebaseio.com/studentdata.json', {
      method: 'POST',
      body: JSON.stringify(student),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if(response.ok) {
      history.replace('/table');
    }
    console.log(data);
    
  }

  useEffect(() => {
    addMovieHandler(student);
  }, [student]);


  return (
    <section className={classes.auth}>
      <h1>Student Form</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label>Name</label>
          <input type='text' ref={nameRef} required />
        </div>

        <div className={classes.control}>
          <label>Maths</label>
          <input type='text' ref={mathsRef} required />
        </div>

        <div className={classes.control}>
          <label>English</label>
          <input type='text' ref={engRef} required />
        </div>

        <div className={classes.control}>
          <label>Computer</label>
          <input type='text' ref={comRef} required />
        </div>
        <div className={classes.actions}>
          <button>Save</button>
        </div>
      </form>
    </section>
  );
};

export default StudentForm;
