import { cleanup } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import { expect } from 'chai';

import useLocalStorage from "./../hooks/useLocalStorage";

beforeEach(() => {
  localStorage.clear();
  cleanup
})

describe("useLocalStorage hook Functionality", () => {
  test('allows you set localstorage value', async () => {
    const {result} = renderHook(() => useLocalStorage('gistTest','test') );
    
    // check save with initialValue 
    expect(result.current[0]).to.equal('test');
    
    // fire setValue
    act(() => {
      result.current[1]('test2');
    });

    // check if saved to localStorage 
    let localStorageItems = JSON.parse(localStorage.getItem('gistTest'));
    expect(result.current[0][0]).to.contain(localStorageItems[0]);

  })
  test('allows you get localstorage value', () => {
    const {result} = renderHook(() => useLocalStorage('gistTest','test') );
    expect(result.current[0]).to.equal('test');
  })
  test('allows you clear localstorage values', () => {
    const {result} = renderHook(() => useLocalStorage('gistTest','test') );

    // fire clearStore
    act(() => {
      result.current[2]();
    });

    // check if localStorage is cleared 
    let localStorageItems = localStorage.getItem('gistTest') ? localStorage.getItem('gistTest') : '';
    expect(result.current[0]).to.equal(localStorageItems);

    // check if store is cleared 
    expect(result.current[0]).to.equal('');
  })
})
