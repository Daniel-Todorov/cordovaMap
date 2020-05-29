1. When installing the google map plugin, make sure you provide active google map API key.
2. The app won't work when used in the browser as the plugin is using native SDKs.
3. I use sample API service to get the markers and the initial map center point. 
4. There is a severe issue with the double click functionality. 
By default it is coupled with other gestures - for zooming in and out with two fingers. 
Thus it is impossible to turn off the default dehaviour of the double clicking without interfering with the underlying native code. 
