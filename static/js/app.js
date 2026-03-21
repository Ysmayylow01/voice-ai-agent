// ===========================
// VOICE AI AGENT - MAIN APP
// ===========================

let isListening = false;
let recognition = null;
let activityLog = [];
let currentVoiceField = null; // Track which field is being filled by voice

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    initializeVisualizer();
    checkMicrophonePermission();
});

function initializeApp() {
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showNotification(getText('notif_error'), 'error');
        console.error('Speech recognition not supported');
        return;
    }
    
    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    // Configure recognition based on language
    configureRecognition();
    
    // Setup recognition event handlers
    setupRecognitionHandlers();
}

// ===========================
// PERMISSION MANAGEMENT
// ===========================

async function checkMicrophonePermission() {
    try {
        // Check if Permissions API is available
        if (navigator.permissions && navigator.permissions.query) {
            const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
            
            console.log('🎙️ Microphone permission status:', permissionStatus.state);
            
            if (permissionStatus.state === 'granted') {
                hidePermissionRequest();
                enableStartButton();
            } else if (permissionStatus.state === 'denied') {
                showPermissionRequest();
                disableStartButton();
            } else {
                // Prompt state - show request button
                showPermissionRequest();
            }
            
            // Listen for permission changes
            permissionStatus.onchange = () => {
                console.log('🎙️ Permission changed to:', permissionStatus.state);
                if (permissionStatus.state === 'granted') {
                    hidePermissionRequest();
                    enableStartButton();
                } else {
                    showPermissionRequest();
                    disableStartButton();
                }
            };
        } else {
            // Fallback for browsers without Permissions API
            // Try to access microphone directly
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(track => track.stop());
                hidePermissionRequest();
                enableStartButton();
            } catch (error) {
                showPermissionRequest();
            }
        }
    } catch (error) {
        console.error('Error checking microphone permission:', error);
        showPermissionRequest();
    }
}

async function requestMicrophonePermission() {
    try {
        showNotification(getText('permission_checking'), 'info');
        
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Permission granted - stop the stream
        stream.getTracks().forEach(track => track.stop());
        
        console.log('✅ Microphone permission granted');
        hidePermissionRequest();
        enableStartButton();
        showNotification(getText('notif_started'), 'success');
        
    } catch (error) {
        console.error('❌ Microphone permission denied:', error);
        showNotification(getText('permission_denied'), 'error');
        
        // Show instructions
        showPermissionInstructions();
    }
}

function showPermissionRequest() {
    const permissionDiv = document.getElementById('permissionRequest');
    if (permissionDiv) {
        permissionDiv.style.display = 'block';
    }
}

function hidePermissionRequest() {
    const permissionDiv = document.getElementById('permissionRequest');
    if (permissionDiv) {
        permissionDiv.style.display = 'none';
    }
}

function enableStartButton() {
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
        startBtn.style.cursor = 'pointer';
    }
}

function disableStartButton() {
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.disabled = true;
        startBtn.style.opacity = '0.5';
        startBtn.style.cursor = 'not-allowed';
    }
}

function showPermissionInstructions() {
    const instructions = {
        'tk': 'Brauzer sazlamalarynda mikrofon rugsatyny beriň we sahypany täzeden ýükläň.',
        'ru': 'Разрешите доступ к микрофону в настройках браузера и обновите страницу.',
        'tr': 'Tarayıcı ayarlarında mikrofon iznini verin ve sayfayı yenileyin.',
        'en': 'Grant microphone access in browser settings and refresh the page.',
        'uz': 'Brauzer sozlamalarida mikrofon ruxsatini bering va sahifani yangilang.'
    };
    
    const message = instructions[currentLang] || instructions['en'];
    
    // Show detailed instructions
    const instructionDiv = document.createElement('div');
    instructionDiv.className = 'permission-instructions';
    instructionDiv.innerHTML = `
        <p style="color: var(--text-secondary); margin-top: 20px; padding: 20px; background: rgba(255,0,110,0.1); border-radius: 10px; border-left: 3px solid var(--primary-pink);">
            ℹ️ ${message}
        </p>
    `;
    
    const permissionCard = document.querySelector('.permission-card');
    if (permissionCard && !permissionCard.querySelector('.permission-instructions')) {
        permissionCard.appendChild(instructionDiv);
    }
}

