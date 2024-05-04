import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LostForm from './features/Form/components/LostForm.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LostForm></LostForm>
    </>
  )
}

export default App
