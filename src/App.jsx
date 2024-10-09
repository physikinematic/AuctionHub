import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';

import { Container, Footer, Header } from './sections/index';
import { About, AddAuction, Contact, Help, Home, MyAuctions, MyBids, Payment } from './pages/index';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path='/add-auction' element={<AddAuction />}></Route>
            <Route path='/myauctions' element={<MyAuctions />}></Route>
            <Route path='/mybids' element={<MyBids />}></Route>
            <Route path='/payment' element={<Payment />}></Route>
            <Route path='/help' element={<Help />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
          </Routes>
        </Container>
        <Footer />
      </Router>
    </>
  );
}

export default App;