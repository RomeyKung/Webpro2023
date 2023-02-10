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
    let start = document.getElementById('start')
    let process = document.getElementById('process')
    let end = document.getElementById('end')
    start.innerText = 'Program started'
    setTimeout(() => {
        console.log('Program started')
        process.innerText = 'Hello World'
        setTimeout(() => {
            end.innerText = 'Program ended'
        }, 3000)
    },2000)

}

// ข้อ 2.3
function stopTime() {
    let time = document.getElementById('Time').value
    let miniute = Math.floor(time/60)
    let second = Math.floor(time%60)

    let countDown = setInterval(() => {
        setMin = document.getElementById('setMinute').innerText = miniute.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        setSec = document.getElementById('setSecond').innerText = second.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
        if (second > 0) {
            second--
        } else if (miniute > 0 && second == 0) {
            miniute--
            second = 59
        } else {
            clearInterval(countDown)

        }
    }   , 100)

}

