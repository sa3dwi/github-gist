// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from "chai";
import sinonChai from "sinon-chai";
import chaiJestSnapshot from "chai-jest-snapshot";
 
Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiJestSnapshot);
chai.use(sinonChai);
