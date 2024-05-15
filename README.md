# React.js

- `todo.html`: This is how we used to manipulate DOM and do things before React.


**What if these todos were listed on a server and we made some changes to these from another client?**
- Server does not send us that this has changed, this was added or this was deleted, instead it returns us a `state` of all the todos.

Eg.

```javascript
const old_state = [
    {
        id: 1,
        title: 'title',
        description: 'do this'
    }, 
    {
        id: 2,
        title: 'title',
        description: 'do this too'
    }
]

const new_state = [
    {
        id: 1,
        title: 'title',
        description: 'do this'
    }, 
    {
        id: 2,
        title: 'title',
        description: 'do this too'
    },
    {
        id: 3,
        title: 'title',
        description: 'do this too please!'
    }
]
```

- Before react, we cleared the entire `DOM` and update it with the `new_state`.
- But, what we should do ideally is, calculate the `difference` between the `old_state` abd `new_state` and just make the changes where necessary, instead of clearing the things and re-adding things.
- How to do this? - `By remembering the old todos (exiting state) in a variable (virtual DOM)`. 
- This is what **React** does!!


## Now onto real React!!

##### Dynamic websites

**What is a dynamic website?**

> When we change or edit the look of the website after it has already loaded, it is called a dynamic website.


- when we have to create a dynamic website, we write a lot of JS code that does DOM manipulation.

##### State Variables
1. What is a state variable? Any variable that react needs to consciously watch, such that if it changes, the DOM needs to be changed.

```javascript
function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      
  )
}
```

2. Here, when the button is clicked, we are updating the state variable `count`, now it is the responsibility of react to figure out what to find, what to edit and where, in the application and not us.
3. Without react, as we saw in `todo.html`, we ourselves were manipulating the DOM using `appendChild`, `createElement`, etc.


##### Few important things learned
1. `react` is what maintains the state and finds the difference between the old and new state, decides what to change and where.
2. `reactDOM` tells `react` that you are in browser, and to update something you need to use `document.getElementById().innerHTML` or something else like that.
3. Basically, we use `reactDOM` when we are building web apps and use `react-native` or something else when creating native/mobile apps.


### Why React?
1. People realised it's harder to do DOM manipultaion the conventional way.
2. JQuery was built to make it easy, but it was very hard for big apps.
3. Eventually, vueJs/React created a new syntax to do frontends.
4. Under the hood, the react compiler convert your code to HTML/CSS/JS.


### To decide

- Creators of frontend frameworks realised that all websites can effectively be divided into two parts: `State` and `Components`

##### What is a state?
- An object that represents the current **state** of the app.
- It represents the dynamic things in your app (things that change)
- For example, the value of the counter.
```javascript
{
    count: 1
}
```

Another example can be LinkedIn Topbar, for that, the state can look something like this:

```javascript
{
    topbar: {
        home: 0,
        myNetwork: "99+",
        jobs: 0,
        messaging: 0,
        notifications: 10
    }
}
```

##### What is a component?
-  How a DOM element should render, given the state
-  It is a re-usable, dynamic, HTML snippet that changes given the state.


##### What is re-rendering?
- A state change triggers a re-render.
- A re-render represnts the actual DOM being manipulated when the state changes.


**You usually have to define all your components once, and then all you have to do is update the state of your app, React takes care of re-rendering your app.**


**What is a JSX file?**

- a JS file, inside which we can write both JS and xml.



###### Counter React

```javascript
import React from "react";
import './App.css'
function App(){
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Button count={count} setCount={setCount}></Button>
    </div>
  )
}

function Button(props){
  function onButtonClick(){
    props.setCount(props.count + 1)
  }

  return <button onClick={onButtonClick}>Counter {props.count}</button>
}

export default App;
```


##### Re-rendering
1. Re-render happens when a state mvariable that is being used inside a component changes.
2 . Every time a parent re-renders, every child also re-rendeers.

We can use `React.memo` to prevent re-rendering a component when it's props haven't changed.

```javascript
import React from 'react'
const Header = React.memo(function({title}){
  return (
    <div>
    {title}
    </div>
  )
})
```

Here, even if this component is a child of a component, it won't re-render if the parent re-renders.