function configureRecognition() {
    if (!recognition) return;
    
    const langMap = {
        'tk': 'tr-TR', // Using Turkish as fallback for Turkmen
        'ru': 'ru-RU',
        'tr': 'tr-TR',
        'en': 'en-US',
        'uz': 'uz-UZ'
    };
    
    recognition.lang = langMap[currentLang] || 'tr-TR';
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
}

// ===========================
// EVENT LISTENERS
// ===========================

function setupEventListeners() {
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const requestPermissionBtn = document.getElementById('requestPermissionBtn');
    
    startBtn.addEventListener('click', startListening);
    stopBtn.addEventListener('click', stopListening);
    
    if (requestPermissionBtn) {
        requestPermissionBtn.addEventListener('click', requestMicrophonePermission);
    }
    
    // Email modal listeners
    setupEmailModalListeners();
}

// ===========================
// EMAIL MODAL HANDLERS
// ===========================

function setupEmailModalListeners() {
    const emailModalClose = document.getElementById('emailModalClose');
    const emailModalOverlay = document.getElementById('emailModalOverlay');
    const emailCancel = document.getElementById('emailCancel');
    const emailSend = document.getElementById('emailSend');
    
    // Mic buttons for each field
    const micRecipient = document.getElementById('micRecipient');
    const micSubject = document.getElementById('micSubject');
    const micMessage = document.getElementById('micMessage');
    
    if (emailModalClose) {
        emailModalClose.addEventListener('click', closeEmailModal);
    }
    
    if (emailModalOverlay) {
        emailModalOverlay.addEventListener('click', closeEmailModal);
    }
    
    if (emailCancel) {
        emailCancel.addEventListener('click', closeEmailModal);
    }
    
    if (emailSend) {
        emailSend.addEventListener('click', sendEmail);
    }
    
    // Voice input for fields
    if (micRecipient) {
        micRecipient.addEventListener('click', () => startVoiceInput('recipient'));
    }
    
    if (micSubject) {
        micSubject.addEventListener('click', () => startVoiceInput('subject'));
    }
    
    if (micMessage) {
        micMessage.addEventListener('click', () => startVoiceInput('message'));
    }
}

function openEmailModal() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Focus on recipient field
        setTimeout(() => {
            const recipientInput = document.getElementById('emailRecipient');
            if (recipientInput) {
                recipientInput.focus();
            }
        }, 100);
    }
}

function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    if (modal) {
        modal.style.display = 'none';
        
        // Clear form
        document.getElementById('emailRecipient').value = '';
        document.getElementById('emailSubject').value = '';
        document.getElementById('emailMessage').value = '';
        
        // Hide voice status
        document.getElementById('voiceStatus').style.display = 'none';
    }
}

