# Welcome to the Dartmouth Organic Farm app!🚜👩‍🌾🌽🐟🐝 


Hey! This app was designed to allow Dartmouth Students to better interact with the many activities the Organic Farm has to offer. This app began development in the summer of 2017 and was built by  [Brayan Lozano '20](www.brayanlozano.com).
<p align="center"><img src="https://github.com/blozano824/DartmouthOrganicFarm/blob/master/img/Dartmouth%20Organic%20Farm.png" alt="Drawing" height="40%" width="40%"/></p>


:clipboard: Features
----------------------------------------------------

Version 1 was primarily built for summer farm interns to quickly and efficiently log daily and weekly data collected on tilapia fish tanks. The app also notifies the user when there are any abnormalities with the tank's **pH**, **temperature**, or **dissolved oxygen levels**. Tanks can also be added or eliminated when fish are moved from the farm's solar greenhouse to a temperature-controlled room during the cold Hanover winters. Version 2 will display graphs of each individual tank's data trends as well as an interactive fish tank explaining how our aquaponics system operates. The app is currently only available on iOS but Android is coming soon!


:wrench: How it Was Built
-------------

This app was entirely built using React Native, Google Apps Scripts and several node modules.
> **Modules:**
> - **[React Native](https://facebook.github.io/react-native/)** is used for building all core components and provides compatibility for iOS and Android.
> - **[React Native Navigation](https://github.com/wix/react-native-navigation)** is used for creating a tab based application with lightboxes and a sidebar.
> - **[React Native Snap Carousel](https://github.com/archriss/react-native-snap-carousel)** is used for designing swipeable data previews for all fish tanks.
> - **[Firebase](https://www.npmjs.com/package/firebase)** is used for creating a realtime database of all recorded data for all users
> - **[Google Apps Scripts](https://www.google.com/script/start/)** is used for transferring daily data from Firebase over to Google Sheets.


:iphone: Screenshots
-------------
<p align="center"><img src="https://github.com/blozano824/DartmouthOrganicFarm/blob/master/img/Screenshots/Simulator%20Screen%20Shot%20Aug%2018%2C%202017%2C%2010.58.15%20AM.png" alt="Drawing" height="33%" width="33%"/><img src="https://github.com/blozano824/DartmouthOrganicFarm/blob/master/img/Screenshots/Simulator%20Screen%20Shot%20Aug%2018%2C%202017%2C%2010.58.21%20AM.png" alt="Drawing" height="33%" width="33%"/><img src="https://github.com/blozano824/DartmouthOrganicFarm/blob/master/img/Screenshots/Simulator%20Screen%20Shot%20Aug%2018%2C%202017%2C%2010.58.27%20AM.png" alt="Drawing" height="33%" width="33%"/></p>
