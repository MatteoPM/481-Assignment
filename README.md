# uCal Engage

Danny Duong, 
Matteo Morrone, 
Ishika Ghosh, 
Daniel Park

## Using the System

We strongly recommend visiting the deployed website:

https://matteopm.github.io/481-Assignment/ 

You can easily follow the planned walkthroughs from there, as the site is fully functional without requiring any legwork on your end.  

However, the project document mentions "run(ing) from the installation directory" which implies you wish to test this locally.  

To do so, simply clone the repo as you usually would, and navigate to the project directory.\
From here, you can open a shell and type `npm install` (make sure you have npm installed).\
Upon that command's completion, you can enter `npm run dev`.\
The terminal will now tell you which port to use when navigating to localhost in your browser, likely `http://localhost:5173`.

To get the intended experience of using a mobile app, do the following:

1. Press F12 to open the browser devtools
2. On the top bar, click the circled button to enable device emulation
   ![image](https://github.com/user-attachments/assets/89bdad13-0119-42ca-989f-a33033560466)
3. Another bar will appear at the top of the browser window. Open the Dimensions dropdown and select iPhone SE.
   ![image](https://github.com/user-attachments/assets/7b555c8f-cf4b-4e00-bb8a-e807e36e66a3)

## Resetting

Data is persisted for the duration of your browser session. If you need to reset the data to its original state, do the following:

1. On the top bar of the browser devtools, select the Application tab
   ![image](https://github.com/user-attachments/assets/8664310a-359e-4f3d-b132-eca097535c13)
2. On the side, expand Session storage, select https://matteopm.github.io, and press the circled button to clear the data.
   ![image](https://github.com/user-attachments/assets/e9052e97-2804-4a3b-ac57-b6295217bfa4)
3. Refresh to regenerate the default data.

## Planned Walkthroughs

As requested, we have several pre-planned sequences of operations you may perform on the application to get a feel for its functions.  To get the full uCal Engage experience, please perform the following walkthroughs in order!

### 1. Sending Direct Messages
When you first visit the application, you'll be logged in as "Joseph Ballance", our primary user for demo purposes.  Joseph happens to have already received a DM from a friend, as indicated by the red notification dots.  We'll first respond to our friend, then message some others.

Steps:
1. Click the "Chat" button from the bottom nav bar
2. Select the "Private Messages" section at the top of the screen
3. Click on "Debbie Hopkins" (note that Debbie's name is bolded at first due to the unread message)
4. Click the text box at the bottom of the screen
5. Type a message, in this case "I hereby declare that I'm going to give this group 100% on this entire project and this is legally binding agreement, no take-backs"
6. Hit the enter key or click the send button (paper airplane icon)
7. Click the back arrow in the top left of the screen
8. Click the green plus icon next to the search bar
9. Because there are far too many users to count (3), we'll search for a friend by typing "Sergio" in the search bar
10. Add Sergio to the selection by tapping anywhere in his user row
11. Clear our search from the bar by clicking the circular "x" button in the search bar
12. Click the checkbox to the right of Brenda Pease's name
13. Click the send icon (paper airplane) on the bottom right of the screen
14. Click the text box at the bottom of the screen
15. Type "Hi everyone"
16. Hit the enter key or click the send button
17. Click the back arrow in the top left of the screen

### 2. Manage Notifications
Joseph wants to stay up-to-date on the happenings in the app, so he checks his notifications.

**NOTE**: we did not have enough time to implement sending new notifications. If you'd like to test them again, [reset the data](#resetting).

Steps:
1. Click the user button on the top-right
2. Click the notifications button.
3. View the notifications. Click on each of the filter buttons (Chat, Group, Event) to see that category of notification. Click back on All.
4. Dismiss the first notification by swiping it left.
5. Dismiss the rest by clicking the "Clear All" buttona and clicking "Confirm".
    
### 3. Starting a Club
Joseph has a passion for photography, and thus has an interest in started a photography club for likeminded students.

Steps:
1. Click the "Groups" button from the bottom nav bar
2. Select the "Clubs" section at the top of the screen
3. Click on the search bar and type "photo" (note that there are no results, so Joseph decides to create his own)
4. Click the green plus icon next to the search bar
5. From the creation page, tap the edit icon resembling a pencil in the "Banner Image" section (this will auto-populate a demo image)
6. In the "Club Name" field, type "Shutter Bugs"
7. Try to click the "Create" button and see that the club will not be created without proper values for all required fields. In this case, focus is automatically placed in the description field as it is missing.
8. In the "Description" field, type "Photography club for my friends!". Note that the error feedback goes away, indicating the description is now valid.
9. Click the button next to the "Private Club" label, enabling it
10. Click the "Create" button
11. Click the white "Stats" button to get a feel for how statistics would appear
12. Feel free to scroll through these demo graphs (not reflecting real data)
13. Click the back arrow in the top left of the screen

### 4. Creating an Event
Joseph wants to host the first ever photography club meeting for all of its members (totaling 0, excluding himself)!

Steps:
1. Click the "Events" button from the bottom nav bar
2. Click the green plus icon next to the search bar
3. Click the "Select Hosting Club" dropdown
4. Select the applicable club ("Shutter Bugs" in this case)
5. Tap the edit icon resembling a pencil in the "Banner Image" section (this will auto-populate a demo image)
6. In the "Event Title" field, type "1st Shutter Bugs Meetup!"
7. In the "Description" field, type "Can't wait to meet each and every one of you"
8. In the "Location" field, type "122 Baltic Avenue"
9. In the "Starts" field, click the calendar icon and select December 27, 2024 at 5 PM. Note that the date-time selector that appears comes from your operating system. If you do this on your phone, you would get your phone's date-time picker
10. In the "Ends" field, click the calendar icon and select  December 27, 2024 at 3 PM (uh oh).
11. Check off the Social category.
12. Click the "Create" button. Whoops, you get error feedback saying the end time should be after the start time! Correct the end time to 6 PM.
13. Click the "Create" button once more. You are now brought to the event page.

### 5. Logging In & Out
We have several accounts enabled for this demonstration.  We'll first walk you through signing out of the "Joseph Ballance" account and into the "Debbie Hopkins" account.

Steps:
1. Regardless of whatever page you're on, click the profile picture in the top right corner of the screen
2. Click the "Sign Out" button at the bottom of the screen
3. Click "Sign in with UCalgary Account"
4. Demo emails are at the bottom of the screen, copy Debbie's ("debbie.hopkins@ucalgary.ca") and paste it into the text field
5. Click the "Next" button

### 6. Joining Clubs
It just so happens that Debbie also has a keen interest in photography and is also on the lookout for exciting clubs to join.  Here we'll get to experience joining two clubs that already exists, both private and public.  Note that Courses function the same as clubs except that members cannot join or leave them, as they are auto-enrolled in whichever courses they are a student of my.ucalgary.ca

Steps:
1. Click the "Groups" button from the bottom nav bar
2. Select the "Clubs" section at the top of the screen
3. Scroll down until you find a club that interests you ("Shutter Bugs" in this case)
4. Click the "Shutter Bugs" club
5. Click the "Request to Join" button
6. Click "Confirm" on the popup.
7. Click the "Groups" button from the bottom nav bar
8. Select the "Clubs" section at the top of the screen
9. Scroll down until you find another club that interests you ("Bookmarked" in this case)
10. Click the "Bookmarked" club
11. Click the "Join" button
12. Click "Confirm" on the popup
13. Note that Debbie is now included under the "Members" heading
14. Feel free to scroll through and check out this event's forum(s) and event(s)


### 7. Forum Creation
Debbie has some thoughts on a new book she's reading and wants to discuss it with other Bookmarked members!

Steps:
1. Click the "Chat" button from the bottom nav bar
2. From the default Forums section, click the green plus icon next to the search bar
3. Click the "Select Group" dropdown
4. Select the applicable group ("Bookmarked" in this case)
5. In the "Forum Topic" field, type "The Very Hungry Caterpillar"
6. In the "Your Message" field, type a message to kickstart the conversation.  We'll say "Why did the caterpillar follow up chocolate cake and ice cream with Swiss cheese?"
7. Click the "Create" button. You are then brought to the forum you just created.
8. Click the back arrow in the top left of the screen

### 8. RSVPing for an Event
Debbie happens to be free any day this month and happens to love coffee.

Steps:
1. Click the "Events" button from the bottom nav bar
2. Click on the "Filters" button
3. Click the "Date" dropdown and select "This Month"
4. Close the filters by dragging the drawer down or clicking the empty area above it.
5. Click on the search bar and type "coffee"
6. Click on the "Late Night Study Jam with Coffee Tasting" event
7. Scroll down and view the event details. Show the event location by clicking "View on map", then press the X on the top-right to close the map
8. Click the "RSVP" button
9. Click the "Confirm" button
10. Click the "Done" button
11. Resist the urge to click the "Cancel RSVP" button for this event
11. Click the "Events" button from the bottom nav bar
12. Select the "Your RSVPs" section at the top of the screen
13. Scroll through the event(s) you've chosen to attend

These are the primary features of the app, but we have implemented more that you are free to explore. We didn't include the extra features in the steps as it would make this README far longer than it already is. Anything we have not implemented for the sake of time will be indicated by an "Under Development" message. You can reset the data (instructions above) if you would like to start over with the default data.
