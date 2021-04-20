let fs = require("fs");
let input = process.argv.slice(2);

let options = [];
let filePaths = [];

for(let i = 0 ; i < input.length ; i++){
    if(input[i] == "-s" || input[i] == "-n" || input[i] =="-b"){
        options.push(input[i]);
    }else{
        filePaths.push(input[i]);
    } 
}


// console.log("options", options);
// console.log("filePath" , filePaths);

for(let i = 0 ; i < filePaths.length ; i++){
    let isFilePresent = fs.existsSync(filePaths[i]);
    if(isFilePresent == false){
        console.log("filePath ", filePaths[i] , "does not exist");
        return;
    }
}

// read  n number of file
let totalContent = "";
for(let i = 0 ; i < filePaths.length ; i++){
    let contentOfCurrent = fs.readFileSync(filePaths[i],"utf-8");
    totalContent += contentOfCurrent + "\r\n";
}
// console.log(totalContent.replace("\n", "\n"));

let isSoption = options.includes("-s");
if(isSoption == true){
    let outputArr = totalContent.split("\r\n");
    //console.log(outputArr);
    let tempArr = [];
    for(let i = 0 ; i < outputArr.length ; i++){
        if(outputArr[i] != ""){
            tempArr.push(outputArr[i]);
        }
    }

    totalContent = tempArr.join("\r\n");
}

let isN = options.includes("-n")
let isB = options.includes("-b");

let finalOption;
if(isN == true){
    if(isB == true){
        let ixB = options.indexOf("-b");
        let ixN = options.indexOf("-n");
        finalOption = ixB < ixN ? "-b" : "-n";
    }else{
        finalOption = "-n";
    }
}else if(isB == true){
    finalOption =  "-b";
}

if(finalOption == "-n"){
    let count = 1;

    let outputArr = totalContent.split("\r\n");
    // console.log(outputArr);
    for(let i = 0 ; i < outputArr.length ; i++){
        outputArr[i] = count + ". " + outputArr[i];
        count++;
    }

    totalContent = outputArr.join("\r\n");
}


if(finalOption == "-b"){
    let count = 1;
    let outputArr = totalContent.split("\r\n");
    
    for(let i = 0 ; i < outputArr.length; i++){
        if(outputArr[i] != ""){
            outputArr[i] = count + ". " + outputArr[i]
            count++;
        }
    }

    totalContent = outputArr.join("\r\n");

}
console.log(totalContent);