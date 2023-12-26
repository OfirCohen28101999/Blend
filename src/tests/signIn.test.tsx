import ReactDOM from 'react-dom';
import SignIn from '../pages/signIn';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignIn />, div);
  ReactDOM.unmountComponentAtNode(div);
});