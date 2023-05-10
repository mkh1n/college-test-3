export default function solution(content) {
  const rawData = content.split('\n').slice(2)
  const dataArr = rawData.map((row)=>row.substring(1, row.length-2).split('|').map((el)=>el.trim()))

  //Первый шаг
  console.log(`Количество растений: ${dataArr.length}`)

  //Второй шаг
  console.log(`Список растений: ${dataArr
    .map((el)=>el[0][0].toUpperCase() + el[0].substring(1))
    .sort()
    .join(', ')}`)

  //Третий шаг
  const dangerousCount = dataArr.filter((el)=>el[4] === 'Нет').length
  console.log(`Безопасные растения: ${(dangerousCount / dataArr.length)* 100}%, Опасные растения: ${((dataArr.length - dangerousCount) / dataArr.length)* 100}%`)

  //Четвертый шаг

  const getLifeSpan = (acc, el) => {
    const lifeStr = el[3];
    var result = 0
    if (lifeStr.includes('-')){
      const from = lifeStr.split('-')[0]
      const to = lifeStr.split('-')[1].split(' ')[0]
      result = (Number(from) + Number(to)) / 2
    } else{
      result = Number(lifeStr.split(' ')[0])
    }
    if (lifeStr.includes('год') || lifeStr.includes('лет')){
      acc += result * 365
    } else{
      acc += result
    }
    return acc
  }
  const getDateStr = (num, period) => {
    const str = String(num)
    const first = ['2','3','4']
    const second = ['5','6','7','8','9','0']
    if (num[num.length-1] == '1'){
      if(period=='day'){
        return 'день'
      }
      return 'год'
    }
    else if (first.includes(str[str.length-1])){
      if(period=='day'){
        return 'дня'
      }
      return 'года'
    }
    else if (second.includes(str[str.length-1])){
      if(period=='day'){
        return 'дней'
      }
      return 'лет'
    }
  }
  const averageLifeDays = dataArr.filter((el)=>el[1].includes('Леса')).reduce(getLifeSpan, 0)/dataArr.length
  const years = Math.floor((averageLifeDays / 365))
  switch(years){}
  const days = Math.floor((averageLifeDays - +years * 365))
  console.log(averageLifeDays)
  console.log(`${years} ${getDateStr(years, 'year')} и ${days} ${getDateStr(days, 'day')}`)
  // END
}