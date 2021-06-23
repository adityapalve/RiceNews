// Adding a new log to the ref.json file 
// Created by Aashish Loknath Panigrahi (@asxyzp)
const fs = require('fs');

/*
	Function: addLog(platform)
	Functionality : Adding a log for a given platform and/or updating the total count
*/
function addLog(platform){

	//When no platform has been mentioned then the total count is updated
	if(platform.length==0){
		
		/*
			1. ref.json is read
			2. It's data is extracted into an object
			3. Value for the reqd. key (total) is updated
			4. Updated object is written in ref.json file
		*/
		fs.readFile(
			__dirname+'/ref.json',
			'utf8',
			(err,data)=>{
				if (err) throw err;
				const obj = JSON.parse(data);
				obj.total += 1;
				fs.writeFile(
					__dirname+'/ref.json',
					JSON.stringify(obj),
					(err)=>{
						if (err) throw err;
						console.log(`TOTAL COUNT UPDATED!`);
					}
				);
			}
		);
	}
	else{

		/*
			1. ref.json is read
			2. It's data is extracted into an object
			3. Value for the reqd. key (e.g. twitter, whatsapp, hnews) is updated
			4. Updated object is written in ref.json file
		*/
		fs.readFile(
			__dirname+'/ref.json',
			'utf8',
			(err,data)=>{
				if (err) throw err;
				const obj = JSON.parse(data);
				obj.total += 1;
				obj[`${platform}`] += 1;
				fs.writeFile(
					__dirname+'/ref.json',
					JSON.stringify(obj),
					(err)=>{
						if (err) throw err;
						console.log(`COUNT FOR ${platform} UPDATED!`);
					}
				);
			}
		);
	}
}

module.exports = addLog;