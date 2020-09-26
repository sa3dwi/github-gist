import React from 'react';
import {render, cleanup} from '@testing-library/react'
import { create } from "react-test-renderer";
import { expect } from 'chai';

import useLocalStorage from './../hooks/useLocalStorage';

beforeEach(() => {
  localStorage.clear();
  cleanup
})

describe("useLocalStorage hook Functionality", () => {
  test('allows you set localstorage value', () => {

  })
  test('allows you get localstorage value', () => {

  })
  test('allows you clear localstorage values', () => {

  })
})
