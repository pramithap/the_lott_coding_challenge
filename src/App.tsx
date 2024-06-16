import './App.css';
import Ticket from './components/Ticket/Ticket';

function App() {

  const possibleTicketNumbers = {
    primary : 35,
    secondary : 20
  };

  const possibleDrawNumbers = {
    primary: 7,
    secondary: 1
  };

  return (
    <div className="app">
      <header className='app-header-text'>Latest Draw Numbers</header>
      <Ticket 
        type = "PowerBall"
        possibleTicketNumbers = {possibleTicketNumbers}
        possibleDrawNumbers = {possibleDrawNumbers}
      />
    </div>
  );
}

export default App;
