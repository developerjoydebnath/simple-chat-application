
import './App.css'
import LeftChatBox from './components/LeftChatBox'
import RightChatBox from './components/RightChatBox'

function App() {

  return (
    <div className='flex justify-between'>
      <LeftChatBox />
      <RightChatBox />
    </div>
  )
}

export default App
