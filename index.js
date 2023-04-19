const express = require('express');
const moment = require('moment');
const Joi = require('joi');
const app = express();
app.use(express.json());
const availabilityTimings = 
    {"monday": [{"start":"08:30","end":"11:45"},{"start":"14:15","end":"16:45"},{"start":"20:00","end":"23:00"}],
    "tuesday":[{"start":"09:00","end":"12:30"},{"start":"14:00","end":"17:00"}],
    "wednesday":[{"start":"10:15","end":"12:45"},{"start":"13:30","end":"16:00"}],
    "thursday":[{"start":"09:30","end":"12:00"},{"start":"15:00","end":"17:30"},{"start":"20:30","end":"23:00"}],
    "friday":[{"start":"08:00","end":"18:00"}],
    "saturday":[{"start":"10:30","end":"13:00"}],
    "sunday":[]}


app.get('/api/check/', (req, res)=>{
    //we have the date in yy-mm-dd format as a string
    const dateStr = req.body.date;
    const timeStr  =req.body.time;
    const dateObj = stringToDate(dateStr);
   
    //we get the day using the getDay() method
    const day = dateObj.getDay();
    const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
    //Now we have to navigate to the day of the week where the patient wants to book appointment
    //check if within the range
    for(x in availabilityTimings[weekday[day]]){
        if(isTimeInRange(availabilityTimings[weekday[day]][x].start , availabilityTimings[weekday[day]][x].end , timeStr) == 0){
            const rep = {
                isAvailable: "true"
            }
            res.send(rep)
            return;
        }
        else if(isTimeInRange(availabilityTimings[weekday[day]][x].start , availabilityTimings[weekday[day]][x].end , timeStr) == -1){
            
            const repi = {
                date: `${dateStr}`,
                time: `${availabilityTimings[weekday[day]][x].start}`
            }
            const rep = {
                "isAvailable": false,
                "nextAvailableSlot": repi
                
                }
            res.send(rep)
            return;
        }
        else{
           
        }
        }
        const repi = {
            date: `${getNextDay(dateStr)}`,
            time: `${availabilityTimings[weekday[day+1]][0].start}`
        }
        const rep = {
            "isAvailable": false,
            "nextAvailableSlot": repi
            }
        res.send(rep)
    }

);

const port = process.env.PORT || 3000;
app.listen(port , (req, res)=>{
    console.log(`listening on port: ${port}`);
});

function isTimeInRange(startTime, endTime, checkTime) {
    //we can use any date here for reference
    const start = new Date(`01/01/1970 ${startTime}`);
    const end = new Date(`01/01/1970 ${endTime}`);
    const check = new Date(`01/01/1970 ${checkTime}`);
    //in between
    if(check > start && check < end){
        return 0;
    }
    //to the left
    else if(check <= start){
        return -1;
    }
    //to right
    else{
        return 1;
    }
  }

  function stringToDate(str) {
    const [year, month, day] = str.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  function getNextDay(str) {
    const date = new Date(str.replace(/-/g, '/'));
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString('en-CA', { year: '2-digit', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');
  }
  