async function startVoiceInput(field) {
    currentVoiceField = field;
    
    // Show voice status
    const voiceStatus = document.getElementById('voiceStatus');
    if (voiceStatus) {
        voiceStatus.style.display = 'block';
    }
    
    // Highlight active mic button
    const micBtn = document.getElementById(`mic${field.charAt(0).toUpperCase() + field.slice(1)}`);
    if (micBtn) {
        micBtn.classList.add('active');
    }
    
    if (!recognition) {
        showNotification(getText('notif_no_mic'), 'error');
        stopVoiceInput();
        return;
    }
    
    try {
        // Stop main listening if active
        const wasMainListening = isListening;
        if (isListening) {
            isListening = false;
            recognition.stop();
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        // Configure for single input
        recognition.continuous = false;
        recognition.interimResults = false;
        
        // One-time result handler
        const onResult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log('📝 Voice input for', field, ':', transcript);
            
            // Fill the field
            const fieldId = `email${field.charAt(0).toUpperCase() + field.slice(1)}`;
            const fieldElement = document.getElementById(fieldId);
            
            if (fieldElement) {
                if (field === 'message') {
                    fieldElement.value += (fieldElement.value ? ' ' : '') + transcript;
                } else {
                    fieldElement.value = transcript;
                }
            }
            
            cleanup();
            
            // Resume main listening if it was active
            if (wasMainListening) {
                setTimeout(() => resumeMainListening(), 500);
            }
        };
        
        const onError = (event) => {
            console.error('❌ Voice input error:', event.error);
            cleanup();
        };
        
        const onEnd = () => {
            cleanup();
        };
        
        const cleanup = () => {
            recognition.removeEventListener('result', onResult);
            recognition.removeEventListener('error', onError);
            recognition.removeEventListener('end', onEnd);
            stopVoiceInput();
        };
        
        // Attach listeners
        recognition.addEventListener('result', onResult);
        recognition.addEventListener('error', onError);
        recognition.addEventListener('end', onEnd);
        
        // Start
        recognition.start();
        console.log('🎤 Listening for', field);
        
    } catch (error) {
        console.error('❌ Start error:', error);
        stopVoiceInput();
        
        if (error.name === 'InvalidStateError') {
            showNotification('Mikrofon eýýäm ulanylýar, garaşyň...', 'error');
        }
    }
}

function resumeMainListening() {
    if (!isListening && recognition) {
        try {
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.start();
            isListening = true;
            document.getElementById('startBtn').style.display = 'none';
            document.getElementById('stopBtn').style.display = 'flex';
        } catch (e) {
            console.log('Could not resume main listening:', e);
        }
    }
}

function stopVoiceInput() {
    currentVoiceField = null;
    
    // Hide voice status
    const voiceStatus = document.getElementById('voiceStatus');
    if (voiceStatus) {
        voiceStatus.style.display = 'none';
    }
    
    // Remove active state from all mic buttons
    document.querySelectorAll('.mic-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Reset recognition to continuous mode for main app
    if (recognition) {
        recognition.continuous = true;
        recognition.interimResults = true;
    }
}

async function sendEmail() {
    const recipient = document.getElementById('emailRecipient').value.trim();
    const subject = document.getElementById('emailSubject').value.trim();
    const message = document.getElementById('emailMessage').value.trim();
    
    // Validation
    if (!recipient) {
        showNotification(getText('email_to_label') + ' ' + getText('email_message_placeholder'), 'error');
        return;
    }
    
    if (!subject) {
        showNotification(getText('email_subject_label') + ' ' + getText('email_message_placeholder'), 'error');
        return;
    }
    
    if (!message) {
        showNotification(getText('email_message_label') + ' ' + getText('email_message_placeholder'), 'error');
        return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipient)) {
        showNotification('Invalid email address', 'error');
        return;
    }
    
    try {
        showNotification(getText('voice_listening') + '...', 'info');
        
        // Send to backend
        const response = await fetch('/send_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                to_email: recipient,
                subject: subject,
                message: message
            })
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(getText('activity_email_sent') + '!', 'success');
            addActivity('📧', `${getText('activity_email_sent')}: ${recipient}`);
            closeEmailModal();
        } else {
            showNotification('Email error: ' + (result.error || 'Unknown error'), 'error');
        }
        
    } catch (error) {
        console.error('Send email error:', error);
        showNotification('Email sending failed: ' + error.message, 'error');
    }
}

// ===========================
// SPEECH RECOGNITION HANDLERS
// ===========================

