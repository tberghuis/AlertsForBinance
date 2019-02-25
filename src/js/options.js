import '../css/options.css';
import Greeting from './components/greeting_component.jsx';
import React from 'react';
import { render } from 'react-dom';

render(<Greeting />, window.document.getElementById('app-container'));

// chrome.runtime.onMessage((message, sender) => {
// 	console.log('message,sender', message, sender);
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log('request,sender', request, sender);
});


chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response);
});


function hello_world(){
    console.log('can this be called from background script?');
}
