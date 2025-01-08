#  Speech Assistant with Twilio Voice and the OpenAI Realtime API (Node.js)

This application demonstrates how to use Node.js, [Twilio Voice](https://www.twilio.com/docs/voice) and [Media Streams](https://www.twilio.com/docs/voice/media-streams), and [OpenAI's Realtime API](https://platform.openai.com/docs/) to make a phone call to speak with an AI Assistant. 

The application opens websockets with the OpenAI Realtime API and Twilio, and sends voice audio from one to the other to enable a two-way conversation.

See [here](https://www.twilio.com/en-us/blog/voice-ai-assistant-openai-realtime-api-node) for a tutorial overview of the code.

This application uses the following Twilio products in conjuction with OpenAI's Realtime API:
- Voice (and TwiML, Media Streams)
- Phone Numbers

## Prerequisites

To use the app, you will  need:

- **Node.js 18+** We used \`18.20.4\` for development; download from [here](https://nodejs.org/).
- **A Twilio account.** You can sign up for a free trial [here](https://www.twilio.com/try-twilio).
- **A Twilio number with _Voice_ capabilities.** [Here are instructions](https://help.twilio.com/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console) to purchase a phone number.
- **An OpenAI account and an OpenAI API Key.** You can sign up [here](https://platform.openai.com/).
  - **OpenAI Realtime API access.**

## Local Setup

There are 4 required steps to get the app up-and-running locally for development and testing:
1. Run ngrok or another tunneling solution to expose your local server to the internet for testing. Download ngrok [here](https://ngrok.com/).
2. Install the packages
3. Twilio setup
4. Update the .env file

### Open an ngrok tunnel
When developing & testing locally, you'll need to open a tunnel to forward requests to your local development server. These instructions use ngrok.

Open a Terminal and run:
```
ngrok http 5050
```
Once the tunnel has been opened, copy the `Forwarding` URL. It will look something like: `https://[your-ngrok-subdomain].ngrok.app`. You will
need this when configuring your Twilio number setup.

Note that the `ngrok` command above forwards to a development server running on port `5050`, which is the default port configured in this application. If
you override the `PORT` defined in `index.js`, you will need to update the `ngrok` command accordingly.

Keep in mind that each time you run the `ngrok http` command, a new URL will be created, and you'll need to update it everywhere it is referenced below.

### Install required packages

Open a Terminal and run:
```
npm install
```

### Twilio setup

#### Point a Phone Number to your ngrok URL
In the [Twilio Console](https://console.twilio.com/), go to **Phone Numbers** > **Manage** > **Active Numbers** and click on the additional phone number you purchased for this app in the **Prerequisites**.

In your Phone Number configuration settings, update the first **A call comes in** dropdown to **Webhook**, and paste your ngrok forwarding URL (referenced above), followed by `/incoming-call`. For example, `https://[your-ngrok-subdomain].ngrok.app/incoming-call`. Then, click **Save configuration**.

### Update the .env file

Create a `/env` file, or copy the `.env.example` file to `.env`:

```
cp .env.example .env
```

In the .env file, update the `OPENAI_API_KEY` to your OpenAI API key from the **Prerequisites**.

## Run the app
Once ngrok is running, dependencies are installed, Twilio is configured properly, and the `.env` is set up, run the dev server with the following command:
```
node index.js
```
## Test the app
With the development server running, call the phone number you purchased in the **Prerequisites**. After the introduction, you should be able to talk to the AI Assistant. Have fun!

## Special features

### Have the AI speak first
To have the AI voice assistant talk before the user, uncomment the line `// sendInitialConversationItem();`. The initial greeting is controlled in `sendInitialConversationItem`.

### Interrupt handling/AI preemption
When the user speaks and OpenAI sends `input_audio_buffer.speech_started`, the code will clear the Twilio Media Streams buffer and send OpenAI `conversation.item.truncate`.

Depending on your application's needs, you may want to use the [`input_audio_buffer.speech_stopped`](https://platform.openai.com/docs/api-reference/realtime-server-events/input_audio_buffer/speech_stopped) event, instead.

# Emergency Call Management System

## 🚨 Project Overview

The Emergency Call Management System is an innovative solution developed during the hackathon to revolutionize how emergency services handle and respond to emergency calls. Our system provides a modern, efficient, and user-friendly interface for emergency operators to manage calls, dispatch appropriate services, and coordinate emergency responses in real-time.

### 🎯 Problem Statement

Traditional emergency call systems often face challenges such as:
- Difficulty in managing multiple emergency calls simultaneously
- Lack of real-time tracking and status updates
- Limited integration with modern technologies
- Complex user interfaces that slow down response times

### 💡 Our Solution

We've developed a comprehensive web-based platform that:
- Provides an intuitive interface for handling emergency calls
- Supports multiple types of emergencies (Medical, Fire, Police)
- Offers real-time call transcription and status updates
- Includes smart dispatch functionality with location tracking
- Features a modern, responsive design for optimal usability

## 🛠️ Technologies Used

### Frontend
- **React.js**: For building the user interface
- **Material-UI**: For modern, responsive UI components
- **MapBox**: For real-time location tracking and visualization
- **WebSocket**: For real-time updates and communication

### Backend
- **Node.js**: Server-side runtime environment
- **Express.js**: Web application framework
- **Firebase**: 
  - Firestore for real-time database
  - Authentication for secure access
  - Cloud Functions for serverless operations

### APIs and Services
- **OpenAI Whisper**: For speech-to-text transcription
- **Firebase Real-time Database**: For live updates and data synchronization
- **Geolocation Services**: For emergency location tracking

## 🌟 Key Features

1. **Real-time Call Management**
   - Live call transcription
   - Multi-language support
   - Call priority management
   - Status tracking and updates

2. **Smart Dispatch System**
   - Automated service assignment
   - Real-time location tracking
   - Resource optimization
   - Multi-service coordination

3. **Interactive Dashboard**
   - Call history and logs
   - Real-time statistics
   - Performance metrics
   - Resource allocation overview

4. **Emergency Scenarios**
   - Pre-defined emergency protocols
   - Dynamic response guidelines
   - Situation-specific instructions
   - Multi-agency coordination

## 🚀 Getting Started

### Prerequisites
```bash
- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- OpenAI API key
```

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/emergency-call-system.git
```

2. Install dependencies
```bash
cd emergency-call-system
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Add your API keys and configuration
```

4. Start the development server
```bash
npm run dev
```

## 🎨 User Interface

Our system features a clean, intuitive interface divided into three main sections:
1. **Left Panel**: Emergency type selection and quick actions
2. **Main Panel**: Active call management and transcription
3. **Right Panel**: Location tracking and resource management

## 🔒 Security Features

- End-to-end encryption for all communications
- Secure authentication and authorization
- Data privacy compliance
- Audit logging and monitoring

## 📈 Future Enhancements

1. **AI Integration**
   - Predictive emergency analysis
   - Automated resource allocation
   - Pattern recognition for emergency prevention

2. **Mobile Integration**
   - Mobile app for field responders
   - Real-time status updates
   - Push notifications

3. **Advanced Analytics**
   - Performance metrics
   - Response time optimization
   - Resource utilization analysis

## 👥 Team Members

- [Team Member 1] - Role
- [Team Member 2] - Role
- [Team Member 3] - Role
- [Team Member 4] - Role

## 🏆 Hackathon Achievement

This project was developed during [Hackathon Name] and achieved [mention any awards or recognition].

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [List any libraries, tools, or resources that helped you build this project]
- [Mention any mentors or advisors who helped]
- [Include any other acknowledgments]

---

For any questions or suggestions, please open an issue or contact the team at [contact information].
