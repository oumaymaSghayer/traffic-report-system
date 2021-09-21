# Traffic Report System

The report is a traffic counts table that lists, for various types of road user (such as vehicles, bicycles, or pedestrians) the number counted traveling in certain directions.

## Wireframes

The design wireframes.pdf file is a sample of the data displayed. There are two
major modes of the report; complete data and peak hour, which can be toggled.

The complete data view shows all the data in the provided data period in a
single table. The rows in this view should be demarcated into morning (AM) and
afternoon (PM) sections.

The peak hour data is a condensed view that shows only one hour of data for
the morning and one hour of data for the afternoon. This one hour of data is
selected as a sliding window which contains the highest level of traffic in
the particular period of the day. For example, the morning peak hour is
calculated over the data from 00:00 to 12:00 and shows the 60 minutes where
volume was the highest. The peak hour may not necessarily start on an hour
boundary; for example it could be from 03:45 to 04:45.

### Vehicle and Bicycle Data

---

The following abbreviations are used for vehicular directions:

- NB for northbound
- SB for southbound
- WB for westbound
- EB for eastbound

The following abbreviations are used to indicate the lane used:

- L for the left turn lane
- T for through traffic
- R for the right turn lane

### Pedestrian Data

---

The following abbreviations are used for pedestrian crosswalks:

- N for north crosswalk
- S for south crosswalk
- W for west crosswalk
- E for east crosswalk

An entry with "N" means that a particular number of pedestrians were using the
north crosswalk.

The following abbreviations are used to indicate the direction of pedestrian
travel:

- CW for clockwise
- CCW for counter-clockwise

The directions of travel are based on observing the intersection above. For
example, a pedestrian count of "N" with a direction of "CCW" means that the
observed number of pedestrians were traveling on the north crosswalk,
traveling from east-to-west (counter-clockwise).

# Requirements

In order to run this app you have to have node and json-server installed already.

To install json server run : `npm install -g json-server`

# Run in development mode

1- Clone this repo : `git clone https://github.com/oumaymaSghayer/traffic-report-system.git`

2-Run in root of the project : ` npm install && json-server data/data.json && npm start`