function setupRecognitionHandlers() {
    if (!recognition) return;
    
    recognition.onstart = () => {
        console.log('🎙 Voice recognition started');
        updateStatus('listening');
        activateVisualizer();
    };
    
    recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        
        // Update transcript display
        if (finalTranscript) {
            addToTranscript(finalTranscript);
            processCommand(finalTranscript);
        } else if (interimTranscript) {
            updateTranscriptPreview(interimTranscript);
        }
    };
    
    recognition.onerror = (event) => {
        console.error('Recognition error:', event.error);
        if (event.error === 'no-speech') {
            console.log('No speech detected');
        } else {
            showNotification(getText('notif_error'), 'error');
        }
    };
    
    recognition.onend = () => {
        console.log('🎙 Voice recognition ended');
        if (isListening) {
            // Restart if still supposed to be listening
            recognition.start();
        } else {
            updateStatus('ready');
            deactivateVisualizer();
        }
    };
}

// ===========================
// CONTROL FUNCTIONS
// ===========================

function startListening() {
    if (!recognition) {
        showNotification(getText('notif_no_mic'), 'error');
        return;
    }
    
    // Check if button is disabled
    const startBtn = document.getElementById('startBtn');
    if (startBtn && startBtn.disabled) {
        showNotification(getText('permission_denied'), 'error');
        showPermissionRequest();
        return;
    }
    
    // Update recognition language
    configureRecognition();
    
    try {
        isListening = true;
        recognition.start();
        
        // Update UI
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('stopBtn').style.display = 'flex';
        
        showNotification(getText('notif_started'), 'success');
        addActivity('🎙️', getText('notif_started'));
    } catch (error) {
        console.error('Error starting recognition:', error);
        
        if (error.name === 'NotAllowedError') {
            showNotification(getText('permission_denied'), 'error');
            showPermissionRequest();
        } else {
            showNotification(getText('notif_error'), 'error');
        }
        
        isListening = false;
    }
}

function stopListening() {
    isListening = false;
    if (recognition) {
        recognition.stop();
    }
    
    // Update UI
    document.getElementById('startBtn').style.display = 'flex';
    document.getElementById('stopBtn').style.display = 'none';
    
    showNotification(getText('notif_stopped'), 'info');
    addActivity('⏹️', getText('notif_stopped'));
}

// ===========================
// STATUS MANAGEMENT
// ===========================

function updateStatus(status) {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    
    statusDot.className = 'status-dot';
    
    switch(status) {
        case 'ready':
            statusText.textContent = getText('status_ready');
            break;
        case 'listening':
            statusText.textContent = getText('status_listening');
            statusDot.classList.add('listening');
            break;
        case 'processing':
            statusText.textContent = getText('status_processing');
            statusDot.classList.add('processing');
            break;
    }
}

// ===========================
// TRANSCRIPT MANAGEMENT
// ===========================

function addToTranscript(text) {
    const transcriptBox = document.getElementById('transcriptBox');
    
    // Remove placeholder if exists
    const placeholder = transcriptBox.querySelector('.placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    
    // Create new transcript entry
    const entry = document.createElement('p');
    entry.textContent = text;
    entry.style.marginBottom = '10px';
    entry.style.padding = '10px';
    entry.style.background = 'rgba(0, 245, 255, 0.1)';
    entry.style.borderRadius = '8px';
    entry.style.borderLeft = '3px solid var(--primary-cyan)';
    entry.style.animation = 'slideInLeft 0.3s ease-out';
    
    transcriptBox.appendChild(entry);
    transcriptBox.scrollTop = transcriptBox.scrollHeight;
}

function updateTranscriptPreview(text) {
    const transcriptBox = document.getElementById('transcriptBox');
    
    // Remove any existing preview
    const existingPreview = transcriptBox.querySelector('.preview');
    if (existingPreview) {
        existingPreview.remove();
    }
    
    // Add new preview
    const preview = document.createElement('p');
    preview.className = 'preview';
    preview.textContent = text;
    preview.style.opacity = '0.5';
    preview.style.fontStyle = 'italic';
    
    transcriptBox.appendChild(preview);
}

// ===========================
// COMMAND PROCESSING
// ===========================

function processCommand(text) {
    updateStatus('processing');
    
    const lowerText = text.toLowerCase();
    console.log('🤖 Processing command:', lowerText);
    
    // Check for email command
    if (lowerText.includes('email') || lowerText.includes('gmail') || 
        lowerText.includes('mail') || lowerText.includes('hat') ||
        lowerText.includes('письмо') || lowerText.includes('xat')) {
        
        console.log('📧 Opening email modal...');
        openEmailModal();
        addActivity('📧', getText('activity_email'));
        setTimeout(() => updateStatus('listening'), 500);
        return;
    }
    
    // Send to Flask backend for other commands
    fetch('/execute_command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            command: text,
            language: currentLang
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Command result:', data);
        
        if (data.success) {
            const actionKey = getActionKey(data.action);
            addActivity(getActionIcon(data.action), getText(actionKey));
            
            if (data.result) {
                addToTranscript(`➤ ${data.result}`);
            }
        } else {
            addActivity('❌', getText('activity_unknown'));
        }
        
        setTimeout(() => updateStatus('listening'), 500);
    })
    .catch(error => {
        console.error('Command execution error:', error);
        addActivity('❌', getText('activity_unknown'));
        setTimeout(() => updateStatus('listening'), 500);
    });
}

function getActionKey(action) {
    const actionMap = {
        'youtube': 'activity_youtube',
        'google': 'activity_google',
        'word': 'activity_word',
        'chrome': 'activity_chrome',
        'notepad': 'activity_notepad',
        'time': 'activity_time',
        'email': 'activity_email'
    };
    
    return actionMap[action] || 'activity_unknown';
}

function getActionIcon(action) {
    const iconMap = {
        'youtube': '▶️',
        'google': '🔎',
        'word': '📄',
        'chrome': '🌐',
        'notepad': '📝',
        'time': '⏰',
        'email': '📧'
    };
    
    return iconMap[action] || '❓';
}

// ===========================
// ACTIVITY LOG
// ===========================

function addActivity(icon, text) {
    const activityLog = document.getElementById('activityLog');
    
    // Remove placeholder if exists
    const placeholder = activityLog.querySelector('.placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    
    // Create activity item
    const item = document.createElement('div');
    item.className = 'activity-item';
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    item.innerHTML = `
        <div class="activity-icon">${icon}</div>
        <div class="activity-content">
            <div class="activity-text">${text}</div>
            <div class="activity-time">${timeStr}</div>
        </div>
    `;
    
    activityLog.insertBefore(item, activityLog.firstChild);
    
    // Keep only last 10 activities
    while (activityLog.children.length > 10) {
        activityLog.removeChild(activityLog.lastChild);
    }
}

// ===========================
// VISUALIZER
// ===========================

let visualizerActive = false;

function initializeVisualizer() {
    const waveBars = document.querySelectorAll('.wave-bar');
    waveBars.forEach(bar => {
        bar.style.height = '20px';
    });
}

function activateVisualizer() {
    visualizerActive = true;
    const waveBars = document.querySelectorAll('.wave-bar');
    
    waveBars.forEach((bar, index) => {
        bar.classList.add('active');
    });
}

function deactivateVisualizer() {
    visualizerActive = false;
    const waveBars = document.querySelectorAll('.wave-bar');
    
    waveBars.forEach(bar => {
        bar.classList.remove('active');
    });
}

// ===========================
// NOTIFICATIONS
// ===========================

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '30px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '12px';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideInRight 0.3s ease-out';
    notification.style.backdropFilter = 'blur(20px)';
    notification.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    
    // Set background based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ff006e, #ff4500)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #00f5ff, #7b2ff7)';
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Add animation keyframes if not in CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);