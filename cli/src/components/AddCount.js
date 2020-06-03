import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const AddCount = (props) => {
  const { counter, addAsync } = props;
  
  /*
    Solution 1. react event-pooling :: persist()
    
    Synthetic event pool

  function clickHandler(e){
    e.persist()
    addAsync();
  }  
  */

  /* Solution 2. My solution */

  function* addGenerator(){ yield addAsync(); }

  function clickHandler(){
    const generator = addGenerator();
    generator.next();
  }  

  return (
    <div>
      <style jsx>{`
        div {
          padding: 0 0 20px 0;
        }
      `}</style>
      <h1>
        AddCount: <span>{counter}</span>
      </h1>
      <button onClick={clickHandler}>Add To Count</button>
    </div>
  )
}

export default connect((state) => state)(AddCount)