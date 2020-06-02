import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../stores/counter'

const { addAsync } = actions;

const AddCount = ({ count, addAsync }) => {
  return (
    <div>
      <style jsx>{`
        div {
          padding: 0 0 20px 0;
        }
      `}</style>
      <h1>
        AddCount: <span>{count}</span>
      </h1>
      <button onClick={addAsync}>Add To Count</button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  count: state.count,
  tick: state.tick
})

const mapDispatchToProps = (dispatch) => {
  return {
    addAsync: bindActionCreators(addAsync, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCount)