/**
 * @file entry of this example.
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/css/v4-shims.css';
import './scss/style.scss';
import {setDefaultTheme} from 'amis';
import {setThemeConfig} from 'amis-editor-core';
import {cxdData as themeConfig} from 'amis-theme-editor-helper';

setDefaultTheme('cxd');
setThemeConfig(themeConfig);

// react < 18
ReactDOM.render(<App />, document.getElementById('root'));
