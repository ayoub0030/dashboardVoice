// Emergency call scenarios with predefined conversations
const emergencyScenarios = {
   
    "medical": [
        {
            "title": "Medical Emergency - Cardiac Arrest",
            "location": "Gauthier, Casablanca",
            "coordinates": { "latitude": 33.5898, "longitude": -7.6351 },
            "callType": "Medical",
            "priority": "Critical",
            "conversation": [
                { "role": "caller", "text": "Please, my husband! I think he's having a heart attack! He just collapsed!" },
                { "role": "operator", "text": "Okay, stay calm. Is he conscious? Is he breathing?" },
                 { "role": "caller", "text": "No! He's not breathing! He's completely unresponsive! Oh my God, what do I do?!" },
                { "role": "operator", "text": "Alright, I need you to stay calm, this is very important, and listen carefully. Can you check if there is anything obstructing his mouth or nose?" },
               { "role": "caller", "text": "I dont see anything in his mouth. What do I do next ?" },
                 { "role": "operator", "text": "Okay, now I want you to place one hand on his forehead, and tilt his head back and lift his chin. Can you do that?" },
                { "role": "caller", "text": "Yes, I have done that! What now?" },
                { "role": "operator", "text": "Good, now can you place your ear close to his mouth and nose and look to see if you chest rises? Can you see or hear him breathing?" },
               { "role": "caller", "text": "No... No I dont see or hear anything! Oh my god, he's not breathing" },
                { "role": "operator", "text": "Okay, this is critical! Do you know how to do CPR? We need to start immediately" },
                { "role": "caller", "text": "I've seen it on TV, but I am not sure i can do it!" },
                 { "role": "operator", "text": "Don't worry, I am here, I'll guide you. Now place the heel of one hand in the center of his chest. Put your other hand on top of the first and start compressing, do it hard and fast, at least 100 compressions per minute" },
                { "role": "caller", "text": "Okay, okay, I'm doing it! This is so hard! One two three, four... What is the number of compressions I should do? Can you hear me?" },
               { "role": "operator", "text": "Yes, I hear you, that's excellent! You need to continue compressions, keep the chest rising about 2 inches, try to keep at least 100 per minute. We are sending emergency services, they will be there as fast as they can. Have you got a second person to help you?" },
                { "role": "caller", "text": "No, I am alone in my house with him, I dont know what to do." },
                  { "role": "operator", "text": "Okay, just keep doing compressions as I said, it is very important, dont stop, just keep going. The emergency services are on their way. The more you do the better are his chances, can you do it for me?" },
                 { "role": "caller", "text": "Okay, I understand. I will continue to do compressions until they arrive! Please, hurry!" },
                  { "role": "operator", "text": "Yes, please continue. Help is on the way, we are doing everything to help him" }


            ]
        },
        {
             "title": "Medical Emergency - Fall and Head Injury",
            "location": "Anfa, Casablanca",
            "coordinates": { "latitude": 33.5946, "longitude": -7.6303 },
            "callType": "Medical",
            "priority": "High",
             "conversation": [
                { "role": "caller", "text": "My mother just fell down the stairs! She is bleeding from her head!" },
                { "role": "operator", "text": "Okay, try to remain calm. Is she conscious? Is she responsive?" },
                { "role": "caller", "text": "Yes, she's conscious, but she's very confused and she's saying she is in a lot of pain" },
                { "role": "operator", "text": "Can you see where the bleeding is coming from? Is it a deep cut or is it shallow?" },
                 { "role": "caller", "text": "She has a cut on the back of her head, I think it is quite deep, the blood is coming out fast! She has a bruise on her forehead too and she is complaining of pain in her neck, is she going to be okay?" },
                { "role": "operator", "text": "Okay, don't move her, try to stop the bleeding, with a clean cloth or towel and put pressure on it. Please do not move her head or neck. We are sending emergency services, they will be there very quickly." },
                  { "role": "caller", "text": "Ok, I am putting pressure on the wound. I am so scared, what happens if she falls unconscious?!" },
                 { "role": "operator", "text": "Try to keep her talking and awake, keep her calm and reassure her that help is on the way. I am tracking the emergency services, they are a few minutes away. Do you have a second person to help you?" },
                  { "role": "caller", "text": "No I am home alone with her, please hurry" },
                 { "role": "operator", "text": "Keep doing what you are doing, keep the pressure on the wound and keep her awake. I will give you further instructions if needed, the emergency services are close." },
                { "role": "caller", "text": "Ok, I will do that. Thank you" }
            ]
        },
        {
            "title": "Medical Emergency - Allergic Reaction",
            "location": "Hay Hassani, Casablanca",
            "coordinates": { "latitude": 33.5553, "longitude": -7.6179 },
            "callType": "Medical",
            "priority": "Medium",
             "conversation": [
                { "role": "caller", "text": "My son is having a severe allergic reaction! He's having trouble breathing!" },
                { "role": "operator", "text": "Okay, what caused this reaction? What did he eat?" },
                { "role": "caller", "text": "He ate some peanuts and now his face is all swollen and he is gasping for air, he was fine a few minutes ago!" },
               { "role": "operator", "text": "Does he have an EpiPen? Has he used it?" },
               { "role": "caller", "text": "Yes, he has one but we cannot find it, we are looking everywhere, he is struggling, he is turning blue!!" },
               { "role": "operator", "text": "Okay, stay with me, try to keep him calm and sitting up. We have already dispatched emergency services to your location. Please tell me if his condition changes. Can you tell me if he has any medical conditions?" },
                  { "role": "caller", "text": "He has asthma and he always carries an EpiPen for allergies. I have never seen this happen so fast, i am so scared!" },
                  { "role": "operator", "text": "Okay, I understand that this is very frightening. Just try to keep him upright and calm, avoid any stressful situations. Can you try and find the EpiPen? It could be very important." },
                { "role": "caller", "text": "We found it! Can I use it now?" },
                 { "role": "operator", "text": "Yes, please use it now. Inject it on his thigh and make sure the needle is in for 10 seconds, do you know how to do that?" },
                { "role": "caller", "text": "Yes, I just did that, the needle was in for 10 seconds, will it help?" },
                { "role": "operator", "text": "Yes, it should help. Try to monitor his breathing and stay on the line with me, the emergency services are on the way, and they should be there in a few minutes." },
                   { "role": "caller", "text": "Thank you so much!" },
                  { "role": "operator", "text": "You are doing excellent, you have handled this very well, please keep calm and we will help him!" }
            ]
        }
    ],
    
    "fire": [
        {
            "title": "Fire Emergency - Residential Building",
            "location": "Ain Diab, Casablanca",
            "coordinates": { "latitude": 33.5894, "longitude": -7.6963 },
            "callType": "Fire",
            "priority": "Critical",
            "conversation": [
                { "role": "caller", "text": "Hi police, there's a fire! There's a fire in our building! Oh my God, it's spreading fast! We're on the second floor!" },
                { "role": "operator", "text": "Okay, stay calm, sir. What floor is the fire on exactly? And what's your apartment number, if you know it? Are there other people inside with you?" },
                { "role": "caller", "text": "I think it started on the third floor, but I can see the flames reaching down. We are number 206, and yes, my wife and two children are here with me. We can barely see through the smoke, it is getting worse!" },
                { "role": "operator", "text": "Alright, I'm getting your location and sending the fire department right away, they are on their way. Do you know the quickest way to get out of the building? Is the emergency exit accessible?" },
                { "role": "caller", "text": "I think so, but the hallways are so thick with smoke! I'm afraid to go outside without seeing what's out there. My wife is panicking, we don't know what to do" },
                 { "role": "operator", "text": "Okay, sir, listen to me carefully. Try to stay low to the ground, the air will be clearer there. If you have wet towels or cloths, use them to cover your mouths and noses to filter the smoke. Is there any way you can access a window, so you can alert the fire department when they arrive?" },
                { "role": "caller", "text": "Yes! There's a small balcony window in our living room, but the smoke is pouring in from the outside! I can't keep the children calm, they're crying and asking to go outside. My wife is feeling unwell from the smoke"},
                 { "role": "operator", "text": "Okay, I understand. Try to keep that balcony window shut for now, but be ready to open it if you can see the fire trucks arriving. We're getting updates from the fire crew and they're just a few minutes away. Just keep your family together, stay low to the ground, and keep trying to reassure them. Can you hear me sir?" },
                 { "role": "caller", "text": "Yes, I can hear you! Thank you for your help! I can hear the sirens in the distance, they are getting closer! The smoke is so dense that I can barely see the walls, the children are coughing badly! What should I do when they arrive?!" },
                 { "role": "operator", "text": "Okay, when they arrive, open the window just enough to signal them. If they ask, tell them you are on the second floor, apartment 206, and give them the information on the number of adults and children with you. Do you have all of this sir? Are you ready?" },
                  { "role": "caller", "text": "Yes, yes! I understand! We will do that! I see them! Oh my god, they are here! Thank you so much, we are safe now, please keep talking and dont hang up!" },
                  { "role": "operator", "text": "Ok, we are here with you, please keep talking with me and let me know everything is ok. We will keep in contact with you until the fire is over" }

            ]
        },
        {
            "title": "Fire Emergency - Restaurant",
            "location": "Gauthier, Casablanca",
            "coordinates": { "latitude": 33.5977, "longitude": -7.6322 },
            "callType": "Fire",
            "priority": "Critical",
            "conversation": [
                { "role": "caller", "text": "Hi police, there is a fire! A fire broke out in the kitchen of the restaurant! It is huge, I am seeing the flames coming from the roof, I think they are about to catch on the other building! People are panicking!" },
                 { "role": "operator", "text": "Okay, stay calm, can you tell me, have you evacuated all the customers and the staff? Are there people still inside? Can you give me the restaurant's name, and a more precise location please?" },
                { "role": "caller", "text": "Yes, thankfully everyone is outside. The flames are very big and the smoke is covering the whole street! The restaurant is called 'Le Delice' on Rue Jean Jaurès, next to the central pharmacy! It is bad! The flames are touching the window of the building next to us!" },
                { "role": "operator", "text": "Alright, I've received your location, the fire department is en route. Is anyone injured? Do you see people coughing or struggling?" },
                { "role": "caller", "text": "No, thankfully no one is injured, but people are panicked because the fire is spreading rapidly and the wind is making it worse, the smoke is black and huge! Oh my god, I think something exploded inside! I see huge flames coming from the roof!" },
                { "role": "operator", "text": "Okay, that is very important! We will note that! Please keep everyone at a safe distance, away from the front of the building and the sides in case of explosions! Try to clear the street of traffic for the emergency services to come in safely and quickly. Can you do that?" },
                 { "role": "caller", "text": "Yes, yes, I will try to stop people from getting close. The whole street is blocked already with people watching, they are taking videos and pictures but they are in the way, It is chaos here and the smoke is making it harder to breathe!" },
                { "role": "operator", "text": "Okay, it is important to keep everyone safe! Help is coming! Just try to keep people away from the immediate area around the restaurant and please keep an eye on the surrounding buildings in case the fire spreads further. The fire department is very close, can you hear the sirens?" },
                 { "role": "caller", "text": "Yes, yes I can! They are here, I see the trucks now! The fire is so big they are having trouble getting close, the flames are reaching outside the windows! Oh my god!" },
                  { "role": "operator", "text": "Okay, please stay calm, and let them do their job. Keep the area clear, and if the fire department need more information they will ask you. We will stay on the line with you, and please let us know if you see any changes or new problems arising." },
                { "role": "caller", "text": "Ok, ok. The firemen are doing a great job, and they have started using their hoses to try to get the fire under control. The smoke is getting less now. Thank you for your help!" },
                  { "role": "operator", "text": "You are doing very well sir, and thank you for keeping me up to date, please keep calm and call us if there is anything we can do for you!" }

            ]
        },
        {
            "title": "Fire Emergency - Factory",
            "location": "Industrial Zone, Casablanca",
            "coordinates": { "latitude": 33.6059, "longitude": -7.5606 },
            "callType": "Fire",
            "priority": "Critical",
            "conversation": [
                { "role": "caller", "text": "Hi police, there is a fire! Fire in the textile factory! It's spreading rapidly! I can see that the flames are engulfing the whole building, and I can't see the workers!" },
               { "role": "operator", "text": "Okay, try to remain calm, and give me the exact address of the factory and your name please, and where are you calling from?" },
                 { "role": "caller", "text": "This is the 'Global Textile Factory', in the Industrial Zone, I am calling from the factory's security office. My name is Ahmed. We have a huge fire, it is very bad and I do not know where my colleagues are!" },
                { "role": "operator", "text": "Okay Ahmed, I have your location and we have dispatched emergency services, but I need you to tell me, how many people are still inside? And what kind of materials are there in the factory, such as chemicals or fuel that could make the fire worse?" },
                { "role": "caller", "text": "The night shift, usually around 20 people, but I cannot see them anywhere! We store textiles, but also some flammable dyes and chemicals, I don't know exactly what, because I am the security man! I have no idea how the fire started, it is spreading so fast!" },
                 { "role": "operator", "text": "Okay, we are noting all of this information. Do you know if they have been able to use the emergency exits? Is there a clear path to safety? Is the fire blocking the exits?" },
                { "role": "caller", "text": "I think some may have tried to escape using the back exits, but the fire is spreading very fast in all directions and it is difficult to know where to go! There is so much thick black smoke and i cannot see a thing! The workers were close to the machines when the fire started! Oh god I hope they are ok!" },
                  { "role": "operator", "text": "Okay, we understand that this is very stressful. It is important that you stay safe, please move a safe distance away from the factory, and give any information that you can to the emergency services when they arrive. Can you hear the sirens, and see the fire department?" },
                { "role": "caller", "text": "Yes, I can hear them now! They are arriving quickly, I can see the fire trucks, and I can also see the ambulances too! The fire looks even more terrifying close up! I just hope that everyone is okay!" },
                { "role": "operator", "text": "Okay Ahmed, we will keep in contact with you, and please stay close and be ready to provide the fire department with any details you have about the fire, and please stay safe" },
                { "role": "caller", "text": "Okay, I will do that, thank you so much!" },
                { "role": "operator", "text": "You are welcome, please let us know if there is anything else we can do" }

            ]
        }
    ],
   
        "police": [
            {
                "title": "Police Emergency - Burglary",
                "location": "Sidi Belyout, Casablanca",
                "coordinates": { "latitude": 33.5932, "longitude": -7.6185 },
                "callType": "Police",
                "priority": "High",
                "conversation": [
                    { "role": "caller", "text": "Hi police, I think there are burglars next door! I hear noises!" },
                    { "role": "operator", "text": "Okay, stay calm. What kind of noises?" },
                    { "role": "caller", "text": "Like breaking glass, and some thumping, like someone is inside!" },
                    { "role": "operator", "text": "Can you see anyone? How many?" },
                     { "role": "caller", "text": "Yes, two men, I see them at the back window, they have tools!" },
                    { "role": "operator", "text": "Okay, stay inside, I'm sending a patrol car now. Do not approach them." },
                    { "role": "caller", "text": "They just went inside! What should I do?!" },
                    { "role": "operator", "text": "Keep watching from a safe place. Note any details you can." },
                    { "role": "caller", "text": "They are moving inside, I can hear them. Should I shout?" },
                     { "role": "operator", "text": "No, please don't shout. Stay quiet and out of sight. Do they have any bags?" },
                    { "role": "caller", "text": "Yes, one of them has a large bag, like a sports bag" },
                     { "role": "operator", "text": "Okay, is there a vehicle involved? Do you see a car or motorbike?" },
                     { "role": "caller", "text": "No, not in front of the house, maybe in the back alley?" },
                     { "role": "operator", "text": "Okay, that is good to know. The police are on their way. Please keep watching and keep reporting." },
                     { "role": "caller", "text": "They are moving from room to room, I hear more noises!" },
                    { "role": "operator", "text": "Okay, just stay quiet. What kind of noises are they now? Are they still breaking things?" },
                     { "role": "caller", "text": "Yes! I think they are breaking furniture. I can hear glass too!" },
                     { "role": "operator", "text": "Please stay out of sight, the police is almost there. Do not try to be brave or go near them." },
                     { "role": "caller", "text": "Okay, I see a police car! They are here!" },
                      { "role": "operator", "text": "That is good, stay on the line, and talk to the police officers when they arrive. Report to them exactly what you have seen. Is everything ok?" }
                ]
            },
            {
                "title": "Police Emergency - Assault",
                "location": "Maarif, Casablanca",
                "coordinates": { "latitude": 33.5731, "longitude": -7.5898 },
                "callType": "Police",
                "priority": "High",
                "conversation": [
                    { "role": "caller", "text": "Hi police, there's a fight in the street! It's really bad!" },
                    { "role": "operator", "text": "Okay, where exactly are you?" },
                    { "role": "caller", "text": "Rue de la Liberté, near the cafe. People are shouting!" },
                    { "role": "operator", "text": "How many people are fighting?" },
                    { "role": "caller", "text": "About three or four, very aggressive, one person is on the ground." },
                    { "role": "operator", "text": "Okay, police are being dispatched. Are there any weapons?" },
                    { "role": "caller", "text": "No weapons, just fists, but very violent. And one person is down now!" },
                    { "role": "operator", "text": "Okay, stay back from the fight. Can you describe the people involved?" },
                     { "role": "caller", "text": "Two men in t-shirts and jeans, and another in a dark jacket, and the person on the floor is wearing a blue shirt!" },
                    { "role": "operator", "text": "Okay, stay on the line. Is the fight still going on?" },
                    { "role": "caller", "text": "Yes, they are still hitting each other. People are watching and screaming!" },
                    { "role": "operator", "text": "Do not get involved. Is anyone trying to stop them?" },
                    { "role": "caller", "text": "No, people are afraid to get involved. I think that the people fighting are not stopping and will keep going for a long time!" },
                     { "role": "operator", "text": "The police are almost there. Is the person still down? Do they seem conscious?" },
                    { "role": "caller", "text": "Yes, the person is still on the floor, not moving. Maybe unconscious, I do not know!" },
                    { "role": "operator", "text": "Okay, that is important, we have noted that down. Stay calm, the police are very near." },
                    { "role": "caller", "text": "The fighting is slowing down now! They look tired!" },
                     { "role": "operator", "text": "Okay, please stay out of the way, and tell me if anything changes and do not hang up" },
                    { "role": "caller", "text": "I see the police! They have arrived!" },
                     { "role": "operator", "text": "Great, stay on the line, and report everything to the police. They are there to help you, and thank you for your call." }
    
                ]
            },
            {
                "title": "Police Emergency - Road Accident",
                "location": "Anfa, Casablanca",
                "coordinates": { "latitude": 33.5950, "longitude": -7.6326 },
                "callType": "Police",
                "priority": "High",
                "conversation": [
                    { "role": "caller", "text": "Hi police, bad accident! Two cars crashed!" },
                    { "role": "operator", "text": "Okay, where is this accident?" },
                    { "role": "caller", "text": "Boulevard Anfa, near the park. The cars are in the middle of the road." },
                    { "role": "operator", "text": "Are there any injuries? How many people?" },
                     { "role": "caller", "text": "Yes, I think two people hurt badly. I think they are stuck in the car!" },
                    { "role": "operator", "text": "Okay, police and ambulances are on their way. Is the road blocked?" },
                     { "role": "caller", "text": "Yes, completely blocked. Cars are backed up already!" },
                    { "role": "operator", "text": "Okay, stay safe. Is there smoke, or fire?" },
                     { "role": "caller", "text": "No smoke or fire, but lots of broken glass everywhere. And the cars are destroyed, you cant imagine!" },
                    { "role": "operator", "text": "Okay, try to keep people back and safe. Do not go near the cars if you can avoid it" },
                     { "role": "caller", "text": "Yes, people are trying to help, but they are making it worse! The situation is dangerous!" },
                     { "role": "operator", "text": "Okay, we understand. Is anyone arguing about who caused the accident?" },
                    { "role": "caller", "text": "Yes! Two men are arguing and yelling, I think they will start to fight!" },
                    { "role": "operator", "text": "Okay, the police are almost there. Do not get involved in the fight." },
                     { "role": "caller", "text": "The traffic is worse now, and more cars are stuck. People are getting angry! I think someone is hurt really bad inside the car and is groaning." },
                    { "role": "operator", "text": "Okay, I have noted that down, the emergency services are very close. Please stay out of the way and try to stay safe." },
                     { "role": "caller", "text": "I see the ambulances coming, and I can see the police car now!" },
                     { "role": "operator", "text": "That is excellent. Do not hang up. Please wait for the police, and tell them everything. Are the people arguing calming down now?" },
                     { "role": "caller", "text": "Yes, the people arguing have stopped, and I can see the medical people trying to help the people in the cars!" },
                     { "role": "operator", "text": "That is great news. Thank you for your call, and for your help. If you need anything else, please call us." }
                ]
            }
        ]
};

module.exports = { emergencyScenarios };
