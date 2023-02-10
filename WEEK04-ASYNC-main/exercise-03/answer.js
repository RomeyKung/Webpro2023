// ข้อ 3.1
function getDogDemo() {
  // hint: เรียกใช้ getAPI() โดยดึงข้อมูลจาก url = https://dog.ceo/api/breeds/image/random
  // ลอง console.log() ดูว่าข้อมูลที่ได้มาเป็นอย่างไร
  let time = document.getElementById('dogTime')
  let second = time.innerText
  let countDown = setInterval(() => {
    time.innerText = second
    if (second > 0) {
      second--
    } else {
      time.innerText = ""
      let success = (res) => { dogImg.src = res.message }
      let error = () => { console.log('แย่ละ') }
      getAPI('https://dog.ceo/api/breeds/image/random', success, error)
      clearInterval(countDown)
    }
  }, 100)

}


// ข้อ 3.2
function Rainbow() {
  //TODO
  // 1. ในกรณีที่ status = 'success' ให้แสดงตัวเลขเป็นสีตามที่กำหนดในแต่ละ STATE
  // 2. ให้แสดงชื่อ STATE (STATE 1 หรือ STATE 2 หรือ STATE 3) ในกล่องข้อความเมื่อเกิด Error
  // 3. เปลี่ยนสีข้อความเป็นสีแดงเมื่อเกิด Error (class = 'has-text-error')

  const rainbow = document.getElementById("rainbow")
  setTimeout(() => {
    // STATE 1 color = 'has-text-primary'
    let stat = getResult()
    stat.status == 'success' ? (rainbow.className = 'has-text-primary', rainbow.innerText = stat.text) : (rainbow.className = 'has-text-danger', rainbow.innerText = 'STATE 1')
    setTimeout(() => {
      // STATE 2 color = 'has-text-success'
      let stat = getResult()
      stat.status == 'success' ? (rainbow.className = 'has-text-primary', rainbow.innerText = stat.text) : (rainbow.className = 'has-text-danger', rainbow.innerText = 'STATE 2')
      setTimeout(() => {
        // STATE 3 color = 'has-text-success'
        let stat = getResult()
        stat.status == 'success' ? (rainbow.className = 'has-text-primary', rainbow.innerText = stat.text) : (rainbow.className = 'has-text-danger', rainbow.innerText = 'STATE 3')
      }, 2000)
    }, 2000)
  }, 2000)
}

function getResult() {
  const num = Math.floor(Math.random() * 10)
  console.log(num)
  if (num > 5) {
    return {
      'status': 'success',
      'text': num
    }
  } else {
    return {
      'status': 'error',
      'text': num
    }
  }
}

// ข้อ 3.3
function evenNumber(num) {
  // hint : ทำการสร้าง promise และเรียกใช้

  let myPromise = new Promise(function (myResolve, myReject) {

    num % 2 == 0 ? myResolve('succes na') : myReject('reject na')
  });

  myPromise.then(
    (res) => { result.innerText = 'success : ' + num + ' is an even number' + res}
  ).catch(
    (res) => { result.innerText = 'Error  : ' + num + ' is not an even number' +res}
  );
}

// ข้อ 3.4
function task(id) {
  const delay = parseInt(Math.random() * 1000)
  // return promise
  let myPromise = new Promise(function (myResolve, myReject) {
    setTimeout(() => {
      delay > 500 ? myResolve(`task ${id}: ${delay}ms ... PASS!`) : myReject(`task ${id}: ${delay}ms ... NOTPASS!`)

    }, delay);
  });
  return myPromise

}

function tester() {
  // hint : task(1).then().catch() ..... task(4)...
  // ต้องเรียก function task 4 ครั้ง เปลี่ยน id ไปเรื่อยๆ
  for (let i = 1; i < 5; i++) {
    task(i).then(res => console.log(res)).catch(err => console.log(err))
  }


}

// ข้อ 3.5
// hint : เรียก getAPI() ที่ url = https://api.thecatapi.com/v1/images/search 
// อย่าลืม console.log() ดูข้อมูลที่ได้ด้วยว่ามีโครงสร้างแบบใด
function checkAuth(password) {
  return new Promise((resol, reject) => {
    password == 'Cisco' ? resol("รหัสผ่านถูกต้อง") : reject("รหัสผ่านถูกต้อง")
  })
}

function fetchData(password) {
  checkAuth(password).then((res) =>
    alert(res),
    getAPI('https://api.thecatapi.com/v1/images/search', (res) => { cat.src = (res[0].url) }, (res) => console.log('res'))
  ).catch((res) => alert(res))
}

// GET API
function getAPI(url, success, error) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const res = JSON.parse(this.response);
      success(res);
    } else if (this.readyState == 4) {
      const res = JSON.parse(this.response);
      error(res);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.send();
}
