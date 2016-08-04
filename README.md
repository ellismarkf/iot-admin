# admin webapp prototype

Tech
* React
* Redux
* react-router
* AWS DynamoDB

## caveats

To the best of my knowledge, the mobile webapp fulfills all the requirements of the prototype, as per the instruction guide.

That said, it's still a prototype, and does have some quirks; namely that there's no real visual confirmation when adding or editing devices, deviceTypes, or controls.  Having the console open while fiddling with the app should provide the necessary feedback and confirmation of success (or failure - more on that in a moment). Similarly, there isn't really any error handling, outside of just logging 'ERROR!' in the console when something blows up. :bomb:

After posting new items or editing existing ones, it's best to use the in-app navigation, ie the `Back` links, rather than the browser back button.  Technically the browser buttons do work in the admin app - just safer to use the in-app nav. On that note, when saving edits to deviceTypes, if the back button doesn't take you back on first click, try again.  