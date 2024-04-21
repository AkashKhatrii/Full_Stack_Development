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