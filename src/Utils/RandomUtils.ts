/**
 * 随机数工具类
 */
class RandomUtils{
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    public static limit($from:number, $end:number):number {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range:number = $end - $from;
        return $from + Math.random() * range;
    }

    /**
     * 获取一个区间的随机数(帧数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    public static limitInteger($from:number, $end:number):number {
        return Math.round(this.limit($from, $end));
    }

    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    public static randomArray(arr:Array<any>):any {
        var index:number = Math.floor(Math.random() * arr.length);
        return arr[index];
    }
    /**
     * 在一个数组中随机获取N个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    public static getRandomArray(arr:Array<any>,num:number):any {
        if(arr.length<num){
            console.warn('不能大于数组长度');
        }
        let randomArr = [];
        let masterArr = arr;
        for(var k:number=0;k<num;k++){
            var random:number = RandomUtils.limitInteger(0,masterArr.length-1);
            randomArr.push(masterArr[random]);
            masterArr.splice(random,1);
        }
        return randomArr;
    }
}
