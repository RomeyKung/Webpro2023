// ข้อ4.1
async function getAllUser(){
    ta =document.getElementById("TA")
    //TODO
    // 1. ให้ใช้ Try Catch
    // 2. เรียกใช้ฟังก์ชัน ApiDelay()
    // 3. หากเรียกฟังก์ชันสำเร็จให้ (status: 200) ให้นำ message แสดงในกล่องข้อความ
    // 4. หากเรียกฟังก์ชันไม่สำเร็จ (message: "SERVER ERROR") ให้นำ message แสดงในกล่องข้อความ
    try {
        var res = await ApiDelay()
        ta.innerHTML = res.message
    } catch (error) {
        ta.innerHTML = error.message
    }
}

// ข้อ 4.2 
function checkAuth(password) {
    return new Promise((reslove) => {
        if (password == "In4matioN"){
            reslove("รหัสผ่านถูกต้อง")
        }
        else
            throw new Error("รหัสผ่านไม่ถูกต้อง กรุณาลองอีกครั้ง")
    })
}

async function fetchData(password) {
    img = document.getElementById("cat")
    try {
     await checkAuth(password).then(result => {
         alert(result)
         fetch('https://api.thecatapi.com/v1/images/search', {
             headers: {'Accept': 'application/json'}
         })
           .then(response => response.json())
           .then(data => {
             img.src = data[0].url
         })
     })
    } catch (error) {
     alert(error.message)
    }
}


/* 
    Function สำหรับ TA กับ อาจารย์
    นักศึกษากรุณา อย่าแก้ไข
*/

async function ApiDelay () {
      return new Promise(resolve => {
        setTimeout(() => resolve(_fakeAPI()), 2000)
    })
}

async function _fakeAPI() {
    const user = ["Bank", "Mac", "Takai", "Fluke"]
    
    if(Math.floor(Math.random() * 3) === 1){
        throw new Error("SERVER ERROR")
    }

    return {
        status: 200,
        message:user[Math.floor(Math.random() * 4)]
    }
}
