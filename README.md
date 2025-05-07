# NaviGateApp
NaviGateApp is a full-stack application built with ASP.NET on the backend and Angular on the frontend. It is designed to manage and display information related to various ships and their associated voyages. Data visibility is user-specific, meaning that each authenticated user can only access their relevant ship and voyage records. Secure user authentication is implemented, with passwords stored using SHA-256 hashing to ensure safe and reliable credential management. 

## Screenshots:
![screenshot_7](https://github.com/user-attachments/assets/ec459312-b6a5-4283-bcde-7338bbb87fd9)

This is the registration screen, where users create their accounts for the first time. Upon successful registration, users are redirected to a login screen with a similar interface to authenticate and access the application.

![screenshot_1](https://github.com/user-attachments/assets/be448afd-4c1e-447d-8db3-a128290eacee)
![screenshot_2](https://github.com/user-attachments/assets/c4ff4e11-980f-4ac7-bca9-f760faabaa41)

These screenshots showcase the main interface of the application, populated with sample (dummy) data. On the left side, a list of all available ships is displayed, along with a button to add new ships. The center panel serves as the primary display area, presenting detailed information about the selected ship. This includes:

- The ship’s name and maximum speed
- A list of voyages with associated data
- A log of all ports visited during those voyages
- A summary of countries visited within the past year
- A pie chart visualizing the frequency with which the ship has visited each country

![screenshot_3](https://github.com/user-attachments/assets/ab42bdc3-8ccd-41a2-995f-95f431acdea6)

This is the interface in which a user adds a new ship in the database.

![screenshot_4](https://github.com/user-attachments/assets/28c2acae-55ff-4c04-93d8-1579f1373840)

This is the interface in which a user edits the data of a voyage. A similar modal with empty data is used for adding a new voyage.

![screenshot_5](https://github.com/user-attachments/assets/7dd2bdd7-7625-4330-9950-7c48d33a762b)
![screenshot_6](https://github.com/user-attachments/assets/b130baed-c784-456d-af51-30bf331cba30)

The application is fully mobile friendly. This is an example of the interface made to work with smaller screens.

![screenshot_8](https://github.com/user-attachments/assets/abf40a1d-3709-4d5a-90cb-83ef592b44e5)

This example illustrates a ship that currently has no voyage data associated with it. While the application does not provide direct UI options to add or remove ports and countries, these entries are automatically managed when a new voyage is added. If a port or country already exists in the database, the application reuses the existing entry, ensuring that data is not duplicated and remains consistent. 