##### Wrapper Components
Component which takes another components as its props. Eg. Card Component.

```javascript
function App(){
  return(
    <div>
      <CardWrapper>
        <div>
        hi there
        </div>
      </CardWrapper>

      <CardWrapper>
      <div>
        hello there
      </div>
      </CardWrapper>
    
    </div>
  )
}

function CardWrapper({children}){
  return (
    <div style={{border: "2px solid black", padding: 20}}>
      {children}
    </div>
  )
}
```


### Hooks
- Hooks in React are functions that allow you to "hook into" React state and lifecycle features from functional components.  

1. useState
- Let's you describe the state of your application.
- Whenever state updates, it triggers a re-render which finally results in a DOM update.

2. useEffect
- Lets us perform side effects (don't want do on every render)
- Side effects are operations that can affect other components or can't be done during rendering, such as data fetching, subscriptions or manually changing the DOM.

3. useMemo
- `memoization`: it means remembering some output given an input and not computing it again.

```javascript
function App(){
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  let count = 0;
  for (let i = 0; i <= inputValue; i ++){
    count += 1;
  }

  return (
    <div>
    <input onChange={() => setInputValue(e.target.value)}/><br>
    <p>Sum from 1 to {inputValue} is {count}</p>
    <button onClick={() => setCounter(count + 1)}>Counter {counter}</button>
    </div>
  )
}
```

What is the problem in the code above?
- When we click the button, the component re-renders and computes the sum again, but we already have the sum available.


Solution:

```javascript
function App(){
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  let count = useMemo(() => {
    let finalCount = 0
    for (let i = 0; i <= inputValue; i ++){
    finalCount += 1;
    }

    return finalCount;
  }, [inputValue])
  
  return (
    <div>
    <input onChange={() => setInputValue(e.target.value)}/><br>
    <p>Sum from 1 to {inputValue} is {count}</p>
    <button onClick={() => setCounter(count + 1)}>Counter {counter}</button>
    </div>
  )
}
```

- Here, `count` only runs when `inputValue` is updated, irrespective of a re-render.

4. useRef
- Get reference to DOM elements
- use `.current` to get the current element

```javascript
function App(){
  const [incomeTax, setIncomeTax] = useState(2000);
  const divRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      divRef.cuurent.innerHTML = '10';
    }, 5000)
  })

  return (
    <div>
    hi there, your income tax returns are <div ref={divRef}>{incomeTax}</div>
    </div>
  )
}
```
##### Custom Hooks
- Just like useState, useEffect, you can write your own hooks
- Only condition is - it should start with a `use`


###### Single Page App
- React lets us create single page applications, applications that do not require sending request again and again to fetch new pages. (Intuitive, as we render components based on conditions)


#### Routing

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { Landing } from '/components/Landing'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}>
        <Route path='/dashboard' element={<Dashboard/>}>
      </Routes>
    </BrowserRouter>
  )
}
```


#### Context API
- To avoid prop drilling (manually passing down props at each level)

In the same file or somewhere else, create a context.
```javascript
import { createContext } form 'react';

export const CounterContext = createContext(0);
```

Now, wrap anyone who wants to use this value (or context) inside a provider.


###### What is a provider?
- Something that provides the value

```javascript
<CounterContext.Provider value={count}>
  {children}
</CounterContext.Provider>
```

now, How to access the values inside a child

```javascript

function CountRenderer(){
  const count = useContext(CountContext);

  return (
    <div>
      {count}
    </div>
  )
}
```

**Downside of Context API**
- It still causes re-renders of components that do not use the state(context)
- doesn't fix re-rendering, only fixes prop drilling


#### State management using Recoil

**What is state management?**
- A cleaner way to store the state of your app.


Until now, the cleanest thing you can do is use the Context API. It lets you teleport state.

But there are better solutions that get rid of the problems that Context API has (unnecessary re-renders)


##### Recoil 

- Has a concept of an atom to store the state (count, todos, etc) (similar to useState)
- An atom can be defined outside the component
- Can be teleported to any component.


**Things to learn:**
1. RecoilRoot
2. atom
3. useRecoilState
4. useRecoilValue
5. useSetRecoilState
6. selector