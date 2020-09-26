import React from 'react';
import { render, cleanup } from '@testing-library/react'
import { create } from "react-test-renderer";
import { expect } from 'chai';

import SearchList from './../components/search/SearchList';

beforeEach(() => {
  localStorage.clear();
  cleanup
})

describe("SearchList component UI", () => {
  test('matches the snapshot', () => {
    const wrapper = create(<SearchList searchResults={[]} />)
    expect(wrapper.toJSON()).to.matchSnapshot()
  })
})

// TODO: use mock api 
describe("SearchList component Functionality", () => {
  test('allows you show search list', () => {
    render(<SearchList searchResults={[]} />)
  })
})
