// ข้อ 2.1

function display(msg) {
    let div = document.getElementById('ex01-div')
    div.innerHTML = msg
}

function showConfirm(callback) {
    // You code here
    confirm("ยืนยันไหม???") ?  callback("ยืนยันจ้า"):  callback("ไม่ดีกว่า")
}

// ข้อ 2.2
function start() {
    // hint: ส่ง callback function เข้าไปเป็น argument ของ setTimeout()
    setTimeout(() => {
        console.log("Program running")
        setTimeout(() => {
            console.log("Program ended")
        }, 3000)
    },2000)

}

// ข้อ 2.3
function stopTime() {
    let time = document.getElementById('Time').value
    let miniute = time/60
    let second = time%60

    let countDown = setInterval(() => {
        setMin = document.getElementById('setMinute').innerText = Math.floor(miniute).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        setSec = document.getElementById('setSecond').innerText = Math.floor(second).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        if (second > 0 && miniute >=0) {
            second--
        } else if (miniute > 0 && second > 0) {
            miniute--
            second = 59
        } else {
            clearInterval(countDown)
            setMin = document.getElementById('setMinute').innerText = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
            setSec = document.getElementById('setSecond').innerText = (0).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        }
    }   , 100)

}

