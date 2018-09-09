# _LiteShift🗓_ Cordova App 
The Cordova app is based on _React.js_ web components & _redux_.

## Installation
First time only.
```
npm install
```

## Development
1. To launch in browser with hotreload & in-browser debugging:
```
npm start
```
2. To test on mobile device do the following:
```
npm run prepare
npm run build
npm run android
npm run ios
```
 3. To enable debugging for android with a signed apk on device modify MainActivity.java under `platforms/android/src` folder as follows:

 ```java
 // NOTE: Comment out in prod
// enable debugging
import android.os.Build;
import android.webkit.WebView;
// enable debugging

import android.os.Bundle;
import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // NOTE: comment out in prod
        // enabled debugging
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        WebView.setWebContentsDebuggingEnabled(true);
        }
        // enabled debuggin

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }
}
```