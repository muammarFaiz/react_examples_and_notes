import { createContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Mybtn from './childs/customButton/customButton'

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
        throw Error('reducer: actionResponder: action is not recognized. app.jsx')
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
  // i might not going to use useState that often anymore, it is still good to use for small components that
  // only have one state. it is best if a component only have 1 re-render state, either with useReducer or useState
  const [state, dispatch] = useReducer(reducer, {
    count: 0, app_class: 'App', slowfunction_result: '', inputVal: '', customBtnClickCount: 0
  })
  const renderCount = useRef(0)
  const myinputelement = useRef()
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

  return (
    <appContext.Provider value={{
      state, dispatch
    }}>
      <div className={state.app_class}>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <input type="text" ref={myinputelement} value={state.inputVal}
            onChange={function(ev) {dispatch({action: 'inputVal', payload: ev.target.value})}} />
          <br />
          <button onClick={() => dispatch({action: 'increment'})}>
            count is {state.count}
          </button><br />
          <button onClick={function(ev) {dispatch({action: 'decrement'})}}>
            decrement
          </button>
          <p>Edit <code>src/App.jsx</code> and save to test HMR, wtf is hmr????</p>
          <p>renderCount: {renderCount.current}</p>
          <p>custom button clicked: {state.customBtnClickCount}</p>
          <button onClick={focusInputOnButtonClick}>focus to input</button>
          {/* we can send the dispatch as a props or we can useContext which is better for big app */}
          <Mybtn>custom component</Mybtn>
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
