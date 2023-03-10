import React from 'react'
import styles from './AddPointModal.module.css'
import { AiOutlineClose } from 'react-icons/ai'
import Context from '../Context/Context'
import { useState, useContext } from 'react'
import { motion } from "framer-motion"
import Backdrop from '../Backdrop/Backdrop'

const AddPointModal = () => {

  const tech = ["HTML", "CSS", "Javascript", "Typescript", "React", "Vue", "Tailwind", "SASS"]
  
  const { 
    addTodo, editTodo,
    addPointModalVisible, setAddPointModalVisible,
    configurationVisible, setConfigurationVisible,
    selectedTodo, setSelectedTodo
  } = useContext(Context);

  const [days, setDays] = useState(selectedTodo ? selectedTodo.days : 0);
  const [weeks, setWeeks] = useState(selectedTodo ? selectedTodo.weeks : 0)
  const [months, setMonths] = useState(selectedTodo ? selectedTodo.months : 0);

  const [inputValue, setInputValue] = useState(selectedTodo ? selectedTodo.text : '');
 
  const handleAddTodo = () => {
    if(inputValue === '') return;
    addTodo({
      id: new Date().getTime(),
      text: inputValue,
      days: days, 
      months: months,
      weeks: weeks,
      completed: false,
    });
    setInputValue("");
    setAddPointModalVisible(!addPointModalVisible)
    setSelectedTodo(null)
  };

  const handleEditTodo = () => {
    editTodo(inputValue, days, weeks, months)
    setAddPointModalVisible(!addPointModalVisible)
    setConfigurationVisible(!configurationVisible)
    setSelectedTodo(null)
  }

  const handleDayIncrement = () => {
    setDays((prevDays) => prevDays + 1);
  };

  const handleDayDecrement = () => {
    if (days > 0) {
      setDays((prevDays) => prevDays - 1);
    };
  };

  const handleWeeksIncrement = () => {
    setWeeks((prevWeeks) => prevWeeks + 1);
  };

  const handleWeeksDecrement = () => {
    if (weeks > 0) {
      setWeeks((prevWeeks) => prevWeeks - 1);
    };
  };

  const handleMonthIncrement = () => {
    setMonths((prevMonths) => prevMonths + 1);
  };

  const handleMonthDecrement = () => {
    if (months > 0) {
      setMonths((prevMonths) => prevMonths - 1);
    };
  };

  return (
    <>
      <motion.div 
        className={styles.addpointmodal}
        initial={{  opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: .3 }}
      >
        <div className={styles.addpointmodal__header}>
          <h3>Add roadmap point</h3>
          <button onClick={() => setAddPointModalVisible(!addPointModalVisible)}><AiOutlineClose size={20}/></button>
        </div>
        <div className={styles.addpointmodal__content}>
          <div className={styles.panel}>
            <form className={styles.form}>
              <label>Roadmap point title</label>
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
            </form>
            <p>Suggestions:</p>
            <div className={styles.buttons}>
              {
                tech.map(tech => <input type='button' value={tech} onClick={() => setInputValue(tech)}/>)
              }
            </div>
            <div className={styles.timesection}>
              <div className={styles.timesection__header}>
                <span>Time to complete:</span>
                {days === 0  
                  && weeks === 0
                  && months === 0
                  && <span>Specify time</span>
                }
                <span>
                  {days > 0 ? <span>{days} days, </span> : null}
                  {weeks > 0 ? <span>{weeks} weeks, </span>: null}  
                  {months > 0 ? <span>{months} months, </span>: null}  
                </span>     
              </div>
              <div className={styles.timesection__buttons}>
                <button onClick={handleDayDecrement}>-1 Day</button>
                <div>Days</div>
                <button onClick={handleDayIncrement}>+1 Day</button>
                <button onClick={handleWeeksDecrement}>-1 Week</button>
                <div>Weeks</div>
                <button onClick={handleWeeksIncrement}>+1 Week</button>
                <button onClick={handleMonthDecrement}>-1 Month</button>
                <div>Months</div>
                <button onClick={handleMonthIncrement}>+1 Month</button>
              </div>
            </div>
          </div>
          <button className={styles.confirm} onClick={selectedTodo ? handleEditTodo : handleAddTodo}>Confirm roadmap point</button>
        </div>
      </motion.div>
      <Backdrop/>
    </>
  )
}

export default AddPointModal



