# project-time-tracker
A web app can keep track of time spent working on projects.

## Why

I want to track the time I spend building kites so I understand how much I am charging for my time. I wanted to be able to track my time by giving start/stop commands to my Google Assistant.

## How

Architecture:
```
Manually trigger processes via ^oice
+------------------+           +----------------+
|                  |           |                |
| Google Assistant +-----------+ Home Assistant |
|                  |           |                |
+------------------+           +-------+--------+
                                       |
                                       | Make POST requests
                                       v to the script

                                +------------+               +---------------+
                                |            |               |               |
                                | App Script +-------------->+ Google Sheets |
                                |            |               |               |
                                +------------+ Manage data   +---------------+
                                               in a spreadsheet to log
                                               project's start/end times


```

### App Script
https://script.google.com/d/1ysfRacA0bdS4Av44hPURVUk-gqbwOjTA7Bw3WFNr1wyk8iN_s_iAMQSF/edit (No you can't have access. This link is for my benefit not yours.)

The code in this repository drives the App Script.

This maintains the logic for how to manage data in the spreadsheet

The App Script creates these endpoints:

#### Create Project
Creates a new spreadsheet tab (sheet)

`POST https://script.google.com/macros/s/AKfycbz3yPcFNe6X4EMh3jyh6MCUb_0xDMnwSgMtQB1mkvunJEkdc-8/exec?action=create`

with payload
```json
{
    "passcode": "secretString"
}
```

#### Start Project
Logs a start time for the relevant project in the spreadsheet

`POST https://script.google.com/macros/s/AKfycbz3yPcFNe6X4EMh3jyh6MCUb_0xDMnwSgMtQB1mkvunJEkdc-8/exec?action=start`

with payload
```json
{
    "passcode": "secretString"
}
```

#### Stop Project
Logs an end time for the relevant project in the spreadsheet

`POST https://script.google.com/macros/s/AKfycbz3yPcFNe6X4EMh3jyh6MCUb_0xDMnwSgMtQB1mkvunJEkdc-8/exec?action=stop`

with payload
```json
{
    "passcode": "secretString"
}
```

#### Complete Project
Updates the project's sheet name to show that it is completed. This allows a new project to be created with the same name.

`POST https://script.google.com/macros/s/AKfycbz3yPcFNe6X4EMh3jyh6MCUb_0xDMnwSgMtQB1mkvunJEkdc-8/exec?action=complete`

with payload
```json
{
    "passcode": "secretString"
}
```

### Google Sheets
https://docs.google.com/spreadsheets/d/1qjZjHGqGeOq7pv1ohsgupzh05Y_NsyTA5gAmJr7-cy8/edit#gid=0 (No you can't have access. This link is for my benefit not yours.)

Google Sheets serves as the storage for logs and for storing start/end times.
