import logo from './logo.svg';
import { Form, Field } from 'react-final-form'
import './App.css';

function App() {
  return (
    <div className="App">
     <MyForm/>
    </div>
  );
}
const onSubmit = () => {
  console.log("onsubmit working");
}
const MyForm = () => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <h2>Simple Default Input</h2>
        <div>
          <label>First Name</label>
          <Field name="firstName" component="input" placeholder="First Name" />
        </div>
        <button type="submit">Submit</button>
      </form>
    )}
  />
) 

export default App;
