function mapToSquare (input) {
    // TODO ใช้ .map สร้าง array ที่เป็นเลขยกกำลังสองของ input
    return input.map((value)=>{
        return value**2
   })
}

function convertTemperature (input) {
    // TODO: ให้แปลงอุณหภูมิจาก °F เป็น °C โดยใช้ฟังก์ชัน .map()
    return input.map((value,index,array)=>{ 
        return {
            "date":value.date,
            "temperature":fah_to_celsius(value.temperature),
            "feel": (fah_to_celsius(value.temperature)>=26 ? "hot": "cool")
            }

    })

    //function เสริม
    function fah_to_celsius (fah) {
        let cel = (fah - 32) * 5 / 9
        return Number(cel.toFixed(1))
    }
}

function filterEvenNumber (input) {
    // TODO: filter input เอาเลขคู่เท่านั้น
    return input.filter((value,index)=>{
        return value % 2 == 0
    })
}

function filterAgeRange (input) {
    // TODO: กรอง input.people ตามช่วงอายุ
    const people = input.people;
    return people.filter((value)=>{
        return value.age < input.max && value.age > input.min
    })
}

function removeByFilter (input) {
    // TODO: ลบ Object ใน Array ด้วยการ filter
    const people = input.people;
    return people.filter((value)=>{
        return value.id !== input.removeId 
    })
}

function replaceBySplice (input) {
    // TODO: ให้ใช้ฟังก์ชัน .splice() ในการ **เปลี่ยน (replace)** สมาชิกใน Array  
    // เรียงลำดับตัวเลขให้ถูกต้อง
    input.splice(4, 1 ,  4);
    return input

}
