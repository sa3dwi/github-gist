import React from 'react';
import {render, cleanup} from '@testing-library/react'
import { create } from "react-test-renderer";
import { expect } from 'chai';

import SearchItem from './../components/search/SearchItem';

beforeEach(() => {
  localStorage.clear();
  cleanup
})

describe("SearchItem component UI", () => {
  test('matches the snapshot', () => {
    const wrapper = create(<SearchItem item={{item:[]}}/>)
    expect(wrapper.toJSON()).to.matchSnapshot()
  })
})

// TODO: use mock api 
describe("SearchItem component Functionality", () => {
  test('allows you show search item', () => {
    render(<SearchItem item={{item:[]}}/>)
  })
})
