function getDayName (input) {
    // input เป็นเลข 0-6
    // TODO: แปลงเลข 0-6 เป็น วันอาทิตย์ - วันเสาร์
    const daysInWeek = ['วันอาทิตย์', 'วันจันทร์', "วันอังคาร", "วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์"]
    return daysInWeek[input];
    // hint
    // const daysInWeek = ['วันอาทิตย์', 'วันจันทร์', /*...*/]

}

function formatDate (input) {
    // input เป็น Object ในรูปแบบ
    // {
        //     day: 6, // 0=วันอาทิตย์, 1=วันจันทร์, 2=วันอังคาร, ...
        //     date: 15, // วันที่ 1-31
        //     month: 0, // 0=มกราคม, 1=กุมภาพันธ์, ...
        //     year: 2021 // ปี
        // }
    const daysInWeek = ['วันอาทิตย์', 'วันจันทร์', "วันอังคาร", "วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์"]
    const Month = ['มกราคม',2,3,4,5,6,7,"สิงหาคม"]
    return daysInWeek[input.day]+"ที่ "+input.date+" "+Month[input.month]+" พ.ศ. "+( input.year+543 )

    // TODO: แปลง input เป็น String ในรูปแบบ "วันศุกร์ที่ 15 มกราคม พ.ศ. 2564"

}

function findTotal (input) {
    // input เป็น array ของตัวเลข
    // TODO: ให้หาผลบวกของเลขทั้งหมดใน input
    let ans = 0;
    let ans2 = input.filter((value, index)=>{
        return (index%2 == 0)
    })
    for (let x of ans2) {
        ans += x;
    }
    return ans
}
