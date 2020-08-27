## Local Development

Install dependencies for local development using:
```
npm ci
```

## Deployment


1. Authenticate with App Scripts using (only needed on clean install):
```
npm run authenticate
```

2. Push code to Google by using:
```
npm run deploy
```

3. Publish the web-app from the script [here](https://script.google.com/d/1ysfRacA0bdS4Av44hPURVUk-gqbwOjTA7Bw3WFNr1wyk8iN_s_iAMQSF/edit).

    1. Select Publish -> Deploy as web app...
    2. Set Project version to "New"
    3. Set Who has access to the app to "Anyone, even anonymous"
    4. Press "Update"
