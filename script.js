const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const loader = document.getElementById('loader');

// Function to add a message to the chat box
const addMessageToChatBox = (sender, text) => {
  const messageElement = document.createElement('div');
  messageElement.className = `message ${sender}`;
  messageElement.innerHTML = `${sender.charAt(0).toUpperCase() + sender.slice(1)}:<br>${text}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
};

// Function to handle code response
const addCodeToChatBox = (codeContent) => {
  const codeElement = document.createElement('div');
  codeElement.className = 'message bot';
  const codeBox = document.createElement('div');
  codeBox.className = 'code-box';
  codeBox.textContent = codeContent; // Use textContent to avoid HTML injection

  // Create and append copy button
  const copyBtn = document.createElement('button');
  copyBtn.textContent = 'Copy';
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(codeContent).then(() => {
      alert('Code copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy code: ', err);
    });
  };

  codeBox.appendChild(copyBtn);
  codeElement.appendChild(codeBox);
  chatBox.appendChild(codeElement);
  chatBox.scrollTop = chatBox.scrollHeight;
};

// Function to handle list response
const addListToChatBox = (listItems) => {
  const listElement = document.createElement('div');
  listElement.className = 'message bot';
  const listBox = document.createElement('div');
  listBox.className = 'list-box';
  const ulElement = document.createElement('ul');

  listItems.forEach(item => {
    const liElement = document.createElement('li');
    liElement.textContent = item;
    ulElement.appendChild(liElement);
  });

  listBox.appendChild(ulElement);
  listElement.appendChild(listBox);
  chatBox.appendChild(listElement);
  chatBox.scrollTop = chatBox.scrollHeight;
};

// Function to show loader
const showLoader = () => {
  loader.style.display = 'flex';
};

// Function to hide loader
const hideLoader = () => {
  loader.style.display = 'none';
};

// Function to send message
const sendMessage = async () => {
  const message = userInput.value.trim();
  if (message === '') return;

  // Display user message
  addMessageToChatBox('user', message);
  userInput.value = '';

  // Show loader
  showLoader();

  // Send message to server
  const response = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  const responseText = data.response;

  // Hide loader
  hideLoader();

  // Determine if the response is code or list
  if (responseText.startsWith('```') && responseText.endsWith('```')) {
    addCodeToChatBox(responseText.substring(3, responseText.length - 3).trim());
  } else if (responseText.includes('\n') && !responseText.includes('1.')) {
    addMessageToChatBox('bot', responseText.replace(/\n/g, '<br>'));
  } else {
    const listItems = responseText.split('\n').filter(item => item.trim());
    addListToChatBox(listItems);
  }
};

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
  }
});
