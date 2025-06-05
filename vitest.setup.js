import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import * as React from 'react';

// Some components compiled with the classic runtime expect a global React
// variable, so expose it here for tests.
globalThis.React = React;

expect.extend(matchers);
