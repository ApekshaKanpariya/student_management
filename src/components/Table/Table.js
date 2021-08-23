import { useState, useEffect, useCallback } from 'react';

import classes from './Table.module.css';

const Table = () => {

  const [studentdata, setStudentdata] = useState([]);


  const fetchDataHandler = useCallback(async () => {
    try {
      const response = await fetch('https://studentdata-db2af-default-rtdb.firebaseio.com/studentdata.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedData = [];

      for (const key in data) {
        loadedData.push({
          id: key,
          name: data[key].name,
          eng: data[key].eng,
          maths: data[key].maths,
          com: data[key].com,
          totalmarks: data[key].TotalMarks,
          averege: data[key].Average,
          result: data[key].result,
        });
      }

      setStudentdata(loadedData);
    } catch (error) {
      console.log(error);
      alert('error.message');
    }
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, []);

  console.log(studentdata);

  return (
    <div className={classes.section}>
      <h3>Student Data</h3>
        <table className={classes.table}>
            <thead>
              <tr>
                  <th>Student Id</th>
                  <th>Name</th>
                  <th>English</th>
                  <th>Maths</th>
                  <th>Computer</th>
                  <th>Total Marks</th>
                  <th>Average</th>
                  <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {!!studentdata.length && studentdata.map((value,index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value.name}</td>
                  <td className={`Font-Size ${value.eng < 35 ? "Font-Color" : ""}`}>{value.eng}</td>
                  <td className={`Font-Size ${value.maths < 35 ? "Font-Color" : ""}`}>{value.maths}</td>
                  <td className={`Font-Size ${value.com < 35 ? "Font-Color" : ""}`}>{value.com}</td>
                  <td className={`Font-Size ${value.totalmarks < 35 ? "Font-Color" : ""}`}>{value.totalmarks}</td>
                  <td className={`Font-Size ${value.averege < 35 ? "Font-Color" : ""}`}>{value.averege.toFixed(2)}</td>
                  <td>{value.result}</td>
                </tr>
              ))}
            </tbody>
        </table> 
    </div>
  );
};

export default Table;
