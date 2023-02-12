import { createContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import './App.css'
import Child1 from './childs/child1/child1'
import Child2 from './childs/child2/child2'
import { Outlet, useNavigate } from 'react-router-dom'

// small components is good to prevent big components to re-render over small stuff, also a big component doesn't
// have to re-render all its children, put the childrens inside a memo, memo makes a component skip a re-render
// from its parent if the props still the same
function reducer(prev, action) {
  let toReturn = {...prev}
  
  if(Array.isArray(action)) {
    // if there is multiple actions in one dispatch
    action.forEach(function(obj, index, arr) {
      toReturn = actionsResponder(toReturn, obj)
    })
  } else {
    toReturn = actionsResponder(toReturn, action)
  }

  function actionsResponder(toReturn, obj) {
    switch(obj.action) {
      case 'increment':
        toReturn.count = toReturn.count + 1
        break;
      case 'decrement':
        toReturn.count = toReturn.count - 1
        break;
      case 'inputVal':
        toReturn.inputVal = obj.payload
        break;
      case 'customBtnClickCount':
        toReturn.customBtnClickCount = toReturn.customBtnClickCount + 1
        break;
      default:
        throw new Error('reducer: actionResponder: action is not recognized. app.jsx')
    }
    return toReturn
  }

  // change app bg color to pink every multiple of 3
  if(toReturn.count%3 === 0 && toReturn.count > 0) {
    console.log('app pink on')
    toReturn = {...toReturn, app_class: 'App app_pink'}
  } else {
    toReturn = {...toReturn, app_class: 'App'}
  }

  return toReturn
}
const appContext = createContext()

function App() {
  // it is best if a component only have 1 or no render every input/click, if you have multiple renders
  // happened for a single user input then there might be a space for improvement, sometimes.
  const [state, dispatch] = useReducer(reducer, {
    count: 0, app_class: 'App', slowfunction_result: '', inputVal: '', customBtnClickCount: 0
  })
  const renderCount = useRef(0)
  const myinputelement = useRef()
  const navigate = useNavigate()
  const resultFromSlowStuff = useMemo(function() {
    // commonly useMemo used to run a slow function
    // commonly people give useMemo a function that return something and assign it to a variable like this
    // i might stop using useEffect, because useMemo do the exact same thing but it also can return stuff
    // useEffect still usefull if you need the "cleanup" function returned from its callback that will be called
    // automatically everytime the useEffect is re-called or the component dismount
    if(state.count%5 === 0 && state.count !== 0) {
      function slow_fake() {
        let arr = []
        for (let i = 0; i < 99; i++) {
          // actually it is not slow, i don't want to push my pc too much lol
          arr.push('a' + i)
        }
      }
      slow_fake()
      return 'slow function ran, number is a multiply of 5'
    } else {
      return 'number is not multiple of 5, slow function skip'
    }
  }, [state.count])

  renderCount.current++

  function focusInputOnButtonClick() {
    myinputelement.current.focus()
  }
  function setasparam_onclick() {
    navigate(state.inputVal)
  }

  return (
    // problem: whenever context.provider re-render all its child that use useContext will always re-render
    // regardless whether the child use memo or not.
    // solution: i put all the child into memo and wrap that memo with another component called Barrier, the
    // Barrier will re-render but the real child protected with memo will not except if the props change.
    // source: https://blog.axlight.com/posts/4-options-to-prevent-extra-rerenders-with-react-context/
    <appContext.Provider value={{
      state, dispatch
    }}>
      <div className={state.app_class}>
        <h1>Vite + React</h1>

        <div className="card">
          {/* test input to focus on a button click using button onclick and a useRef */}
          <input type="text" ref={myinputelement} value={state.inputVal}
            onChange={function(ev) {dispatch({action: 'inputVal', payload: ev.target.value})}} />
          <br />
          <button onClick={setasparam_onclick}>set as param</button><br />
          <button onClick={ev => navigate('tryform')}>try a form</button><br />
          <Outlet />
          {/* increment decrement buttons */}
          <button onClick={() => dispatch({action: 'increment'})}>count is {state.count}</button>
          <button onClick={function(ev) {dispatch({action: 'decrement'})}}>decrement</button><br />

          <button onClick={function(ev) {navigate('nested1')}}>to nested1</button>
          <p className='apprendercount'>app render count: {renderCount.current}</p>
          <p>button123 click count: {state.customBtnClickCount}</p>
          <button onClick={focusInputOnButtonClick}>focus to input</button>
          {/* we can send the dispatch as a props or we can useContext which is better for big app.
          how do we communicate between childrens without interupting the parent?
          first, the receiver will send a function / setState (depend on what you need) on mount using useEffect
          to the parent context. second, the sender will take the receiver function / setState from parent using
          useContext. third, the sender call the receiver function / setState with whatever parameter / value
          that needed to send to the receiver */}
          <div className="appDirectChilds">
            <Child1 />
            <Child2 />
          </div>
          <p>{resultFromSlowStuff}</p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </appContext.Provider>
  )
}

export default App
export {appContext}
