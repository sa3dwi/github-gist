import React from 'react';
import { render, screen, fireEvent, cleanup, waitForElement } from '@testing-library/react'
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from './../App';

beforeEach(() => {
  localStorage.clear();
  cleanup
})

describe("App component UI", () => {
  test('has correct welcome text', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('h3').text()).to.equal('GitHub Gist Search')
  })
  
  test('has button with search text', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('button').text()).to.equal('Search')
  })

  test('matches the snapshot', () => {
    const wrapper = create(<App />)
    expect(wrapper.toJSON()).to.matchSnapshot()
  })
})

describe("App component Functionality", () => {
  test('allows you submit search', () => {
    render(<App />)
    const input = screen.getByTestId('searchInput');
    const submit = screen.getByTestId('submitSearchBtn');

    input.value = 'sa3dwi'
    fireEvent.click(submit)
  })

  test('allows you add to resentSearch', () => {
    render(<App />)
    const input = screen.getByTestId('searchInput');
    const submit = screen.getByTestId('submitSearchBtn');
    const resentSearchSection = screen.getByTestId('resentSearch');

    input.value = 'sa3dwi'
    fireEvent.click(submit)

    expect(resentSearchSection).not.to.equal(null);
  })

  test('allows you show empty results msg', () => {
    render(<App />)
    const input = screen.getByTestId('searchInput');
    const submit = screen.getByTestId('submitSearchBtn');
    const searchListWarp = screen.getByTestId('searchListWarp');

    input.value = 'sa3'
    fireEvent.click(submit)

    expect(searchListWarp.textContent).to.equal('No Results found')
  })
})
