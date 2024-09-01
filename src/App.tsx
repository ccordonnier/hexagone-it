import './App.css'
import AppRouter from './router'
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <div className="App" data-theme="luxury">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  )
}

export default App
